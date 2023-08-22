import { initSdk, DocumentWithFieldsInput, DocumentFieldLocaleUpsertInputInput } from "@caisy/sdk";
import { readBlueprints, readBlueprintsFromContentful } from "../exportData/readBlueprints";
import { readLocales } from "../exportData/readLocales";

import { BlueprintUpsertInputInput } from "../types";
import { get } from "http";
// import { Document } from "../allTypes";


export async function importCaisyData(
  accessToken: string,
  projectId: string,
  userId: string,
  inputPath: string
): Promise<void> {

  // userId = "8ecf8def-af66-4897-982e-263d5f107be4";

  const sdk = initSdk({ token: accessToken });

  let getLocales = await sdk.GetAllDocumentFieldLocale({
    input: {
      projectId: projectId,

    }
  })
  let blueprintPath = inputPath + "/content-model";
  let localesPath = inputPath + "/locale";
  const blueprints: BlueprintUpsertInputInput[] = await readBlueprintsFromContentful(blueprintPath);
  const locales: DocumentFieldLocaleUpsertInputInput[] = await readLocales(localesPath, getLocales);
  // const documents: DocumentWithFieldsInput[] = await readDocumentsFromContentful(inputPath);

  try {
    const insertedBlueprints = await sdk.PutManyBlueprints({
      input: {
        blueprintInputs: blueprints,
        projectId: projectId,
        userId: userId,
      },
    });
    console.log("✅ Inserted blueprints:", insertedBlueprints);
  } catch (error) {
    console.error("❌ Error inserting blueprints:", error);
  }

  try {
    const insertedLocales = await sdk.PutManyDocumentFieldLocales({
      input: {
        projectId: projectId,
        dryRun: false,
        documentFieldLocaleInputs: locales,
      },
    });
    console.log("✅ Inserted locales:", insertedLocales);
  } catch (error) {
    console.error("❌ Error inserting locales:", error);
  }

  // try {
  //   const insertedDocuments = await sdk.PutManyDocuments({
  //     input: {
  //       documentInputs: documents,
  //       projectId: projectId,
  //     },
  //   });
  //   console.log("✅ Inserted documents:", insertedDocuments);
  // } catch (error) {
  //   console.error("❌ Error inserting documents:", error);
  // }
}
