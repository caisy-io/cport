import { sqliteTable, text, integer, primaryKey, unique } from "drizzle-orm/sqlite-core";
import { ContentTypeFieldOptions, ContentTypeVariant } from "./types/content-type";
import { ContentEntryStatus } from "./types/content-entry";

export const tag = sqliteTable("tag", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color"),
});

export const contentType = sqliteTable("content_type", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  variant: text("variant")
    .notNull()
    .default("Document" as ContentTypeVariant),
  single: integer("single", { mode: "boolean" }),
  exposeMutations: integer("expose_mutations", { mode: "boolean" }),
  system: integer("system", { mode: "boolean" }),
  description: text("description"),
  previewImageUrl: text("preview_image_url"),
});

export const contentTypeGroup = sqliteTable(
  "content_type_group",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    contentTypeId: text("content_type_id")
      .notNull()
      .references(() => contentType.id),
    position: integer("position").notNull(),
  },
  (t) => {
    return {
      unq: unique().on(t.contentTypeId, t.position),
    };
  },
);

export const contentTypeField = sqliteTable(
  "content_type_field",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    type: text("type").notNull(),
    groupId: text("group_id")
      .notNull()
      .references(() => contentTypeGroup.id),
    position: integer("position").notNull(),
    primary: integer("primary", { mode: "boolean" }).notNull(),
    options: text("options", { mode: "json" }).notNull().default("{}").$type<ContentTypeFieldOptions>(),
    contentTypeId: text("content_type_id")
      .notNull()
      .references(() => contentType.id),
    disableInUi: integer("disable_in_ui", { mode: "boolean" }),
    localized: integer("localized", { mode: "boolean" }),
    disableInApi: integer("disable_in_api", { mode: "boolean" }),
    system: integer("system", { mode: "boolean" }),
  },
  (t) => {
    return {
      unq: unique().on(t.contentTypeId, t.groupId, t.position),
    };
  },
);

export const contentTypeTag = sqliteTable(
  "content_type_tag",
  {
    contentTypeId: text("content_type_id")
      .notNull()
      .references(() => contentType.id),
    tagId: text("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.contentTypeId, t.tagId] }),
    };
  },
);

export const contentLocale = sqliteTable("content_locale", {
  id: text("id").primaryKey(),
  apiName: text("api_name").notNull(),
  title: text("title").notNull(),
  flag: text("flag").notNull(),
  fallbackLocaleId: text("fallback_locale_id"),
  default: integer("default", { mode: "boolean" }).notNull(),
  disableInResponse: integer("disable_in_response", { mode: "boolean" }).notNull(),
  disableEditing: integer("disable_editing", { mode: "boolean" }).notNull(),
  allowEmptyRequired: integer("allow_empty_required", { mode: "boolean" }).notNull(),
});

export const contentEntry = sqliteTable("content_entry", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default(ContentEntryStatus.Draft),
  contentTypeId: text("content_type_id").notNull(),
  contentTypeVariant: text("content_type_variant").notNull(),
  title: text("title"),
  previewImageUrl: text("preview_image_url"),
});

export const contentEntryField = sqliteTable(
  "content_entry_field",
  {
    id: text("id"),
    draftContent: integer("draft_content", { mode: "boolean" }),
    contentTypeFieldType: text("content_type_field_type").notNull(),
    contentEntryId: text("content_entry_id").notNull(),
    contentTypeFieldId: text("content_type_field_id").notNull(),
    contentTypeFieldName: text("content_type_field_name").notNull(),
    contentEntryFieldLocaleId: text("content_entry_field_locale_id").notNull(),
    valueString: text("value_string"),
    valueBool: integer("value_bool", { mode: "boolean" }),
    valueKeywords: text("value_keywords"),
    valueDate: text("value_date"),
    valueNumber: text("value_number"),
    valueObjects: text("value_objects"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.draftContent] }),
    };
  },
);

export const assetFile = sqliteTable("asset_file", {
  id: text("id").primaryKey(),
  original_url: text("original_url"),
  local_path: text("local_path"),
});

// table: content_entry_field
// FOR CHANGED CONTENT
//  blogPage-2_body 1 this is my changed content
//  blogPage-2_body 0 this is my published content
// FOR PUBLISHED CONTENT
//  blogPage-2_body 0 this is my published content
// FOR DRAFT CONTENT
//  blogPage-2_body 1 this is my changed content
