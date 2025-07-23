import { ContentEntry, ContentEntryField, ContentEntryStatus } from "../../common/types/content-entry";
import { InferInsertModel } from "drizzle-orm";
import { ContentFieldTypeMap } from "../content-type/writeContentTypes";

import { contentLocale } from "../../common/schema";
import { insertContentEntry, writeContentLocale, insertContentfulEntryField } from "../../common/writer/content-entry";

import { normalizeContentfulContentTypeVariant } from "../../contentful/content-type/writeContentTypes";
import { ContentfulExportContentType } from "../types";
const normalizeContentfulLocale = (locale: {
  sys: { id: string };
  code: string;
  name: string;
  fallbackCode?: string;
  default?: boolean;
}): InferInsertModel<typeof contentLocale> => {
  return {
    id: locale.sys.id,
    apiName: locale.code,
    title: locale.name,
    flag: "",
    fallbackLocaleId: locale.fallbackCode,
    default: locale.default ?? false,
    disableInResponse: false,
    disableEditing: false,
    allowEmptyRequired: false,
  };
};

function isDraft(entity: { sys: { publishedVersion?: number } }): boolean {
  return !entity.sys.publishedVersion;
}

function isChanged(entity: { sys: { publishedVersion?: number; version: number } }): boolean {
  return !!entity.sys.publishedVersion && entity.sys.version >= entity.sys.publishedVersion + 2;
}

function isPublished(entity: { sys: { publishedVersion?: number; version: number } }): boolean {
  return !!entity.sys.publishedVersion && entity.sys.version == entity.sys.publishedVersion + 1;
}

const normalizeContentfulEntry = (
  entry: any,
  draftContent: number,
  contentTypes: ContentfulExportContentType[],
  defaultLocale = "en-US",
): ContentEntry => {
  let titleField = "Untitled";
  // console.log(`  entry.fields`,  entry.fields);
  const matchingContentType = contentTypes.find(ct => ct.sys.id === entry.sys.contentType.sys.id);
  // console.log(` matchingContentType`, matchingContentType);
  if (matchingContentType && matchingContentType.displayField) {
    titleField = entry.fields[matchingContentType.displayField] || "Untitled";
  }
  // console.log(` entry.fields`, entry.fields);
  // console.log(` titleField`, titleField);

  const previewImageUrl =
    entry.fields.image && entry.fields.image[defaultLocale] ? entry.fields.image[defaultLocale].url : undefined;

  const fields: ContentEntryField[] = [];
  let entryStatus = ContentEntryStatus.Published;
  if (draftContent !== 0) {
    if (isDraft(entry) === true) {
      entryStatus = ContentEntryStatus.Draft;
    }
    if (isChanged(entry) === true) {
      entryStatus = ContentEntryStatus.Changed;
    }
  }

  Object.keys(entry.fields).forEach(fieldKey => {
    const locale = entry.sys.locale;
    const fieldData = entry.fields[fieldKey];
    // console.log(` fieldKey`, fieldKey);
    // console.log(` ContentFieldTypeMap`, ContentFieldTypeMap);
    // console.log(` entry.sys`, entry.sys);
    fields.push({
      id: `${entry.sys.id}_${fieldKey}_${locale}`,
      blueprintFieldId: entry.sys.contentType.sys.id + "_" + fieldKey,
      blueprintFieldName: fieldKey,
      createdAt: entry.sys.createdAt,
      data: fieldData,
      documentFieldLocaleId: locale,
      type: ContentFieldTypeMap.get((entry.sys.contentType.sys.id + "_" + fieldKey) as string),
      updatedAt: entry.sys.updatedAt,
    });
  });
  return {
    documentId: entry.sys.id,
    title: titleField,
    blueprintVariant: normalizeContentfulContentTypeVariant(entry.sys.contentType.sys),
    previewImageUrl: previewImageUrl,
    status: entryStatus,
    blueprintId: entry.sys.contentType.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    fields: fields,
  };
};

export const writeContentEntries = async (
  contentEntries: any[],
  draftContent: number,
  contentTypes: ContentfulExportContentType[],
  defaultLocale?: string,
) => {
  for (const contentEntry of contentEntries) {
    const normalizedContentEntry = normalizeContentfulEntry(contentEntry, draftContent, contentTypes, defaultLocale);
    // console.info(JSON.stringify(normalizedContentEntry, null, 2));
    await insertContentEntry(normalizedContentEntry);
    if (normalizedContentEntry.fields) {
      if (
        normalizedContentEntry.status === ContentEntryStatus.Draft ||
        normalizedContentEntry.status === ContentEntryStatus.Changed
      ) {
        await insertContentfulEntryField(normalizedContentEntry.fields, normalizedContentEntry!.documentId!, 1);
      } else {
        await insertContentfulEntryField(normalizedContentEntry.fields, normalizedContentEntry!.documentId!, 0);
      }
    }
    // await insertContentfulEntryField(normalizedContentEntry.fields, normalizedContentEntry.documentId);
  }
};

export const writeContentLocales = async (contentLocales: any[]) => {
  for (const contentLocale of contentLocales) {
    try {
      const normalizedContentLocale = normalizeContentfulLocale(contentLocale);
      // console.info(JSON.stringify(normalizedContentLocale, null, 2));
      await writeContentLocale(normalizedContentLocale);
    } catch (e) {
      // const normalizedContentLocale = normalizeContentfulLocale(contentLocale);
      // console.error(JSON.stringify(normalizedContentLocale, null, 2));
      console.error("Error inserting content entry fields", e);
      throw new Error(`Error writing content locale: ${e}`);
    }
  }
};
