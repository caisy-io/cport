// copy-paste from shema.graphql

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  DateTime: any;
  Map: any;
  Object: any;
  Time: any;
  _Any: any;
  _FieldSet: any;
};

export type Maybe<T> = T | null;

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage?: Maybe<Scalars["Boolean"]>;
  hasPreviousPage?: Maybe<Scalars["Boolean"]>;
  startCursor?: Maybe<Scalars["String"]>;
};

export type BlueprintChangeSet = {
  __typename?: "BlueprintChangeSet";
  fields?: Maybe<Array<Maybe<BlueprintFieldChangeSet>>>;
  sourceBlueprintId?: Maybe<Scalars["String"]>;
  targetBlueprintId?: Maybe<Scalars["String"]>;
};

export type BlueprintField = {
  __typename?: "BlueprintField";
  blueprintFieldId?: Maybe<Scalars["String"]>;
  blueprintGroupId?: Maybe<Scalars["String"]>;
  blueprintId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  options?: Maybe<BlueprintFieldOptions>;
  system?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<BlueprintFieldType>;
};

export type BlueprintFieldChangeSet = {
  __typename?: "BlueprintFieldChangeSet";
  sourceBlueprintFieldId?: Maybe<Scalars["String"]>;
  targetBlueprintFieldId?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldCode = {
  __typename?: "BlueprintFieldCode";
  languages?: Maybe<Array<Maybe<Scalars["String"]>>>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
};

export type BlueprintFieldCodeInput = {
  languages?: Maybe<Array<Maybe<Scalars["String"]>>>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
};

export type BlueprintFieldConnection = {
  __typename?: "BlueprintFieldConnection";
  connectedIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  multiple?: Maybe<Scalars["Boolean"]>;
  variant?: Maybe<BlueprintVariant>;
  visualization?: Maybe<BlueprintFieldConnectionVisualization>;
};

export type BlueprintFieldConnectionInput = {
  connectedIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  multiple?: Maybe<Scalars["Boolean"]>;
  variant?: Maybe<BlueprintVariant>;
  visualization?: Maybe<BlueprintFieldConnectionVisualization>;
};

export enum BlueprintFieldConnectionVisualization {
  BlueprintFieldConnectionVisualizationDeafult = "BLUEPRINT_FIELD_CONNECTION_VISUALIZATION_DEAFULT",
  BlueprintFieldConnectionVisualizationInline = "BLUEPRINT_FIELD_CONNECTION_VISUALIZATION_INLINE",
  BlueprintFieldConnectionVisualizationUnspecified = "BLUEPRINT_FIELD_CONNECTION_VISUALIZATION_UNSPECIFIED",
}

export type BlueprintFieldDatetime = {
  __typename?: "BlueprintFieldDatetime";
  time?: Maybe<Scalars["Boolean"]>;
};

export type BlueprintFieldDatetimeInput = {
  time?: Maybe<Scalars["Boolean"]>;
};

export type BlueprintFieldExtension = {
  __typename?: "BlueprintFieldExtension";
  height?: Maybe<Scalars["Int"]>;
  pattern?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldExtensionInput = {
  height?: Maybe<Scalars["Int"]>;
  pattern?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldFile = {
  __typename?: "BlueprintFieldFile";
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldFileInput = {
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldFloat = {
  __typename?: "BlueprintFieldFloat";
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
};

export type BlueprintFieldFloatInput = {
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
};

export type BlueprintFieldInput = {
  blueprintFieldId?: Maybe<Scalars["String"]>;
  blueprintGroupId?: Maybe<Scalars["String"]>;
  blueprintId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  options?: Maybe<BlueprintFieldOptionsInput>;
  system?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<BlueprintFieldType>;
};

export type BlueprintFieldInputInput = {
  blueprintFieldId?: Maybe<Scalars["String"]>;
  blueprintGroupId?: Maybe<Scalars["String"]>;
  blueprintId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  options?: Maybe<BlueprintFieldOptionsInput>;
  system?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<BlueprintFieldType>;
};

export type BlueprintFieldInt = {
  __typename?: "BlueprintFieldInt";
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
};

export type BlueprintFieldIntInput = {
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
};

export type BlueprintFieldOptions = {
  __typename?: "BlueprintFieldOptions";
  code?: Maybe<BlueprintFieldCode>;
  connection?: Maybe<BlueprintFieldConnection>;
  datetime?: Maybe<BlueprintFieldDatetime>;
  disableInApi?: Maybe<Scalars["Boolean"]>;
  disableInUi?: Maybe<Scalars["Boolean"]>;
  extension?: Maybe<BlueprintFieldExtension>;
  external?: Maybe<Scalars["String"]>;
  file?: Maybe<BlueprintFieldFile>;
  float?: Maybe<BlueprintFieldFloat>;
  int?: Maybe<BlueprintFieldInt>;
  localized?: Maybe<Scalars["Boolean"]>;
  primary?: Maybe<Scalars["Boolean"]>;
  required?: Maybe<Scalars["Boolean"]>;
  richtext?: Maybe<BlueprintFieldRichtext>;
  select?: Maybe<BlueprintFieldSelect>;
  string?: Maybe<BlueprintFieldString>;
  tag?: Maybe<BlueprintFieldTag>;
  uniqueGlobal?: Maybe<Scalars["Boolean"]>;
  uniqueLocal?: Maybe<Scalars["Boolean"]>;
  video?: Maybe<BlueprintFieldVideo>;
};

export type BlueprintFieldOptionsInput = {
  code?: Maybe<BlueprintFieldCodeInput>;
  connection?: Maybe<BlueprintFieldConnectionInput>;
  datetime?: Maybe<BlueprintFieldDatetimeInput>;
  disableInApi?: Maybe<Scalars["Boolean"]>;
  disableInUi?: Maybe<Scalars["Boolean"]>;
  extension?: Maybe<BlueprintFieldExtensionInput>;
  external?: Maybe<Scalars["String"]>;
  file?: Maybe<BlueprintFieldFileInput>;
  float?: Maybe<BlueprintFieldFloatInput>;
  int?: Maybe<BlueprintFieldIntInput>;
  localized?: Maybe<Scalars["Boolean"]>;
  primary?: Maybe<Scalars["Boolean"]>;
  required?: Maybe<Scalars["Boolean"]>;
  richtext?: Maybe<BlueprintFieldRichtextInput>;
  select?: Maybe<BlueprintFieldSelectInput>;
  string?: Maybe<BlueprintFieldStringInput>;
  tag?: Maybe<BlueprintFieldTagInput>;
  uniqueGlobal?: Maybe<Scalars["Boolean"]>;
  uniqueLocal?: Maybe<Scalars["Boolean"]>;
  video?: Maybe<BlueprintFieldVideoInput>;
};

export type BlueprintFieldRichtext = {
  __typename?: "BlueprintFieldRichtext";
  assetBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  assetLinking?: Maybe<Scalars["Boolean"]>;
  componentBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  componentLinking?: Maybe<Scalars["Boolean"]>;
  documentBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  documentLinking?: Maybe<Scalars["Boolean"]>;
  features?: Maybe<BlueprintFieldRichtextFeatures>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldRichtextFeatures = {
  __typename?: "BlueprintFieldRichtextFeatures";
  alignCenter?: Maybe<Scalars["Boolean"]>;
  alignJustify?: Maybe<Scalars["Boolean"]>;
  alignLeft?: Maybe<Scalars["Boolean"]>;
  alignRight?: Maybe<Scalars["Boolean"]>;
  blockquote?: Maybe<Scalars["Boolean"]>;
  bold?: Maybe<Scalars["Boolean"]>;
  code?: Maybe<Scalars["Boolean"]>;
  codeblock?: Maybe<Scalars["Boolean"]>;
  frame?: Maybe<Scalars["Boolean"]>;
  h1?: Maybe<Scalars["Boolean"]>;
  h2?: Maybe<Scalars["Boolean"]>;
  h3?: Maybe<Scalars["Boolean"]>;
  h4?: Maybe<Scalars["Boolean"]>;
  h5?: Maybe<Scalars["Boolean"]>;
  h6?: Maybe<Scalars["Boolean"]>;
  italic?: Maybe<Scalars["Boolean"]>;
  link?: Maybe<Scalars["Boolean"]>;
  ol?: Maybe<Scalars["Boolean"]>;
  table?: Maybe<Scalars["Boolean"]>;
  ul?: Maybe<Scalars["Boolean"]>;
};

export type BlueprintFieldRichtextFeaturesInput = {
  alignCenter?: Maybe<Scalars["Boolean"]>;
  alignJustify?: Maybe<Scalars["Boolean"]>;
  alignLeft?: Maybe<Scalars["Boolean"]>;
  alignRight?: Maybe<Scalars["Boolean"]>;
  blockquote?: Maybe<Scalars["Boolean"]>;
  bold?: Maybe<Scalars["Boolean"]>;
  code?: Maybe<Scalars["Boolean"]>;
  codeblock?: Maybe<Scalars["Boolean"]>;
  frame?: Maybe<Scalars["Boolean"]>;
  h1?: Maybe<Scalars["Boolean"]>;
  h2?: Maybe<Scalars["Boolean"]>;
  h3?: Maybe<Scalars["Boolean"]>;
  h4?: Maybe<Scalars["Boolean"]>;
  h5?: Maybe<Scalars["Boolean"]>;
  h6?: Maybe<Scalars["Boolean"]>;
  italic?: Maybe<Scalars["Boolean"]>;
  link?: Maybe<Scalars["Boolean"]>;
  ol?: Maybe<Scalars["Boolean"]>;
  table?: Maybe<Scalars["Boolean"]>;
  ul?: Maybe<Scalars["Boolean"]>;
};

export type BlueprintFieldRichtextInput = {
  assetBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  assetLinking?: Maybe<Scalars["Boolean"]>;
  componentBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  componentLinking?: Maybe<Scalars["Boolean"]>;
  documentBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  documentLinking?: Maybe<Scalars["Boolean"]>;
  features?: Maybe<BlueprintFieldRichtextFeaturesInput>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldSelect = {
  __typename?: "BlueprintFieldSelect";
  items?: Maybe<Array<Maybe<BlueprintFieldSelectItem>>>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  multiple?: Maybe<Scalars["Boolean"]>;
  outputEnumType?: Maybe<Scalars["Boolean"]>;
};

export type BlueprintFieldSelectInput = {
  items?: Maybe<Array<Maybe<BlueprintFieldSelectItemInput>>>;
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  multiple?: Maybe<Scalars["Boolean"]>;
  outputEnumType?: Maybe<Scalars["Boolean"]>;
};

export type BlueprintFieldSelectItem = {
  __typename?: "BlueprintFieldSelectItem";
  key?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldSelectItemInput = {
  key?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldString = {
  __typename?: "BlueprintFieldString";
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  multiline?: Maybe<Scalars["Boolean"]>;
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldStringInput = {
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  multiline?: Maybe<Scalars["Boolean"]>;
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldTag = {
  __typename?: "BlueprintFieldTag";
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldTagInput = {
  max?: Maybe<Scalars["Float"]>;
  min?: Maybe<Scalars["Float"]>;
  pattern?: Maybe<Scalars["String"]>;
};

export enum BlueprintFieldType {
  BlueprintFieldTypeBoolean = "BLUEPRINT_FIELD_TYPE_BOOLEAN",
  BlueprintFieldTypeCode = "BLUEPRINT_FIELD_TYPE_CODE",
  BlueprintFieldTypeColor = "BLUEPRINT_FIELD_TYPE_COLOR",
  BlueprintFieldTypeConnection = "BLUEPRINT_FIELD_TYPE_CONNECTION",
  BlueprintFieldTypeDatetime = "BLUEPRINT_FIELD_TYPE_DATETIME",
  BlueprintFieldTypeExtension = "BLUEPRINT_FIELD_TYPE_EXTENSION",
  BlueprintFieldTypeFile = "BLUEPRINT_FIELD_TYPE_FILE",
  BlueprintFieldTypeFloat = "BLUEPRINT_FIELD_TYPE_FLOAT",
  BlueprintFieldTypeGeopoint = "BLUEPRINT_FIELD_TYPE_GEOPOINT",
  BlueprintFieldTypeInt = "BLUEPRINT_FIELD_TYPE_INT",
  BlueprintFieldTypeRichtext = "BLUEPRINT_FIELD_TYPE_RICHTEXT",
  BlueprintFieldTypeSelect = "BLUEPRINT_FIELD_TYPE_SELECT",
  BlueprintFieldTypeString = "BLUEPRINT_FIELD_TYPE_STRING",
  BlueprintFieldTypeTag = "BLUEPRINT_FIELD_TYPE_TAG",
  BlueprintFieldTypeUnspecified = "BLUEPRINT_FIELD_TYPE_UNSPECIFIED",
  BlueprintFieldTypeVideo = "BLUEPRINT_FIELD_TYPE_VIDEO",
}

export type BlueprintFieldVideo = {
  __typename?: "BlueprintFieldVideo";
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintFieldVideoInput = {
  pattern?: Maybe<Scalars["String"]>;
};

export type BlueprintGroup = {
  __typename?: "BlueprintGroup";
  blueprintGroupId?: Maybe<Scalars["String"]>;
  fields?: Maybe<Array<Maybe<BlueprintField>>>;
  name?: Maybe<Scalars["String"]>;
};

export type BlueprintGroupInput = {
  blueprintGroupId?: Maybe<Scalars["String"]>;
  fields?: Maybe<Array<Maybe<BlueprintFieldInput>>>;
  name?: Maybe<Scalars["String"]>;
};

export type BlueprintGroupInputInput = {
  blueprintGroupId?: Maybe<Scalars["String"]>;
  fields?: Maybe<Array<Maybe<BlueprintFieldInputInput>>>;
  name?: Maybe<Scalars["String"]>;
};

export type BlueprintInputInput = {
  description?: Maybe<Scalars["String"]>;
  exposeMutations?: Maybe<Scalars["Boolean"]>;
  groups?: Maybe<Array<Maybe<BlueprintGroupInputInput>>>;
  name?: Maybe<Scalars["String"]>;
  previewImageUrl?: Maybe<Scalars["String"]>;
  single?: Maybe<Scalars["Boolean"]>;
  tagIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  variant?: Maybe<BlueprintVariant>;
};

export type BlueprintResponse = {
  __typename?: "BlueprintResponse";
  blueprintId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  exposeMutations?: Maybe<Scalars["Boolean"]>;
  groups?: Maybe<Array<Maybe<BlueprintGroup>>>;
  name?: Maybe<Scalars["String"]>;
  previewImageUrl?: Maybe<Scalars["String"]>;
  projectId?: Maybe<Scalars["String"]>;
  single?: Maybe<Scalars["Boolean"]>;
  system?: Maybe<Scalars["Boolean"]>;
  tagIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  updatedBy?: Maybe<Scalars["String"]>;
  variant?: Maybe<BlueprintVariant>;
};

export type BlueprintResponseConnection = {
  __typename?: "BlueprintResponseConnection";
  edges?: Maybe<Array<Maybe<BlueprintResponseConnectionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type BlueprintResponseConnectionEdge = {
  __typename?: "BlueprintResponseConnectionEdge";
  cursor?: Maybe<Scalars["String"]>;
  node?: Maybe<BlueprintResponse>;
};

export type BlueprintResponseInput = {
  blueprintId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  exposeMutations?: Maybe<Scalars["Boolean"]>;
  groups?: Maybe<Array<Maybe<BlueprintGroupInput>>>;
  name?: Maybe<Scalars["String"]>;
  previewImageUrl?: Maybe<Scalars["String"]>;
  projectId?: Maybe<Scalars["String"]>;
  single?: Maybe<Scalars["Boolean"]>;
  system?: Maybe<Scalars["Boolean"]>;
  tagIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  updatedBy?: Maybe<Scalars["String"]>;
  variant?: Maybe<BlueprintVariant>;
};

export type BlueprintUpsertInputInput = {
  blueprintId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  exposeMutations?: Maybe<Scalars["Boolean"]>;
  groups?: Maybe<Array<Maybe<BlueprintGroupInputInput>>>;
  name?: Maybe<Scalars["String"]>;
  previewImageUrl?: Maybe<Scalars["String"]>;
  projectId?: Maybe<Scalars["String"]>;
  single?: Maybe<Scalars["Boolean"]>;
  system?: Maybe<Scalars["Boolean"]>;
  tagIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  updatedBy?: Maybe<Scalars["String"]>;
  variant?: Maybe<BlueprintVariant>;
};

export enum BlueprintVariant {
  BlueprintVariantAsset = "BLUEPRINT_VARIANT_ASSET",
  BlueprintVariantComponent = "BLUEPRINT_VARIANT_COMPONENT",
  BlueprintVariantDocument = "BLUEPRINT_VARIANT_DOCUMENT",
  BlueprintVariantTemplate = "BLUEPRINT_VARIANT_TEMPLATE",
  BlueprintVariantUnspecified = "BLUEPRINT_VARIANT_UNSPECIFIED",
}
