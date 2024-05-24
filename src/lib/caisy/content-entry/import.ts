import { db } from "../../common/db";
import {
  initSdk,
  PutManyDocumentFieldLocalesRequestInput,
  DocumentFieldLocaleUpsertInputInput,
  DocumentWithFieldsInput,
  DocumentFieldInput,
  ReferenceType,
  DocumentFieldLocaleChangeSetFragmentDoc,
  DocumentFieldLocaleChangeSet,
} from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import {
  contentEntry,
  contentEntryField,
  contentLocale,
  contentType,
  contentTypeField,
  contentTypeGroup,
} from "../../common/schema";
import { sql, count, inArray } from "drizzle-orm";
import {
  denormalizeCaisyContentTypeVariant,
  denormalizeCaisyContentEntryStatus,
  denormalizeCaisyFieldEntry,
  fromStringToCaisyContentFieldType,
  fromStringToCaisyBlueprintFieldType,
} from "./normalize";
import { time } from "console";
import { processDataForCaisyDocumentField, ContentEntryFieldData } from "../../common/types/content-entry";

const PAGE_LIMIT = 100;

async function fetchDocumentsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  try {
    const documentLocalesInputs = await fetchDocumentLocales();
    const changeSet = await submitLocaleChanges(documentLocalesInputs, sdk, projectId);

    const totalDocumentsResult = await db.select({ count: count() }).from(contentEntry);
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
      const fieldsByDocumentId = documentFieldRows.reduce((acc, field) => {
        let documentFieldLocaleID = field.contentEntryFieldLocaleId;
        changeSet.forEach((changeSetRes) => {
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
        const fieldData = {
          blueprintFieldId: field.contentTypeFieldId,
          documentFieldLocaleId: documentFieldLocaleID,
          data: processDataForCaisyDocumentField(
            entryData,
            fromStringToCaisyContentFieldType(field.contentTypeFieldType),
          ),
          type: fromStringToCaisyBlueprintFieldType(field.contentTypeFieldType),
          blueprintFieldName: field.contentTypeFieldName,
        };

        (acc[field.contentEntryId] = acc[field.contentEntryId] || []).push(fieldData);
        return acc;
      }, {});

      const documentInputs = documentRows.map((doc) => ({
        documentId: doc.id,
        blueprintId: doc.contentTypeId,
        title: doc.title,
        previewImageUrl: doc.previewImageUrl,
        statusId: denormalizeCaisyContentEntryStatus(doc.status),
        projectId: projectId,
        blueprintVariant: denormalizeCaisyContentTypeVariant(doc.contentTypeVariant),
        fields: fieldsByDocumentId[doc.id] || [],
      }));
      await submitDocumentChanges(documentInputs, sdk, projectId);

      pageIndex++;
    }
  } catch (error) {
    console.error("Error fetching or importing documents:", error);
    onError?.({ error, step: "fetchDocuments", meta: {} });
  }
}

async function fetchDocumentLocales() {
  const documentLocaleRows = await db.select().from(contentLocale).execute();
  return documentLocaleRows.map((localeRow) => ({
    documentFieldLocaleId: localeRow.id,
    apiName: localeRow.apiName,
    allowEmptyRequired: localeRow.allowEmptyRequired,
    default: localeRow.default,
    disableEditing: localeRow.disableEditing,
    disableInResponse: localeRow.disableInResponse,
    fallbackLocaleId: localeRow.fallbackLocaleId,
    flag: localeRow.flag,
    title: localeRow.title,
  }));
}

async function fetchDocumentFieldsByDocumentIds(documentIds: string[]): Promise<any[]> {
  const documentFieldRows = db
    .select()
    .from(contentEntryField)
    .where(inArray(contentEntryField.contentEntryId, documentIds))
    .execute();
  return documentFieldRows;
}

async function submitLocaleChanges(documentLocalesInputs, sdk, projectId) {
  let changeSet: DocumentFieldLocaleChangeSet[] = [];
  const result = await sdk.PutManyDocumentFieldLocales({
    input: {
      projectId,
      documentFieldLocaleInputs: documentLocalesInputs,
    },
  });

  if (result.PutManyDocumentFieldLocales.errors.length > 0) {
    console.error("Failed to import document field locales:", result.PutManyDocumentFieldLocales.errors);
  } else {
    console.log("Successfully imported all document field locales.");
  }
  result.PutManyDocumentFieldLocales.changeSet.forEach((changeSetRes) => {
    changeSet.push(changeSetRes);
  });
  return changeSet;
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
