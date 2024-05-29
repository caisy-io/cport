import { db } from "../db";
import {
  contentLocale,
  contentEntry,
  contentEntryField,
  contentEntryFieldPublished,
  contentEntryFieldDraft,
} from "../schema";
import {
  ContentEntry,
  ContentEntryField,
  processDataForEntryField,
  processDataForContentfulEntryField,
} from "../types/content-entry";
import { contentLocaleSchema } from "../zod/content-entry";
import { InferInsertModel, and, sql, eq, isNull } from "drizzle-orm";
import { BlueprintPaginationResult } from "../../caisy/content-type/export";
import { ContentFieldNameMap } from "../../contentful/content-type/writeContentTypes";
import { createHash } from "crypto";

const assetUrls = new Set<string>();
export { assetUrls };
export const writeContentLocale = async (locale: InferInsertModel<typeof contentLocale>) => {
  const input = contentLocaleSchema.parse(locale) as InferInsertModel<typeof contentLocale>;

  const dbRes = await db
    .insert(contentLocale)
    .values(input)
    .returning({
      id: contentLocale.id,
      apiName: contentLocale.apiName,
      title: contentLocale.title,
      flag: contentLocale.flag,
      fallbackLocaleId: contentLocale.fallbackLocaleId,
      default: contentLocale.default,
      disableInResponse: contentLocale.disableInResponse,
      disableEditing: contentLocale.disableEditing,
      allowEmptyRequired: contentLocale.allowEmptyRequired,
    })
    .execute();

  return dbRes;
};

export const writeContentEntryDraft = async (
  contentEntryInput: ContentEntry,
  blueprintMaps: BlueprintPaginationResult,
) => {
  const contentEntryResult = await insertContentEntry(contentEntryInput);
  await insertDraftContentEntryFields(contentEntryInput.fields, contentEntryInput.documentId, blueprintMaps);
  return contentEntryResult;
};

export const writeContentEntryPublished = async (
  contentEntryInput: ContentEntry,
  blueprintMaps: BlueprintPaginationResult,
) => {
  const contentEntryResult = await insertContentEntry(contentEntryInput);
  await insertPublishedContentEntryFields(contentEntryInput.fields, contentEntryInput.documentId, blueprintMaps);
  return contentEntryResult;
};

export const insertContentEntry = async (contentEntryInput: ContentEntry) => {
  try {
    return await db
      .insert(contentEntry)
      .values({
        id: contentEntryInput.documentId,
        title: contentEntryInput.title,
        status: contentEntryInput.status,
        contentTypeId: contentEntryInput.blueprintId,
        contentTypeVariant: contentEntryInput.blueprintVariant,
        previewImageUrl: contentEntryInput.previewImageUrl,
      })
      .returning({
        id: contentEntry.id,
        title: contentEntry.title,
        status: contentEntry.status,
        contentTypeId: contentEntry.contentTypeId,
        contentTypeVariant: contentEntry.contentTypeVariant,
        previewImageUrl: contentEntry.previewImageUrl,
      })
      .onConflictDoNothing()
      .execute();
  } catch (err) {
    console.log(` insertContentEntry`);
    throw new Error(err);
  }
};

export const insertContentfulEntryField = async (
  fields: ContentEntryField[],
  documentID: string,
  draftContent: Number,
) => {
  try {
    for (const field of fields) {
      let contentEntryFieldData = await processDataForContentfulEntryField(field.data, field.type);
      // let contentTypeFieldName = blueprintMaps.blueprintFieldNameMap.get(field.blueprintFieldId) || "";
      let contentTypeFieldName = ContentFieldNameMap.get(field.blueprintFieldId) || "";
      if (contentTypeFieldName === "src" && contentEntryFieldData.valueObjects !== undefined) {
        const jsonObj = JSON.parse(contentEntryFieldData.valueObjects);

        const url: string = jsonObj.url;
        assetUrls.add(url);
      }

      await db
        .insert(contentEntryField)
        .values({
          id: `${documentID}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`,
          draftContent: draftContent,
          contentTypeFieldType: field.type,
          contentEntryId: documentID,
          contentTypeFieldId: field.blueprintFieldId,
          contentTypeFieldName: contentTypeFieldName,
          contentEntryFieldLocaleId: field.documentFieldLocaleId,
          valueString: contentEntryFieldData.valueString,
          valueBool: contentEntryFieldData.valueBool,
          valueKeywords: contentEntryFieldData.valueKeywords,
          valueDate: contentEntryFieldData.valueDate,
          valueNumber: contentEntryFieldData.valueNumber,
          valueObjects: contentEntryFieldData.valueObjects,
        } as any)
        .returning({
          id: contentEntryField.id,
          draftContent: contentEntryField.draftContent,
          contentTypeFieldType: contentEntryField.contentTypeFieldType,
          contentEntryId: contentEntryField.contentEntryId,
          contentTypeFieldId: contentEntryField.contentTypeFieldId,
          contentTypeFieldName: contentEntryField.contentTypeFieldName,
          contentEntryFieldLocaleId: contentEntryField.contentEntryFieldLocaleId,
          valueString: contentEntryField.valueString,
          valueBool: contentEntryField.valueBool,
          valueKeywords: contentEntryField.valueKeywords,
          valueDate: contentEntryField.valueDate,
          valueNumber: contentEntryField.valueNumber,
          valueObjects: contentEntryField.valueObjects,
        })
        .onConflictDoNothing()
        .execute();
    }
  } catch (err) {
    console.log(` insertContentEntryFields`);
    throw new Error(err);
  }
};

export const adjustContentfulContentEntryFields = async () => {
  try {
    const rawSQL = sql.raw(`
    DELETE FROM content_entry_field
    WHERE id IN (
        SELECT ce.id
        FROM content_entry_field ce
        INNER JOIN (
            SELECT
                content_entry_id,
                content_type_field_id,
                MAX(CASE WHEN l."default" THEN content_entry_field_locale_id ELSE NULL END) AS default_locale,
                COALESCE(value_string, 'DUMMY_STRING') as value_string,
                COALESCE(value_bool, 'DUMMY_BOOL') as value_bool,
                COALESCE(value_keywords, 'DUMMY_KEYWORDS') as value_keywords,
                COALESCE(value_date, '1970-01-01') as value_date,
                COALESCE(value_number, -9999) as value_number,
                COALESCE(value_objects, 'DUMMY_OBJECTS') as value_objects
            FROM content_entry_field
            INNER JOIN content_locale l ON content_entry_field.content_entry_field_locale_id = l.api_name
            GROUP BY content_entry_id, content_type_field_id, value_string, value_bool, value_keywords, value_date, value_number, value_objects
            HAVING COUNT(*) > 1
        ) dup ON ce.content_entry_id = dup.content_entry_id
            AND ce.content_type_field_id = dup.content_type_field_id
            AND COALESCE(ce.value_string, 'DUMMY_STRING') = dup.value_string
            AND COALESCE(ce.value_bool, 'DUMMY_BOOL') = dup.value_bool
            AND COALESCE(ce.value_keywords, 'DUMMY_KEYWORDS') = dup.value_keywords
            AND COALESCE(ce.value_date, '1970-01-01') = dup.value_date
            AND COALESCE(ce.value_number, -9999) = dup.value_number
            AND COALESCE(ce.value_objects, 'DUMMY_OBJECTS') = dup.value_objects
            AND ce.content_entry_field_locale_id != dup.default_locale
    );
`);

    try {
      await db.run(rawSQL);
      console.log("Adjust operation completed successfully.");
    } catch (err) {
      console.error("Error executing AdjustContentfulContentEntryFieldsWithDrizzle:", err);
      throw err;
    }
    const rawSQLDrop = sql.raw(`DROP TABLE content_entry_field_draft;`);
    try {
      await db.run(rawSQLDrop);
      console.log("Drop operation completed successfully.");
    } catch (err) {
      console.error("Error executing insertContentEntryFieldsWithDrizzle3:", err);
      throw err;
    }
    const rawSQLDrop2 = sql.raw(`DROP TABLE content_entry_field_published;`);
    try {
      await db.run(rawSQLDrop2);
      console.log("Drop operation2 completed successfully.");
    } catch (err) {
      console.error("Error executing insertContentEntryFieldsWithDrizzle4:", err);
      throw err;
    }
    console.log("Operations successful");
  } catch (err) {
    console.error("Error in insertContentEntryFields", err);
    throw err;
  }
};

export const insertContentEntryFields = async () => {
  try {
    const rawSQL = sql.raw(`
    INSERT INTO content_entry_field (id, draft_content, content_type_field_type, content_entry_id, content_type_field_id, content_type_field_name, content_entry_field_locale_id, value_string, value_bool, value_keywords, value_date, value_number, value_objects)
    SELECT temp.id, temp.draft_content, temp.content_type_field_type, temp.content_entry_id, temp.content_type_field_id, temp.content_type_field_name, temp.content_entry_field_locale_id, temp.value_string, temp.value_bool, temp.value_keywords, temp.value_date, temp.value_number, temp.value_objects
    FROM content_entry_field_draft temp
    WHERE NOT EXISTS (
      SELECT 1 FROM content_entry_field as main
      WHERE main.content_entry_id = temp.content_entry_id 
      AND main.content_type_field_id = temp.content_type_field_id 
      AND main.content_entry_field_locale_id = temp.content_entry_field_locale_id 
      AND COALESCE(main.value_string, 'DUMMY_STRING') = COALESCE(temp.value_string, 'DUMMY_STRING') 
      AND COALESCE(main.value_bool, -1) = COALESCE(temp.value_bool, -1) 
      AND COALESCE(main.value_keywords, 'DUMMY_KEYWORDS') = COALESCE(temp.value_keywords, 'DUMMY_KEYWORDS') 
      AND COALESCE(main.value_date, '1970-01-01') = COALESCE(temp.value_date, '1970-01-01') 
      AND COALESCE(main.value_number, -9999) = COALESCE(temp.value_number, -9999) 
      AND COALESCE(main.value_objects, 'DUMMY_OBJECTS') = COALESCE(temp.value_objects, 'DUMMY_OBJECTS')
    );
  `);

    try {
      await db.run(rawSQL);
      console.log("Insert operation completed successfully.");
    } catch (err) {
      console.error("Error executing insertContentEntryFieldsWithDrizzle:", err);
      throw err;
    }
    const rawSQL2 =
      sql.raw(` INSERT INTO content_entry_field (id, draft_content, content_type_field_type, content_entry_id, content_type_field_id, content_type_field_name, content_entry_field_locale_id, value_string, value_bool, value_keywords, value_date, value_number, value_objects)
    SELECT temp.id, temp.draft_content, temp.content_type_field_type, temp.content_entry_id, temp.content_type_field_id, temp.content_type_field_name, temp.content_entry_field_locale_id, temp.value_string, temp.value_bool, temp.value_keywords, temp.value_date, temp.value_number, temp.value_objects
    FROM content_entry_field_published temp
    WHERE NOT EXISTS (
      SELECT 1 FROM content_entry_field as main
      WHERE main.content_entry_id = temp.content_entry_id 
      AND main.content_type_field_id = temp.content_type_field_id 
      AND main.content_entry_field_locale_id = temp.content_entry_field_locale_id 
      AND COALESCE(main.value_string, 'DUMMY_STRING') = COALESCE(temp.value_string, 'DUMMY_STRING') 
      AND COALESCE(main.value_bool, -1) = COALESCE(temp.value_bool, -1) 
      AND COALESCE(main.value_keywords, 'DUMMY_KEYWORDS') = COALESCE(temp.value_keywords, 'DUMMY_KEYWORDS') 
      AND COALESCE(main.value_date, '1970-01-01') = COALESCE(temp.value_date, '1970-01-01') 
      AND COALESCE(main.value_number, -9999) = COALESCE(temp.value_number, -9999) 
      AND COALESCE(main.value_objects, 'DUMMY_OBJECTS') = COALESCE(temp.value_objects, 'DUMMY_OBJECTS')
    );`);
    try {
      await db.run(rawSQL2);
      console.log("Insert operation2 completed successfully.");
    } catch (err) {
      console.error("Error executing insertContentEntryFieldsWithDrizzle2:", err);
      throw err;
    }

    const rawSQLDrop = sql.raw(`DROP TABLE content_entry_field_draft;`);
    try {
      await db.run(rawSQLDrop);
      console.log("Drop operation completed successfully.");
    } catch (err) {
      console.error("Error executing insertContentEntryFieldsWithDrizzle3:", err);
      throw err;
    }
    const rawSQLDrop2 = sql.raw(`DROP TABLE content_entry_field_published;`);
    try {
      await db.run(rawSQLDrop2);
      console.log("Drop operation2 completed successfully.");
    } catch (err) {
      console.error("Error executing insertContentEntryFieldsWithDrizzle4:", err);
      throw err;
    }
    console.log("Operations successful");
  } catch (err) {
    console.error("Error in insertContentEntryFields", err);
    throw err;
  }
};

const insertPublishedContentEntryFields = async (
  fields: ContentEntryField[],
  documentID: string,
  blueprintMaps: BlueprintPaginationResult,
) => {
  try {
    for (const field of fields) {
      let contentEntryFieldData = await processDataForEntryField(field.data, field.type);
      let contentTypeFieldName = blueprintMaps.blueprintFieldNameMap.get(field.blueprintFieldId) || "";
      if (contentTypeFieldName === "src" && contentEntryFieldData.valueObjects !== undefined) {
        const jsonObj = JSON.parse(contentEntryFieldData.valueObjects);

        const url: string = jsonObj.url;
        assetUrls.add(url);
      }

      await db
        .insert(contentEntryFieldPublished)
        .values({
          id: `${documentID}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`,
          draftContent: 0,
          contentTypeFieldType: field.type,
          contentEntryId: documentID,
          contentTypeFieldId: field.blueprintFieldId,
          contentTypeFieldName: contentTypeFieldName,
          contentEntryFieldLocaleId: field.documentFieldLocaleId,
          valueString: contentEntryFieldData.valueString,
          valueBool: contentEntryFieldData.valueBool,
          valueKeywords: contentEntryFieldData.valueKeywords,
          valueDate: contentEntryFieldData.valueDate,
          valueNumber: contentEntryFieldData.valueNumber,
          valueObjects: contentEntryFieldData.valueObjects,
        } as any)
        .returning({
          id: contentEntryField.id,
          draftContent: contentEntryField.draftContent,
          contentTypeFieldType: contentEntryField.contentTypeFieldType,
          contentEntryId: contentEntryField.contentEntryId,
          contentTypeFieldId: contentEntryField.contentTypeFieldId,
          contentTypeFieldName: contentEntryField.contentTypeFieldName,
          contentEntryFieldLocaleId: contentEntryField.contentEntryFieldLocaleId,
          valueString: contentEntryField.valueString,
          valueBool: contentEntryField.valueBool,
          valueKeywords: contentEntryField.valueKeywords,
          valueDate: contentEntryField.valueDate,
          valueNumber: contentEntryField.valueNumber,
          valueObjects: contentEntryField.valueObjects,
        })
        .onConflictDoNothing()
        .execute();
    }
  } catch (err) {
    console.log(` insertContentEntryFieldsPublished`);
    throw new Error(err);
  }
};

const insertDraftContentEntryFields = async (
  fields: ContentEntryField[],
  documentID: string,
  blueprintMaps: BlueprintPaginationResult,
) => {
  try {
    for (const field of fields) {
      let contentEntryFieldData = await processDataForEntryField(field.data, field.type);
      let contentTypeFieldName = blueprintMaps.blueprintFieldNameMap.get(field.blueprintFieldId) || "";
      if (contentTypeFieldName === "src" && contentEntryFieldData.valueObjects !== undefined) {
        const jsonObj = JSON.parse(contentEntryFieldData.valueObjects);

        const url: string = jsonObj.url;
        assetUrls.add(url);
      }

      await db
        .insert(contentEntryFieldDraft)
        .values({
          id: `${documentID}_${field.blueprintFieldId}_${field.documentFieldLocaleId}`,
          draftContent: 1,
          contentTypeFieldType: field.type,
          contentEntryId: documentID,
          contentTypeFieldId: field.blueprintFieldId,
          contentTypeFieldName: contentTypeFieldName,
          contentEntryFieldLocaleId: field.documentFieldLocaleId,
          valueString: contentEntryFieldData.valueString,
          valueBool: contentEntryFieldData.valueBool,
          valueKeywords: contentEntryFieldData.valueKeywords,
          valueDate: contentEntryFieldData.valueDate,
          valueNumber: contentEntryFieldData.valueNumber,
          valueObjects: contentEntryFieldData.valueObjects,
        } as any)
        .returning({
          id: contentEntryField.id,
          draftContent: contentEntryField.draftContent,
          contentTypeFieldType: contentEntryField.contentTypeFieldType,
          contentEntryId: contentEntryField.contentEntryId,
          contentTypeFieldId: contentEntryField.contentTypeFieldId,
          contentTypeFieldName: contentEntryField.contentTypeFieldName,
          contentEntryFieldLocaleId: contentEntryField.contentEntryFieldLocaleId,
          valueString: contentEntryField.valueString,
          valueBool: contentEntryField.valueBool,
          valueKeywords: contentEntryField.valueKeywords,
          valueDate: contentEntryField.valueDate,
          valueNumber: contentEntryField.valueNumber,
          valueObjects: contentEntryField.valueObjects,
        })
        .onConflictDoNothing()
        .execute();
    }
  } catch (err) {
    console.log(` insertContentEntryFieldsDraft`);
    throw new Error(err);
  }
};

function isUuid(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

function generateUuidFromString(input: string): string {
  const hash = createHash("sha256").update(input).digest("hex");
  // Convert a hash to a UUID format
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    "4" + hash.substring(13, 16), // UUID version 4
    "8" + hash.substring(17, 20), // The '8', '9', 'a', or 'b' in this position
    hash.substring(20, 32),
  ].join("-");
}

export { isUuid, generateUuidFromString };
