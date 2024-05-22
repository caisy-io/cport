import { Maybe, Scalars } from "./util";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";

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
          valueObjects: convertRichTextToHtml(data),
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

const customComponentRenderer = (node: any): string => {
  return `Embedded entry with ID: ${node.data.target.sys.id}`;
};

const convertRichTextToHtml = (richTextDocument: Document): string => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => `<strong>${text}</strong>`,
      [MARKS.ITALIC]: (text: string) => `<em>${text}</em>`,
      [MARKS.UNDERLINE]: (text: string) => `<u>${text}</u>`,
      [MARKS.CODE]: (text: string) => `<code>${text}</code>`,
    },
    renderNode: {
      [BLOCKS.DOCUMENT]: (node: any, next: any) => `<div>${next(node.content)}</div>`,
      [BLOCKS.PARAGRAPH]: (node: any, next: any) => `<p>${next(node.content)}</p>`,
      [BLOCKS.HEADING_1]: (node: any, next: any) => `<h1>${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node: any, next: any) => `<h2>${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node: any, next: any) => `<h3>${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node: any, next: any) => `<h4>${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node: any, next: any) => `<h5>${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node: any, next: any) => `<h6>${next(node.content)}</h6>`,
      [BLOCKS.UL_LIST]: (node: any, next: any) => `<ul>${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node: any, next: any) => `<ol>${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node: any, next: any) => `<li>${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node: any, next: any) => `<blockquote>${next(node.content)}</blockquote>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => `<div>${customComponentRenderer(node)}</div>`,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) =>
        `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />`,
      [INLINES.HYPERLINK]: (node: any, next: any) => `<a href="${node.data.uri}">${next(node.content)}</a>`,
      [INLINES.ENTRY_HYPERLINK]: (node: any, next: any) =>
        `<a href="/entry/${node.data.target.sys.id}">${next(node.content)}</a>`,
      [INLINES.ASSET_HYPERLINK]: (node: any, next: any) =>
        `<a href="${node.data.target.fields.file.url}">${next(node.content)}</a>`,
    },
  };

  return documentToHtmlString(richTextDocument, options);
};

// const convertRichTextToHtml = (document) => {
//   return documentToHtmlString(document);
// };
