import {
  ContentType,
  ContentTypeField,
  ContentTypeFieldType,
  Entry,
  EntryField,
  EntryFieldType,
  Locale,
} from "contentful";
import {
  ContentType as CommonContentType,
  ContentFieldType,
  ContentTypeFieldConnectionVisualization,
  ContentTypeFieldOptions,
  ContentTypeVariant,
} from "../../common/types/content-type";

import {
  ContentEntry,
  ContentEntryField,
  ContentEntryContentTypeVariant,
  ContentEntryContentTypeFieldType,
  ContentEntryFieldData,
  ContentEntryStatus,
} from "../../common/types/content-entry";
import { InferInsertModel } from "drizzle-orm";
import { ContentFieldTypeMap, ContentFieldNameMap } from "../content-type/writeContentTypes";

import { contentLocale } from "../../common/schema";
import { insertContentEntry, writeContentLocale, insertContentfulEntryField } from "../../common/writer/content-entry";

import { writeContentType } from "../../common/writer/content-type";
import { writeContentEntryDraft } from "../../common/writer/content-entry";
import { normalizeContentfulContentTypeVariant } from "../../contentful/content-type/writeContentTypes";
const normalizeContentfulLocale = (locale: Locale): InferInsertModel<typeof contentLocale> => {
  return {
    id: locale.sys.id,
    apiName: locale.code,
    title: locale.name,
    flag: "",
    fallbackLocaleId: locale.fallbackCode,
    default: locale.default,
    disableInResponse: false,
    disableEditing: false,
    allowEmptyRequired: false,
  };
};

const normalizeContentfulEntry = (entry: Entry<any>): ContentEntry => {
  const titleField =
    entry.fields.internalName && entry.fields.internalName["en-US"]
      ? entry.fields.internalName["en-US"]
      : "No Title Provided";

  // Extracting the preview image URL if available, using 'en-US' as a default
  const previewImageUrl =
    entry.fields.image && entry.fields.image["en-US"] ? entry.fields.image["en-US"].url : undefined;

  const fields: ContentEntryField[] = [];

  // Process each field for each locale
  Object.keys(entry.fields).forEach((fieldKey) => {
    const locales = Object.keys(entry.fields[fieldKey]);
    locales.forEach((locale) => {
      const fieldData = entry.fields[fieldKey][locale];
      fields.push({
        id: `${entry.sys.id}_${fieldKey}_${locale}`,
        blueprintFieldId: fieldKey,
        createdAt: entry.sys.createdAt,
        data: fieldData,
        documentFieldLocaleId: locale,
        // lastUpdatedByUserId: entry.sys.updatedBy.sys.id,
        type: ContentFieldTypeMap.get(fieldKey as string),
        updatedAt: entry.sys.updatedAt,
      });
    });
  });

  return {
    documentId: entry.sys.id,
    title: titleField,
    blueprintVariant: normalizeContentfulContentTypeVariant(entry.sys.contentType.sys),
    previewImageUrl: previewImageUrl,
    status: ContentEntryStatus.Draft, // Assuming all entries are initially in draft status
    blueprintId: entry.sys.contentType.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    fields: fields,
  };
};

export const writeContentEntries = async (contentEntries: Entry[]) => {
  for (const contentEntry of contentEntries) {
    try {
      const normalizedContentEntry = normalizeContentfulEntry(contentEntry);
      // console.info(JSON.stringify(normalizedContentEntry, null, 2));
      await insertContentEntry(normalizedContentEntry);
      await insertContentfulEntryField(normalizedContentEntry.fields, normalizedContentEntry.documentId);
    } catch (e) {
      const normalizedContentEntry = normalizeContentfulEntry(contentEntry);
      // console.error(JSON.stringify(normalizedContentEntry, null, 2));
      throw new Error(`Error writing content type: ${e}`);
    }
  }
};

export const writeContentLocales = async (contentLocales: Locale[]) => {
  for (const contentLocale of contentLocales) {
    try {
      const normalizedContentLocale = normalizeContentfulLocale(contentLocale);
      // console.info(JSON.stringify(normalizedContentLocale, null, 2));
      await writeContentLocale(normalizedContentLocale);
    } catch (e) {
      const normalizedContentLocale = normalizeContentfulLocale(contentLocale);
      // console.error(JSON.stringify(normalizedContentLocale, null, 2));
      console.error("Error inserting content entry fields", e);
      throw new Error(`Error writing content locale: ${e}`);
    }
  }
};
