export interface ContentfulExport {
  contentTypes: ContentfulExportContentType[];
  tags: any[];
  editorInterfaces: EditorInterface[];
  entries: Entry[];
  assets: Asset[];
  locales: Locale[];
  webhooks: any[];
  roles: Role[];
}

export interface Asset {
  metadata: Metadata;
  sys: AssetSys;
  fields: AssetFields;
}

export interface AssetFields {
  title: Description;
  file: File;
  description?: Description;
}

export interface Description {
  "en-US": string;
}

export interface File {
  "en-US": EnUS;
}

export interface EnUS {
  url: string;
  details: Details;
  fileName: string;
  contentType: ContentTypeEnum;
}

export enum ContentTypeEnum {
  ImageJPEG = "image/jpeg",
  ImagePNG = "image/png",
  ImageSVGXML = "image/svg+xml",
}

export interface Details {
  size: number;
  image: Image;
}

export interface Image {
  width: number;
  height: number;
}

export interface Metadata {
  tags: any[];
}

export interface AssetSys {
  space: ContentType;
  id: string;
  type: LinkTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  environment: ContentType;
  publishedVersion: number;
  publishedAt: Date;
  firstPublishedAt: Date;
  createdBy: ContentType;
  updatedBy: ContentType;
  publishedCounter: number;
  version: number;
  publishedBy: ContentType;
  urn: string;
  automationTags?: any[];
  contentType?: ContentType;
}

export interface ContentType {
  sys: CreatedBySys;
}

export interface CreatedBySys {
  type: PurpleType;
  linkType: LinkTypeEnum;
  id: string;
  uuid?: string;
}

export enum LinkTypeEnum {
  Asset = "Asset",
  ContentType = "ContentType",
  Entry = "Entry",
  Environment = "Environment",
  Space = "Space",
  User = "User",
}

export enum PurpleType {
  Array = "Array",
  Boolean = "Boolean",
  Date = "Date",
  Integer = "Integer",
  Link = "Link",
  Number = "Number",
  RichText = "RichText",
  Symbol = "Symbol",
  Text = "Text",
}

export interface ContentfulExportContentType {
  sys: AssetSys;
  displayField: DisplayField | null;
  name: string;
  description: string;
  fields: Field[];
}

export enum DisplayField {
  InternalName = "internalName",
  InternalTitle = "internalTitle",
  Name = "name",
  Slug = "slug",
}

export interface Field {
  id: string;
  name: string;
  type: PurpleType;
  localized: boolean;
  required: boolean;
  validations: FieldValidation[];
  disabled: boolean;
  omitted: boolean;
  linkType?: LinkTypeEnum;
  items?: Items;
}

export interface Items {
  type: PurpleType;
  validations: EntryHyperlinkElement[];
  linkType: LinkTypeEnum;
}

export interface EntryHyperlinkElement {
  linkContentType: string[];
}

export interface FieldValidation {
  nodes?: Nodes;
  enabledMarks?: EnabledMark[];
  message?: string;
  enabledNodeTypes?: string[];
  linkContentType?: string[];
  linkMimetypeGroup?: string[];
  in?: string[];
  size?: Size;
  regexp?: Regexp;
  unique?: boolean;
  range?: Range;
}

export enum EnabledMark {
  Bold = "bold",
  Code = "code",
  Italic = "italic",
  Subscript = "subscript",
  Superscript = "superscript",
  Underline = "underline",
}

export interface Nodes {
  "entry-hyperlink"?: EntryHyperlinkElement[];
  "embedded-entry-inline"?: EmbeddedEntryInline[];
  "embedded-asset-block"?: AssetHyperlink[];
  "embedded-entry-block"?: EmbeddedEntryBlock[];
  "asset-hyperlink"?: AssetHyperlink[];
}

export interface AssetHyperlink {
  size: Size;
}

export interface Size {
  min?: number;
  max: number;
}

export interface EmbeddedEntryBlock {
  size?: Size;
  linkContentType?: LinkContentType[];
}

export enum LinkContentType {
  NTMergetag = "nt_mergetag",
  TopicPerson = "topicPerson",
  TopicProductFeature = "topicProductFeature",
}

export interface EmbeddedEntryInline {
  linkContentType: LinkContentType[];
  message: null;
}

export interface Range {
  min: number;
}

export interface Regexp {
  pattern: string;
}

export interface EditorInterface {
  sys: EditorInterfaceSys;
  editors?: Editor[];
  sidebar?: Sidebar[];
  controls: Control[];
}

export interface Control {
  fieldId: string;
  widgetId?: string;
  widgetNamespace?: ControlWidgetNamespace;
  settings?: ControlSettings;
}

export interface ControlSettings {
  trueLabel?: string;
  falseLabel?: string;
  helpText?: string;
  showLinkEntityAction?: boolean;
  showCreateEntityAction?: boolean;
  bulkEditing?: boolean;
  trackingFieldId?: DisplayField;
  ampm?: string;
  format?: string;
}

export enum ControlWidgetNamespace {
  Builtin = "builtin",
}

export interface Editor {
  widgetId: EditorWidgetID;
  widgetNamespace: EditorWidgetNamespace;
}

export enum EditorWidgetID {
  DefaultEditor = "default-editor",
}

export enum EditorWidgetNamespace {
  EditorBuiltin = "editor-builtin",
}

export interface Sidebar {
  settings?: DataClass;
  widgetId: SidebarWidgetID;
  widgetNamespace: SidebarWidgetNamespace;
}

export interface DataClass {}

export enum SidebarWidgetID {
  ContentPreviewWidget = "content-preview-widget",
  IncomingLinksWidget = "incoming-links-widget",
  PublicationWidget = "publication-widget",
  TranslationWidget = "translation-widget",
  VersionsWidget = "versions-widget",
}

export enum SidebarWidgetNamespace {
  SidebarBuiltin = "sidebar-builtin",
}

export interface EditorInterfaceSys {
  id: ID;
  type: FluffyType;
  space: ContentType;
  version: number;
  createdAt: Date;
  createdBy: ContentType;
  updatedAt: Date;
  updatedBy: ContentType;
  contentType: ContentType;
  environment: ContentType;
}

export enum ID {
  Default = "default",
}

export enum FluffyType {
  EditorInterface = "EditorInterface",
}

export interface Entry {
  metadata: Metadata;
  sys: AssetSys;
  fields: EntryFields;
}

export interface EntryFields {
  internalName?: Description;
  name?: GroupName;
  shortDescription?: ShortDescription;
  longDescription?: Bio;
  headline?: GroupName;
  block1Body?: Bio;
  block2Body?: Bio;
  block3Body?: Bio;
  colorPalette?: Description;
  body?: Body;
  bio?: Bio;
  avatar?: Avatar;
  location?: GroupName;
  cardStyle?: CardStyle;
  block1Image?: Avatar;
  block2Image?: Avatar;
  block3Image?: Avatar;
  subline?: GroupName;
  products?: ExtraSection;
  bodyText?: Bio;
  image?: Avatar;
  imageStyle?: CardStyle;
  heroSize?: CardStyle;
  quote?: Bio;
  quoteAlignment?: CardStyle;
  imagePosition?: CardStyle;
  description?: Bio;
  featuredImage?: Avatar;
  features?: ExtraSection;
  price?: Price;
  containerLayout?: CardStyle;
  pageName?: GroupName;
  slug?: Description;
  pageContent?: Avatar;
  extraSection?: ExtraSection;
  topSection?: ExtraSection;
  internalTitle?: Description;
  featuredPages?: ExtraSection;
  menuItems?: ExtraSection;
  legalLinks?: Avatar;
  twitterLink?: Description;
  facebookLink?: Description;
  linkedinLink?: Description;
  instagramLink?: Description;
  groupName?: GroupName;
  groupLink?: Avatar;
}

export interface Avatar {
  "en-US": ContentType;
}

export interface Bio {
  "de-DE"?: BioDeDE;
  "en-US": BioDeDE;
}

export interface BioDeDE {
  data: DataClass;
  content: PurpleContent[];
  nodeType: DeDENodeType;
}

export interface PurpleContent {
  data: DataClass;
  content: ContentContent[];
  nodeType: FluffyNodeType;
}

export interface ContentContent {
  data: DataClass;
  marks?: Mark[];
  value?: string;
  nodeType: PurpleNodeType;
  content?: ContentContent[];
}

export interface Mark {
  type: EnabledMark;
}

export enum PurpleNodeType {
  ListItem = "list-item",
  Paragraph = "paragraph",
  Text = "text",
}

export enum FluffyNodeType {
  Blockquote = "blockquote",
  Heading3 = "heading-3",
  Heading5 = "heading-5",
  Paragraph = "paragraph",
}

export enum DeDENodeType {
  Document = "document",
}

export interface Body {
  "de-DE": BodyDeDE;
  "en-US": BodyDeDE;
}

export interface BodyDeDE {
  data: DataClass;
  content: FluffyContent[];
  nodeType: DeDENodeType;
}

export interface FluffyContent {
  data: Data;
  content: ContentContent[];
  nodeType: string;
}

export interface Data {
  target?: ContentType;
}

export interface CardStyle {
  "en-US": boolean;
}

export interface ExtraSection {
  "en-US": ContentType[];
}

export interface GroupName {
  "de-DE"?: string;
  "en-US": string;
}

export interface Price {
  "de-DE": number;
  "en-US": number;
}

export interface ShortDescription {
  "de-DE"?: BioDeDE | string;
  "en-US": BioDeDE | string;
}

export interface Locale {
  name: string;
  code: string;
  fallbackCode: null | string;
  default: boolean;
  contentManagementApi: boolean;
  contentDeliveryApi: boolean;
  optional: boolean;
  sys: LocaleSys;
}

export interface LocaleSys {
  type: string;
  id: string;
  version: number;
  space: ContentType;
  environment?: ContentType;
  createdBy: ContentType;
  createdAt: Date;
  updatedBy: ContentType;
  updatedAt: Date;
}

export interface Role {
  name: string;
  description: string;
  policies: Policy[];
  permissions: Permissions;
  sys: LocaleSys;
}

export interface Permissions {
  ContentModel: ContentModel[];
  Settings: any[];
  ContentDelivery: any[];
  Environments: any[];
  EnvironmentAliases: any[];
  Tags: any[];
}

export enum ContentModel {
  Create = "create",
  Read = "read",
  Update = "update",
}

export interface Policy {
  effect: Effect;
  actions: ContentModel[] | string;
  constraint: Constraint;
}

export interface Constraint {
  and: And[];
}

export interface And {
  equals?: Array<Path | LinkTypeEnum>;
  paths?: Path[];
}

export interface Path {
  doc: Doc;
}

export enum Doc {
  Fields = "fields.%.%",
  SysType = "sys.type",
}

export enum Effect {
  Allow = "allow",
}
