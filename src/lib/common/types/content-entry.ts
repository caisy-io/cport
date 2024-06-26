import { Maybe, Scalars } from "./util";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";
import TurndownService from "turndown";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { generateUuidFromString } from "../../common/writer/content-entry";
// import { parseHTMLToJSON } from "@caisy/rich-text-html-parser";

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
  blueprintFieldName?: Maybe<Scalars["String"]>;
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

const processConnectionData = (connectionData) => {
  if (Array.isArray(connectionData)) {
    const ids = connectionData.map((link) => link.sys.id).join(",");
    return formatId(ids);
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

export const processDataForCaisyDocumentField = async (
  data: ContentEntryFieldData,
  fieldType: ContentEntryContentTypeFieldType,
  idMap: Map<string, string>,
): Promise<Maybe<Scalars["Any"]>> => {
  if (data === null || data === undefined) {
    return {};
  }

  const safelyParseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      console.error("DATA FAILED:", jsonString);
      return null; // or return jsonString to handle as raw data
    }
  };

  try {
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
      case ContentEntryContentTypeFieldType.Array:
        // return safelyParseJSON(data.valueKeywords);
        return safelyParseJSON(transformIdToJsonArray(data.valueKeywords, idMap));
      case ContentEntryContentTypeFieldType.Extension:
      case ContentEntryContentTypeFieldType.GeoPoint:
      case ContentEntryContentTypeFieldType.File:
      case ContentEntryContentTypeFieldType.Video:
      case ContentEntryContentTypeFieldType.Code:
        return safelyParseJSON(data.valueObjects);
      case ContentEntryContentTypeFieldType.RichText:
        if (isJsonString(data.valueObjects)) {
          return safelyParseJSON(data.valueObjects);
        } else {
          const { parseHTMLToJSON } = await import("@caisy/rich-text-html-parser");
          const richText = await parseHTMLToJSON(data.valueObjects);
          return richText;
        }
    }
  } catch (error) {
    console.error("Error processing data for Caisy document field:", error);
    return {};
  }

  return {}; // Default case if none of the above matched
};

function handleArrayOrString(data: string): any {
  try {
    // Check if data starts with an array-like or object-like structure
    if (data.startsWith("{") || data.startsWith("[")) {
      return JSON.parse(data);
    } else {
      // Assume it is a list of IDs separated by some delimiter and convert to an array
      return data.split(",").map((item) => item.trim());
    }
  } catch (error) {
    console.error("Failed to handle data as array or string:", error);
    return data; // Return original data if parsing fails
  }
}

function transformIdToJsonArray(dataSingle, idMap) {
  if (Array.isArray(dataSingle)) {
    return JSON.stringify(dataSingle.map((id) => getNewId(id, idMap)));
  } else if (dataSingle == null) {
    return JSON.stringify([]);
  } else {
    // Split the string by commas in case it contains multiple IDs in one string
    const ids = dataSingle
      .replace(/^\{|\}$/g, "")
      .trim()
      .split(",");
    const transformedIds = ids.map((id) => getNewId(id.trim(), idMap));
    return JSON.stringify(transformedIds);
  }
}

function getNewId(id, idMap) {
  return idMap.has(id) ? idMap.get(id) : generateUuidFromString(id);
}

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
    case ContentEntryContentTypeFieldType.Array:
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
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => `<div data-entry-id="${node.data.target.sys.id}"></div>`,
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

function preprocessMarkdownForCustomSyntax(markdown) {
  // Simple regex to find custom [entry-id:x] syntax and replace it with a JSON placeholder
  const entryIdPattern = /\[entry-id:([^\]]+)\]/g;
  return markdown.replace(entryIdPattern, (_, id) => {
    // Returning a JSON structure as a placeholder, adjust according to your rich text requirements
    return `<div class="entry-reference" data-entry-id="${id}"></div>`;
  });
}

export function convertHtmlToMarkdown(html: string): string {
  // Adjust your TurndownService setup here as needed
  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    fence: "```",
    emDelimiter: "*",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
  });

  // Adding a rule for `div` elements with `data-entry-id`
  turndownService.addRule("entryIdDivs", {
    filter: function (node) {
      return node.nodeName === "DIV" && node.getAttribute("data-entry-id");
    },
    replacement: function (content, node) {
      const id = node.getAttribute("data-entry-id");
      return `\n\n[entry-id:${id}]\n\n`;
    },
  });

  const markdown = turndownService.turndown(html);
  // Process the markdown to handle any custom syntax
  return preprocessMarkdownForCustomSyntax(markdown);
}

export async function convertMarkdownToRichText(markdown: string): Promise<Document | null> {
  try {
    // Assuming richTextFromMarkdown can handle simple HTML, convert preprocessed markdown
    const document: Document | null = await richTextFromMarkdown(markdown);
    return document;
  } catch (error) {
    console.error("Error converting Markdown to Rich Text:", error);
    return null;
  }
}

function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

async function performConversion(markdown: string) {
  const richTextDocument = await convertMarkdownToRichText(markdown);
  if (richTextDocument) {
    // console.log("Converted Rich Text:", JSON.stringify(richTextDocument, null, 2));
  } else {
    console.log("Failed to convert Markdown to Rich Text.");
  }
}
