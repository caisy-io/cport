import { sqliteTable, text, integer, primaryKey, unique } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { tag } from "./tag";

export const contentTypeVariantEnum = ["Document", "Asset", "Component", "Template"] as const;
export type ContentTypeVariant = (typeof contentTypeVariantEnum)[number];

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
    options: text("options").notNull().default("{}"),
    contentTypeId: text("content_type_id").references(() => contentType.id),
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
