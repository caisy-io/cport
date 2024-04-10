import { CaisyRunOptions } from "../provider";
import { normalizeCaisyContentEntry } from "./normalize";
import {
  writeContentEntryDraft,
  writeContentEntryPublished,
  insertContentEntryFields,
} from "../../common/writer/content-entry";
import { BlueprintPaginationResult } from "../content-type/export";

import { GetDocumentMode } from "@caisy/sdk";
interface ExtendedCaisyRunOptions extends CaisyRunOptions {
  blueprintDetailsMap: BlueprintPaginationResult;
}

export const paginateDocuments = async ({
  sdk,
  projectId,
  after,
  onProgress,
  onError,
  blueprintDetailsMap,
}: ExtendedCaisyRunOptions & { after: string | null }) => {
  const allDocumentsResult = await sdk.GetManyDocuments({
    input: {
      projectId,
      paginationArguments: {
        after,
      },
    },
  });

  const allPublishedDocumentsResult = await sdk.GetManyDocuments({
    input: {
      projectId,
      paginationArguments: {
        after,
      },
      requestMode: GetDocumentMode.GetDocumentRequestModePublished,
    },
  });

  const hasNextPage = allDocumentsResult.GetManyDocuments.connection.pageInfo.hasNextPage;
  const endCursor = allDocumentsResult.GetManyDocuments.connection.pageInfo.endCursor;

  await Promise.all(
    allDocumentsResult.GetManyDocuments.connection.edges.map(async (document) => {
      const contentEntry = normalizeCaisyContentEntry(document.node, blueprintDetailsMap);
      await writeContentEntryDraft(contentEntry, blueprintDetailsMap);
    }),
  );

  await Promise.all(
    allPublishedDocumentsResult.GetManyDocuments.connection.edges.map(async (document) => {
      const contentEntry = normalizeCaisyContentEntry(document.node, blueprintDetailsMap);
      await writeContentEntryPublished(contentEntry, blueprintDetailsMap);
    }),
  );

  if (hasNextPage) {
    await paginateDocuments({
      onError,
      onProgress,
      sdk,
      projectId,
      after: endCursor,
      blueprintDetailsMap,
    });
  } else {
    onProgress({ step: "content-entry", value: 100 });
  }
};

export const exportCaisyContentEntries = async ({
  sdk,
  projectId,
  onError,
  onProgress,
  blueprintDetailsMap,
}: ExtendedCaisyRunOptions): Promise<void> => {
  await paginateDocuments({
    sdk,
    projectId,
    onError,
    onProgress,
    blueprintDetailsMap: blueprintDetailsMap,
    after: null,
  });
  await insertContentEntryFields();
};
