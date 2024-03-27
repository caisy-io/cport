import { CaisyRunOptions } from "../provider";
import { normalizeCaisyContentType } from "./normalize";
import { writeContentType } from "../../common/writer/content-type";

export interface BlueprintPaginationResult {
  blueprintMap: Map<string, string>;
  blueprintFieldNameMap: Map<string, string>;
  blueprintFieldTypeMap: Map<string, string>;
}

export const paginateBlueprints = async ({
  sdk,
  projectId,
  after,
  onProgress,
  onError,
}: CaisyRunOptions & { after: string | null }): Promise<BlueprintPaginationResult> => {
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

  const blueprintMap = new Map<string, string>();
  const blueprintFieldNameMap = new Map<string, string>();
  const blueprintFieldTypeMap = new Map<string, string>();

  await Promise.all(
    allTagsResult.GetManyBlueprints.connection.edges.map(async (blueprint) => {
      const contentType = normalizeCaisyContentType(blueprint.node);
      blueprint.node.groups.forEach((group) => {
        group.fields.forEach((field) => {
          blueprintFieldNameMap.set(field.blueprintFieldId, field.name);
          blueprintFieldTypeMap.set(field.blueprintFieldId, field.type);
        });
      });
      blueprintMap.set(contentType.id, contentType.variant);
      // console.log("contentType", JSON.stringify(contentType, null, 2));
      await writeContentType(contentType);
      // await ().catch((e) => {
      //   onError({ step: "tag", error: e, meta: tag.node });
      // });
    }),
  );

  if (hasNextPage) {
    const nextPageMap = await paginateBlueprints({ onError, onProgress, sdk, projectId, after: endCursor });
    nextPageMap.blueprintMap.forEach((variant, id) => blueprintMap.set(id, variant));
    nextPageMap.blueprintFieldNameMap.forEach((name, id) => blueprintFieldNameMap.set(id, name));
    nextPageMap.blueprintFieldTypeMap.forEach((type, id) => blueprintFieldTypeMap.set(id, type));
  } else {
    onProgress({ step: "content-type", value: 100 });
  }

  return {
    blueprintMap,
    blueprintFieldNameMap,
    blueprintFieldTypeMap,
  };
};

export const exportCaisyContentTypes = async ({
  sdk,
  projectId,
  onError,
  onProgress,
}: CaisyRunOptions): Promise<BlueprintPaginationResult> => {
  return await paginateBlueprints({ sdk, projectId, onError, onProgress, after: null });
};
