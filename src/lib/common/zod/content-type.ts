import { z } from "zod";

export const contentTypeVariantEnum = ["Document", "Asset", "Component", "Template"] as const;
export type ContentTypeVariant = (typeof contentTypeVariantEnum)[number];

export const ContentTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  variant: z.enum(contentTypeVariantEnum).default("Document"),
  single: z.boolean(),
  exposeMutations: z.boolean(),
  system: z.boolean(),
  description: z.string().optional(),
  previewImageUrl: z.string().optional(),
});

export const ContentTypeGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  contentTypeId: z.string(),
  position: z.number(),
});

export const ContentTypeFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string().optional(),
  type: z.string(),
  groupId: z.string(),
  position: z.number(),
  primary: z.boolean(),
  options: z.string().default("{}"),
  contentTypeId: z.string().optional(),
  disableInUi: z.boolean().optional(),
  localized: z.boolean().optional(),
  disableInApi: z.boolean().optional(),
  system: z.boolean().optional(),
});

export const ContentTypeTagSchema = z.object({
  contentTypeId: z.string(),
  tagId: z.string(),
});
