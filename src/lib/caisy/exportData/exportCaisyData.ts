import { initSdk } from "@caisy/sdk";
import { readBlueprints } from "../../utils/readBlueprints";
import { BlueprintUpsertInputInput } from "../types";

export async function exportCaisyData(
  accessToken: string,
  projectId: string,
  inputPath: string
): Promise<void> {
  // accessToken = "mBDi4i91ITJVflPppVudSFp2DLNBgqgI";
  // projectId = "48f4bfbf-46b2-4c13-aa55-478dc8e1b1a0";
  // inputPath = "./input";

  const sdk = initSdk({ token: accessToken });
  const blueprints: BlueprintUpsertInputInput[] = await readBlueprints(inputPath);


  for (const blueprint of blueprints) {
    const insertedBlueprint = await sdk.PutManyBlueprints({
      input: blueprint,
    });
  }

}
