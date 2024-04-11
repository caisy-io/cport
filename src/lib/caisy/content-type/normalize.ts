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
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const normalizeCaisyFieldOptions = (fieldType: BlueprintFieldOptions): ContentTypeFieldOptions => {
  return {
    uniqueGlobal: fieldType.uniqueGlobal,
    uniqueLocal: fieldType.uniqueLocal,
    float: fieldType.float,
    int: fieldType.int,
    string: fieldType.string,
    datetime: fieldType.datetime,
    extension: fieldType.extension,
    disableInApi: fieldType.disableInApi,
    disableInUi: fieldType.disableInUi,
    external: fieldType.external,
    file: fieldType.file,
    localized: fieldType.localized,
    primary: fieldType.primary,
    required: fieldType.required,
    code: fieldType.code,
    richtext: fieldType.richtext,
    select: fieldType.select,
    tag: fieldType.tag,
    video: fieldType.video,
    ...(fieldType.connection
      ? {
          connection: {
            connectedIds: fieldType.connection.connectedIds,
            visualization: normalizeCaisyConnectionFieldVisualization(fieldType.connection.visualization),
            variant: normalizeCaisyContentTypeVariant(fieldType.connection.variant),
          } as ContentTypeFieldOptions["connection"],
        }
      : {}),
  };
};

export const denormalizeCaisyFieldOptions = (fieldType: ContentTypeFieldOptions): BlueprintFieldOptions => {
  return {
    uniqueGlobal: fieldType.uniqueGlobal,
    uniqueLocal: fieldType.uniqueLocal,
    float: fieldType.float,
    int: fieldType.int,
    string: fieldType.string,
    datetime: fieldType.datetime,
    extension: fieldType.extension,
    disableInApi: fieldType.disableInApi,
    disableInUi: fieldType.disableInUi,
    external: fieldType.external,
    file: fieldType.file,
    localized: fieldType.localized,
    primary: fieldType.primary,
    required: fieldType.required,
    code: fieldType.code,
    richtext: fieldType.richtext,
    select: fieldType.select,
    tag: fieldType.tag,
    video: fieldType.video,
    ...(fieldType.connection
      ? {
          connection: {
            connectedIds: fieldType.connection.connectedIds,
            visualization: denormalizeCaisyConnectionFieldVisualization(fieldType.connection.visualization),
            variant: denormalizeCaisyContentTypeVariant(fieldType.connection.variant),
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
      return BlueprintVariant.BlueprintVariantDocument;
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
    variant: normalizeCaisyContentTypeVariant(blueprint.variant),
    previewImageUrl: blueprint.previewImageUrl,
    exposeMutations: blueprint.exposeMutations,
    description: blueprint.description,
    groups: blueprint.groups.map((group, index) => ({
      id: group.blueprintGroupId,
      contentTypeId: blueprint.blueprintId,
      position: index,
      name: group.name,
      fields: group.fields.map((field, index) => ({
        id: field.blueprintFieldId,
        name: field.name,
        groupId: group.blueprintGroupId,
        contentTypeId: blueprint.blueprintId,
        position: index,
        primary: !!field.options.primary,
        title: field.title,
        type: normalizeCaisyFieldType(field.type),
        system: field.system,
        description: field.description,
        options: normalizeCaisyFieldOptions(field.options),
      })),
    })),
  };
};
