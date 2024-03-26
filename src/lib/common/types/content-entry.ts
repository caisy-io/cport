import { Maybe, Scalars } from "./util";

export enum ContentEntryContentTypeVariant {
  Unspecified = "unspecified",
  Document = "document",
  Asset = "asset",
  Component = "component",
  Template = "template",
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
  blueprintFieldId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Time"]>;
  data?: Maybe<Scalars["Any"]>;
  documentFieldLocaleId?: Maybe<Scalars["String"]>;
  lastUpdatedByUserId?: Maybe<Scalars["String"]>;
  type?: Maybe<ContentEntryContentTypeFieldType>;
  updatedAt?: Maybe<Scalars["Time"]>;
};
