import { initSdk } from "@caisy/sdk";
import fs from "fs";

export async function exportData(
  accessToken: string,
  projectId: string,
  inputPath: string
): Promise<void> {
  const sdk = initSdk({ token: accessToken });

}
