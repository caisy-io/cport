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
  const blueprintInputs: BlueprintUpsertInputInput[] = [];
  const blueprintRows = await db.select().from(contentType).execute();
  const blueprintGroupRows = await db.select().from(contentTypeGroup).execute();
  const blueprintFieldRows = await db.select().from(contentTypeField).execute();

  // Map fields by group ID for faster lookup
  const fieldsByGroupId = blueprintFieldRows.reduce((acc, fieldRow) => {
    (acc[fieldRow.groupId] = acc[fieldRow.groupId] || []).push({
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
    return acc;
  }, {});

  // Generate blueprint inputs
  blueprintRows.forEach((row) => {
    const blueprintGroupInputs = blueprintGroupRows.map((groupRow) => ({
      blueprintGroupId: groupRow.id,
      name: groupRow.name,
      fields: fieldsByGroupId[groupRow.id] || [],
    }));

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
      title: row.title,
    });
  });

  try {
    const result = await sdk.PutManyBlueprints({
      input: {
        projectId,
        blueprintInputs,
      },
    });
    if (result.PutManyBlueprints.errors.length > 0) {
      console.error("Failed to import blueprints:", result.PutManyBlueprints.errors);
      result.PutManyBlueprints.errors.forEach((error) => {
        console.error("Error:", error.errorMessage);
        console.error("ID:", error.blueprintId);
      });
    } else {
      console.log("Successfully imported all blueprints.");
    }
  } catch (error) {
    console.error("Failed to import blueprints due to an unexpected error:", error);
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
