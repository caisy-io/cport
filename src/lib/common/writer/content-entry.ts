import { db } from "../db";
import { contentLocale, contentEntry, contentEntryField } from "../schema";
import { ContentEntry, ContentEntryField, processDataForEntryField } from "../types/content-entry";
import { contentLocaleSchema } from "../zod/content-entry";
import { InferInsertModel } from "drizzle-orm";
import { BlueprintPaginationResult } from "../../caisy/content-type/export";
import { DocumentFieldMap } from "../../caisy/content-entry/export";
import { DocumentWithFieldsResponse } from "@caisy/sdk";
import { Maybe, Scalars } from "../types/util";

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

export const writeContentEntry = async (
  contentEntryInput: ContentEntry,
  blueprintMaps: BlueprintPaginationResult,
  documentFieldMap: typeof DocumentFieldMap,
) => {
  const contentEntryResult = await insertContentEntry(contentEntryInput);
  await insertContentEntryFields(
    contentEntryInput.fields,
    contentEntryInput.documentId,
    blueprintMaps,
    1,
    documentFieldMap,
  );
  return contentEntryResult;
};

export const writePublishedContentEntryFields = async (
  contentEntryInput: ContentEntry,
  blueprintMaps: BlueprintPaginationResult,
  documentFieldMap: typeof DocumentFieldMap,
) => {
  await areDocumentFieldsMatching(contentEntryInput, documentFieldMap, blueprintMaps);
  return;
};

const insertContentEntry = async (contentEntryInput: ContentEntry) => {
  try {
    return await db
      .insert(contentEntry)
      .values({
        id: contentEntryInput.documentId,
        status: contentEntryInput.status,
        contentTypeId: contentEntryInput.blueprintId,
        contentTypeVariant: contentEntryInput.blueprintVariant,
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

// export const writeContentEntryFields = async (
//   contentEntryFieldsInput: InferInsertModel<typeof contentEntryField>[],
// ) => {
//   const contentEntryFieldsResult = await insertContentEntryFields(contentEntryFieldsInput);
//   return contentEntryFieldsResult;
// };

const insertContentEntryFields = async (
  fields: ContentEntryField[],
  documentID: string,
  blueprintMaps: BlueprintPaginationResult,
  draftContent: number,
  documentFieldMap: typeof DocumentFieldMap,
) => {
  try {
    for (const field of fields) {
      if (draftContent === 0) {
        documentFieldMap.set(`${documentID}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`, field.data);
      }
      let contentEntryFieldData = await processDataForEntryField(field.data);
      let contentTypeFieldName = blueprintMaps.blueprintFieldNameMap.get(field.blueprintFieldId) || "";
      await db
        .insert(contentEntryField)
        .values({
          id: `${documentID}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`,
          draftContent: draftContent,
          contentTypeFieldType: field.type,
          contentEntryId: documentID,
          contentTypeFieldId: field.blueprintFieldId,
          contentTypeFieldName: contentTypeFieldName,
          contentEntryFieldLocaleId: field.documentFieldLocaleId,
          valueString: contentEntryFieldData.valueString,
          valueBool: contentEntryFieldData.valueBool,
          valueKeywords: contentEntryFieldData.valueKeywords,
          valueDate: contentEntryFieldData.valueDate,
          valueNumber: contentEntryFieldData.valueNumber,
          valueObjects: contentEntryFieldData.valueObjects,
        } as any)
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
        .onConflictDoNothing()
        .execute();
    }
  } catch (err) {
    console.log(` insertContentEntryFields`);
    throw new Error(err);
  }
};

function areDocumentFieldsMatching(
  document: ContentEntry,
  documentFieldMap: Map<string, Maybe<Scalars["Any"]>>,
  blueprintMaps: BlueprintPaginationResult,
): void {
  for (const field of document.fields) {
    const compositeKey = `${document.documentId}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`;
    const storedData = documentFieldMap.get(compositeKey);
    const processedData = processDataForEntryField(field.data);

    let actualDataValue;
    if (processedData.valueString !== undefined) {
      actualDataValue = processedData.valueString;
    } else if (processedData.valueBool !== undefined) {
      actualDataValue = String(processedData.valueBool);
    } else if (processedData.valueNumber !== undefined) {
      actualDataValue = String(processedData.valueNumber);
    } else if (processedData.valueKeywords !== undefined) {
      actualDataValue = processedData.valueKeywords;
    } else if (processedData.valueDate !== undefined) {
      actualDataValue = processedData.valueDate;
    } else if (processedData.valueObjects !== undefined) {
      actualDataValue = processedData.valueObjects;
    }
    if (actualDataValue !== storedData) {
      insertContentEntryFields(document.fields, document.documentId, blueprintMaps, 0, documentFieldMap);
    }
  }
}
