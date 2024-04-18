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
import {
  denormalizeCaisyContentTypeVariant,
  denormalizeCaisyContentEntryStatus,
  denormalizeCaisyFieldEntry,
  fromStringToCaisyContentFieldType,
  fromStringToCaisyBlueprintFieldType,
} from "./normalize";
import { time } from "console";
import { processDataForCaisyDocumentField, ContentEntryFieldData } from "../../common/types/content-entry";

async function fetchDocumentsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  const documentLocalesInputs: DocumentFieldLocaleUpsertInputInput[] = [];
  const documentInputs: DocumentWithFieldsInput[] = [];
  const documentLocaleRows = await db.select().from(contentLocale).execute();
  const documentRows = await db.select().from(contentEntry).execute();
  const documentFieldRows = await db.select().from(contentEntryField).execute();

  documentLocaleRows.forEach((localeRow) => {
    documentLocalesInputs.push({
      documentFieldLocaleId: localeRow.id,
      apiName: localeRow.apiName,
      allowEmptyRequired: localeRow.allowEmptyRequired,
      default: localeRow.default,
      disableEditing: localeRow.disableEditing,
      disableInResponse: localeRow.disableInResponse,
      fallbackLocaleId: localeRow.fallbackLocaleId,
      flag: localeRow.flag,
      title: localeRow.title,
    });
  });
  let changeSet: DocumentFieldLocaleChangeSet[] = [];
  try {
    const result = await sdk.PutManyDocumentFieldLocales({
      input: {
        projectId: projectId,
        documentFieldLocaleInputs: documentLocalesInputs,
      },
    });
    if (result.PutManyDocumentFieldLocales.errors.length > 0) {
      console.error("Failed to import document field locales:", result.PutManyDocumentFieldLocales.errors);
      result.PutManyDocumentFieldLocales.errors.forEach((error) => {
        console.error("Error:", error.errorMessage);
        console.error("ID:", error.documentFieldLocaleId);
      });
    } else {
      console.log("Successfully imported all document field locales.");
    }
    result.PutManyDocumentFieldLocales.changeSet.forEach((changeSetRes) => {
      changeSet.push(changeSetRes);
    });
  } catch (error) {
    console.error("Failed to import document field locales due to an unexpected error:", error);
  }

  const fieldsByDocumentId = documentFieldRows.reduce((acc, fieldRow) => {
    let entryData: ContentEntryFieldData = {
      valueString: undefined,
      valueBool: undefined,
      valueDate: undefined,
      valueNumber: undefined,
      valueKeywords: undefined,
      valueObjects: undefined,
    };
    let documentFieldLocaleID = fieldRow.contentEntryFieldLocaleId;
    changeSet.forEach((changeSetRes) => {
      if (changeSetRes.sourceDocumentFieldLocaleId === documentFieldLocaleID) {
        documentFieldLocaleID = changeSetRes.targetDocumentFieldLocaleId;
      }
    });
    entryData.valueString = fieldRow.valueString;
    entryData.valueBool = fieldRow.valueBool;
    entryData.valueDate = fieldRow.valueDate;
    entryData.valueNumber = +fieldRow.valueNumber;
    entryData.valueKeywords = fieldRow.valueKeywords;
    entryData.valueObjects = fieldRow.valueObjects;
    (acc[fieldRow.contentEntryId] = acc[fieldRow.contentEntryId] || []).push({
      blueprintFieldId: fieldRow.contentTypeFieldId,
      documentFieldLocaleId: documentFieldLocaleID,
      data: processDataForCaisyDocumentField(
        entryData,
        fromStringToCaisyContentFieldType(fieldRow.contentTypeFieldType),
      ),
      type: fromStringToCaisyBlueprintFieldType(fieldRow.contentTypeFieldType),
    });
    return acc;
  }, {});

  documentRows.forEach((row) => {
    documentInputs.push({
      documentId: row.id,
      blueprintId: row.contentTypeId,
      title: row.title,
      previewImageUrl: row.previewImageUrl,
      statusId: denormalizeCaisyContentEntryStatus(row.status),
      projectId: projectId,
      blueprintVariant: denormalizeCaisyContentTypeVariant(row.contentTypeVariant),
      fields: fieldsByDocumentId[row.id] || [],
    });
  });

  try {
    const result = await sdk.PutManyDocumentFieldLocales({
      input: {
        projectId: projectId,
        documentFieldLocaleInputs: documentLocalesInputs,
      },
    });
    if (result.PutManyDocumentFieldLocales.errors.length > 0) {
      console.error("Failed to import document field locales:", result.PutManyDocumentFieldLocales.errors);
      result.PutManyDocumentFieldLocales.errors.forEach((error) => {
        console.error("Error:", error.errorMessage);
        console.error("ID:", error.documentFieldLocaleId);
      });
    } else {
      console.log("Successfully imported all document field locales.");
    }
  } catch (error) {
    console.error("Failed to import document field locales due to an unexpected error:", error);
  }

  try {
    const result = await sdk.PutManyDocuments({
      input: {
        projectId: projectId,
        documentInputs: documentInputs,
      },
    });
    if (result.PutManyDocuments.errors.length > 0) {
      console.error("Failed to import documents:", result.PutManyDocuments.errors);
      result.PutManyDocuments.errors.forEach((error) => {
        console.error("Error:", error.errorMessage);
        console.error("ID:", error.documentId);
      });
    } else {
      console.log("Successfully imported all documents.");
    }
  } catch (error) {
    console.error("Failed to import documents due to an unexpected error:", error);
  }
}

export const importCaisyDocuments = async ({ sdk, projectId, onError, onProgress }: CaisyRunOptions): Promise<void> => {
  await fetchDocumentsFromDatabase({ sdk, projectId, onError, onProgress });
};
