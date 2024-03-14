import { BlueprintResponse, ReferenceType, TagResponse, initSdk } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { normalizeCaisyContentType } from "./normalize";

export const paginateBlueprints = async ({
  sdk,
  projectId,
  after,
  onProgress,
  onError,
}: CaisyRunOptions & { after: string | null }) => {
  const allTagsResult = await sdk.GetManyBlueprints({
    input: {
      projectId,
      paginationArguments: {
        after,
      },
    },
  });

  const hasNextPage = allTagsResult.GetManyBlueprints.connection.pageInfo.hasNextPage;
  const endCursor = allTagsResult.GetManyBlueprints.connection.pageInfo.endCursor;

  await Promise.allSettled(
    allTagsResult.GetManyBlueprints.connection.edges.map(async (blueprint) => {
      const contentType = normalizeCaisyContentType(blueprint.node);
      console.log(` contentType`, JSON.stringify(contentType, null, 2));
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
