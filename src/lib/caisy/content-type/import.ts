import { db } from "../../common/db";
import {
  initSdk,
  PutManyBlueprintsRequestInput,
  BlueprintUpsertInputInput,
  BlueprintGroupInputInput,
  BlueprintFieldInputInput,
  BlueprintFieldOptionsInput,
  ReferenceType,
} from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { contentType, contentTypeField, contentTypeGroup } from "../../common/schema";
import {
  denormalizeCaisyContentTypeVariant,
  denormalizeCaisyFieldOptions,
  denormalizeCaisyFieldType,
} from "./normalize";

async function fetchBlueprintsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  let blueprints: PutManyBlueprintsRequestInput;
  let blueprintInputs: BlueprintUpsertInputInput[] = [];
  let blueprintGroupInputs: BlueprintGroupInputInput[] = [];
  let blueprintFieldInputs: BlueprintFieldInputInput[] = [];
  const blueprintRows = await db.select().from(contentType).execute();
  const blueprintGroupRows = await db.select().from(contentTypeGroup).execute();
  const blueprintFieldRows = await db.select().from(contentTypeField).execute();

  blueprintRows.forEach((row) => {
    blueprintGroupInputs = [];
    blueprintGroupRows.forEach((groupRow) => {
      blueprintGroupInputs.push({
        blueprintGroupId: groupRow.id,
        name: groupRow.name,
      });
    });

    blueprintGroupInputs.forEach((groupRow) => {
      blueprintFieldInputs = [];
      blueprintFieldRows.forEach((fieldRow) => {
        if (fieldRow.groupId === groupRow.blueprintGroupId) {
          blueprintFieldInputs.push({
            blueprintFieldId: fieldRow.id,
            name: fieldRow.name,
            type: denormalizeCaisyFieldType(fieldRow.type),
            blueprintGroupId: fieldRow.groupId,
            blueprintId: fieldRow.contentTypeId,
            description: fieldRow.description,
            system: fieldRow.system,
            options: denormalizeCaisyFieldOptions(fieldRow.options),
            title: fieldRow.title,
          });
        }
      });
      groupRow.fields = blueprintFieldInputs;
    });
    blueprintInputs.push({
      blueprintId: row.id,
      name: row.name,
      variant: denormalizeCaisyContentTypeVariant(row.variant),
      groups: blueprintGroupInputs,
      description: row.description,
      exposeMutations: row.exposeMutations,
      previewImageUrl: row.previewImageUrl,
      single: row.single,
      system: row.system,
      // tagIds: row.tagIds,
      title: row.title,
    });
  });
  const allBlueprintsResult = await sdk.PutManyBlueprints({
    input: {
      projectId,
      blueprintInputs: blueprintInputs,
    },
  });
  if (allBlueprintsResult.PutManyBlueprints.errors.length > 0) {
    console.error(`Failed to import blueprints: ${allBlueprintsResult.PutManyBlueprints.errors}`);
  } else {
    console.log(`Successfully imported blueprints.`);
  }
}

export const importCaisyBlueprints = async ({
  sdk,
  projectId,
  onError,
  onProgress,
}: CaisyRunOptions): Promise<void> => {
  await fetchBlueprintsFromDatabase({ sdk, projectId, onError, onProgress });
};
