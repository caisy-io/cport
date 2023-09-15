import * as fs from "fs";
import * as path from "path";
import { initSdk, DocumentFieldLocaleUpsertInputInput, GetAllDocumentFieldLocaleQuery } from "@caisy/sdk";
import { time } from "console";
import { title } from "process";

export async function readLocales(localesPath: string, getLocales: GetAllDocumentFieldLocaleQuery): Promise<any> {
    try {
        const filenames = fs.readdirSync(localesPath);
        const jsonFiles = filenames.filter((filename) => filename.endsWith(".json"));

        const locales = jsonFiles.map((filename) => {
            const filePath = path.join(localesPath, filename);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(fileContent);
        });
        let test: DocumentFieldLocaleUpsertInputInput[] = new Array(locales.length);
        for (let i = 0; i < locales.length; i++) {
            let locale = locales[i];
            let localeName = transformLocaleCode(locale.code).language
            let flag = transformLocaleCode(locale.code).flag
            test[i] = {
                apiName: localeName,
                title: locale.name,
                allowEmptyRequired: false,
                default: locale.default,
                disableEditing: false,
                disableInResponse: false,
                flag: flag,
            };
            if (locale.fallbackCode !== null) {
                for (let j = 0; j < getLocales.GetAllDocumentFieldLocale.documentFieldLocales.length; j++) {
                    let getLocale = getLocales.GetAllDocumentFieldLocale.documentFieldLocales[j];
                    if (getLocale.apiName === transformLocaleCode(locale.fallbackCode).language) {
                        test[i].fallbackLocaleId = getLocale.id;
                    }
                }
            }
            if (localeName === "en") {
                for (let j = 0; j < getLocales.GetAllDocumentFieldLocale.documentFieldLocales.length; j++) {
                    let getLocale = getLocales.GetAllDocumentFieldLocale.documentFieldLocales[j];
                    if (getLocale.apiName === "en") {
                        test[i].documentFieldLocaleId = getLocale.id;
                    }
                }
            }
        }

        return test;
    } catch (error) {
        console.error("❌ Error reading locales:", error);
        return [];
    }
}

type LocaleParts = {
    language: string;
    flag?: string;
};

function transformLocaleCode(localeCode: string): LocaleParts {
    const parts = localeCode.split('-');
    const result: LocaleParts = {
        language: parts[0]
    };

    if (parts.length > 1) {
        result.flag = parts[1].toLowerCase();
    }

    return result;
}