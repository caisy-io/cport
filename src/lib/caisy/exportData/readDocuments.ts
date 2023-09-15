import * as fs from "fs";
import * as path from "path";
import { initSdk, DocumentWithFieldsInput, DocumentFieldInput, GetAllDocumentFieldLocaleQuery, GetManyBlueprintsQuery, BlueprintResponse } from "@caisy/sdk";
import { BlueprintUpsertInputInput, BlueprintVariant, BlueprintGroupInputInput, BlueprintFieldInputInput, BlueprintFieldType, BlueprintFieldOptionsInput } from "../types";
import { time } from "console";
import { title } from "process";


export async function readDocumentsFromContentful(documentsPath: string, getLocales: GetAllDocumentFieldLocaleQuery, getBlueprints: GetManyBlueprintsQuery, projectId: string): Promise<any> {
    try {
        const filenames = fs.readdirSync(documentsPath);
        const jsonFiles = filenames.filter((filename) => filename.endsWith(".json"));

        const documents = jsonFiles.map((filename) => {
            const filePath = path.join(documentsPath, filename);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(fileContent);
        });
        let test: DocumentWithFieldsInput[] = new Array(documents.length);
        let documentFieldLocleID = "";
        for (let i = 0; i < getLocales.GetAllDocumentFieldLocale.documentFieldLocales.length; i++) {
            let locale = getLocales.GetAllDocumentFieldLocale.documentFieldLocales[i];
            if (locale.apiName === "en") {
                documentFieldLocleID = locale.id;
            }
        }
        for (let i = 0; i < documents.length; i++) {
            let document = documents[i];
            let blueprintID = "";
            let blueprint: BlueprintResponse;
            for (let k = 0; k < getBlueprints.GetManyBlueprints.connection.edges.length; k++) {
                let currentBlueprint = getBlueprints.GetManyBlueprints.connection.edges[k].node;
                if (blueprint.name === document.sys.contentType.sys.id) {
                    blueprintID = blueprint.blueprintId;
                    blueprint = currentBlueprint;
                }
            }
            let testField: DocumentFieldInput[] = new Array(document.fields.length);
            for (let j = 0; j < document.fields.length; j++) {
                let field = document.fields[j];
                let blueprintField = blueprint.groups[0].fields[j];
                if (blueprintField === null) {
                    console.log("BlueprintField is null");
                    continue;
                }
                testField[j] = {
                    documentFieldLocaleId: documentFieldLocleID,
                    data: field[blueprintField.name],
                    blueprintFieldId: blueprintField.blueprintFieldId,
                    type: blueprintField.type,
                }
            }

            test[i] = {
                blueprintId: blueprintID,
                statusId: 2,
                fields: testField,
            };
        }
        documents.forEach((document: DocumentWithFieldsInput) => {
            delete document.createdAt;
            delete document.updatedAt;
        });
        return test;
    } catch (error) {
        console.error("❌ Error reading documents:", error);
        return [];
    }
}
