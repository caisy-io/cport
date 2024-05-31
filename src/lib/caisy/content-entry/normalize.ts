import {
  BlueprintFieldType,
  DocumentFieldResponse,
  DocumentWithFieldsResponse,
  Document,
  DocumentStatusResponse,
  BlueprintVariant,
} from "@caisy/sdk";
import {
  ContentEntryContentTypeFieldType,
  ContentEntryContentTypeVariant,
  ContentEntryStatus,
  ContentEntry,
  ContentEntryField,
} from "../../common/types/content-entry";
import { BlueprintPaginationResult } from "../content-type/export";

export const normalizeCaisyFieldEntry = (fieldType: BlueprintFieldType): ContentEntryContentTypeFieldType => {
  switch (fieldType) {
    case BlueprintFieldType.BlueprintFieldTypeBoolean:
      return ContentEntryContentTypeFieldType.Boolean;
    case BlueprintFieldType.BlueprintFieldTypeCode:
      return ContentEntryContentTypeFieldType.Code;
    case BlueprintFieldType.BlueprintFieldTypeColor:
      return ContentEntryContentTypeFieldType.Color;
    case BlueprintFieldType.BlueprintFieldTypeConnection:
      return ContentEntryContentTypeFieldType.Connection;
    case BlueprintFieldType.BlueprintFieldTypeDatetime:
      return ContentEntryContentTypeFieldType.DateTime;
    case BlueprintFieldType.BlueprintFieldTypeExtension:
      return ContentEntryContentTypeFieldType.Extension;
    case BlueprintFieldType.BlueprintFieldTypeFile:
      return ContentEntryContentTypeFieldType.File;
    case BlueprintFieldType.BlueprintFieldTypeFloat:
      return ContentEntryContentTypeFieldType.Float;
    case BlueprintFieldType.BlueprintFieldTypeGeopoint:
      return ContentEntryContentTypeFieldType.GeoPoint;
    case BlueprintFieldType.BlueprintFieldTypeInt:
      return ContentEntryContentTypeFieldType.Int;
    case BlueprintFieldType.BlueprintFieldTypeRichtext:
      return ContentEntryContentTypeFieldType.RichText;
    case BlueprintFieldType.BlueprintFieldTypeSelect:
      return ContentEntryContentTypeFieldType.Select;
    case BlueprintFieldType.BlueprintFieldTypeString:
      return ContentEntryContentTypeFieldType.String;
    case BlueprintFieldType.BlueprintFieldTypeTag:
      return ContentEntryContentTypeFieldType.Tag;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const fromStringToCaisyContentFieldType = (fieldType: string): ContentEntryContentTypeFieldType => {
  switch (fieldType) {
    case "boolean":
      return ContentEntryContentTypeFieldType.Boolean;
    case "code":
      return ContentEntryContentTypeFieldType.Code;
    case "color":
      return ContentEntryContentTypeFieldType.Color;
    case "connection":
      return ContentEntryContentTypeFieldType.Connection;
    case "array":
      return ContentEntryContentTypeFieldType.Connection;
    case "datetime":
      return ContentEntryContentTypeFieldType.DateTime;
    case "extension":
      return ContentEntryContentTypeFieldType.Extension;
    case "file":
      return ContentEntryContentTypeFieldType.File;
    case "float":
      return ContentEntryContentTypeFieldType.Float;
    case "geo_point":
      return ContentEntryContentTypeFieldType.GeoPoint;
    case "int":
      return ContentEntryContentTypeFieldType.Int;
    case "rich_text":
      return ContentEntryContentTypeFieldType.RichText;
    case "select":
      return ContentEntryContentTypeFieldType.Select;
    case "string":
      return ContentEntryContentTypeFieldType.String;
    case "tag":
      return ContentEntryContentTypeFieldType.Tag;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const fromStringToCaisyBlueprintFieldType = (fieldType: string): BlueprintFieldType => {
  switch (fieldType) {
    case "boolean":
      return BlueprintFieldType.BlueprintFieldTypeBoolean;
    case "code":
      return BlueprintFieldType.BlueprintFieldTypeCode;
    case "color":
      return BlueprintFieldType.BlueprintFieldTypeColor;
    case "connection":
      return BlueprintFieldType.BlueprintFieldTypeConnection;
    case "array":
      return BlueprintFieldType.BlueprintFieldTypeConnection;
    case "datetime":
      return BlueprintFieldType.BlueprintFieldTypeDatetime;
    case "extension":
      return BlueprintFieldType.BlueprintFieldTypeExtension;
    case "file":
      return BlueprintFieldType.BlueprintFieldTypeFile;
    case "float":
      return BlueprintFieldType.BlueprintFieldTypeFloat;
    case "geo_point":
      return BlueprintFieldType.BlueprintFieldTypeGeopoint;
    case "int":
      return BlueprintFieldType.BlueprintFieldTypeInt;
    case "rich_text":
      return BlueprintFieldType.BlueprintFieldTypeRichtext;
    case "select":
      return BlueprintFieldType.BlueprintFieldTypeSelect;
    case "string":
      return BlueprintFieldType.BlueprintFieldTypeString;
    case "tag":
      return BlueprintFieldType.BlueprintFieldTypeTag;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const normalizeCaisyContentTypeVariant = (blueprintVariant: String): ContentEntryContentTypeVariant => {
  switch (blueprintVariant) {
    case "DOCUMENT":
      return ContentEntryContentTypeVariant.Document;
    case "ASSET":
      return ContentEntryContentTypeVariant.Asset;
    case "COMPONENT":
      return ContentEntryContentTypeVariant.Component;
    case "TEMPLATE":
      return ContentEntryContentTypeVariant.Template;
    default:
      return ContentEntryContentTypeVariant.Document;
  }
};

export const normalizeCaisyContentEntryStatus = (status: Number): ContentEntryStatus => {
  switch (status) {
    case 0:
      return ContentEntryStatus.Draft;
    case 1:
      return ContentEntryStatus.Changed;
    case 2:
      return ContentEntryStatus.Published;
    case 3:
      return ContentEntryStatus.Archived;
    default:
      return ContentEntryStatus.Draft;
  }
};

export const denormalizeCaisyFieldEntry = (fieldType: ContentEntryContentTypeFieldType): BlueprintFieldType => {
  switch (fieldType) {
    case ContentEntryContentTypeFieldType.Boolean:
      return BlueprintFieldType.BlueprintFieldTypeBoolean;
    case ContentEntryContentTypeFieldType.Code:
      return BlueprintFieldType.BlueprintFieldTypeCode;
    case ContentEntryContentTypeFieldType.Color:
      return BlueprintFieldType.BlueprintFieldTypeColor;
    case ContentEntryContentTypeFieldType.Connection:
      return BlueprintFieldType.BlueprintFieldTypeConnection;
    case ContentEntryContentTypeFieldType.DateTime:
      return BlueprintFieldType.BlueprintFieldTypeDatetime;
    case ContentEntryContentTypeFieldType.Extension:
      return BlueprintFieldType.BlueprintFieldTypeExtension;
    case ContentEntryContentTypeFieldType.File:
      return BlueprintFieldType.BlueprintFieldTypeFile;
    case ContentEntryContentTypeFieldType.Float:
      return BlueprintFieldType.BlueprintFieldTypeFloat;
    case ContentEntryContentTypeFieldType.GeoPoint:
      return BlueprintFieldType.BlueprintFieldTypeGeopoint;
    case ContentEntryContentTypeFieldType.Int:
      return BlueprintFieldType.BlueprintFieldTypeInt;
    case ContentEntryContentTypeFieldType.RichText:
      return BlueprintFieldType.BlueprintFieldTypeRichtext;
    case ContentEntryContentTypeFieldType.Select:
      return BlueprintFieldType.BlueprintFieldTypeSelect;
    case ContentEntryContentTypeFieldType.String:
      return BlueprintFieldType.BlueprintFieldTypeString;
    case ContentEntryContentTypeFieldType.Tag:
      return BlueprintFieldType.BlueprintFieldTypeTag;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
};

export const denormalizeCaisyContentTypeVariant = (blueprintVariant: string): BlueprintVariant => {
  switch (blueprintVariant) {
    case ContentEntryContentTypeVariant.Document:
      return BlueprintVariant.BlueprintVariantDocument;
    case ContentEntryContentTypeVariant.Asset:
      return BlueprintVariant.BlueprintVariantAsset;
    case ContentEntryContentTypeVariant.Component:
      return BlueprintVariant.BlueprintVariantComponent;
    case ContentEntryContentTypeVariant.Template:
      return BlueprintVariant.BlueprintVariantTemplate;
    default:
      return BlueprintVariant.BlueprintVariantDocument;
  }
};

export const denormalizeCaisyContentEntryStatus = (status: string): number => {
  switch (status) {
    case ContentEntryStatus.Draft:
      return 0;
    case ContentEntryStatus.Changed:
      return 1;
    case ContentEntryStatus.Published:
      return 2;
    case ContentEntryStatus.Archived:
      return 3;
    default:
      return 0;
  }
};

export const normalizeCaisyContentEntry = (
  document: DocumentWithFieldsResponse,
  blueprintVariantsMap: BlueprintPaginationResult,
): ContentEntry => {
  let blueprintVariant: string;
  for (const [key, value] of blueprintVariantsMap.blueprintMap.entries()) {
    if (key === document.blueprintId) {
      blueprintVariant = value;
    }
  }
  return {
    documentId: document.documentId,
    title: document.title,
    blueprintVariant: normalizeCaisyContentTypeVariant(blueprintVariant),
    previewImageUrl: document.previewImageUrl,
    status: normalizeCaisyContentEntryStatus(document.statusId),
    archivedAt: document.archivedAt,
    blueprintId: document.blueprintId,
    projectId: document.projectId,
    publishedAt: document.publishedAt,
    createdAt: document.createdAt,
    createdByUserId: document.createdByUserId,
    firstPublishedAt: document.firstPublishedAt,
    lastUpdatedByUserId: document.lastUpdatedByUserId,
    updatedAt: document.updatedAt,
    unpublishedAt: document.unpublishedAt,
    fields: document.fields.map((field) => {
      return {
        blueprintFieldId: field.blueprintFieldId,
        createdAt: field.createdAt,
        documentFieldLocaleId: field.documentFieldLocaleId,
        data: field.data,
        updatedAt: field.updatedAt,
        type: normalizeCaisyFieldEntry(field.type),
      };
    }),
  };
};
