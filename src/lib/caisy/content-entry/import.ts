import { db } from "../../common/db";
import {
  initSdk,
  PutManyDocumentFieldLocalesRequestInput,
  DocumentFieldLocaleUpsertInputInput,
  DocumentWithFieldsInput,
  ReferenceType,
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
} from "./normalize";
import { time } from "console";

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

  documentRows.forEach((row) => {
    documentInputs.push({
      documentId: row.id,
      blueprintId: row.contentTypeId,
      title: row.title,
      previewImageUrl: row.previewImageUrl,
      statusId: denormalizeCaisyContentEntryStatus(row.status),
      projectId: projectId,
      blueprintVariant: denormalizeCaisyContentTypeVariant(row.contentTypeVariant),
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
