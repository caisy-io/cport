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

import { contentLocale } from "../../common/schema";
import { insertContentEntry, writeContentLocale } from "../../common/writer/content-entry";

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
  // const fields = Object.keys(entry.fields).map((fieldKey) => {
  //   const fieldValue = entry.fields[fieldKey];
  //   // Access specific locales if necessary, here assuming 'en-US'
  //   const value = typeof fieldValue === "object" && fieldValue["en-US"] ? fieldValue["en-US"] : fieldValue;

  //   return {
  //     blueprintFieldId: entry.sys.id + " " + value,
  //     createdAt: entry.sys.createdAt,
  //     documentFieldLocaleId: "some-locale-id",
  //     data: value,
  //     updatedAt: entry.sys.updatedAt,
  //     // type: normalizeContentfulFieldType(entry.fields[fieldKey]),
  //   };
  // });

  return {
    documentId: entry.sys.id,
    title: entry.fields.title && entry.fields.title["en-US"] ? entry.fields.title["en-US"] : entry.sys.id,
    blueprintVariant: normalizeContentfulContentTypeVariant(entry.sys.contentType.sys),
    previewImageUrl: entry.fields.image && entry.fields.image["en-US"] ? entry.fields.image["en-US"].url : "",
    status: ContentEntryStatus.Draft,
    blueprintId: entry.sys.contentType.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    // fields: fields,
  };
};

// const normalizeContentfulEntry2 = (entry: Entry): ContentEntry => {
//   return {
//     documentId: entry.sys.id,
//     title: entry.sys.id,
//     blueprintVariant: normalizeContentfulContentTypeVariant(entry.sys.contentType.sys),
//     // previewImageUrl:
//     status: ContentEntryStatus.Draft,
//     blueprintId: entry.sys.contentType.sys.id,
//     createdAt: entry.sys.createdAt,
//     updatedAt: entry.sys.updatedAt,
//     fields: entry.fields.map((field) => {
//       return {
//         blueprintFieldId: field.blueprintFieldId,
//         createdAt: field.createdAt,
//         documentFieldLocaleId: field.documentFieldLocaleId,
//         data: field.data,
//         updatedAt: field.updatedAt,
//         type: normalizeCaisyFieldEntry(field.type),
//       };
//     }),
//   };
// };

export const writeContentEntries = async (contentEntries: Entry[]) => {
  for (const contentEntry of contentEntries) {
    try {
      const normalizedContentEntry = normalizeContentfulEntry(contentEntry);
      console.info(JSON.stringify(normalizedContentEntry, null, 2));
      await insertContentEntry(normalizedContentEntry);
    } catch (e) {
      const normalizedContentEntry = normalizeContentfulEntry(contentEntry);
      console.error(JSON.stringify(normalizedContentEntry, null, 2));
      throw new Error(`Error writing content type: ${e}`);
    }
  }
};

export const writeContentLocales = async (contentLocales: Locale[]) => {
  for (const contentLocale of contentLocales) {
    try {
      const normalizedContentLocale = normalizeContentfulLocale(contentLocale);
      console.info(JSON.stringify(normalizedContentLocale, null, 2));
      await writeContentLocale(normalizedContentLocale);
    } catch (e) {
      const normalizedContentLocale = normalizeContentfulLocale(contentLocale);
      console.error(JSON.stringify(normalizedContentLocale, null, 2));
      throw new Error(`Error writing content locale: ${e}`);
    }
  }
};
