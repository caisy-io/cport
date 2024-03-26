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

export const normalizeCaisyContentTypeVariant = (blueprintVariant: String): ContentEntryContentTypeVariant => {
  switch (blueprintVariant) {
    case BlueprintVariant.BlueprintVariantDocument:
      return ContentEntryContentTypeVariant.Document;
    case BlueprintVariant.BlueprintVariantAsset:
      return ContentEntryContentTypeVariant.Asset;
    case BlueprintVariant.BlueprintVariantComponent:
      return ContentEntryContentTypeVariant.Component;
    case BlueprintVariant.BlueprintVariantTemplate:
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

export const normalizeCaisyContentEntry = (document: DocumentWithFieldsResponse): ContentEntry => {
  return {
    documentId: document.documentId,
    title: document.title,
    // blueprintVariant: normalizeCaisyContentTypeVariant(document.blueprintVariant),
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
  };
};
