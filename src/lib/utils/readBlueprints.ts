import * as fs from "fs";
import * as path from "path";
import { BlueprintUpsertInputInput } from "../caisy";

export async function readBlueprints(blueprintsPath: string): Promise<BlueprintUpsertInputInput[]> {
  try {
    const filenames = fs.readdirSync(blueprintsPath);
    const jsonFiles = filenames.filter(filename => filename.endsWith('.json'));

    const blueprints = jsonFiles.map(filename => {
      const filePath = path.join(blueprintsPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    });

    return blueprints;
  } catch (error) {
    console.error("❌ Error reading blueprints:", error);
    return [];
  }
}