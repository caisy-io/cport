import * as fs from "fs";
import * as path from "path";
import { BlueprintUpsertInputInput } from "../types";

export async function readBlueprints(blueprintsPath: string): Promise<any> {
  try {
    const filenames = fs.readdirSync(blueprintsPath);
    const jsonFiles = filenames.filter((filename) => filename.endsWith(".json"));

    const blueprints = jsonFiles.map((filename) => {
      const filePath = path.join(blueprintsPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    });

    blueprints.forEach((blueprint: BlueprintUpsertInputInput) => {
      delete blueprint.createdAt;
      delete blueprint.updatedAt;
    });

    return blueprints;
  } catch (error) {
    console.error("❌ Error reading blueprints:", error);
    return [];
  }
}
