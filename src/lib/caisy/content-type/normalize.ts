import {
  BlueprintFieldConnectionVisualization,
  BlueprintFieldOptions,
  BlueprintFieldType,
  BlueprintResponse,
  BlueprintVariant,
} from "@caisy/sdk";
import {
  ContentFieldType,
  ContentType,
  ContentTypeFieldConnectionVisualization,
  ContentTypeFieldOptions,
  ContentTypeVariant,
} from "../../common/types/content-type";
import { generateUuidFromString, isUuid } from "../../common/writer/content-entry";
import { maybeToValue, requireString, filterDefined, isDefined } from "../../common/utils/type-guards";

export const normalizeCaisyFieldType = (fieldType: BlueprintFieldType): ContentFieldType => {
  switch (fieldType) {
    case BlueprintFieldType.BlueprintFieldTypeBoolean:
      return ContentFieldType.Boolean;
    case BlueprintFieldType.BlueprintFieldTypeCode:
      return ContentFieldType.Code;
    case BlueprintFieldType.BlueprintFieldTypeColor:
      return ContentFieldType.Color;
    case BlueprintFieldType.BlueprintFieldTypeConnection:
      return ContentFieldType.Connection;
    case BlueprintFieldType.BlueprintFieldTypeDatetime:
      return ContentFieldType.Datetime;
    case BlueprintFieldType.BlueprintFieldTypeExtension:
      return ContentFieldType.Extension;
    case BlueprintFieldType.BlueprintFieldTypeFile:
      return ContentFieldType.File;
    case BlueprintFieldType.BlueprintFieldTypeFloat:
      return ContentFieldType.Float;
    case BlueprintFieldType.BlueprintFieldTypeGeopoint:
      return ContentFieldType.Geopoint;
    case BlueprintFieldType.BlueprintFieldTypeInt:
      return ContentFieldType.Int;
    case BlueprintFieldType.BlueprintFieldTypeRichtext:
      return ContentFieldType.Richtext;
    case BlueprintFieldType.BlueprintFieldTypeSelect:
      return ContentFieldType.Select;
    case BlueprintFieldType.BlueprintFieldTypeString:
      return ContentFieldType.String;
    case BlueprintFieldType.BlueprintFieldTypeTag:
      return ContentFieldType.Tag;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const denormalizeCaisyFieldType = (fieldType: String): BlueprintFieldType => {
  switch (fieldType) {
    case ContentFieldType.Boolean:
      return BlueprintFieldType.BlueprintFieldTypeBoolean;
    case ContentFieldType.Code:
      return BlueprintFieldType.BlueprintFieldTypeCode;
    case ContentFieldType.Color:
      return BlueprintFieldType.BlueprintFieldTypeColor;
    case ContentFieldType.Connection:
      return BlueprintFieldType.BlueprintFieldTypeConnection;
    case ContentFieldType.Datetime:
      return BlueprintFieldType.BlueprintFieldTypeDatetime;
    case ContentFieldType.Extension:
      return BlueprintFieldType.BlueprintFieldTypeExtension;
    case ContentFieldType.File:
      return BlueprintFieldType.BlueprintFieldTypeFile;
    case ContentFieldType.Float:
      return BlueprintFieldType.BlueprintFieldTypeFloat;
    case ContentFieldType.Geopoint:
      return BlueprintFieldType.BlueprintFieldTypeGeopoint;
    case ContentFieldType.Int:
      return BlueprintFieldType.BlueprintFieldTypeInt;
    case ContentFieldType.Richtext:
      return BlueprintFieldType.BlueprintFieldTypeRichtext;
    case ContentFieldType.Select:
      return BlueprintFieldType.BlueprintFieldTypeSelect;
    case ContentFieldType.String:
      return BlueprintFieldType.BlueprintFieldTypeString;
    case ContentFieldType.Tag:
      return BlueprintFieldType.BlueprintFieldTypeTag;
    case ContentFieldType.Array:
      return BlueprintFieldType.BlueprintFieldTypeConnection;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const normalizeCaisyFieldOptions = (fieldTypeOptions: BlueprintFieldOptions): ContentTypeFieldOptions => {
  return {
    uniqueGlobal: fieldTypeOptions.uniqueGlobal,
    uniqueLocal: fieldTypeOptions.uniqueLocal,
    float: fieldTypeOptions.float,
    int: fieldTypeOptions.int,
    string: fieldTypeOptions.string,
    datetime: fieldTypeOptions.datetime,
    extension: fieldTypeOptions.extension,
    disableInApi: fieldTypeOptions.disableInApi,
    disableInUi: fieldTypeOptions.disableInUi,
    external: fieldTypeOptions.external,
    file: fieldTypeOptions.file,
    localized: fieldTypeOptions.localized,
    primary: fieldTypeOptions.primary,
    required: fieldTypeOptions.required,
    code: fieldTypeOptions.code,
    richtext: fieldTypeOptions.richtext,
    select: fieldTypeOptions.select,
    tag: fieldTypeOptions.tag,
    video: fieldTypeOptions.video,
    ...(fieldTypeOptions.connection
      ? {
          connection: {
            connectedIds: fieldTypeOptions.connection.connectedIds,
            visualization: fieldTypeOptions.connection.visualization
              ? normalizeCaisyConnectionFieldVisualization(fieldTypeOptions.connection.visualization)
              : undefined,
            variant: fieldTypeOptions.connection.variant
              ? normalizeCaisyContentTypeVariant(fieldTypeOptions.connection.variant)
              : undefined,
          } as ContentTypeFieldOptions["connection"],
        }
      : {}),
  };
};

export const denormalizeCaisyFieldOptions = (
  fieldOptions: ContentTypeFieldOptions,
  fieldType?: string,
): BlueprintFieldOptions => {
  const initalConnectedIds = fieldOptions.connection?.connectedIds || undefined;
  let connectedIds: string[] | undefined = undefined;
  if (initalConnectedIds) {
    connectedIds = initalConnectedIds
      .filter((id): id is string => id != null)
      .map(id => {
        const validBlueprintId = isUuid(id) ? id : generateUuidFromString(id);
        return validBlueprintId;
      });
  }

  return {
    uniqueGlobal: fieldOptions.uniqueGlobal,
    uniqueLocal: fieldOptions.uniqueLocal,
    float: fieldOptions.float,
    int: fieldOptions.int,
    string: fieldOptions.string,
    datetime: fieldOptions.datetime,
    extension: fieldOptions.extension,
    disableInApi: fieldOptions.disableInApi,
    disableInUi: fieldOptions.disableInUi,
    external: fieldOptions.external,
    file: fieldOptions.file,
    localized: fieldOptions.localized,
    primary: fieldOptions.primary,
    required: fieldOptions.required,
    code: fieldOptions.code,
    richtext: fieldOptions.richtext,
    select: fieldOptions.select,
    tag: fieldOptions.tag,
    video: fieldOptions.video,
    ...(fieldOptions.connection
      ? {
          connection: {
            multiple: fieldType === ContentFieldType.Array || fieldOptions.connection.multiple,
            connectedIds: fieldOptions.connection.connectedIds ? connectedIds : [],
            visualization: fieldOptions.connection.visualization
              ? denormalizeCaisyConnectionFieldVisualization(fieldOptions.connection.visualization)
              : undefined,
            variant: fieldOptions.connection.variant
              ? denormalizeCaisyContentTypeVariant(fieldOptions.connection.variant)
              : BlueprintVariant.BlueprintVariantUnspecified,
          },
        }
      : {}),
  };
};

export const normalizeCaisyContentTypeVariant = (blueprintVariant: BlueprintVariant): ContentTypeVariant => {
  switch (blueprintVariant) {
    case BlueprintVariant.BlueprintVariantDocument:
      return ContentTypeVariant.Document;
    case BlueprintVariant.BlueprintVariantAsset:
      return ContentTypeVariant.Asset;
    case BlueprintVariant.BlueprintVariantComponent:
      return ContentTypeVariant.Component;
    case BlueprintVariant.BlueprintVariantTemplate:
      return ContentTypeVariant.Template;
    default:
      return ContentTypeVariant.Document;
  }
};

export const denormalizeCaisyContentTypeVariant = (blueprintVariant: string): BlueprintVariant => {
  switch (blueprintVariant) {
    case ContentTypeVariant.Document:
      return BlueprintVariant.BlueprintVariantDocument;
    case ContentTypeVariant.Asset:
      return BlueprintVariant.BlueprintVariantAsset;
    case ContentTypeVariant.Component:
      return BlueprintVariant.BlueprintVariantComponent;
    case ContentTypeVariant.Template:
      return BlueprintVariant.BlueprintVariantTemplate;
    default:
      return BlueprintVariant.BlueprintVariantUnspecified;
  }
};

export const normalizeCaisyConnectionFieldVisualization = (
  visualization: BlueprintFieldConnectionVisualization,
): ContentTypeFieldConnectionVisualization => {
  switch (visualization) {
    case BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationDeafult:
      return ContentTypeFieldConnectionVisualization.Deafult;
    case BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationInline:
      return ContentTypeFieldConnectionVisualization.Inline;
    case BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationGrid:
      return ContentTypeFieldConnectionVisualization.Grid;
    default:
      return ContentTypeFieldConnectionVisualization.Deafult;
  }
};

export const denormalizeCaisyConnectionFieldVisualization = (
  visualization: ContentTypeFieldConnectionVisualization,
): BlueprintFieldConnectionVisualization => {
  switch (visualization) {
    case ContentTypeFieldConnectionVisualization.Deafult:
      return BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationDeafult;
    case ContentTypeFieldConnectionVisualization.Inline:
      return BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationInline;
    case ContentTypeFieldConnectionVisualization.Grid:
      return BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationGrid;
    default:
      return BlueprintFieldConnectionVisualization.BlueprintFieldConnectionVisualizationDeafult;
  }
};

export const normalizeCaisyContentType = (blueprint: BlueprintResponse): ContentType => {
  return {
    id: blueprint.blueprintId,
    name: blueprint.name,
    title: blueprint.title,
    system: blueprint.system,
    single: blueprint.single,
    tagIds: blueprint.tagIds,
    variant: blueprint.variant ? normalizeCaisyContentTypeVariant(blueprint.variant) : ContentTypeVariant.Unspecified,
    previewImageUrl: blueprint.previewImageUrl,
    exposeMutations: blueprint.exposeMutations,
    description: blueprint.description,
    groups:
      blueprint.groups
        ?.filter(group => group != null)
        .map((group, index) => ({
          id: group.blueprintGroupId,
          contentTypeId: blueprint.blueprintId,
          position: index,
          name: group.name,
          fields:
            group.fields
              ?.filter(field => field != null)
              .map((field, index) => ({
                id: field.blueprintFieldId,
                name: field.name,
                groupId: group.blueprintGroupId,
                contentTypeId: blueprint.blueprintId,
                position: index,
                primary: !!field.options?.primary,
                title: field.title,
                type: field.type ? normalizeCaisyFieldType(field.type) : ContentFieldType.String,
                system: field.system,
                description: field.description,
                options: field.options ? normalizeCaisyFieldOptions(field.options) : ({} as ContentTypeFieldOptions),
              })) ?? [],
        })) ?? [],
  };
};
