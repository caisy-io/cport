import { db } from "../db";
import { contentLocale, contentEntry, contentEntryField } from "../schema";
import { contentLocaleSchema } from "../zod/content-entry";
import { InferInsertModel } from "drizzle-orm";

export const writeContentLocale = async (locale: InferInsertModel<typeof contentLocale>) => {
  const input = contentLocaleSchema.parse(locale) as InferInsertModel<typeof contentLocale>;

  const dbRes = await db
    .insert(contentLocale)
    .values(input)
    .returning({
      id: contentLocale.id,
      apiName: contentLocale.apiName,
      title: contentLocale.title,
      flag: contentLocale.flag,
      fallbackLocaleId: contentLocale.fallbackLocaleId,
      default: contentLocale.default,
      disableInResponse: contentLocale.disableInResponse,
      disableEditing: contentLocale.disableEditing,
      allowEmptyRequired: contentLocale.allowEmptyRequired,
    })
    .execute();

  return dbRes;
};

export const writeContentEntry = async (contentEntryInput: InferInsertModel<typeof contentEntry>) => {
  const contentEntryResult = await insertContentEntry(contentEntryInput);
  return contentEntryResult;
};

const insertContentEntry = async (contentEntryInput: InferInsertModel<typeof contentEntry>) => {
  try {
    return await db
      .insert(contentEntry)
      .values({
        id: contentEntryInput.id,
        status: contentEntryInput.status,
        contentTypeId: contentEntryInput.contentTypeId,
        contentTypeVariant: contentEntryInput.contentTypeVariant,
        previewImageUrl: contentEntryInput.previewImageUrl,
      })
      .returning({
        id: contentEntry.id,
        status: contentEntry.status,
        contentTypeId: contentEntry.contentTypeId,
        contentTypeVariant: contentEntry.contentTypeVariant,
        previewImageUrl: contentEntry.previewImageUrl,
      })
      .execute();
  } catch (err) {
    console.log(` insertContentEntry`);
    throw new Error(err);
  }
};

export const writeContentEntryFields = async (
  contentEntryFieldsInput: InferInsertModel<typeof contentEntryField>[],
) => {
  const contentEntryFieldsResult = await insertContentEntryFields(contentEntryFieldsInput);
  return contentEntryFieldsResult;
};

const insertContentEntryFields = async (fields: InferInsertModel<typeof contentEntryField>[]) => {
  try {
    for (const field of fields) {
      await db
        .insert(contentEntryField)
        .values({
          id: field.id,
          draftContent: field.draftContent,
          contentTypeFieldType: field.contentTypeFieldType,
          contentEntryId: field.contentEntryId,
          contentTypeFieldId: field.contentTypeFieldId,
          contentTypeFieldName: field.contentTypeFieldName,
          contentEntryFieldLocaleId: field.contentEntryFieldLocaleId,
          valueString: field.valueString,
          valueBool: field.valueBool,
          valueKeywords: field.valueKeywords,
          valueDate: field.valueDate,
          valueNumber: field.valueNumber,
          valueObjects: field.valueObjects,
        })
        .returning({
          id: contentEntryField.id,
          draftContent: contentEntryField.draftContent,
          contentTypeFieldType: contentEntryField.contentTypeFieldType,
          contentEntryId: contentEntryField.contentEntryId,
          contentTypeFieldId: contentEntryField.contentTypeFieldId,
          contentTypeFieldName: contentEntryField.contentTypeFieldName,
          contentEntryFieldLocaleId: contentEntryField.contentEntryFieldLocaleId,
          valueString: contentEntryField.valueString,
          valueBool: contentEntryField.valueBool,
          valueKeywords: contentEntryField.valueKeywords,
          valueDate: contentEntryField.valueDate,
          valueNumber: contentEntryField.valueNumber,
          valueObjects: contentEntryField.valueObjects,
        })
        .execute();
    }
  } catch (err) {
    console.log(` insertContentEntryFields`);
    throw new Error(err);
  }
};
