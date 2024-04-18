import { Maybe, Scalars } from "./util";

export enum ContentEntryContentTypeVariant {
  Unspecified = "unspecified",
  Document = "document",
  Asset = "asset",
  Component = "component",
  Template = "template",
}

export enum DocumentMode {
  DocumentRequestModeLatest = "GET_DOCUMENT_REQUEST_MODE_LATEST",
  DocumentRequestModePublished = "GET_DOCUMENT_REQUEST_MODE_PUBLISHED",
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

export type ContentEntry = {
  archivedAt?: Maybe<Scalars["Time"]>;
  blueprintBranch?: Maybe<Scalars["String"]>;
  blueprintId?: Maybe<Scalars["String"]>;
  blueprintVariant?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Time"]>;
  createdByUserId?: Maybe<Scalars["String"]>;
  documentId?: Maybe<Scalars["String"]>;
  environmentId?: Maybe<Scalars["String"]>;
  firstPublishedAt?: Maybe<Scalars["Time"]>;
  lastUpdatedByUserId?: Maybe<Scalars["String"]>;
  previewImageUrl?: Maybe<Scalars["String"]>;
  projectId?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["Time"]>;
  status?: Maybe<ContentEntryStatus>;
  title?: Maybe<Scalars["String"]>;
  unpublishedAt?: Maybe<Scalars["Time"]>;
  updatedAt?: Maybe<Scalars["Time"]>;
  fields?: Maybe<Array<ContentEntryField>>;
};

export type ContentEntryField = {
  id?: Maybe<Scalars["String"]>;
  blueprintFieldId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Time"]>;
  data?: Maybe<Scalars["Any"]>;
  documentFieldLocaleId?: Maybe<Scalars["String"]>;
  lastUpdatedByUserId?: Maybe<Scalars["String"]>;
  type?: Maybe<ContentEntryContentTypeFieldType>;
  updatedAt?: Maybe<Scalars["Time"]>;
};

export type ContentEntryFieldData = {
  valueString?: string | null;
  valueBool?: boolean | null;
  valueKeywords?: string | null;
  valueDate?: string | null;
  valueNumber?: number | null;
  valueObjects?: string | null;
};

export const processDataForEntryField = (
  data: Maybe<Scalars["Any"]>,
  fieldType: ContentEntryContentTypeFieldType,
): ContentEntryFieldData => {
  if (data === null || data === undefined) {
    return {};
  }
  switch (fieldType) {
    case ContentEntryContentTypeFieldType.String:
    case ContentEntryContentTypeFieldType.Color:
      return {
        valueString: data,
        valueBool: undefined,
        valueNumber: undefined,
        valueKeywords: undefined,
        valueDate: undefined,
        valueObjects: undefined,
      };
    case ContentEntryContentTypeFieldType.Boolean:
      return {
        valueBool: data,
        valueString: undefined,
        valueNumber: undefined,
        valueKeywords: undefined,
        valueDate: undefined,
        valueObjects: undefined,
      };
    case ContentEntryContentTypeFieldType.Int:
    case ContentEntryContentTypeFieldType.Float:
      return {
        valueNumber: data,
        valueString: undefined,
        valueBool: undefined,
        valueKeywords: undefined,
        valueDate: undefined,
        valueObjects: undefined,
      };
    case ContentEntryContentTypeFieldType.DateTime:
      const parsedDate = Date.parse(data);
      if (!isNaN(parsedDate)) {
        return {
          valueDate: new Date(parsedDate).toISOString(),
          valueString: undefined,
          valueBool: undefined,
          valueNumber: undefined,
          valueKeywords: undefined,
          valueObjects: undefined,
        };
      }
    case ContentEntryContentTypeFieldType.Connection:
    case ContentEntryContentTypeFieldType.Tag:
    case ContentEntryContentTypeFieldType.Select:
      return {
        valueObjects: undefined,
        valueString: undefined,
        valueBool: undefined,
        valueNumber: undefined,
        valueKeywords: JSON.stringify(data),
        valueDate: undefined,
      };
    case ContentEntryContentTypeFieldType.Extension:
    case ContentEntryContentTypeFieldType.GeoPoint:
    case ContentEntryContentTypeFieldType.RichText:
    case ContentEntryContentTypeFieldType.File:
    case ContentEntryContentTypeFieldType.Video:
    case ContentEntryContentTypeFieldType.Code:
      return {
        valueObjects: JSON.stringify(data),
        valueString: undefined,
        valueBool: undefined,
        valueNumber: undefined,
        valueKeywords: undefined,
        valueDate: undefined,
      };
  }
  return {}; // Default case if none of the above matched
};

export const processDataForCaisyDocumentField = (
  data: ContentEntryFieldData,
  fieldType: ContentEntryContentTypeFieldType,
): Maybe<Scalars["Any"]> => {
  if (data === null || data === undefined) {
    return {};
  }
  switch (fieldType) {
    case ContentEntryContentTypeFieldType.String:
    case ContentEntryContentTypeFieldType.Color:
      return data.valueString;
    case ContentEntryContentTypeFieldType.Boolean:
      return data.valueBool;
    case ContentEntryContentTypeFieldType.Int:
    case ContentEntryContentTypeFieldType.Float:
      return data.valueNumber;
    case ContentEntryContentTypeFieldType.DateTime:
      return data.valueDate;
    case ContentEntryContentTypeFieldType.Connection:
    case ContentEntryContentTypeFieldType.Tag:
    case ContentEntryContentTypeFieldType.Select:
      return JSON.parse(data.valueKeywords);
    case ContentEntryContentTypeFieldType.Extension:
    case ContentEntryContentTypeFieldType.GeoPoint:
    case ContentEntryContentTypeFieldType.RichText:
    case ContentEntryContentTypeFieldType.File:
    case ContentEntryContentTypeFieldType.Video:
    case ContentEntryContentTypeFieldType.Code:
      return JSON.parse(data.valueObjects);
  }
  return {}; // Default case if none of the above matched
};

export type AssetFile = {
  id?: Maybe<Scalars["String"]>;
  originalUrl?: Maybe<Scalars["String"]>;
  localPath?: Maybe<Scalars["String"]>;
};
