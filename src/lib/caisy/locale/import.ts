import { db } from "../../common/db";
import { DocumentFieldLocaleChangeSet } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { contentLocale } from "../../common/schema";
import { isUuid, generateUuidFromString } from "../../common/writer/content-entry";

let localeChangeSet: DocumentFieldLocaleChangeSet[] = [];
export { localeChangeSet };
let localeIDandApiNameMatchMap = new Map<string, string>();

async function fetchDocumentLocalesFromDatabase({
  sdk,
  projectId,
  onProgress,
  onError,
}: CaisyRunOptions): Promise<void> {
  try {
    const documentLocalesInputs = await fetchDocumentLocales();
    documentLocalesInputs.forEach((locale) => {
      localeIDandApiNameMatchMap.set(locale.apiName, locale.documentFieldLocaleId);
      if (locale.apiName === "en-US") {
        locale.apiName = "en";
      }
    });
    documentLocalesInputs.forEach((locale) => {
      if (locale.fallbackLocaleId !== null && locale.fallbackLocaleId !== "") {
        console.log("fallbackLocaleId: ", localeIDandApiNameMatchMap.get(locale.fallbackLocaleId));
        locale.fallbackLocaleId = localeIDandApiNameMatchMap.get(locale.fallbackLocaleId);
      }
    });
    console.log("inputs: ", documentLocalesInputs);
    const changeSet = await submitLocaleChanges(documentLocalesInputs, sdk, projectId);
    localeChangeSet = changeSet;
  } catch (error) {
    console.error("Error fetching or importing document locales:", error);
    onError?.({ error, step: "fetchDocumentLocales", meta: {} });
  }
}

async function fetchDocumentLocales() {
  const documentLocaleRows = await db.select().from(contentLocale).execute();
  documentLocaleRows.forEach((localeRow) => {
    if (!isUuid(localeRow.id)) {
      localeRow.id = generateUuidFromString(localeRow.id);
    }
  });
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

export const importCaisyDocumentLocales = async ({
  sdk,
  projectId,
  onError,
  onProgress,
}: CaisyRunOptions): Promise<void> => {
  await fetchDocumentLocalesFromDatabase({ sdk, projectId, onError, onProgress });
};
