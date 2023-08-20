import { initSdk } from "@caisy/sdk";
import { readBlueprints, readBlueprints2 } from "../exportData/readBlueprints";

import { BlueprintUpsertInputInput } from "../types";

export async function importCaisyData(
  accessToken: string,
  projectId: string,
  userId: string,
  inputPath: string
): Promise<void> {

  // userId = "8ecf8def-af66-4897-982e-263d5f107be4";

  const sdk = initSdk({ token: accessToken });

  const blueprints: BlueprintUpsertInputInput[] = await readBlueprints2(inputPath);

  try {
    const insertedBlueprints = await sdk.PutManyBlueprints({
      input: {
        blueprintInputs: blueprints,
        projectId: projectId,
        userId: userId,
      },
    });
    console.log("✅ Inserted blueprints:", insertedBlueprints);
  } catch (error) {
    console.error("❌ Error inserting blueprints:", error);
  }
}
