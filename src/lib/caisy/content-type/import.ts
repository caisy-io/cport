import { db } from "../../common/db";
import { BlueprintUpsertInputInput, PutManyBlueprintsResponse, BlueprintFieldType } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { contentType, contentTypeField, contentTypeGroup } from "../../common/schema";
import {
  denormalizeCaisyContentTypeVariant,
  denormalizeCaisyFieldOptions,
  denormalizeCaisyFieldType,
} from "./normalize";
import { isUuid, generateUuidFromString } from "../../common/writer/content-entry";
import { sql } from "drizzle-orm";

let blueprintChangeSet: PutManyBlueprintsResponse["changeSet"] = [];

// Export the variable
export { blueprintChangeSet };

export function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^[a-z]/, char => char.toUpperCase());
}

export async function ensureBlueprintNamingConvention(): Promise<void> {
  console.log("Starting blueprint naming convention enforcement...");

  try {
    const contentTypes = await db.select().from(contentType).execute();

    // Disable foreign key constraints globally
    await db.run(sql`PRAGMA foreign_keys = OFF`);

    for (const ct of contentTypes) {
      const currentId = ct.id;
      const currentName = ct.name;
      const pascalCaseName = toPascalCase(currentName);
      const pascalCaseId = toPascalCase(currentId);

      if (currentName !== pascalCaseName || currentId !== pascalCaseId) {
        console.log(`Converting: ID "${currentId}" -> "${pascalCaseId}", name "${currentName}" -> "${pascalCaseName}"`);

        // Run separate statements for this content type
        await db.run(
          sql.raw(
            `UPDATE content_entry SET content_type_id = '${pascalCaseId}' WHERE content_type_id = '${currentId}'`,
          ),
        );
        await db.run(
          sql.raw(
            `UPDATE content_type_group SET content_type_id = '${pascalCaseId}' WHERE content_type_id = '${currentId}'`,
          ),
        );
        await db.run(
          sql.raw(
            `UPDATE content_type_field SET content_type_id = '${pascalCaseId}' WHERE content_type_id = '${currentId}'`,
          ),
        );
        await db.run(
          sql.raw(
            `UPDATE content_type SET id = '${pascalCaseId}', name = '${pascalCaseName}' WHERE id = '${currentId}'`,
          ),
        );
      }
    }

    // Re-enable foreign key constraints
    await db.run(sql`PRAGMA foreign_keys = ON`);

    console.log("Blueprint naming convention enforcement completed successfully.");
  } catch (error) {
    console.error("Error enforcing blueprint naming convention:", error);
    throw error;
  }
}

async function fetchBlueprintsFromDatabase({ sdk, projectId, onProgress, onError }: CaisyRunOptions): Promise<void> {
  const blueprintInputs: BlueprintUpsertInputInput[] = [];
  const blueprintRows = await db.select().from(contentType).execute();
  const blueprintGroupRows = await db.select().from(contentTypeGroup).execute();
  const blueprintFieldRows = await db.select().from(contentTypeField).execute();

  // Map fields by group ID for faster lookup
  const fieldsByGroupId = blueprintFieldRows.reduce(
    (acc: Record<string, any>, fieldRow) => {
      const validFieldId = isUuid(fieldRow.id) ? fieldRow.id : generateUuidFromString(fieldRow.id);
      const validFieldGroupId = isUuid(fieldRow.groupId) ? fieldRow.groupId : generateUuidFromString(fieldRow.groupId);
      const validBlueprintId = isUuid(fieldRow.contentTypeId)
        ? fieldRow.contentTypeId
        : generateUuidFromString(fieldRow.contentTypeId);

      const fieldType = denormalizeCaisyFieldType(fieldRow.type);
      const options = denormalizeCaisyFieldOptions(fieldRow.options, fieldRow.type, blueprintRows);

      const groupId = fieldRow.groupId;
      if (!acc[groupId]) {
        acc[groupId] = [];
      }
      acc[groupId].push({
        blueprintFieldId: validFieldId,
        name: fieldRow.name,
        type: fieldType,
        blueprintGroupId: validFieldGroupId,
        blueprintId: validBlueprintId,
        description: fieldRow.description,
        system: fieldRow.system,
        options: options,
        title: fieldRow.title,
      });
      return acc;
    },
    {} as Record<string, any>,
  );

  // Map groups by blueprint ID for correct blueprint association
  const groupsByBlueprintId = blueprintGroupRows.reduce(
    (acc: Record<string, any>, groupRow) => {
      const validGroupId = isUuid(groupRow.id) ? groupRow.id : generateUuidFromString(groupRow.id);
      const contentTypeId = groupRow.contentTypeId;
      if (!acc[contentTypeId]) {
        acc[contentTypeId] = [];
      }
      acc[contentTypeId].push({
        blueprintGroupId: validGroupId,
        name: groupRow.name,
        fields: fieldsByGroupId[groupRow.id] || [],
      });
      return acc;
    },
    {} as Record<string, any>,
  );

  // Generate blueprint inputs using mapped groups
  blueprintRows.forEach(row => {
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
  try {
    const result = await sdk.PutManyBlueprints({
      input: {
        projectId,
        blueprintInputs,
      },
    });
    blueprintChangeSet = result.PutManyBlueprints?.changeSet || [];
    if (result.PutManyBlueprints?.errors && result.PutManyBlueprints.errors.length > 0) {
      console.error("Failed to import blueprints:", result.PutManyBlueprints.errors);
      result.PutManyBlueprints.errors.forEach(error => {
        if (error) {
          console.error("Error:", error.errorMessage);
          console.error("ID:", error.blueprintId);
        }
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
