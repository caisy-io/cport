import { db } from "../../common/db";
import { initSdk, TagUpsertInputInput, ReferenceType } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { tag } from "../../common/schema";
import { isUuid, generateUuidFromString } from "../../common/writer/content-entry";

async function fetchTagsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  let tags: TagUpsertInputInput[] = [];
  const rows = await db.select().from(tag).execute();
  rows.forEach((row) => {
    if (!isUuid(row.id)) {
      row.id = generateUuidFromString(row.id);
    }
    tags.push({
      tagId: row.id,
      name: row.name,
      color: row.color,
      referenceType: ReferenceType.Blueprint,
    });
  });
  const allTagsResult = await sdk.PutManyTags({
    input: {
      projectId,
      tagInputs: tags,
    },
  });
  if (allTagsResult.PutManyTags.errors.length > 0) {
    console.error(`Failed to import tags: ${allTagsResult.PutManyTags.errors}`);
  } else {
    console.log(`Successfully imported tags.`);
  }
}

export const importCaisyTags = async ({ sdk, projectId, onError, onProgress }: CaisyRunOptions): Promise<void> => {
  await fetchTagsFromDatabase({ sdk, projectId, onError, onProgress });
};
