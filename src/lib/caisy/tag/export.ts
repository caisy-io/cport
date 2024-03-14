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

  const hasNextPage = allTagsResult.GetManyTags.connection.pageInfo.hasNextPage;
  const endCursor = allTagsResult.GetManyTags.connection.pageInfo.endCursor;

  await Promise.allSettled(
    allTagsResult.GetManyTags.connection.edges.map(async (tag) => {
      await writeTag(normalizeCaisyTag(tag.node)).catch((e) => {
        onError({ step: "tag", error: e, meta: tag.node });
      });
    }),
  );

  if (hasNextPage) {
    await paginateTags({ onError, onProgress, sdk, projectId, after: endCursor });
  } else {
    onProgress({ step: "tag", value: 100 });
  }
};

export const exportCaisyTags = async ({ sdk, projectId, onError, onProgress }: CaisyRunOptions): Promise<void> => {
  await paginateTags({ sdk, projectId, onError, onProgress, after: null });
};

export const normalizeCaisyTag = (tag: TagResponse): z.infer<typeof tagSchema> => {
  return {
    id: tag.tagId,
    name: tag.name,
    color: tag.color,
    referenceType: tag.referenceType,
  };
};
