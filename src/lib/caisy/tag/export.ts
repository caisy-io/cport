import { ReferenceType, TagResponse, initSdk } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { z } from "zod";
import { tagSchema } from "../../common/zod/tag";
import { writeTag } from "../../common/writer/tag";

export const paginateTags = async ({
  sdk,
  projectId,
  after,
  onProgress,
  onError,
}: CaisyRunOptions & { after: string | null }) => {
  const allTagsResult = await sdk.GetManyTags({
    input: {
      projectId,
      paginationArguments: {
        after,
      },
      filter: {
        referenceType: ReferenceType.Blueprint,
      },
    },
  });

  const pageInfo = allTagsResult.GetManyTags?.connection?.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage ?? false;
  const endCursor = pageInfo?.endCursor;

  const edges = allTagsResult.GetManyTags?.connection?.edges;
  if (edges) {
    await Promise.allSettled(
      edges.map(async edge => {
        const tagNode = edge?.node;
        if (tagNode) {
          await writeTag(normalizeCaisyTag(tagNode)).catch(e => {
            onError({ step: "tag", error: e, meta: tagNode });
          });
        }
      }),
    );
  }

  if (hasNextPage) {
    await paginateTags({ onError, onProgress, sdk, projectId, after: endCursor ?? null });
  } else {
    onProgress({ step: "tag", value: 100 });
  }
};

export const exportCaisyTags = async ({ sdk, projectId, onError, onProgress }: CaisyRunOptions): Promise<void> => {
  await paginateTags({ sdk, projectId, onError, onProgress, after: null });
};

export const normalizeCaisyTag = (tag: TagResponse): z.infer<typeof tagSchema> => {
  return {
    id: tag.tagId ?? "",
    name: tag.name ?? "",
    color: tag.color ?? undefined,
    referenceType: tag.referenceType?.toString(),
  };
};
