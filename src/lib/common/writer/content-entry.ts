import { db } from "../db";
import { contentLocale, contentEntry, contentEntryField } from "../schema";
import {
  ContentEntry,
  ContentEntryField,
  processDataForEntryField,
  ContentEntryFieldData,
} from "../types/content-entry";
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
      let contentEntryFieldData = await processDataForEntryField(field.data);
      let contentTypeFieldName = blueprintMaps.blueprintFieldNameMap.get(field.blueprintFieldId) || "";
      if (draftContent === 1) {
        documentFieldMap.set(
          `${documentID}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`,
          contentEntryFieldData,
        );
      }

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
  documentFieldMap: Map<string, ContentEntryFieldData>,
  blueprintMaps: BlueprintPaginationResult,
): void {
  for (const field of document.fields) {
    let storedData = documentFieldMap.get(
      `${document.documentId}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`,
    );
    let processedData = processDataForEntryField(field.data);
    if (
      document.documentId === "ff9a2a5e-194f-4fd4-b640-1d2db0c56b58" &&
      field.blueprintFieldId === "fae2c908-6100-4383-abd6-caaefb86c672" &&
      field.documentFieldLocaleId === "4c2fe5e1-e5f9-4eea-90a1-e982cebf4ccf"
    ) {
      console.log("SAME:", isEquivalentData(processedData, storedData));
      console.log("storedData", storedData);
      console.log("processedData", processedData);
    }
    if (isEquivalentData(processedData, storedData)) {
      continue;
    } else {
      insertContentEntryFields(document.fields, document.documentId, blueprintMaps, 0, documentFieldMap);
    }
  }
}

function isEquivalentData(data1: ContentEntryFieldData, data2: ContentEntryFieldData): boolean {
  if (data1 == null || data2 == null) {
    return data1 === data2;
  }

  const relevantKeys1 = Object.keys(data1).filter((key) => data1[key] !== undefined);
  const relevantKeys2 = Object.keys(data2).filter((key) => data2[key] !== undefined);

  if (relevantKeys1.length !== 1 || relevantKeys2.length !== 1) {
    return false;
  }

  if (relevantKeys1[0] !== relevantKeys2[0]) {
    return false;
  }

  const key = relevantKeys1[0];
  return data1[key] === data2[key];
}
