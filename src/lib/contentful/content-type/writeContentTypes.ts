import { ContentType, ContentTypeField, ContentTypeFieldType } from "contentful";
import {
  ContentType as CommonContentType,
  ContentFieldType,
  ContentTypeFieldConnectionVisualization,
  ContentTypeFieldOptions,
  ContentTypeVariant,
} from "../../common/types/content-type";

import { writeContentType } from "../../common/writer/content-type";

const normalizeContentfulFieldType = (type: ContentTypeFieldType): ContentFieldType => {
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

const normalizeContentfulFieldOptions = (field: ContentTypeField): ContentTypeFieldOptions => {
  return {
    required: field.required,
    localized: field.localized,
    disableInUi: field.disabled,
    disableInApi: field.omitted,
    ...(field.items?.type === "Link" && {
      connection: {
        variant: ContentTypeVariant.Document,
        visualization: ContentTypeFieldConnectionVisualization.Deafult,
      },
    }),
  };
};

export const normalizeContentfulContentTypeVariant = (sys: any): ContentTypeVariant => {
  if (sys.contentType?.sys?.id === "asset") {
    return ContentTypeVariant.Asset;
  }
  return ContentTypeVariant.Document;
};

const normalizeContentfulContentType = (contentType: ContentType): CommonContentType => {
  return {
    id: contentType.sys.id,
    name: contentType.sys.id,
    title: contentType.name || contentType.sys.id,
    description: contentType.description,
    variant: normalizeContentfulContentTypeVariant(contentType.sys),
    groups: [
      {
        id: contentType.sys.id + "-group",
        name: contentType.sys.id + "-group",
        position: 0,
        contentTypeId: contentType.sys.id,
        fields: contentType.fields.map((field, index) => {
          return {
            id: contentType.sys.id + "_" + field.id,
            name: field.id,
            title: field.name,
            groupId: contentType.sys.id + "-group",
            contentTypeId: contentType.sys.id,
            type: normalizeContentfulFieldType(field.type),
            position: index,
            primary: false,
            options: normalizeContentfulFieldOptions(field),
          };
        }),
      },
    ],
  };
};

export const writeContentTypes = async (contentTypes: ContentType[]) => {
  for (const contentType of contentTypes) {
    try {
      const normalizedContentType = normalizeContentfulContentType(contentType);
      console.info(JSON.stringify(normalizedContentType, null, 2));
      await writeContentType(normalizedContentType);
    } catch (e) {
      const normalizedContentType = normalizeContentfulContentType(contentType);
      console.error(JSON.stringify(normalizedContentType, null, 2));
      throw new Error(`Error writing content type: ${e}`);
    }
  }
};
