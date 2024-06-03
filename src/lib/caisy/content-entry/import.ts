import { db } from "../../common/db";
import { DocumentFieldLocaleChangeSet } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { contentEntry, contentEntryField, contentLocale } from "../../common/schema";
import { sql, count, inArray } from "drizzle-orm";

import {
  denormalizeCaisyContentTypeVariant,
  denormalizeCaisyContentEntryStatus,
  fromStringToCaisyContentFieldType,
  fromStringToCaisyBlueprintFieldType,
} from "./normalize";
import { blueprintChangeSet } from "./../content-type/import";
import { processDataForCaisyDocumentField, ContentEntryFieldData } from "../../common/types/content-entry";
import { localeChangeSet } from "./../locale/import";
import { isUuid, generateUuidFromString } from "../../common/writer/content-entry";
import { localeIDandApiNameMatchMap } from "../locale/import";

const PAGE_LIMIT = 100;

async function fetchDocumentsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  try {
    const totalDocumentsResult = await db.select({ count: count() }).from(contentEntry);
    console.log("Total documents to import:", totalDocumentsResult[0].count);
    const totalDocuments = totalDocumentsResult[0].count;

    let pageIndex = 0;
    const pageSize = PAGE_LIMIT;

    while (pageIndex * pageSize < totalDocuments) {
      const documentRows = await db
        .select()
        .from(contentEntry)
        .offset(pageIndex * pageSize)
        .limit(pageSize)
        .execute();

      const documentIds = documentRows.map((doc) => doc.id);
      const documentFieldRows = await fetchDocumentFieldsByDocumentIds(documentIds);
      console.log("Fetched documents fields:", documentFieldRows.length);
      const fieldsByDocumentId = await Promise.all(
        documentFieldRows.map(async (field) => {
          const validFieldId = isUuid(field.contentTypeFieldId)
            ? field.contentTypeFieldId
            : generateUuidFromString(field.contentTypeFieldId);
          let documentFieldLocaleID = localeIDandApiNameMatchMap.get(field.contentEntryFieldLocaleId);
          localeChangeSet.forEach((changeSetRes) => {
            if (changeSetRes.sourceDocumentFieldLocaleId === documentFieldLocaleID) {
              documentFieldLocaleID = changeSetRes.targetDocumentFieldLocaleId;
            }
          });

          const entryData = {
            valueString: field.valueString,
            valueBool: field.valueBool,
            valueDate: field.valueDate,
            valueNumber: +field.valueNumber,
            valueKeywords: field.valueKeywords,
            valueObjects: field.valueObjects,
          };

          const dataResult = await processDataForCaisyDocumentField(
            entryData,
            fromStringToCaisyContentFieldType(field.contentTypeFieldType),
          );

          return {
            contentEntryId: field.contentEntryId,
            fieldData: {
              blueprintFieldId: validFieldId,
              documentFieldLocaleId: documentFieldLocaleID,
              data: dataResult,
              type: fromStringToCaisyBlueprintFieldType(field.contentTypeFieldType),
              blueprintFieldName: field.contentTypeFieldName,
            },
          };
        }),
      );

      // Convert array of results into a structure grouped by contentEntryId
      const groupedFieldsByDocumentId = fieldsByDocumentId.reduce((acc, item) => {
        (acc[item.contentEntryId] = acc[item.contentEntryId] || []).push(item.fieldData);
        return acc;
      }, {});

      const documentInputs = documentRows.map((doc) => {
        const validDocumentId = isUuid(doc.id) ? doc.id : generateUuidFromString(doc.id);
        const validBlueprintId = isUuid(doc.contentTypeId)
          ? doc.contentTypeId
          : generateUuidFromString(doc.contentTypeId);
        return {
          documentId: validDocumentId,
          blueprintId: validBlueprintId,
          title: doc.title,
          previewImageUrl: doc.previewImageUrl,
          statusId: denormalizeCaisyContentEntryStatus(doc.status),
          projectId: projectId,
          blueprintVariant: denormalizeCaisyContentTypeVariant(doc.contentTypeVariant),
          fields: groupedFieldsByDocumentId[doc.id] || [],
        };
      });
      documentInputs.forEach((documentInput) => {
        blueprintChangeSet.forEach((blueprintSet) => {
          if (blueprintSet.sourceBlueprintId === documentInput.blueprintId) {
            documentInput.blueprintId = blueprintSet.targetBlueprintId;
          }
        });
        documentInput.fields.forEach((field) => {
          blueprintChangeSet.forEach((blueprintSet) => {
            blueprintSet.fields.forEach((fieldSet) => {
              if (field.blueprintFieldId === fieldSet.sourceBlueprintFieldId) {
                field.blueprintFieldId = fieldSet.targetBlueprintFieldId;
              }
            });
          });
        });
      });

      await submitDocumentChanges(documentInputs, sdk, projectId);

      pageIndex++;
    }
  } catch (error) {
    console.error("Error fetching or importing documents:", error);
    onError?.({ error, step: "fetchDocuments", meta: {} });
  }
}

async function fetchDocumentFieldsByDocumentIds(documentIds: string[]): Promise<any[]> {
  const documentFieldRows = db
    .select()
    .from(contentEntryField)
    .where(inArray(contentEntryField.contentEntryId, documentIds))
    .execute();
  return documentFieldRows;
}

async function submitDocumentChanges(documentInputs, sdk, projectId) {
  const result = await sdk.PutManyDocuments({
    input: {
      projectId,
      documentInputs,
    },
  });

  if (result.PutManyDocuments.errors.length > 0) {
    console.error("Failed to import documents:", result.PutManyDocuments.errors);
  } else {
    console.log("Successfully imported all documents.");
  }
}

export const importCaisyDocuments = async ({ sdk, projectId, onError, onProgress }: CaisyRunOptions): Promise<void> => {
  await fetchDocumentsFromDatabase({ sdk, projectId, onError, onProgress });
};
