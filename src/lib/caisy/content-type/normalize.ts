import { BlueprintFieldOptions, BlueprintFieldType, BlueprintResponse } from "@caisy/sdk";
import { ContentFieldType } from "../../common/zod/content-type";
import { ContentTypeFieldOptionsFragment } from "../../common/types/content-type";

export const normalizeCaisyFieldType = (fieldType: BlueprintFieldType): ContentFieldType => {
  switch (fieldType) {
    case BlueprintFieldType.BlueprintFieldTypeBoolean:
      return ContentFieldType.BOOLEAN;
    case BlueprintFieldType.BlueprintFieldTypeCode:
      return ContentFieldType.CODE;
    case BlueprintFieldType.BlueprintFieldTypeColor:
      return ContentFieldType.COLOR;
    case BlueprintFieldType.BlueprintFieldTypeConnection:
      return ContentFieldType.CONNECTION;
    case BlueprintFieldType.BlueprintFieldTypeDatetime:
      return ContentFieldType.DATETIME;
    case BlueprintFieldType.BlueprintFieldTypeExtension:
      return ContentFieldType.EXTENSION;
    case BlueprintFieldType.BlueprintFieldTypeFile:
      return ContentFieldType.FILE;
    case BlueprintFieldType.BlueprintFieldTypeFloat:
      return ContentFieldType.FLOAT;
    case BlueprintFieldType.BlueprintFieldTypeGeopoint:
      return ContentFieldType.GEOPOINT;
    case BlueprintFieldType.BlueprintFieldTypeInt:
      return ContentFieldType.INT;
    case BlueprintFieldType.BlueprintFieldTypeRichtext:
      return ContentFieldType.RICHTEXT;
    case BlueprintFieldType.BlueprintFieldTypeSelect:
      return ContentFieldType.SELECT;
    case BlueprintFieldType.BlueprintFieldTypeString:
      return ContentFieldType.STRING;
    case BlueprintFieldType.BlueprintFieldTypeTag:
      return ContentFieldType.TAG;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};
export const normalizeCaisyFieldOptions = (fieldType: BlueprintFieldOptions): ContentTypeFieldOptionsFragment => {
  return fieldType as any;
};

export const normalizeCaisyContentType = (blueprint: BlueprintResponse) => {
  return {
    ...blueprint,
    id: blueprint.blueprintId,
    name: blueprint.name,
    title: blueprint.title,
    system: blueprint.system,
    single: blueprint.single,
    tagIds: blueprint.tagIds,
    previewImageUrl: blueprint.previewImageUrl,
    exposeMutations: blueprint.exposeMutations,
    description: blueprint.description,
    groups: blueprint.groups.map((group) => ({
      id: group.blueprintGroupId,
      name: group.name,
      fields: group.fields.map((field) => ({
        id: field.blueprintFieldId,
        name: field.name,
        title: field.title,
        type: normalizeCaisyFieldType(field.type),
        system: field.system,
        description: field.description,
        options: normalizeCaisyFieldOptions(field.options),
      })),
    })),
  };
};
