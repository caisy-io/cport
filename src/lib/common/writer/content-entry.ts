import { db } from "../db";
import { contentLocale, contentEntry, contentEntryField } from "../schema";
import {
  ContentEntry,
  ContentEntryField,
  processDataForEntryField,
  ContentEntryFieldData,
} from "../types/content-entry";
import { contentLocaleSchema } from "../zod/content-entry";
import { InferInsertModel, and, sql, eq, isNull } from "drizzle-orm";
import { BlueprintPaginationResult } from "../../caisy/content-type/export";
import { DocumentFieldMap } from "../../caisy/content-entry/export";
import { DocumentWithFieldsResponse } from "@caisy/sdk";
import { Maybe, Scalars } from "../types/util";

const assetUrls = new Set<string>();
export { assetUrls };
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
        title: contentEntryInput.title,
        status: contentEntryInput.status,
        contentTypeId: contentEntryInput.blueprintId,
        contentTypeVariant: contentEntryInput.blueprintVariant,
        previewImageUrl: contentEntryInput.previewImageUrl,
      })
      .returning({
        id: contentEntry.id,
        title: contentEntry.title,
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
      if (contentTypeFieldName === "src" && contentEntryFieldData.valueObjects !== undefined) {
        const jsonObj = JSON.parse(contentEntryFieldData.valueObjects);

        const url: string = jsonObj.url;
        assetUrls.add(url);
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

async function buildAndReturnQuery(
  document: ContentEntry,
  field: ContentEntryField, // Assuming you have a type for this
  fieldData: ContentEntryFieldData,
) {
  if (fieldData.valueBool !== undefined) {
    let dbRes = await db
      .select()
      .from(contentEntryField)
      .where(
        and(
          eq(contentEntryField.contentEntryId, document.documentId),
          eq(contentEntryField.contentEntryFieldLocaleId, field.documentFieldLocaleId),
          eq(contentEntryField.contentTypeFieldId, field.blueprintFieldId),
          eq(contentEntryField.valueBool, fieldData.valueBool),
        ),
      );
    return dbRes.length > 0;
  }
  if (fieldData.valueString !== undefined) {
    let dbRes = await db
      .select()
      .from(contentEntryField)
      .where(
        and(
          eq(contentEntryField.contentEntryId, document.documentId),
          eq(contentEntryField.contentEntryFieldLocaleId, field.documentFieldLocaleId),
          eq(contentEntryField.contentTypeFieldId, field.blueprintFieldId),
          eq(contentEntryField.valueString, fieldData.valueString),
        ),
      );
    return dbRes.length > 0;
  }
  // if (fieldData.valueNumber !== undefined) {
  //   let dbRes = await db.select().from(contentEntryField).where(
  //     and(
  //       eq(contentEntryField.contentEntryId, document.documentId),
  //       eq(contentEntryField.contentEntryFieldLocaleId, field.documentFieldLocaleId),
  //       eq(contentEntryField.contentTypeFieldId, field.blueprintFieldId),
  //       eq(contentEntryField.valueNumber, fieldData.valueNumber),
  //     )
  //   );
  //   return dbRes.length > 0;
  // }
  if (fieldData.valueKeywords !== undefined) {
    let dbRes = await db
      .select()
      .from(contentEntryField)
      .where(
        and(
          eq(contentEntryField.contentEntryId, document.documentId),
          eq(contentEntryField.contentEntryFieldLocaleId, field.documentFieldLocaleId),
          eq(contentEntryField.contentTypeFieldId, field.blueprintFieldId),
          eq(contentEntryField.valueKeywords, fieldData.valueKeywords),
        ),
      );
    return dbRes.length > 0;
  }
  if (fieldData.valueDate !== undefined) {
    let dbRes = await db
      .select()
      .from(contentEntryField)
      .where(
        and(
          eq(contentEntryField.contentEntryId, document.documentId),
          eq(contentEntryField.contentEntryFieldLocaleId, field.documentFieldLocaleId),
          eq(contentEntryField.contentTypeFieldId, field.blueprintFieldId),
          eq(contentEntryField.valueDate, fieldData.valueDate),
        ),
      );
    return dbRes.length > 0;
  }
  if (fieldData.valueObjects !== undefined) {
    let dbRes = await db
      .select()
      .from(contentEntryField)
      .where(
        and(
          eq(contentEntryField.contentEntryId, document.documentId),
          eq(contentEntryField.contentEntryFieldLocaleId, field.documentFieldLocaleId),
          eq(contentEntryField.contentTypeFieldId, field.blueprintFieldId),
          eq(contentEntryField.valueObjects, fieldData.valueObjects),
        ),
      );
    return dbRes.length > 0;
  }
}

async function areDocumentFieldsMatching(
  document: ContentEntry,
  documentFieldMap: Map<string, ContentEntryFieldData>,
  blueprintMaps: BlueprintPaginationResult,
): Promise<void> {
  for (const field of document.fields) {
    try {
      const fieldData = processDataForEntryField(field.data);
      const hasResults = await buildAndReturnQuery(document, field, fieldData);
      if (!hasResults) {
        insertContentEntryFields(document.fields, document.documentId, blueprintMaps, 0, documentFieldMap);
      }
    } catch (error) {
      console.error("Error processing field:", error);
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
