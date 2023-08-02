import { initSdk } from "@caisy/sdk";
import { saveToJson } from "../importData/saveToJson";
import { BlueprintUpsertInputInput } from "../types";

async function getData(accessToken: string, projectId: string, query: string): Promise<Array<any>> {
  const sdk = initSdk({ token: accessToken });

  const data = await sdk[query]({ input: { projectId } });

  return data[query]?.connection?.edges;
}

export async function exportCaisyBlueprints(
  provider: string,
  accessToken: string,
  projectId: string,
  outputPath: string
): Promise<void> {
  const blueprints: BlueprintUpsertInputInput[] = await getData(
    accessToken,
    projectId,
    "GetManyBlueprints"
  );
  await saveToJson(blueprints, provider, projectId, "blueprints", outputPath);
  console.log("Blueprints imported");
}

export async function exportCaisyDocuments(
  provider: string,
  accessToken: string,
  projectId: string,
  outputPath: string
): Promise<void> {
  const documents = await getData(accessToken, projectId, "GetManyDocuments");
  await saveToJson(documents, provider, projectId, "documents", outputPath);
  console.log("Documents imported");
}
