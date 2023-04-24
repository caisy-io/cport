import { initSdk } from "@caisy/sdk";
import { readBlueprints } from "./readBlueprints";

import { BlueprintUpsertInputInput } from "../types";

export async function exportCaisyData(
  accessToken: string,
  projectId: string,
  inputPath: string
): Promise<void> {
  // accessToken = "mBDi4i91ITJVflPppVudSFp2DLNBgqgI";
  // projectId = "48f4bfbf-46b2-4c13-aa55-478dc8e1b1a0";
  // inputPath = "./input";
  const userId = "8ecf8def-af66-4897-982e-263d5f107be4";

  const sdk = initSdk({ token: accessToken });

  const blueprints: BlueprintUpsertInputInput[] = await readBlueprints(inputPath);

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
