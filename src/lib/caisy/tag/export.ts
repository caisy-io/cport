import { TagResponse, initSdk } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { z } from "zod";
import { tagSchema } from "../../common/zod/tag";
import { writeTag } from "../../common/writer/tag";

export const paginateTags = async (sdk: ReturnType<typeof initSdk>, projectId: string, after: string | null) => {
  const allTagsResult = await sdk.GetManyTags({
    input: {
      projectId,
      paginationArguments: {
        after,
      },
    },
  });

  const hasNextPage = allTagsResult.GetManyTags.connection.pageInfo.hasNextPage;
  const endCursor = allTagsResult.GetManyTags.connection.pageInfo.endCursor;

  await Promise.allSettled(
    allTagsResult.GetManyTags.connection.edges.map(async (tag) => {
      await writeTag(normalizeCaisyTag(tag.node));
    }),
  );

  if (hasNextPage) {
    await paginateTags(sdk, projectId, endCursor);
  }
};

export const exportCaisyTags = async ({ sdk, projectId }: CaisyRunOptions): Promise<void> => {
  await paginateTags(sdk, projectId, null);
};

export const normalizeCaisyTag = (tag: TagResponse): z.infer<typeof tagSchema> => {
  return tag;
};
