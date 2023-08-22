import * as fs from "fs";
import * as path from "path";
import { initSdk, DocumentWithFieldsInput, DocumentFieldInput } from "@caisy/sdk";
import { BlueprintUpsertInputInput, BlueprintVariant, BlueprintGroupInputInput, BlueprintFieldInputInput, BlueprintFieldType, BlueprintFieldOptionsInput } from "../types";
import { time } from "console";
import { title } from "process";


export async function readDocumentsFromContentful(documentsPath: string): Promise<any> {
    try {
        const filenames = fs.readdirSync(documentsPath);
        const jsonFiles = filenames.filter((filename) => filename.endsWith(".json"));

        const documents = jsonFiles.map((filename) => {
            const filePath = path.join(documentsPath, filename);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(fileContent);
        });
        let test: DocumentWithFieldsInput[] = new Array(documents.length);
        for (let i = 0; i < documents.length; i++) {
            let document = documents[i];

            let testField: DocumentFieldInput[] = new Array(document.fields.length);
            for (let j = 0; j < document.fields.length; j++) {
                let field = document.fields[j];

            }

            test[i] = {

            };
        }
        documents.forEach((blueprint: BlueprintUpsertInputInput) => {
            delete blueprint.createdAt;
            delete blueprint.updatedAt;
        });
        return test;
    } catch (error) {
        console.error("❌ Error reading documents:", error);
        return [];
    }
}
