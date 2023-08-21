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

export async function readBlueprintsFromContentful(blueprintsPath: string): Promise<any> {
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
      let blueprintType = BlueprintVariant.BlueprintVariantDocument
      if (blueprint.sys.type !== "ContentType") {
        console.log("\nShould check the blueprint Type again (Not Document type)");
      }
      let testField: BlueprintFieldInputInput[] = new Array(blueprint.fields.length);
      for (let j = 0; j < blueprint.fields.length; j++) {
        let field = blueprint.fields[j];
        let fieldType = BlueprintFieldType.BlueprintFieldTypeString;
        switch (field.type) {
          case "Boolean":
            fieldType = BlueprintFieldType.BlueprintFieldTypeBoolean;
            break;
          case "Link":
            fieldType = BlueprintFieldType.BlueprintFieldTypeFile;
            break;
          case "Array":
            fieldType = BlueprintFieldType.BlueprintFieldTypeSelect;
            break;
          case "RichText":
            fieldType = BlueprintFieldType.BlueprintFieldTypeRichtext;
            break;
          case "Date":
            fieldType = BlueprintFieldType.BlueprintFieldTypeDatetime;
            break;
          default:
            fieldType = BlueprintFieldType.BlueprintFieldTypeString;
        }

        let options: BlueprintFieldOptionsInput = {
          required: field.required,
          localized: field.localized,
          disableInUi: field.disabled,
          disableInApi: field.disabled,
        };
        let blueprintFieldName = field.id;
        testField[j] = {
          name: blueprintFieldName,
          title: field.name,
          description: field.description,
          system: false,
          type: fieldType,
        };
      }
      let group: BlueprintGroupInputInput[] = new Array(1);
      let blueprintName = blueprint.sys.id;
      group[0] = {
        name: blueprintName,
        fields: testField,
      }
      test[i] = {
        name: blueprintName,
        title: blueprint.name,
        description: blueprint.description,
        variant: blueprintType,
        tagIds: null,
        system: false,
        previewImageUrl: null,
        single: false,
        exposeMutations: true,
        groups: group,
      };
    }
    blueprints.forEach((blueprint: BlueprintUpsertInputInput) => {
      delete blueprint.createdAt;
      delete blueprint.updatedAt;
    });
    return test;
  } catch (error) {
    console.error("❌ Error reading blueprints:", error);
    return [];
  }
}
