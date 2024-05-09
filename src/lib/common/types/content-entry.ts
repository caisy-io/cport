import { Maybe, Scalars } from "./util";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

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
  Array = "array",
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

const processRichText = (richTextData) => {
  const content = [];

  // Handle top-level structure differently if needed
  if (richTextData && richTextData.content) {
    richTextData.content.forEach((node) => {
      const processedNode = processNode(node);
      if (processedNode) content.push(processedNode);
    });
  }

  return { type: richTextData.type || "doc", content }; // Dynamically assign the type if it's specified in the data
};

// Process individual nodes in the rich text
function processNode(node) {
  switch (node.nodeType) {
    case "paragraph":
      return {
        type: "paragraph",
        children: node.content ? node.content.flatMap((subNode) => processNode(subNode)) : [],
      };
    case "text":
      return {
        text: node.value,
        type: "text",
      };
    case "embedded-entry-block":
      // Handle embedded entries like images or other linked content
      return {
        type: "embedded-entry",
        attrs: {
          id: node.data.target.sys.id,
          type: node.data.target.sys.type,
        },
      };
    default:
      // Recursively handle generic cases or other node types
      if (node.content) {
        return node.content.flatMap((subNode) => processNode(subNode));
      }
      return null;
  }
}

const processConnectionData = (connectionData) => {
  if (Array.isArray(connectionData)) {
    return connectionData.map((link) => formatId(link.sys.id)).join(", ");
  } else if (connectionData && connectionData.sys) {
    return formatId(connectionData.sys.id);
  }
  return null;
};
const formatId = (id) => `{${id}}`;

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

export const processDataForContentfulEntryField = (
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
        valueKeywords: processConnectionData(data),
        valueDate: undefined,
      };
    case ContentEntryContentTypeFieldType.Extension:
    case ContentEntryContentTypeFieldType.GeoPoint:
    case ContentEntryContentTypeFieldType.RichText:
    case ContentEntryContentTypeFieldType.File:
    case ContentEntryContentTypeFieldType.Video:
    case ContentEntryContentTypeFieldType.Code:
      if (fieldType === ContentEntryContentTypeFieldType.RichText) {
        return {
          valueObjects: JSON.stringify(processRichText(data)),
          valueString: undefined,
          valueBool: undefined,
          valueNumber: undefined,
          valueKeywords: undefined,
          valueDate: undefined,
        };
      }
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

export type AssetFile = {
  id?: Maybe<Scalars["String"]>;
  originalUrl?: Maybe<Scalars["String"]>;
  localPath?: Maybe<Scalars["String"]>;
};

const customComponentRenderer = (node) => {
  switch (node.nodeType) {
    case BLOCKS.EMBEDDED_ENTRY:
      return `<div class="embedded-entry">${node.data.target.fields.title}</div>`;

    case BLOCKS.EMBEDDED_ASSET:
      if (node.data.target.fields.file.contentType.startsWith("image/")) {
        return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title || "Embedded Image"}" />`;
      }
      return `<a href="${node.data.target.fields.file.url}">Download ${node.data.target.fields.title}</a>`;

    default:
      return `Rendered: ${node.nodeType}`;
  }
};
const options = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (node) =>
      `<div>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</div>`,
    [BLOCKS.PARAGRAPH]: (node) =>
      `<p>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</p>`,
    [BLOCKS.HEADING_1]: (node) =>
      `<h1>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</h1>`,
    [BLOCKS.HEADING_2]: (node) =>
      `<h2>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</h2>`,
    [BLOCKS.HEADING_3]: (node) =>
      `<h3>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</h3>`,
    [BLOCKS.HEADING_4]: (node) =>
      `<h4>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</h4>`,
    [BLOCKS.HEADING_5]: (node) =>
      `<h5>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</h5>`,
    [BLOCKS.HEADING_6]: (node) =>
      `<h6>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</h6>`,
    [BLOCKS.UL_LIST]: (node) =>
      `<ul>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</ul>`,
    [BLOCKS.OL_LIST]: (node) =>
      `<ol>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</ol>`,
    [BLOCKS.LIST_ITEM]: (node) =>
      `<li>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</li>`,
    [BLOCKS.QUOTE]: (node) =>
      `<blockquote>${node.content.map((child) => documentToHtmlString(child, options)).join("")}</blockquote>`,
    [BLOCKS.HR]: () => `<hr/>`,
    [BLOCKS.EMBEDDED_ENTRY]: (node) => `<div>${customComponentRenderer(node)}</div>`,
    [BLOCKS.EMBEDDED_ASSET]: (node) =>
      `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}"/>`,
    [BLOCKS.EMBEDDED_RESOURCE]: (node) => `<div>Embedded Resource: ${node.data.target.id}</div>`,
    [INLINES.EMBEDDED_ENTRY]: (node) => `<span>Inline Entry: ${node.data.target.id}</span>`,
    [INLINES.HYPERLINK]: (node) =>
      `<a href="${node.data.uri}">${node.content.map((child) => documentToHtmlString(child, options)).join("")}</a>`,
    [INLINES.ENTRY_HYPERLINK]: (node) =>
      `<a href="/entries/${node.data.target.id}">${node.content.map((child) => documentToHtmlString(child, options)).join("")}</a>`,
    [INLINES.ASSET_HYPERLINK]: (node) =>
      `<a href="${node.data.target.fields.file.url}">${node.content.map((child) => documentToHtmlString(child, options)).join("")}</a>`,
  },
  renderMark: {
    [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
    [MARKS.ITALIC]: (text) => `<em>${text}</em>`,
    [MARKS.UNDERLINE]: (text) => `<u>${text}</u>`,
    [MARKS.CODE]: (text) => `<code>${text}</code>`,
    [MARKS.SUPERSCRIPT]: (text) => `<sup>${text}</sup>`,
    [MARKS.SUBSCRIPT]: (text) => `<sub>${text}</sub>`,
  },
};

const convertRichTextToHtml = (document) => {
  return documentToHtmlString(document, options);
};
