import { CaisyRunOptions } from "../provider";
import { normalizeCaisyContentEntry } from "./normalize";
import { writeContentEntry } from "../../common/writer/content-entry";
import { get } from "http";
import { BlueprintPaginationResult } from "../content-type/export";
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

  const hasNextPage = allDocumentsResult.GetManyDocuments.connection.pageInfo.hasNextPage;
  const endCursor = allDocumentsResult.GetManyDocuments.connection.pageInfo.endCursor;

  await Promise.all(
    allDocumentsResult.GetManyDocuments.connection.edges.map(async (document) => {
      const contentEntry = normalizeCaisyContentEntry(document.node, blueprintDetailsMap);
      // console.log("contentType", JSON.stringify(contentType, null, 2));
      await writeContentEntry(contentEntry, blueprintDetailsMap);
      // await ().catch((e) => {
      //   onError({ step: "tag", error: e, meta: tag.node });
      // });
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
};
