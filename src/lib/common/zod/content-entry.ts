import { z } from "zod";

export const contentEntryStatusSchema = z.enum(["draft", "changed", "published", "archived"]);

export const contentEntryContentTypeVariantSchema = z.enum([
  "unspecified",
  "document",
  "asset",
  "component",
  "template",
]);

export const contentEntrySchema = z.object({
  id: z.string(),
  status: contentEntryStatusSchema.default("draft"),
  contentTypeId: z.string(),
  title: z.string().optional(),
  previewImageUrl: z.string().optional(),
  publishedAt: z.number().optional(),
  archivedAt: z.number().optional(),
  contentTypeVariant: contentEntryContentTypeVariantSchema,
});

export const contentLocaleSchema = z.object({
  id: z.string(),
  apiName: z.string(),
  title: z.string(),
  flag: z.string(),
  fallbackLocaleId: z.string().optional().nullable(),
  default: z.boolean(),
  disableInResponse: z.boolean(),
  disableEditing: z.boolean(),
  allowEmptyRequired: z.boolean(),
});

export const contentEntryContentTypeFieldTypeSchema = z.enum([
  "unspecified",
  "boolean",
  "int",
  "string",
  "datetime",
  "connection",
  "tag",
  "color",
  "code",
  "file",
  "video",
  "select",
  "extension",
  "geo_point",
  "rich_text",
  "float",
]);

export const contentEntryFieldSchema = z.object({
  id: z.string(),
  contentEntryId: z.string(),
  contentTypeFieldId: z.string(),
  contentTypeFieldName: z.string(),
  contentEntryFieldLocaleId: z.string(),
  valueString: z.string().optional(),
  valueBool: z.boolean().optional(),
  valueKeywords: z.string().optional(),
  valueDate: z.number().optional(),
  valueNumber: z.string().optional(),
  valueObjects: z.string().optional(),
  contentTypeFieldType: contentEntryContentTypeFieldTypeSchema,
});
