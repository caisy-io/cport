import { z } from "zod";

export const contentTypeFieldConnectionVisualizationSchema = z.enum(["DEAFULT", "GRID", "INLINE"]);

export const contentTypeTypeSchema = z.enum([
  "BOOLEAN",
  "CODE",
  "COLOR",
  "CONNECTION",
  "DATETIME",
  "EXTENSION",
  "FILE",
  "FLOAT",
  "GEOPOINT",
  "INT",
  "RICHTEXT",
  "SELECT",
  "STRING",
  "TAG",
  "VIDEO",
  "ARRAY",
]);

export const contentTypeVariantSchema = z.enum(["DOCUMENT", "ASSET", "COMPONENT", "TEMPLATE"]);

export const contentTypeFieldVideoSchema = z.object({
  pattern: z.string().optional(),
});

export const contentTypeFieldTagSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
  pattern: z.string().optional(),
});

export const contentTypeFieldStringSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
  multiline: z.boolean().optional(),
  pattern: z.string().optional(),
});

export const contentTypeFieldSelectItemSchema = z.object({
  key: z.string().optional(),
  value: z.string().optional(),
});

export const contentTypeFieldSelectSchema = z.object({
  items: z.array(contentTypeFieldSelectItemSchema).optional(),
  max: z.number().optional(),
  min: z.number().optional(),
  multiple: z.boolean().optional(),
  outputEnumType: z.boolean().optional(),
});

export const contentTypeFieldRichtextFeaturesSchema = z.object({
  alignCenter: z.boolean().optional(),
  alignJustify: z.boolean().optional(),
  alignLeft: z.boolean().optional(),
  alignRight: z.boolean().optional(),
  blockquote: z.boolean().optional(),
  bold: z.boolean().optional(),
  code: z.boolean().optional(),
  codeblock: z.boolean().optional(),
  frame: z.boolean().optional(),
  h1: z.boolean().optional(),
  h2: z.boolean().optional(),
  h3: z.boolean().optional(),
  h4: z.boolean().optional(),
  h5: z.boolean().optional(),
  h6: z.boolean().optional(),
  italic: z.boolean().optional(),
  link: z.boolean().optional(),
  ol: z.boolean().optional(),
  table: z.boolean().optional(),
  ul: z.boolean().optional(),
});

export const contentTypeFieldRichtextSchema = z.object({
  assetContentTypeIds: z.array(z.string()).optional(),
  assetLinking: z.boolean().optional(),
  componentContentTypeIds: z.array(z.string()).optional(),
  componentLinking: z.boolean().optional(),
  documentContentTypeIds: z.array(z.string()).optional(),
  documentLinking: z.boolean().optional(),
  features: contentTypeFieldRichtextFeaturesSchema.optional(),
  max: z.number().optional(),
  min: z.number().optional(),
  pattern: z.string().optional(),
});

export const contentTypeFieldIntSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
});

export const contentTypeFieldFloatSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
});

export const contentTypeFieldFileSchema = z.object({
  focalPoint: z.boolean().optional(),
  pattern: z.string().optional(),
});

export const contentTypeFieldExtensionSchema = z.object({
  height: z.number().int().optional(),
  pattern: z.string().optional(),
  url: z.string().optional(),
});

export const contentTypeFieldDatetimeSchema = z.object({
  max: z.number().optional(),
  min: z.number().optional(),
  time: z.boolean().optional(),
});

export const contentTypeFieldConnectionSchema = z.object({
  connectedIds: z.array(z.string()).optional(),
  max: z.number().optional(),
  min: z.number().optional(),
  multiple: z.boolean().optional(),
  variant: contentTypeVariantSchema.optional(),
  visualization: contentTypeFieldConnectionVisualizationSchema.optional(),
});

export const contentTypeFieldCodeSchema = z.object({
  languages: z.array(z.string()).optional(),
  max: z.number().optional(),
  min: z.number().optional(),
});

export const contentTypeFieldOptionsSchema = z.object({
  disableInApi: z.boolean().optional(),
  disableInUi: z.boolean().optional(),
  external: z.string().optional(),
  localized: z.boolean().optional(),
  primary: z.boolean().optional(),
  required: z.boolean().optional(),
  uniqueGlobal: z.boolean().optional(),
  uniqueLocal: z.boolean().optional(),
  code: contentTypeFieldCodeSchema.optional(),
  connection: contentTypeFieldConnectionSchema.optional(),
  datetime: contentTypeFieldDatetimeSchema.optional(),
  extension: contentTypeFieldExtensionSchema.optional(),
  file: contentTypeFieldFileSchema.optional(),
  float: contentTypeFieldFloatSchema.optional(),
  int: contentTypeFieldIntSchema.optional(),
  richtext: contentTypeFieldRichtextSchema.optional(),
  select: contentTypeFieldSelectSchema.optional(),
  string: contentTypeFieldStringSchema.optional(),
  tag: contentTypeFieldTagSchema.optional(),
  video: contentTypeFieldVideoSchema.optional(),
});

export const contentTypeFieldSchema = z.object({
  contentTypeFieldId: z.string().optional(),
  contentTypeGroupId: z.string().optional(),
  contentTypeId: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  options: contentTypeFieldOptionsSchema.optional(),
  system: z.boolean().optional(),
  primary: z.boolean().optional(),
  position: z.number(),
  disableInUi: z.boolean().optional(),
  disableInApi: z.boolean().optional(),
  localized: z.boolean().optional(),
  title: z.string().optional(),
  type: contentTypeTypeSchema.optional(),
});

export const contentTypeGroupSchema = z.object({
  id: z.string(),
  contentTypeGroupId: z.string().optional(),
  fields: z.array(contentTypeFieldSchema).optional(),
  name: z.string().optional(),
  position: z.number(),
});

export const contentTypeSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  exposeMutations: z.boolean().optional(),
  groups: z.array(contentTypeGroupSchema).optional(),
  name: z.string().optional(),
  previewImageUrl: z.string().optional(),
  single: z.boolean().optional(),
  system: z.boolean().optional(),
  tagIds: z.array(z.string()).optional(),
  title: z.string().optional(),
  variant: contentTypeVariantSchema.optional(),
});
