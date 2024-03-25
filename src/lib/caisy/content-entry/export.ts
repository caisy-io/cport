import { CaisyRunOptions } from "../provider";
import { normalizeCaisyContentType } from "./normalize";
import { writeContentEntry } from "../../common/writer/content-entry";

export const paginateDocuments = async ({
  sdk,
  projectId,
  after,
  onProgress,
  onError,
}: CaisyRunOptions & { after: string | null }) => {
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
    allDocumentsResult.GetManyDocuments.connection.edges.map(async (blueprint) => {
      const contentType = normalizeCaisyContentType(blueprint.node);
      // console.log("contentType", JSON.stringify(contentType, null, 2));
      await writeContentType(contentType);
      // await ().catch((e) => {
      //   onError({ step: "tag", error: e, meta: tag.node });
      // });
    }),
  );

  if (hasNextPage) {
    await paginateBlueprints({ onError, onProgress, sdk, projectId, after: endCursor });
  } else {
    onProgress({ step: "content-type", value: 100 });
  }
};

export const exportCaisyContentTypes = async ({
  sdk,
  projectId,
  onError,
  onProgress,
}: CaisyRunOptions): Promise<void> => {
  await paginateBlueprints({ sdk, projectId, onError, onProgress, after: null });
};
