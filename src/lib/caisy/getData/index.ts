import { initSdk } from "@caisy/sdk";
import { saveToJson } from "../../utils/saveToJson";

async function getData(accessToken: string, projectId: string, query: string): Promise<Array<any>> {
  const sdk = initSdk({ token: accessToken });

  const data = await sdk[query]({ input: { projectId } });

  return data[query]?.connection?.edges;
}

export async function getBlueprints(
  accessToken: string,
  projectId: string,
  outputPath: string
): Promise<void> {
  const blueprints = await getData(accessToken, projectId, "GetManyBlueprints");
  await saveToJson(blueprints, projectId, "blueprints", outputPath);
}

export async function getDocuments(
  accessToken: string,
  projectId: string,
  outputPath: string
): Promise<void> {
  const documents = await getData(accessToken, projectId, "GetManyDocuments");
  await saveToJson(documents, projectId, "documents", outputPath);
}
