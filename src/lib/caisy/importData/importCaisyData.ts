import { initSdk } from "@caisy/sdk";
import { saveToJson } from "./saveToJson";
import { BlueprintUpsertInputInput } from "../types";

async function getData(accessToken: string, projectId: string, query: string): Promise<Array<any>> {
  const sdk = initSdk({ token: accessToken });

  const data = await sdk[query]({ input: { projectId } });

  return data[query]?.connection?.edges;
}

export async function importCaisyBlueprints(
  accessToken: string,
  projectId: string,
  outputPath: string
): Promise<void> {
  const blueprints: BlueprintUpsertInputInput[] = await getData(
    accessToken,
    projectId,
    "GetManyBlueprints"
  );
  await saveToJson(blueprints, projectId, "blueprints", outputPath);
  console.log("✅ Inserted blueprints");
}

export async function importCaisyDocuments(
  accessToken: string,
  projectId: string,
  outputPath: string
): Promise<void> {
  const documents = await getData(accessToken, projectId, "GetManyDocuments");
  await saveToJson(documents, projectId, "documents", outputPath);
  console.log("✅ Inserted documents");
}
