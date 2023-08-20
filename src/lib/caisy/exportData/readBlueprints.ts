import * as fs from "fs";
import * as path from "path";
import { BlueprintUpsertInputInput, BlueprintVariant, BlueprintGroupInputInput, BlueprintFieldInputInput, BlueprintFieldType, BlueprintFieldOptionsInput } from "../types";
import { time } from "console";
import { title } from "process";

export async function readBlueprints(blueprintsPath: string): Promise<any> {
  try {
    const filenames = fs.readdirSync(blueprintsPath);
    const jsonFiles = filenames.filter((filename) => filename.endsWith(".json"));

    const blueprints = jsonFiles.map((filename) => {
      const filePath = path.join(blueprintsPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    });
    console.log("blueprints", blueprints[0].fields);
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

export async function readBlueprints2(blueprintsPath: string): Promise<any> {
  try {
    const filenames = fs.readdirSync(blueprintsPath);
    const jsonFiles = filenames.filter((filename) => filename.endsWith(".json"));

    const blueprints = jsonFiles.map((filename) => {
      const filePath = path.join(blueprintsPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    });
    let test: BlueprintUpsertInputInput[] = new Array(blueprints.length);
    for (let i = 0; i < blueprints.length; i++) {
      let blueprint = blueprints[i];
      console.log("\nBLUEPRINT_SINGLE: ", blueprint);
      let blueprintType = BlueprintVariant.BlueprintVariantDocument
      if (blueprint.sys.type !== "ContentType") {
        console.log("\nShould check the blueprint Type again (Not Document type)");
      }
      let testField: BlueprintFieldInputInput[] = new Array(blueprint.fields.length);
      for (let j = 0; j < blueprint.fields.length; j++) {
        let field = blueprint.fields[j];
        let fieldType = BlueprintFieldType.BlueprintFieldTypeString;
        if (field.type === "Link") {
          fieldType = BlueprintFieldType.BlueprintFieldTypeFile;
        }
        let options: BlueprintFieldOptionsInput = {
          required: field.required,
          localized: field.localized,
          disableInUi: field.disabled,
          disableInApi: field.disabled,
        };
        testField[j] = {
          name: field.name,
          description: field.description,
          system: false,
          type: fieldType,
        };
      }
      let group: BlueprintGroupInputInput[] = new Array(1);
      group[0] = {
        name: blueprint.name,
        fields: testField,
      }
      test[i] = {
        name: blueprint.name,
        title: blueprint.displayField,
        description: blueprint.description,
        variant: blueprintType,
        tagIds: null,
        system: false,
        previewImageUrl: null,
        single: false,
        exposeMutations: true,
        groups: group,
      };
      console.log("\nTEST: : ", test);
    }
    blueprints.forEach((blueprint: BlueprintUpsertInputInput) => {
      delete blueprint.createdAt;
      delete blueprint.updatedAt;
    });
    console.log("TEST BLUEPRINTS: ", test);
    return test;
  } catch (error) {
    console.error("❌ Error reading blueprints:", error);
    return [];
  }
}

