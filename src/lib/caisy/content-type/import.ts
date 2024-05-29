import { db } from "../../common/db";
import {
  initSdk,
  PutManyBlueprintsRequestInput,
  BlueprintUpsertInputInput,
  BlueprintGroupInputInput,
  BlueprintFieldInputInput,
  BlueprintFieldOptionsInput,
  ReferenceType,
  PutManyBlueprintsResponse,
  PutManyBlueprintsResponseFragment,
} from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { contentType, contentTypeField, contentTypeGroup } from "../../common/schema";
import {
  denormalizeCaisyContentTypeVariant,
  denormalizeCaisyFieldOptions,
  denormalizeCaisyFieldType,
} from "./normalize";
import { isUuid, generateUuidFromString } from "../../common/writer/content-entry";

let blueprintChangeSet: PutManyBlueprintsResponse["changeSet"] = [];

// Export the variable
export { blueprintChangeSet };

async function fetchBlueprintsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  const blueprintInputs: BlueprintUpsertInputInput[] = [];
  const blueprintRows = await db.select().from(contentType).execute();
  const blueprintGroupRows = await db.select().from(contentTypeGroup).execute();
  const blueprintFieldRows = await db.select().from(contentTypeField).execute();

  // Map fields by group ID for faster lookup
  const fieldsByGroupId = blueprintFieldRows.reduce((acc, fieldRow) => {
    const validFieldId = isUuid(fieldRow.id) ? fieldRow.id : generateUuidFromString(fieldRow.id);
    const validFieldGroupId = isUuid(fieldRow.groupId) ? fieldRow.groupId : generateUuidFromString(fieldRow.groupId);
    const validBlueprintId = isUuid(fieldRow.contentTypeId)
      ? fieldRow.contentTypeId
      : generateUuidFromString(fieldRow.contentTypeId);
    (acc[fieldRow.groupId] = acc[fieldRow.groupId] || []).push({
      blueprintFieldId: validFieldId,
      name: fieldRow.name,
      type: denormalizeCaisyFieldType(fieldRow.type),
      blueprintGroupId: validFieldGroupId,
      blueprintId: validBlueprintId,
      description: fieldRow.description,
      system: fieldRow.system,
      options: denormalizeCaisyFieldOptions(fieldRow.options),
      title: fieldRow.title,
    });
    return acc;
  }, {});

  // Map groups by blueprint ID for correct blueprint association
  const groupsByBlueprintId = blueprintGroupRows.reduce((acc, groupRow) => {
    const validGroupId = isUuid(groupRow.id) ? groupRow.id : generateUuidFromString(groupRow.id);
    (acc[groupRow.contentTypeId] = acc[groupRow.contentTypeId] || []).push({
      blueprintGroupId: validGroupId,
      name: groupRow.name,
      fields: fieldsByGroupId[groupRow.id] || [],
    });
    return acc;
  }, {});

  // Generate blueprint inputs using mapped groups
  blueprintRows.forEach((row) => {
    const validBlueprintId = isUuid(row.id) ? row.id : generateUuidFromString(row.id);
    blueprintInputs.push({
      blueprintId: validBlueprintId,
      name: row.name,
      variant: denormalizeCaisyContentTypeVariant(row.variant),
      groups: groupsByBlueprintId[row.id] || [],
      description: row.description,
      exposeMutations: row.exposeMutations,
      previewImageUrl: row.previewImageUrl,
      single: row.single,
      system: row.system,
      title: row.title,
    });
  });
  const fs = require("fs");
  const logStream = fs.createWriteStream("logs.txt", { flags: "a" });
  try {
    const result = await sdk.PutManyBlueprints({
      input: {
        projectId,
        blueprintInputs,
      },
    });
    blueprintChangeSet = result.PutManyBlueprints.changeSet;
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
