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
  id?: Maybe<Scalars["String"]>;
  blueprintFieldId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Time"]>;
  data?: Maybe<Scalars["Any"]>;
  documentFieldLocaleId?: Maybe<Scalars["String"]>;
  lastUpdatedByUserId?: Maybe<Scalars["String"]>;
  type?: Maybe<ContentEntryContentTypeFieldType>;
  updatedAt?: Maybe<Scalars["Time"]>;
};

type ContentEntryFieldData = {
  valueString?: string | null;
  valueBool?: boolean | null;
  valueKeywords?: string | null; // Assuming keywords are stored as a string
  valueDate?: number | null; // Timestamp in milliseconds
  valueNumber?: number | null;
  valueObjects?: string | null; // Assuming JSON string representation of objects
};

export const processDataForEntryField = (data: Maybe<Scalars["Any"]>): ContentEntryFieldData => {
  if (data === null || data === undefined) {
    // Handle null or undefined data
    return {};
  } else if (typeof data === "string") {
    // Assuming if it can be parsed as a date or a JSON object, you might want to handle those cases
    try {
      const parsedDate = Date.parse(data);
      if (!isNaN(parsedDate)) {
        return { valueDate: parsedDate };
      }
    } catch (e) {
      // Not a date, continue to check for JSON
    }

    try {
      JSON.parse(data);
      // If parsing succeeded, assume it's meant to be an object
      return { valueObjects: data };
    } catch (e) {
      // Not JSON, treat as a regular string
      return { valueString: data };
    }
  } else if (typeof data === "boolean") {
    return { valueBool: data };
  } else if (typeof data === "number") {
    // You might want to further distinguish between integers and floats if necessary
    return { valueNumber: data };
  } else if (Array.isArray(data) || typeof data === "object") {
    // Assuming you convert arrays or objects to a JSON string
    return { valueObjects: JSON.stringify(data) };
  }

  // Add more conditions as necessary for other types or specific handling

  return {}; // Default case if none of the above matched
};
