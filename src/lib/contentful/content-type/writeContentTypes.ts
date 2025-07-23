import {
  ContentType as CommonContentType,
  ContentFieldType,
  ContentTypeFieldConnectionVisualization,
  ContentTypeFieldOptions,
  ContentTypeVariant,
} from "../../common/types/content-type";

import { writeContentType } from "../../common/writer/content-type";

import { ContentEntryContentTypeFieldType } from "../../common/types/content-entry";
import { ContentType, ContentTypeField } from "../types/lib";

const ContentFieldTypeMap = new Map<string, ContentEntryContentTypeFieldType>();
const ContentFieldNameMap = new Map<string, string>();
export { ContentFieldTypeMap, ContentFieldNameMap };

const normalizeContentfulFieldType = (type: any): ContentFieldType => {
  switch (type) {
    case "Boolean":
      return ContentFieldType.Boolean;
    case "Symbol":
      return ContentFieldType.String;
    case "Text":
      return ContentFieldType.String;
    case "Integer":
      return ContentFieldType.Int;
    case "Number":
      return ContentFieldType.Float;
    case "Date":
      return ContentFieldType.Datetime;
    case "Link":
      return ContentFieldType.Connection;
    case "ResourceLink":
      return ContentFieldType.Connection;
    case "Array":
      return ContentFieldType.Array;
    case "RichText":
      return ContentFieldType.Richtext;
    case "Location":
      return ContentFieldType.Geopoint;
    case "Object":
      return ContentFieldType.Extension;
    default:
      throw new Error(`Unsupported field type: ${type}`);
  }
};

const normalizeContentEntryContentTypeFieldType = (type: any): ContentEntryContentTypeFieldType => {
  switch (type) {
    case "Boolean":
      return ContentEntryContentTypeFieldType.Boolean;
    case "Symbol":
      return ContentEntryContentTypeFieldType.String;
    case "Text":
      return ContentEntryContentTypeFieldType.String;
    case "Integer":
      return ContentEntryContentTypeFieldType.Int;
    case "Number":
      return ContentEntryContentTypeFieldType.Float;
    case "Date":
      return ContentEntryContentTypeFieldType.DateTime;
    case "Link":
      return ContentEntryContentTypeFieldType.Connection;
    case "ResourceLink":
      return ContentEntryContentTypeFieldType.Connection;
    case "Array":
      return ContentEntryContentTypeFieldType.Array;
    case "RichText":
      return ContentEntryContentTypeFieldType.RichText;
    case "Location":
      return ContentEntryContentTypeFieldType.GeoPoint;
    case "Object":
      return ContentEntryContentTypeFieldType.Extension;
    default:
      throw new Error(`Unsupported field type: ${type}`);
  }
};

const normalizeContentfulFieldOptions = (
  field: ContentTypeField,
  contentTypes: ContentType[],
): ContentTypeFieldOptions => {
  const min = field?.validations?.find((v: any) => v.size)?.size?.min || undefined;
  const max = field?.validations?.find((v: any) => v.size)?.size?.max || undefined;

  let connectedIds =
    (field?.items?.type === "Link" &&
      field?.items?.validations?.find((v: any) => v.linkContentType)?.linkContentType) ||
    undefined;

  if (field.type === "Link" && field.linkType == "Asset") {
    // Asset links don't need connectedIds processing
  } else if (field.type === "Link") {
    connectedIds = field?.validations?.find((v: any) => v.linkContentType)?.linkContentType || undefined;
  }

  const filteredConnectedIds = connectedIds
    ? connectedIds.filter((id: string) => contentTypes.some(ct => ct.sys.id === id))
    : undefined;

  let unqiue = undefined;
  let pattern = undefined;
  let extra: any = undefined;
  if (field.type === "Symbol") {
    unqiue = field.validations?.find((v: any) => v.unique)?.unique || undefined;
    pattern = field.validations?.find((v: any) => v.regexp)?.regexp?.pattern || undefined;
    if (unqiue || pattern) {
      extra = {
        uniqueLocal: unqiue,
        string: {
          pattern,
        },
      };
    }
  }

  return {
    required: field.required,
    localized: field.localized,
    disableInUi: field.disabled,
    disableInApi: field.omitted,
    ...((field.items?.type === "Link" || field.type == "Array" || field.type == "Link") && {
      connection: {
        multiple: field.type == "Array",
        variant:
          field.type === "Link" && field.linkType == "Asset"
            ? ContentTypeVariant.Asset
            : ContentTypeVariant.Unspecified,
        visualization: ContentTypeFieldConnectionVisualization.Deafult,
        ...(min !== undefined ? { min } : {}),
        ...(max !== undefined ? { max } : {}),
        ...(filteredConnectedIds ? { connectedIds: filteredConnectedIds } : {}),
      },
    }),
    ...(extra ? extra : {}),
  };
};

export const normalizeContentfulContentTypeVariant = (sys: any): ContentTypeVariant => {
  if (sys.contentType?.sys?.id === "asset") {
    return ContentTypeVariant.Asset;
  }
  return ContentTypeVariant.Document;
};

const normalizeContentfulContentType = (contentType: ContentType, contentTypes: ContentType[]): CommonContentType => {
  return {
    id: contentType.sys.id,
    name: contentType.sys.id,
    title: contentType.name || contentType.sys.id,
    description: contentType.description,
    variant: normalizeContentfulContentTypeVariant(contentType.sys),
    groups: [
      {
        id: contentType.sys.id + "-group",
        name: "Main",
        position: 0,
        contentTypeId: contentType.sys.id,
        fields: contentType.fields.map((field, index) => {
          ContentFieldTypeMap.set(
            contentType.sys.id + "_" + field.id,
            normalizeContentEntryContentTypeFieldType(field.type),
          );
          ContentFieldNameMap.set(contentType.sys.id + "_" + field.id, field.name);
          return {
            id: contentType.sys.id + "_" + field.id,
            name: field.id,
            title: field.name,
            groupId: contentType.sys.id + "-group",
            contentTypeId: contentType.sys.id,
            type: normalizeContentfulFieldType(field.type),
            position: index,
            primary: field.id === contentType.displayField,
            options: normalizeContentfulFieldOptions(field, contentTypes),
          };
        }),
      },
    ],
  };
};

export const writeContentTypes = async (contentTypes: any[]) => {
  for (const contentType of contentTypes) {
    try {
      const normalizedContentType = normalizeContentfulContentType(contentType, contentTypes);
      // console.info(JSON.stringify(normalizedContentType, null, 2));
      await writeContentType(normalizedContentType);
    } catch (e) {
      const normalizedContentType = normalizeContentfulContentType(contentType, contentTypes);
      console.error(JSON.stringify(normalizedContentType, null, 2));
      throw new Error(`Error writing content type: ${e}`);
    }
  }
};
