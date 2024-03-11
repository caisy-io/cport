import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export enum ContentEntryContentTypeVariant {
  Unspecified = "unspecified",
  Document = "document",
  Asset = "asset",
  Component = "component",
  Template = "template",
}

export enum ContentEntryContentTypeFieldType {
  Unspecified = "unspecified",
  Boolean = "boolean",
  Int = "int",
  String = "string",
  DateTime = "datetime",
  Connection = "connection",
  Tag = "tag",
  Color = "color",
  Code = "code",
  File = "file",
  Video = "video",
  Select = "select",
  Extension = "extension",
  GeoPoint = "geo_point",
  RichText = "rich_text",
  Float = "float",
}

export enum ContentEntryStatus {
  Draft = "draft",
  Changed = "changed",
  Published = "published",
  Archived = "archived",
}

export const contentEntry = sqliteTable("content_entry", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default(ContentEntryStatus.Draft),
  contentTypeId: text("content_type_id").notNull(),
  title: text("title"),
  previewImageUrl: text("preview_image_url"),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  archivedAt: integer("archived_at", { mode: "timestamp_ms" }),
  contentTypeVariant: text("content_type_variant").notNull(),
  firstPublishedAt: integer("first_published_at", { mode: "timestamp_ms" }),
  unpublishedAt: integer("unpublished_at", { mode: "timestamp_ms" }),
});

export const contentEntryFieldLocale = sqliteTable("content_entry_field_locale", {
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

export const contentEntryField = sqliteTable("content_entry_field", {
  id: text("id").primaryKey(),
  contentEntryId: text("content_entry_id").notNull(),
  contentTypeFieldId: text("content_type_field_id").notNull(),
  contentTypeFieldName: text("content_type_field_name").notNull(),
  contentEntryFieldLocaleId: text("content_entry_field_locale_id").notNull(),
  valueString: text("value_string"),
  valueBool: integer("value_bool", { mode: "boolean" }),
  valueKeywords: text("value_keywords"),
  valueDate: integer("value_date", { mode: "timestamp_ms" }),
  valueNumber: text("value_number"),
  valueObjects: text("value_objects"),
  contentTypeFieldType: text("content_type_field_type").notNull(),
});
