import { DocumentNode } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Any: any;
    /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
    BigInt: any;
    /** The `Byte` scalar type represents byte value as a Buffer */
    Byte: any;
    DateTime: any;
    Map: any;
    Object: any;
    Time: any;
};

export type ApiKeyInitalResponse = {
    __typename?: "APIKeyInitalResponse";
    apiKeyId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export type ApiKeyInputInput = {
    name?: Maybe<Scalars["String"]>;
};

export type ApiKeyResponse = {
    __typename?: "APIKeyResponse";
    apiKeyId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export type AccessTokenResponse = {
    __typename?: "AccessTokenResponse";
    createdAt?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export enum AllNoneEnum {
    All = "ALL",
    None = "NONE",
}

export type AnyToRoleConnection = {
    __typename?: "AnyToRoleConnection";
    title?: Maybe<Scalars["String"]>;
};

export type AssignRoleRequestInput = {
    emailAddress?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    systemRole?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type AssignRoleResponse = {
    __typename?: "AssignRoleResponse";
    success?: Maybe<Scalars["Boolean"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type AuditEventConnection = {
    __typename?: "AuditEventConnection";
    edges?: Maybe<Array<Maybe<AuditEventConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["BigInt"]>;
};

export type AuditEventConnectionEdge = {
    __typename?: "AuditEventConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<AuditEventPayload>;
};

export type AuditEventMeta = {
    __typename?: "AuditEventMeta";
    blueprintFieldId?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["Time"]>;
    documentId?: Maybe<Scalars["String"]>;
    documentLocaleId?: Maybe<Scalars["String"]>;
    documentStatusId?: Maybe<Scalars["Int"]>;
    effectedUserId?: Maybe<Scalars["String"]>;
    triggeredUserId?: Maybe<Scalars["String"]>;
    userRole?: Maybe<Scalars["String"]>;
};

export type AuditEventPayload = {
    __typename?: "AuditEventPayload";
    body?: Maybe<Scalars["Byte"]>;
    eventId?: Maybe<Scalars["String"]>;
    metaData?: Maybe<AuditEventMeta>;
    scope?: Maybe<AuditEventScope>;
    trigger?: Maybe<AuditEventTrigger>;
};

export type AuditEventScope = {
    __typename?: "AuditEventScope";
    projectId?: Maybe<Scalars["String"]>;
};

export enum AuditEventTrigger {
    BlueprintCreate = "BLUEPRINT_CREATE",
    BlueprintDelete = "BLUEPRINT_DELETE",
    BlueprintUpdate = "BLUEPRINT_UPDATE",
    DocumentCreate = "DOCUMENT_CREATE",
    DocumentDelete = "DOCUMENT_DELETE",
    DocumentFieldUpdate = "DOCUMENT_FIELD_UPDATE",
    DocumentUpdate = "DOCUMENT_UPDATE",
    ProjectMemberAssinged = "PROJECT_MEMBER_ASSINGED",
    ProjectMemberDeassinged = "PROJECT_MEMBER_DEASSINGED",
}

export type AuthenticateParamsInput = {
    access_token?: Maybe<Scalars["String"]>;
    access_token_secret?: Maybe<Scalars["String"]>;
    code?: Maybe<Scalars["String"]>;
    password?: Maybe<Scalars["String"]>;
    provider?: Maybe<Scalars["String"]>;
    user?: Maybe<UserInput>;
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

export type CaisyUserProfile = {
    __typename?: "CaisyUserProfile";
    displayName?: Maybe<Scalars["String"]>;
    email: Scalars["String"];
    id: Scalars["ID"];
    photoURL?: Maybe<Scalars["String"]>;
};

export type CaisyUserProfileInput = {
    displayName?: Maybe<Scalars["String"]>;
    firstName?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    photoURL?: Maybe<Scalars["String"]>;
};

export enum CanCannotEnum {
    Can = "CAN",
    Cannot = "CANNOT",
}

export type CheckBlueprintNameAvailableRequest = {
    blueprintName?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CheckBlueprintNameAvailableResponse = {
    __typename?: "CheckBlueprintNameAvailableResponse";
    available?: Maybe<Scalars["Boolean"]>;
};

export type CompletedOnboardingEventInput = {
    eventCodes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type CopyMemberFromProjectToProjectError = {
    __typename?: "CopyMemberFromProjectToProjectError";
    errorMessage?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type CopyMemberFromProjectToProjectRequestInput = {
    sourceProjectId?: Maybe<Scalars["String"]>;
    targetProjectId?: Maybe<Scalars["String"]>;
};

export type CopyMemberFromProjectToProjectResponse = {
    __typename?: "CopyMemberFromProjectToProjectResponse";
    errors?: Maybe<Array<Maybe<CopyMemberFromProjectToProjectError>>>;
    successfulMembers?: Maybe<Scalars["Int"]>;
    totalMembers?: Maybe<Scalars["Int"]>;
};

export type CreateApiKeyRequestInput = {
    apikey?: Maybe<ApiKeyInputInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreateApiKeyResponse = {
    __typename?: "CreateAPIKeyResponse";
    apikey?: Maybe<ApiKeyInitalResponse>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreateBlueprintRequest = {
    input?: Maybe<BlueprintInputInput>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type CreateBlueprintResponse = {
    __typename?: "CreateBlueprintResponse";
    blueprint?: Maybe<BlueprintResponse>;
};

export type CreateCaisyUserResult = {
    __typename?: "CreateCaisyUserResult";
    userId?: Maybe<Scalars["ID"]>;
};

export type CreateDocumentFieldLocaleRequestInput = {
    input?: Maybe<DocumentFieldLocaleInputInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreateDocumentFieldLocaleResponse = {
    __typename?: "CreateDocumentFieldLocaleResponse";
    documentFieldLocale?: Maybe<DocumentFieldLocaleResponse>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreateDocumentRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type CreateDocumentResponse = {
    __typename?: "CreateDocumentResponse";
    document?: Maybe<Document>;
};

export type CreateGroupRequestInput = {
    group?: Maybe<GroupInputInput>;
    organizationId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type CreateGroupResponse = {
    __typename?: "CreateGroupResponse";
    group?: Maybe<GroupResponse>;
};

export type CreateManyViewsRequestInput = {
    input?: Maybe<Array<Maybe<ViewCreateInputInput>>>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreateManyViewsResponse = {
    __typename?: "CreateManyViewsResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type CreateOrganizationRequestInput = {
    organization?: Maybe<OrganizationInputInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type CreateOrganizationResponse = {
    __typename?: "CreateOrganizationResponse";
    organization?: Maybe<OrganizationResponse>;
};

export type CreatePreviewItemRequestInput = {
    input?: Maybe<PreviewItemInputInput>;
    previewId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreatePreviewItemResponse = {
    __typename?: "CreatePreviewItemResponse";
    previewItem?: Maybe<PreviewItemResponse>;
};

export type CreatePreviewRequestInput = {
    input?: Maybe<PreviewInputInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type CreatePreviewResponse = {
    __typename?: "CreatePreviewResponse";
    preview?: Maybe<PreviewResponse>;
};

export type CreateProjectRequestInput = {
    organizationId?: Maybe<Scalars["String"]>;
    project?: Maybe<ProjectInputInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type CreateProjectResponse = {
    __typename?: "CreateProjectResponse";
    project?: Maybe<ProjectResponse>;
};

export type CreateReleaseRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    release?: Maybe<ReleaseInputInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type CreateReleaseResponse = {
    __typename?: "CreateReleaseResponse";
    release?: Maybe<ReleaseResponse>;
};

export type CreateRoleRuleRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleRule?: Maybe<RoleRuleInputInput>;
};

export type CreateRoleRuleResponse = {
    __typename?: "CreateRoleRuleResponse";
    roleRule?: Maybe<RoleRuleResponse>;
};

export type CreateTagInput = {
    color?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    referenceType?: Maybe<ReferenceType>;
};

export type CreateTagRequest = {
    tag?: Maybe<CreateTagInput>;
};

export type CreateTagResponse = {
    __typename?: "CreateTagResponse";
    tag?: Maybe<TagResponse>;
};

export type CreateUserAccessTokenRequestInput = {
    name?: Maybe<Scalars["String"]>;
};

export type CreateUserAccessTokenResponse = {
    __typename?: "CreateUserAccessTokenResponse";
    createdAt?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export type CreateUserRoleRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userRole?: Maybe<UserRoleInputInput>;
};

export type CreateUserRoleResponse = {
    __typename?: "CreateUserRoleResponse";
    userRole?: Maybe<UserRoleResponse>;
};

export type CreateViewPinRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
    viewId?: Maybe<Scalars["String"]>;
};

export type CreateViewPinResponse = {
    __typename?: "CreateViewPinResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type CreateViewRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    view?: Maybe<ViewCreateInputInput>;
};

export type CreateViewResponse = {
    __typename?: "CreateViewResponse";
    view?: Maybe<ViewResponse>;
};

export type CreateWebhookRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    webhook?: Maybe<WebhookInputInput>;
};

export type CreateWebhookResponse = {
    __typename?: "CreateWebhookResponse";
    webhook?: Maybe<WebhookResponse>;
};

export type DateInput = {
    day?: Maybe<Scalars["Int"]>;
    month?: Maybe<Scalars["Int"]>;
    year?: Maybe<Scalars["Int"]>;
};

export type DeAssignRoleRequestInput = {
    emailAddress?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type DeAssignRoleResponse = {
    __typename?: "DeAssignRoleResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteApiKeyRequestInput = {
    apiKeyId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteApiKeyResponse = {
    __typename?: "DeleteAPIKeyResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteBlueprintRequest = {
    blueprintId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type DeleteBlueprintResponse = {
    __typename?: "DeleteBlueprintResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteDocumentError = {
    __typename?: "DeleteDocumentError";
    documentId?: Maybe<Scalars["String"]>;
    errorMessage?: Maybe<Scalars["String"]>;
};

export type DeleteDocumentFieldLocaleRequestInput = {
    documentFieldLocaleId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteDocumentFieldLocaleResponse = {
    __typename?: "DeleteDocumentFieldLocaleResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteDocumentRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteDocumentResponse = {
    __typename?: "DeleteDocumentResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteEntrypointRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type DeleteEntrypointResponse = {
    __typename?: "DeleteEntrypointResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteGroupRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
};

export type DeleteGroupResponse = {
    __typename?: "DeleteGroupResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteManyDocumentsRequestInput = {
    deleteDocumentRequests?: Maybe<Array<Maybe<DeleteDocumentRequestInput>>>;
};

export type DeleteManyDocumentsResponse = {
    __typename?: "DeleteManyDocumentsResponse";
    batchErrors?: Maybe<Array<Maybe<DeleteDocumentError>>>;
    deletedDocumentIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type DeleteManyReleasesRequestInput = {
    id?: Maybe<Array<Maybe<Scalars["String"]>>>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteManyReleasesResponse = {
    __typename?: "DeleteManyReleasesResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteOrganizationRequestInput = {
    organizationId?: Maybe<Scalars["String"]>;
};

export type DeleteOrganizationResponse = {
    __typename?: "DeleteOrganizationResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeletePreviewItemRequestInput = {
    previewId?: Maybe<Scalars["String"]>;
    previewItemId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeletePreviewItemResponse = {
    __typename?: "DeletePreviewItemResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeletePreviewRequestInput = {
    previewId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeletePreviewResponse = {
    __typename?: "DeletePreviewResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteProjectRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteProjectResponse = {
    __typename?: "DeleteProjectResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteRoleRuleRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    ruleId?: Maybe<Scalars["String"]>;
};

export type DeleteRoleRuleResponse = {
    __typename?: "DeleteRoleRuleResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteTagRequest = {
    projectId?: Maybe<Scalars["String"]>;
    tagId?: Maybe<Scalars["String"]>;
};

export type DeleteTagResponse = {
    __typename?: "DeleteTagResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type DeleteUserAccessTokenRequestInput = {
    id?: Maybe<Scalars["String"]>;
};

export type DeleteUserAccessTokenResponse = {
    __typename?: "DeleteUserAccessTokenResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteUserRoleRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
};

export type DeleteUserRoleResponse = {
    __typename?: "DeleteUserRoleResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteViewPinRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
    viewId?: Maybe<Scalars["String"]>;
};

export type DeleteViewPinResponse = {
    __typename?: "DeleteViewPinResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteViewRequestInput = {
    id?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteViewResponse = {
    __typename?: "DeleteViewResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type DeleteWebhookRequestInput = {
    id?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type DeleteWebhookResponse = {
    __typename?: "DeleteWebhookResponse";
    deleted?: Maybe<Scalars["Boolean"]>;
};

export type Document = {
    __typename?: "Document";
    archivedAt?: Maybe<Scalars["Time"]>;
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Scalars["String"]>;
    blueprintVariant?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["Time"]>;
    createdByUserId?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    lastUpdatedByUserId?: Maybe<Scalars["String"]>;
    previewImageUrl?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    publishedAt?: Maybe<Scalars["Time"]>;
    statusId?: Maybe<Scalars["Int"]>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["Time"]>;
};

export type DocumentCountsByBlueprintsResponse = {
    __typename?: "DocumentCountsByBlueprintsResponse";
    blueprintId?: Maybe<Scalars["String"]>;
    count?: Maybe<Scalars["Int"]>;
};

export type DocumentField = {
    __typename?: "DocumentField";
    blueprintFieldId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["Time"]>;
    data?: Maybe<Scalars["Any"]>;
    lastUpdatedByUserId?: Maybe<Scalars["String"]>;
    localeCode?: Maybe<Scalars["String"]>;
    type?: Maybe<BlueprintFieldType>;
    updatedAt?: Maybe<Scalars["Time"]>;
};

export type DocumentFieldFilterFieldInput = {
    compare?: Maybe<DocumentFilterCompareField>;
    fieldId?: Maybe<Scalars["String"]>;
    fieldType?: Maybe<Scalars["String"]>;
    fieldValue?: Maybe<Scalars["String"]>;
};

export type DocumentFieldFilterInput = {
    and?: Maybe<Array<Maybe<DocumentFieldFilterInput>>>;
    field?: Maybe<DocumentFieldFilterFieldInput>;
    or?: Maybe<Array<Maybe<DocumentFieldFilterInput>>>;
};

export type DocumentFieldLocaleChangeSet = {
    __typename?: "DocumentFieldLocaleChangeSet";
    sourceDocumentFieldLocaleId?: Maybe<Scalars["String"]>;
    targetDocumentFieldLocaleId?: Maybe<Scalars["String"]>;
};

export type DocumentFieldLocaleInputInput = {
    allowEmptyRequired?: Maybe<Scalars["Boolean"]>;
    apiName?: Maybe<Scalars["String"]>;
    default?: Maybe<Scalars["Boolean"]>;
    disableEditing?: Maybe<Scalars["Boolean"]>;
    disableInResponse?: Maybe<Scalars["Boolean"]>;
    fallbackLocaleId?: Maybe<Scalars["String"]>;
    flag?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
};

export type DocumentFieldLocaleResponse = {
    __typename?: "DocumentFieldLocaleResponse";
    allowEmptyRequired?: Maybe<Scalars["Boolean"]>;
    apiName?: Maybe<Scalars["String"]>;
    default?: Maybe<Scalars["Boolean"]>;
    disableEditing?: Maybe<Scalars["Boolean"]>;
    disableInResponse?: Maybe<Scalars["Boolean"]>;
    fallbackLocaleId?: Maybe<Scalars["String"]>;
    flag?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
};

export type DocumentFieldLocaleUpsertInputInput = {
    allowEmptyRequired?: Maybe<Scalars["Boolean"]>;
    apiName?: Maybe<Scalars["String"]>;
    default?: Maybe<Scalars["Boolean"]>;
    disableEditing?: Maybe<Scalars["Boolean"]>;
    disableInResponse?: Maybe<Scalars["Boolean"]>;
    documentFieldLocaleId?: Maybe<Scalars["String"]>;
    fallbackLocaleId?: Maybe<Scalars["String"]>;
    flag?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
};

export type DocumentFieldResponse = {
    __typename?: "DocumentFieldResponse";
    field?: Maybe<DocumentField>;
    validation?: Maybe<Validation>;
};

export enum DocumentFilterCompareDate {
    DateIsGreater = "DATE_IS_GREATER",
    DateIsLess = "DATE_IS_LESS",
}

export enum DocumentFilterCompareField {
    FieldContains = "FIELD_CONTAINS",
    FieldIs = "FIELD_IS",
    FieldIsGreater = "FIELD_IS_GREATER",
    FieldIsLess = "FIELD_IS_LESS",
    FieldIsNot = "FIELD_IS_NOT",
}

export enum DocumentFilterComparePure {
    PureIs = "PURE_IS",
    PureIsNot = "PURE_IS_NOT",
}

export type DocumentMetaFilterBlueprintInput = {
    blueprintId?: Maybe<Scalars["String"]>;
    compare?: Maybe<DocumentFilterComparePure>;
};

export type DocumentMetaFilterCreatedAtInput = {
    compare?: Maybe<DocumentFilterCompareDate>;
    value?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterCreatedByInput = {
    compare?: Maybe<DocumentFilterComparePure>;
    userId?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterFirstPublishedAtInput = {
    compare?: Maybe<DocumentFilterCompareDate>;
    value?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterInput = {
    and?: Maybe<Array<Maybe<DocumentMetaFilterInput>>>;
    blueprint?: Maybe<DocumentMetaFilterBlueprintInput>;
    createdAt?: Maybe<DocumentMetaFilterCreatedAtInput>;
    createdBy?: Maybe<DocumentMetaFilterCreatedByInput>;
    firstPublishedAt?: Maybe<DocumentMetaFilterFirstPublishedAtInput>;
    lastPublishedAt?: Maybe<DocumentMetaFilterLastPublishedAtInput>;
    lastUpdatedAt?: Maybe<DocumentMetaFilterLastUpdatedAtInput>;
    lastUpdatedBy?: Maybe<DocumentMetaFilterLastUpdatedByInput>;
    or?: Maybe<Array<Maybe<DocumentMetaFilterInput>>>;
    status?: Maybe<DocumentMetaFilterStatusInput>;
    variant?: Maybe<DocumentMetaFilterVariantInput>;
};

export type DocumentMetaFilterLastPublishedAtInput = {
    compare?: Maybe<DocumentFilterCompareDate>;
    value?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterLastUpdatedAtInput = {
    compare?: Maybe<DocumentFilterCompareDate>;
    value?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterLastUpdatedByInput = {
    compare?: Maybe<DocumentFilterComparePure>;
    userId?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterStatusInput = {
    compare?: Maybe<DocumentFilterComparePure>;
    statusId?: Maybe<Scalars["String"]>;
};

export type DocumentMetaFilterVariantInput = {
    compare?: Maybe<DocumentFilterComparePure>;
    variant?: Maybe<BlueprintVariant>;
};

export type DocumentResponseConnection = {
    __typename?: "DocumentResponseConnection";
    edges?: Maybe<Array<Maybe<DocumentResponseConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["BigInt"]>;
};

export type DocumentResponseConnectionEdge = {
    __typename?: "DocumentResponseConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<DocumentWithFieldsResponse>;
};

export type DocumentResponseInput = {
    archivedAt?: Maybe<Scalars["Time"]>;
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["Time"]>;
    createdByUserId?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    lastUpdatedByUserId?: Maybe<Scalars["String"]>;
    previewImageUrl?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    publishedAt?: Maybe<Scalars["Time"]>;
    statusId?: Maybe<Scalars["Int"]>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["Time"]>;
};

export type DocumentSnapshotListFragment = {
    __typename?: "DocumentSnapshotListFragment";
    publishedAt?: Maybe<Scalars["Time"]>;
    snapshotId?: Maybe<Scalars["String"]>;
};

export enum DocumentSortDirection {
    DirectionAsc = "DIRECTION_ASC",
    DirectionDesc = "DIRECTION_DESC",
}

export type DocumentSortInput = {
    blueprint?: Maybe<Scalars["Boolean"]>;
    createdAt?: Maybe<Scalars["Boolean"]>;
    createdBy?: Maybe<Scalars["Boolean"]>;
    direction?: Maybe<DocumentSortDirection>;
    field?: Maybe<FieldSelector>;
    firstPublishedAt?: Maybe<Scalars["Boolean"]>;
    lastPublishedAt?: Maybe<Scalars["Boolean"]>;
    lastUpdatedAt?: Maybe<Scalars["Boolean"]>;
    lastUpdatedBy?: Maybe<Scalars["Boolean"]>;
    status?: Maybe<Scalars["Boolean"]>;
};

export type DocumentStatusResponse = {
    __typename?: "DocumentStatusResponse";
    name?: Maybe<Scalars["String"]>;
    statusId?: Maybe<Scalars["Int"]>;
};

export type DocumentValidation = {
    __typename?: "DocumentValidation";
    documentId?: Maybe<Scalars["String"]>;
    validation?: Maybe<Validation>;
};

export type DocumentWithFieldsResponse = {
    __typename?: "DocumentWithFieldsResponse";
    archivedAt?: Maybe<Scalars["Time"]>;
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["Time"]>;
    createdByUserId?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    fields?: Maybe<Array<Maybe<DocumentField>>>;
    lastUpdatedByUserId?: Maybe<Scalars["String"]>;
    previewImageUrl?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    publishedAt?: Maybe<Scalars["Time"]>;
    statusId?: Maybe<Scalars["Int"]>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["Time"]>;
};

export type DuplicateDocumentRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type DuplicateDocumentResponse = {
    __typename?: "DuplicateDocumentResponse";
    blueprintBranch?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    response?: Maybe<Document>;
};

export type DuplicateToProjectRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    selection?: Maybe<ProjectPortSelectionInput>;
    source?: Maybe<DuplicateToProjectSourceInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type DuplicateToProjectResponse = {
    __typename?: "DuplicateToProjectResponse";
    portId?: Maybe<Scalars["String"]>;
};

export type DuplicateToProjectSourceInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type EmailRecord = {
    __typename?: "EmailRecord";
    address?: Maybe<Scalars["String"]>;
    verified?: Maybe<Scalars["Boolean"]>;
};

export type EntrypointInput = {
    data?: Maybe<Scalars["Map"]>;
    domain?: Maybe<Scalars["String"]>;
};

export type EntrypointResponse = {
    __typename?: "EntrypointResponse";
    data?: Maybe<Scalars["Map"]>;
    domain?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    lastUpdatedAt?: Maybe<Scalars["String"]>;
    lastUpdatedBy?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type FieldSelector = {
    id?: Maybe<Scalars["String"]>;
    type?: Maybe<Scalars["String"]>;
};

export type GetAllCompletedOnboardingEventsResponse = {
    __typename?: "GetAllCompletedOnboardingEventsResponse";
    eventCodes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type GetAllDocumentFieldLocaleRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetAllDocumentFieldLocaleResponse = {
    __typename?: "GetAllDocumentFieldLocaleResponse";
    documentFieldLocales?: Maybe<Array<Maybe<DocumentFieldLocaleResponse>>>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetAllDocumentSnapshotRequestInput = {
    documentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetAllDocumentSnapshotResponse = {
    __typename?: "GetAllDocumentSnapshotResponse";
    documentSnapshots?: Maybe<Array<Maybe<DocumentSnapshotListFragment>>>;
};

export type GetAllDocumentStatusRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetAllDocumentStatusResponse = {
    __typename?: "GetAllDocumentStatusResponse";
    documentStatuses?: Maybe<Array<Maybe<DocumentStatusResponse>>>;
};

export type GetAllWebhooksRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetAllWebhooksResponse = {
    __typename?: "GetAllWebhooksResponse";
    webhooks?: Maybe<Array<Maybe<WebhookResponse>>>;
};

export type GetAmountRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    operation?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetAmountResponse = {
    __typename?: "GetAmountResponse";
    value?: Maybe<Scalars["Int"]>;
};

export type GetBlueprintByIdRequest = {
    blueprintId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetBlueprintByIdResponse = {
    __typename?: "GetBlueprintByIDResponse";
    blueprint?: Maybe<BlueprintResponse>;
};

export type GetBlueprintByNameRequest = {
    blueprintName?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetBlueprintByNameResponse = {
    __typename?: "GetBlueprintByNameResponse";
    blueprint?: Maybe<BlueprintResponse>;
};

export type GetCountsRequestInput = {
    filter?: Maybe<QuotaFilterInput>;
    pagination?: Maybe<QuotaPaginationInput>;
};

export type GetCountsResponse = {
    __typename?: "GetCountsResponse";
    counts?: Maybe<Array<Maybe<QuotaCount>>>;
};

export type GetDocumentByIdRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetDocumentByIdResponse = {
    __typename?: "GetDocumentByIdResponse";
    document?: Maybe<DocumentWithFieldsResponse>;
};

export type GetDocumentCountsByBlueprintsRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Array<Maybe<Scalars["String"]>>>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetDocumentCountsByBlueprintsResponse = {
    __typename?: "GetDocumentCountsByBlueprintsResponse";
    counts?: Maybe<Array<Maybe<DocumentCountsByBlueprintsResponse>>>;
};

export type GetDocumentRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetDocumentSnapshotRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    snapshotId?: Maybe<Scalars["String"]>;
};

export type GetDocumentSnapshotResponse = {
    __typename?: "GetDocumentSnapshotResponse";
    document?: Maybe<DocumentWithFieldsResponse>;
};

export type GetEntrypointByDomainRequestInput = {
    domain?: Maybe<Scalars["String"]>;
};

export type GetEntrypointByDomainResponse = {
    __typename?: "GetEntrypointByDomainResponse";
    entrypoint?: Maybe<EntrypointResponse>;
};

export type GetEntrypointByScopeRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetEntrypointByScopeResponse = {
    __typename?: "GetEntrypointByScopeResponse";
    entrypoint?: Maybe<EntrypointResponse>;
};

export type GetGroupByIdRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
};

export type GetGroupByIdResponse = {
    __typename?: "GetGroupByIDResponse";
    group?: Maybe<GroupResponse>;
};

export type GetGroupByIdWithInheritanceRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
};

export type GetGroupByIdWithInheritanceResponse = {
    __typename?: "GetGroupByIDWithInheritanceResponse";
    group?: Maybe<GroupResponse>;
    organization?: Maybe<OrganizationResponse>;
};

export type GetGroupMembersRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
};

export type GetGroupMembersResponse = {
    __typename?: "GetGroupMembersResponse";
    connection?: Maybe<MemberConnection>;
};

export type GetGroupQuotaPlanRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
};

export type GetGroupQuotaPlanResponse = {
    __typename?: "GetGroupQuotaPlanResponse";
    groupId?: Maybe<Scalars["String"]>;
    quotaPlan?: Maybe<GroupQuotaPlan>;
};

export type GetManyApiKeyRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyApiKeyResponse = {
    __typename?: "GetManyAPIKeyResponse";
    apiKeys?: Maybe<Array<Maybe<ApiKeyResponse>>>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyAuditEventsRequestInput = {
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyAuditEventsResponse = {
    __typename?: "GetManyAuditEventsResponse";
    connection?: Maybe<AuditEventConnection>;
};

export type GetManyBlueprintsRequest = {
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyBlueprintsResponse = {
    __typename?: "GetManyBlueprintsResponse";
    connection?: Maybe<BlueprintResponseConnection>;
};

export type GetManyDocumentFieldsByDocumentIdRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyDocumentFieldsByDocumentIdResponse = {
    __typename?: "GetManyDocumentFieldsByDocumentIdResponse";
    fields?: Maybe<Array<Maybe<DocumentFieldResponse>>>;
};

export type GetManyDocumentFieldsByFieldIdsRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentFieldIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyDocumentFieldsByFieldIdsResponse = {
    __typename?: "GetManyDocumentFieldsByFieldIdsResponse";
    fields?: Maybe<Array<Maybe<DocumentFieldResponse>>>;
};

export type GetManyDocumentsByIdsRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyDocumentsByIdsResponse = {
    __typename?: "GetManyDocumentsByIdsResponse";
    documents?: Maybe<Array<Maybe<DocumentWithFieldsResponse>>>;
};

export type GetManyDocumentsRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    fieldFilter?: Maybe<DocumentFieldFilterInput>;
    fulltextFilter?: Maybe<Scalars["String"]>;
    metaFilter?: Maybe<DocumentMetaFilterInput>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
    sort?: Maybe<Array<Maybe<DocumentSortInput>>>;
};

export type GetManyDocumentsResponse = {
    __typename?: "GetManyDocumentsResponse";
    connection?: Maybe<DocumentResponseConnection>;
};

export type GetManyGroupsByUserIdRequestFilterInput = {
    organizationId?: Maybe<Scalars["String"]>;
    searchTerm?: Maybe<Scalars["String"]>;
};

export type GetManyGroupsByUserIdRequestInput = {
    filter?: Maybe<GetManyGroupsByUserIdRequestFilterInput>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetManyGroupsByUserIdResponse = {
    __typename?: "GetManyGroupsByUserIDResponse";
    connection?: Maybe<GroupResponseConnection>;
};

export type GetManyOrganizationsByUserIdRequestFilterInput = {
    searchTerm?: Maybe<Scalars["String"]>;
};

export type GetManyOrganizationsByUserIdRequestInput = {
    filter?: Maybe<GetManyOrganizationsByUserIdRequestFilterInput>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetManyOrganizationsByUserIdResponse = {
    __typename?: "GetManyOrganizationsByUserIDResponse";
    connection?: Maybe<OrganizationResponseConnection>;
};

export type GetManyPreviewsRequestInput = {
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyPreviewsResponse = {
    __typename?: "GetManyPreviewsResponse";
    connection?: Maybe<PreviewConnection>;
};

export type GetManyProjectsByUserIdRequestFilterInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    searchTerm?: Maybe<Scalars["String"]>;
};

export type GetManyProjectsByUserIdRequestInput = {
    filter?: Maybe<GetManyProjectsByUserIdRequestFilterInput>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetManyProjectsByUserIdResponse = {
    __typename?: "GetManyProjectsByUserIDResponse";
    connection?: Maybe<ProjectResponseConnection>;
};

export type GetManyReleasesByProjectIdRequestInput = {
    filter?: Maybe<ReleaseFilterInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyReleasesByProjectIdResponse = {
    __typename?: "GetManyReleasesByProjectIdResponse";
    node?: Maybe<Array<Maybe<ReleaseResponse>>>;
};

export type GetManyRoleRulesByRoleIdRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
};

export type GetManyRoleRulesByRoleIdResponse = {
    __typename?: "GetManyRoleRulesByRoleIDResponse";
    roleRules?: Maybe<Array<Maybe<RoleRuleResponse>>>;
};

export type GetManyTagsRequest = {
    filter?: Maybe<GetManyTagsRequestFilterInput>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyTagsRequestFilterInput = {
    referenceId?: Maybe<Scalars["String"]>;
    referenceType?: Maybe<ReferenceType>;
};

export type GetManyTagsResponse = {
    __typename?: "GetManyTagsResponse";
    connection?: Maybe<TagConnection>;
};

export type GetManyUserRolesRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyUserRolesResponse = {
    __typename?: "GetManyUserRolesResponse";
    userRoles?: Maybe<Array<Maybe<UserRoleResponse>>>;
};

export type GetManyViewsFilterInput = {
    privat?: Maybe<Scalars["Boolean"]>;
    type?: Maybe<ViewTarget>;
};

export type GetManyViewsRequestInput = {
    filter?: Maybe<GetManyViewsFilterInput>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetManyViewsResponse = {
    __typename?: "GetManyViewsResponse";
    views?: Maybe<Array<Maybe<ViewResponse>>>;
};

export type GetManyWebhookCallsRequestInput = {
    filter?: Maybe<WebhookCallsFilterInput>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetManyWebhookCallsResponse = {
    __typename?: "GetManyWebhookCallsResponse";
    connection?: Maybe<WebhookCallConnection>;
};

export type GetOrganizationByIdRequestInput = {
    organizationId?: Maybe<Scalars["String"]>;
};

export type GetOrganizationByIdResponse = {
    __typename?: "GetOrganizationByIDResponse";
    organization?: Maybe<OrganizationResponse>;
};

export type GetOrganizationMembersRequestInput = {
    organizationId?: Maybe<Scalars["String"]>;
    paginationArguments?: Maybe<PaginationArgumentsInput>;
};

export type GetOrganizationMembersResponse = {
    __typename?: "GetOrganizationMembersResponse";
    connection?: Maybe<MemberConnection>;
};

export type GetOrganizationQuotaPlanRequestInput = {
    organizationId?: Maybe<Scalars["String"]>;
};

export type GetOrganizationQuotaPlanResponse = {
    __typename?: "GetOrganizationQuotaPlanResponse";
    organizationId?: Maybe<Scalars["String"]>;
    quotaPlan?: Maybe<OrganizationQuotaPlan>;
};

export type GetPermissionGrantRequestInput = {
    action?: Maybe<Scalars["String"]>;
    domain?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    object?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    target?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetPermissionGrantResponse = {
    __typename?: "GetPermissionGrantResponse";
    appliedRole?: Maybe<Role>;
    success?: Maybe<Scalars["Boolean"]>;
};

export type GetPermissionSetRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetPermissionSetResponse = {
    __typename?: "GetPermissionSetResponse";
    appliedRole?: Maybe<Role>;
    permissionSet?: Maybe<Array<Maybe<PermissionSet>>>;
};

export type GetPreferredThemeResponse = {
    __typename?: "GetPreferredThemeResponse";
    preferredTheme?: Maybe<Scalars["String"]>;
};

export type GetPreferredUiLanguageResponse = {
    __typename?: "GetPreferredUILanguageResponse";
    preferredUiLanguage?: Maybe<Scalars["String"]>;
};

export type GetPreviewByIdRequestInput = {
    previewId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetPreviewByIdResponse = {
    __typename?: "GetPreviewByIdResponse";
    preview?: Maybe<PreviewWithItemsResponse>;
};

export type GetPreviewItemsByBlueprintIdRequestInput = {
    blueprintId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetPreviewItemsByBlueprintIdResponse = {
    __typename?: "GetPreviewItemsByBlueprintIdResponse";
    previewItems?: Maybe<Array<Maybe<PreviewItemResponse>>>;
};

export type GetProjectByIdRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetProjectByIdResponse = {
    __typename?: "GetProjectByIDResponse";
    project?: Maybe<ProjectResponse>;
};

export type GetProjectByIdWithInheritanceRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetProjectByIdWithInheritanceResponse = {
    __typename?: "GetProjectByIDWithInheritanceResponse";
    group?: Maybe<GroupResponse>;
    organization?: Maybe<OrganizationResponse>;
    project?: Maybe<ProjectResponse>;
};

export type GetProjectMembersRequestInput = {
    paginationArguments?: Maybe<PaginationArgumentsInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetProjectMembersResponse = {
    __typename?: "GetProjectMembersResponse";
    connection?: Maybe<MemberConnection>;
};

export type GetProjectPortRequestInput = {
    portId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type GetProjectPortResponse = {
    __typename?: "GetProjectPortResponse";
    createdAt?: Maybe<Scalars["Time"]>;
    expiresAt?: Maybe<Scalars["Time"]>;
    finished?: Maybe<Scalars["Boolean"]>;
    portErrors?: Maybe<Array<Maybe<PortError>>>;
    portType?: Maybe<PortType>;
    projectId?: Maybe<Scalars["String"]>;
    selectionProgress?: Maybe<ProjectPortSelectionProgress>;
};

export type GetProjectQuotaPlanRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
};

export type GetProjectQuotaPlanResponse = {
    __typename?: "GetProjectQuotaPlanResponse";
    projectId?: Maybe<Scalars["String"]>;
    quotaPlan?: Maybe<ProjectQuotaPlan>;
};

export type GetReleaseByIdRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    releaseId?: Maybe<Scalars["String"]>;
};

export type GetReleaseByIdResponse = {
    __typename?: "GetReleaseByIdResponse";
    release?: Maybe<ReleaseResponse>;
};

export type GetRoleRuleByIdRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    ruleId?: Maybe<Scalars["String"]>;
};

export type GetRoleRuleByIdResponse = {
    __typename?: "GetRoleRuleByIDResponse";
    roleRule?: Maybe<RoleRuleResponse>;
};

export type GetUnpublishedLinkedDocumentsRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetUnpublishedLinkedDocumentsResponse = {
    __typename?: "GetUnpublishedLinkedDocumentsResponse";
    document?: Maybe<Array<Maybe<Document>>>;
};

export type GetUsageOfBlueprintFieldRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintFieldId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type GetUsageOfBlueprintFieldResponse = {
    __typename?: "GetUsageOfBlueprintFieldResponse";
    usageAmount?: Maybe<Scalars["Int"]>;
};

export type GetUserResponse = {
    __typename?: "GetUserResponse";
    profile?: Maybe<CaisyUserProfile>;
    session?: Maybe<Session>;
    settings?: Maybe<UserSettings>;
};

export type GetUserRoleWithRoleRulesRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
};

export type GetUserRoleWithRoleRulesResponse = {
    __typename?: "GetUserRoleWithRoleRulesResponse";
    description?: Maybe<Scalars["String"]>;
    inheritedBySystemRole?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    roleRules?: Maybe<Array<Maybe<RoleRuleResponse>>>;
    title?: Maybe<Scalars["String"]>;
};

export type GroupInputInput = {
    alias?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    logoAssetUrl?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export type GroupQuotaPlan = {
    __typename?: "GroupQuotaPlan";
    maxMembers?: Maybe<Scalars["Int"]>;
};

export type GroupResponse = {
    __typename?: "GroupResponse";
    alias?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    logoAssetUrl?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    roleByUser?: Maybe<AnyToRoleConnection>;
    updatedAt?: Maybe<Scalars["String"]>;
};

export type GroupResponseConnection = {
    __typename?: "GroupResponseConnection";
    edges?: Maybe<Array<Maybe<GroupResponseConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type GroupResponseConnectionEdge = {
    __typename?: "GroupResponseConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<GroupResponse>;
};

export enum HttpMethod {
    Delete = "DELETE",
    Get = "GET",
    Head = "HEAD",
    Patch = "PATCH",
    Post = "POST",
    Put = "PUT",
}

export type LinkManyReleaseDocumentRequestInput = {
    documentId?: Maybe<Array<Maybe<Scalars["String"]>>>;
    projectId?: Maybe<Scalars["String"]>;
    releaseId?: Maybe<Scalars["String"]>;
    replaceExistingDocuments?: Maybe<Scalars["Boolean"]>;
};

export type LinkManyReleaseDocumentResponse = {
    __typename?: "LinkManyReleaseDocumentResponse";
    successful?: Maybe<Scalars["Boolean"]>;
};

export type ListenOnDocumentRequestInput = {
    request?: Maybe<GetDocumentRequestInput>;
};

export type ListenOnDocumentResponse = {
    __typename?: "ListenOnDocumentResponse";
    document?: Maybe<Document>;
};

export type LoginResult = {
    __typename?: "LoginResult";
    sessionId?: Maybe<Scalars["String"]>;
    tokens?: Maybe<Tokens>;
    user?: Maybe<LoginResultUser>;
};

export type LoginResultUser = {
    __typename?: "LoginResultUser";
    email: Scalars["String"];
    id: Scalars["ID"];
    username?: Maybe<Scalars["String"]>;
};

export type MemberConnection = {
    __typename?: "MemberConnection";
    edges?: Maybe<Array<Maybe<MemberConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type MemberConnectionEdge = {
    __typename?: "MemberConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<MemberResponse>;
};

export type MemberResponse = {
    __typename?: "MemberResponse";
    role?: Maybe<Role>;
    user?: Maybe<UserProfile>;
};

export type MoveProjectRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    targetGroupId?: Maybe<Scalars["String"]>;
    targetOrganizationId?: Maybe<Scalars["String"]>;
};

export type MoveProjectResponse = {
    __typename?: "MoveProjectResponse";
    project?: Maybe<ProjectResponse>;
};

export type Mutation = {
    __typename?: "Mutation";
    AssignRole?: Maybe<AssignRoleResponse>;
    CheckBlueprintNameAvailable?: Maybe<CheckBlueprintNameAvailableResponse>;
    CopyMemberFromProjectToProject?: Maybe<CopyMemberFromProjectToProjectResponse>;
    CreateApiKey?: Maybe<CreateApiKeyResponse>;
    CreateBlueprint?: Maybe<CreateBlueprintResponse>;
    CreateDocument?: Maybe<CreateDocumentResponse>;
    CreateDocumentFieldLocale?: Maybe<CreateDocumentFieldLocaleResponse>;
    CreateGroup?: Maybe<CreateGroupResponse>;
    CreateManyViews?: Maybe<CreateManyViewsResponse>;
    CreateOrganization?: Maybe<CreateOrganizationResponse>;
    CreatePreview?: Maybe<CreatePreviewResponse>;
    CreatePreviewItem?: Maybe<CreatePreviewItemResponse>;
    CreateProject?: Maybe<CreateProjectResponse>;
    CreateRelease?: Maybe<CreateReleaseResponse>;
    CreateRoleRule?: Maybe<CreateRoleRuleResponse>;
    CreateTag?: Maybe<CreateTagResponse>;
    CreateUserAccessToken?: Maybe<CreateUserAccessTokenResponse>;
    CreateUserRole?: Maybe<CreateUserRoleResponse>;
    CreateView?: Maybe<CreateViewResponse>;
    CreateViewPin?: Maybe<CreateViewPinResponse>;
    CreateWebhook?: Maybe<CreateWebhookResponse>;
    DeAssignRole?: Maybe<DeAssignRoleResponse>;
    DeleteApiKey?: Maybe<DeleteApiKeyResponse>;
    DeleteBlueprint?: Maybe<DeleteBlueprintResponse>;
    DeleteDocument?: Maybe<DeleteDocumentResponse>;
    DeleteDocumentFieldLocale?: Maybe<DeleteDocumentFieldLocaleResponse>;
    DeleteEntrypoint?: Maybe<DeleteEntrypointResponse>;
    DeleteGroup?: Maybe<DeleteGroupResponse>;
    DeleteManyDocuments?: Maybe<DeleteManyDocumentsResponse>;
    DeleteManyReleases?: Maybe<DeleteManyReleasesResponse>;
    DeleteOrganization?: Maybe<DeleteOrganizationResponse>;
    DeletePreview?: Maybe<DeletePreviewResponse>;
    DeletePreviewItem?: Maybe<DeletePreviewItemResponse>;
    DeleteProject?: Maybe<DeleteProjectResponse>;
    DeleteRoleRule?: Maybe<DeleteRoleRuleResponse>;
    DeleteTag?: Maybe<DeleteTagResponse>;
    DeleteUserAccessToken?: Maybe<DeleteUserAccessTokenResponse>;
    DeleteUserRole?: Maybe<DeleteUserRoleResponse>;
    DeleteView?: Maybe<DeleteViewResponse>;
    DeleteViewPin?: Maybe<DeleteViewPinResponse>;
    DeleteWebhook?: Maybe<DeleteWebhookResponse>;
    DuplicateDocument?: Maybe<DuplicateDocumentResponse>;
    DuplicateToProject?: Maybe<DuplicateToProjectResponse>;
    LinkManyReleaseDocument?: Maybe<LinkManyReleaseDocumentResponse>;
    MoveProject?: Maybe<MoveProjectResponse>;
    PutManyBlueprints?: Maybe<PutManyBlueprintsResponse>;
    PutManyDocumentFieldLocales?: Maybe<PutManyDocumentFieldLocalesResponse>;
    PutManyPreviews?: Maybe<PutManyPreviewsResponse>;
    PutManyTags?: Maybe<PutManyTagsResponse>;
    PutManyViews?: Maybe<PutManyViewsResponse>;
    PutManyWebhooks?: Maybe<PutManyWebhooksResponse>;
    SetCompletedOnboardingEvents?: Maybe<SetCompletedOnboardingEventsResponse>;
    SetPreferredTheme?: Maybe<SetPreferredThemeResponse>;
    SetPreferredUiLanguage?: Maybe<SetPreferredUiLanguageResponse>;
    UnlinkManyReleaseDocument?: Maybe<UnlinkManyReleaseDocumentResponse>;
    UpdateBlueprint?: Maybe<UpdateBlueprintResponse>;
    UpdateDocument?: Maybe<UpdateDocumentResponse>;
    UpdateDocumentField?: Maybe<UpdateDocumentFieldResponse>;
    UpdateDocumentFieldLocale?: Maybe<UpdateDocumentFieldLocaleResponse>;
    UpdateEntrypoint?: Maybe<UpdateEntrypointResponse>;
    UpdateGroup?: Maybe<UpdateGroupResponse>;
    UpdateManyDocuments?: Maybe<UpdateManyDocumentsResponse>;
    UpdateOrganization?: Maybe<UpdateOrganizationResponse>;
    UpdatePreview?: Maybe<UpdatePreviewResponse>;
    UpdatePreviewItem?: Maybe<UpdatePreviewItemResponse>;
    UpdateProject?: Maybe<UpdateProjectResponse>;
    UpdateRelease?: Maybe<UpdateReleaseResponse>;
    UpdateRoleRule?: Maybe<UpdateRoleRuleResponse>;
    UpdateTag?: Maybe<UpdateTagResponse>;
    UpdateUserProfileRequest?: Maybe<UpdateUserProfileResponse>;
    UpdateUserRole?: Maybe<UpdateUserRoleResponse>;
    UpdateView?: Maybe<UpdateViewResponse>;
    UpdateWebhook?: Maybe<UpdateWebhookResponse>;
    ValidateDocument?: Maybe<ValidateDocumentResponse>;
    ValidateDocumentField?: Maybe<ValidateDocumentFieldResponse>;
    ValidateManyDocuments?: Maybe<ValidateManyDocumentsResponse>;
    ValidateRelease?: Maybe<ValidateReleaseResponse>;
    authenticate?: Maybe<LoginResult>;
    createCaisyUser?: Maybe<CreateCaisyUserResult>;
    logout?: Maybe<Scalars["Boolean"]>;
    sendResetPasswordEmail?: Maybe<Scalars["Boolean"]>;
    sendVerificationEmail?: Maybe<Scalars["Boolean"]>;
    updatePreferredUILanguage?: Maybe<UpdatePreferredUiLanguageResponse>;
    updatePreferredUITheme?: Maybe<UpdatePreferredUiThemeResponse>;
    updateUserActiveProject?: Maybe<Scalars["Boolean"]>;
    verifyEmail?: Maybe<Scalars["Boolean"]>;
};

export type MutationAssignRoleArgs = {
    input?: Maybe<AssignRoleRequestInput>;
};

export type MutationCheckBlueprintNameAvailableArgs = {
    input?: Maybe<CheckBlueprintNameAvailableRequest>;
};

export type MutationCopyMemberFromProjectToProjectArgs = {
    input?: Maybe<CopyMemberFromProjectToProjectRequestInput>;
};

export type MutationCreateApiKeyArgs = {
    input?: Maybe<CreateApiKeyRequestInput>;
};

export type MutationCreateBlueprintArgs = {
    input?: Maybe<CreateBlueprintRequest>;
};

export type MutationCreateDocumentArgs = {
    input?: Maybe<CreateDocumentRequestInput>;
};

export type MutationCreateDocumentFieldLocaleArgs = {
    input?: Maybe<CreateDocumentFieldLocaleRequestInput>;
};

export type MutationCreateGroupArgs = {
    input?: Maybe<CreateGroupRequestInput>;
};

export type MutationCreateManyViewsArgs = {
    input?: Maybe<CreateManyViewsRequestInput>;
};

export type MutationCreateOrganizationArgs = {
    input?: Maybe<CreateOrganizationRequestInput>;
};

export type MutationCreatePreviewArgs = {
    input?: Maybe<CreatePreviewRequestInput>;
};

export type MutationCreatePreviewItemArgs = {
    input?: Maybe<CreatePreviewItemRequestInput>;
};

export type MutationCreateProjectArgs = {
    input?: Maybe<CreateProjectRequestInput>;
};

export type MutationCreateReleaseArgs = {
    input?: Maybe<CreateReleaseRequestInput>;
};

export type MutationCreateRoleRuleArgs = {
    input?: Maybe<CreateRoleRuleRequestInput>;
};

export type MutationCreateTagArgs = {
    input?: Maybe<CreateTagRequest>;
};

export type MutationCreateUserAccessTokenArgs = {
    input?: Maybe<CreateUserAccessTokenRequestInput>;
};

export type MutationCreateUserRoleArgs = {
    input?: Maybe<CreateUserRoleRequestInput>;
};

export type MutationCreateViewArgs = {
    input?: Maybe<CreateViewRequestInput>;
};

export type MutationCreateViewPinArgs = {
    input?: Maybe<CreateViewPinRequestInput>;
};

export type MutationCreateWebhookArgs = {
    input?: Maybe<CreateWebhookRequestInput>;
};

export type MutationDeAssignRoleArgs = {
    input?: Maybe<DeAssignRoleRequestInput>;
};

export type MutationDeleteApiKeyArgs = {
    input?: Maybe<DeleteApiKeyRequestInput>;
};

export type MutationDeleteBlueprintArgs = {
    input?: Maybe<DeleteBlueprintRequest>;
};

export type MutationDeleteDocumentArgs = {
    input?: Maybe<DeleteDocumentRequestInput>;
};

export type MutationDeleteDocumentFieldLocaleArgs = {
    input?: Maybe<DeleteDocumentFieldLocaleRequestInput>;
};

export type MutationDeleteEntrypointArgs = {
    input?: Maybe<DeleteEntrypointRequestInput>;
};

export type MutationDeleteGroupArgs = {
    input?: Maybe<DeleteGroupRequestInput>;
};

export type MutationDeleteManyDocumentsArgs = {
    input?: Maybe<DeleteManyDocumentsRequestInput>;
};

export type MutationDeleteManyReleasesArgs = {
    input?: Maybe<DeleteManyReleasesRequestInput>;
};

export type MutationDeleteOrganizationArgs = {
    input?: Maybe<DeleteOrganizationRequestInput>;
};

export type MutationDeletePreviewArgs = {
    input?: Maybe<DeletePreviewRequestInput>;
};

export type MutationDeletePreviewItemArgs = {
    input?: Maybe<DeletePreviewItemRequestInput>;
};

export type MutationDeleteProjectArgs = {
    input?: Maybe<DeleteProjectRequestInput>;
};

export type MutationDeleteRoleRuleArgs = {
    input?: Maybe<DeleteRoleRuleRequestInput>;
};

export type MutationDeleteTagArgs = {
    input?: Maybe<DeleteTagRequest>;
};

export type MutationDeleteUserAccessTokenArgs = {
    input?: Maybe<DeleteUserAccessTokenRequestInput>;
};

export type MutationDeleteUserRoleArgs = {
    input?: Maybe<DeleteUserRoleRequestInput>;
};

export type MutationDeleteViewArgs = {
    input?: Maybe<DeleteViewRequestInput>;
};

export type MutationDeleteViewPinArgs = {
    input?: Maybe<DeleteViewPinRequestInput>;
};

export type MutationDeleteWebhookArgs = {
    input?: Maybe<DeleteWebhookRequestInput>;
};

export type MutationDuplicateDocumentArgs = {
    input?: Maybe<DuplicateDocumentRequestInput>;
};

export type MutationDuplicateToProjectArgs = {
    input?: Maybe<DuplicateToProjectRequestInput>;
};

export type MutationLinkManyReleaseDocumentArgs = {
    input?: Maybe<LinkManyReleaseDocumentRequestInput>;
};

export type MutationMoveProjectArgs = {
    input?: Maybe<MoveProjectRequestInput>;
};

export type MutationPutManyBlueprintsArgs = {
    input?: Maybe<PutManyBlueprintsRequestInput>;
};

export type MutationPutManyDocumentFieldLocalesArgs = {
    input?: Maybe<PutManyDocumentFieldLocalesRequestInput>;
};

export type MutationPutManyPreviewsArgs = {
    input?: Maybe<PutManyPreviewsRequestInput>;
};

export type MutationPutManyTagsArgs = {
    input?: Maybe<PutManyTagsRequestInput>;
};

export type MutationPutManyViewsArgs = {
    input?: Maybe<PutManyViewsRequestInput>;
};

export type MutationPutManyWebhooksArgs = {
    input?: Maybe<PutManyWebhooksRequestInput>;
};

export type MutationSetCompletedOnboardingEventsArgs = {
    input?: Maybe<SetCompletedOnboardingEventsRequest>;
};

export type MutationSetPreferredThemeArgs = {
    input?: Maybe<SetPreferredThemeRequest>;
};

export type MutationSetPreferredUiLanguageArgs = {
    input?: Maybe<SetPreferredUiLanguageRequest>;
};

export type MutationUnlinkManyReleaseDocumentArgs = {
    input?: Maybe<UnlinkManyReleaseDocumentRequestInput>;
};

export type MutationUpdateBlueprintArgs = {
    input?: Maybe<UpdateBlueprintRequest>;
};

export type MutationUpdateDocumentArgs = {
    input?: Maybe<UpdateDocumentRequestInput>;
};

export type MutationUpdateDocumentFieldArgs = {
    input?: Maybe<UpdateDocumentFieldRequestInput>;
};

export type MutationUpdateDocumentFieldLocaleArgs = {
    input?: Maybe<UpdateDocumentFieldLocaleRequestInput>;
};

export type MutationUpdateEntrypointArgs = {
    input?: Maybe<UpdateEntrypointRequestInput>;
};

export type MutationUpdateGroupArgs = {
    input?: Maybe<UpdateGroupRequestInput>;
};

export type MutationUpdateManyDocumentsArgs = {
    input?: Maybe<UpdateManyDocumentRequestInput>;
};

export type MutationUpdateOrganizationArgs = {
    input?: Maybe<UpdateOrganizationRequestInput>;
};

export type MutationUpdatePreviewArgs = {
    input?: Maybe<UpdatePreviewRequestInput>;
};

export type MutationUpdatePreviewItemArgs = {
    input?: Maybe<UpdatePreviewItemRequestInput>;
};

export type MutationUpdateProjectArgs = {
    input?: Maybe<UpdateProjectRequestInput>;
};

export type MutationUpdateReleaseArgs = {
    input?: Maybe<UpdateReleaseRequestInput>;
};

export type MutationUpdateRoleRuleArgs = {
    input?: Maybe<UpdateRoleRuleRequestInput>;
};

export type MutationUpdateTagArgs = {
    input?: Maybe<UpdateTagRequest>;
};

export type MutationUpdateUserProfileRequestArgs = {
    input: UpdateUserProfileRequestInput;
};

export type MutationUpdateUserRoleArgs = {
    input?: Maybe<UpdateUserRoleRequestInput>;
};

export type MutationUpdateViewArgs = {
    input?: Maybe<UpdateViewRequestInput>;
};

export type MutationUpdateWebhookArgs = {
    input?: Maybe<UpdateWebhookRequestInput>;
};

export type MutationValidateDocumentArgs = {
    input?: Maybe<ValidateDocumentRequestInput>;
};

export type MutationValidateDocumentFieldArgs = {
    input?: Maybe<ValidateDocumentFieldRequestInput>;
};

export type MutationValidateManyDocumentsArgs = {
    input?: Maybe<ValidateManyDocumentsRequestInput>;
};

export type MutationValidateReleaseArgs = {
    input?: Maybe<ValidateReleaseRequestInput>;
};

export type MutationAuthenticateArgs = {
    params: AuthenticateParamsInput;
    serviceName: Scalars["String"];
};

export type MutationCreateCaisyUserArgs = {
    email: Scalars["String"];
    password?: Maybe<Scalars["String"]>;
    phoneNumber?: Maybe<Scalars["String"]>;
    profile?: Maybe<CaisyUserProfileInput>;
    provider?: Maybe<Scalars["String"]>;
    providerUserId?: Maybe<Scalars["String"]>;
    username?: Maybe<Scalars["String"]>;
};

export type MutationSendResetPasswordEmailArgs = {
    email: Scalars["String"];
};

export type MutationSendVerificationEmailArgs = {
    email: Scalars["String"];
};

export type MutationUpdatePreferredUiLanguageArgs = {
    input: UpdatePreferredUiLanguageRequest;
};

export type MutationUpdatePreferredUiThemeArgs = {
    input: UpdatePreferredUiThemeRequest;
};

export type MutationUpdateUserActiveProjectArgs = {
    projectId: Scalars["String"];
};

export type MutationVerifyEmailArgs = {
    token: Scalars["String"];
};

export type OrganizationInputInput = {
    alias?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    logoAssetUrl?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export type OrganizationQuotaPlan = {
    __typename?: "OrganizationQuotaPlan";
    maxMembers?: Maybe<Scalars["Int"]>;
};

export type OrganizationResponse = {
    __typename?: "OrganizationResponse";
    alias?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    logoAssetUrl?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    roleByUser?: Maybe<AnyToRoleConnection>;
    updatedAt?: Maybe<Scalars["String"]>;
};

export type OrganizationResponseConnection = {
    __typename?: "OrganizationResponseConnection";
    edges?: Maybe<Array<Maybe<OrganizationResponseConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type OrganizationResponseConnectionEdge = {
    __typename?: "OrganizationResponseConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<OrganizationResponse>;
};

export type PageInfo = {
    __typename?: "PageInfo";
    endCursor?: Maybe<Scalars["String"]>;
    hasNextPage?: Maybe<Scalars["Boolean"]>;
    hasPreviousPage?: Maybe<Scalars["Boolean"]>;
    startCursor?: Maybe<Scalars["String"]>;
};

export type PaginationArgumentsInput = {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
};

export enum PermissionEnum {
    Read = "READ",
    Write = "WRITE",
}

export type PermissionSet = {
    __typename?: "PermissionSet";
    action?: Maybe<Scalars["String"]>;
    allow?: Maybe<Scalars["Boolean"]>;
    domain?: Maybe<Scalars["String"]>;
    object?: Maybe<Scalars["String"]>;
    target?: Maybe<Scalars["String"]>;
};

export type PortError = {
    __typename?: "PortError";
    errorMessage?: Maybe<Scalars["String"]>;
    objectId?: Maybe<Scalars["String"]>;
    objectType?: Maybe<Scalars["String"]>;
};

export enum PortType {
    PortTypeImportToProject = "PORT_TYPE_IMPORT_TO_PROJECT",
    PortTypeUnknown = "PORT_TYPE_UNKNOWN",
}

export type PreviewConnection = {
    __typename?: "PreviewConnection";
    edges?: Maybe<Array<Maybe<PreviewConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type PreviewConnectionEdge = {
    __typename?: "PreviewConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<PreviewWithItemsResponse>;
};

export type PreviewInputInput = {
    name?: Maybe<Scalars["String"]>;
};

export type PreviewItemInputInput = {
    blueprintId?: Maybe<Scalars["String"]>;
    enableLivePreview?: Maybe<Scalars["Boolean"]>;
    previewUrl?: Maybe<Scalars["String"]>;
};

export type PreviewItemResponse = {
    __typename?: "PreviewItemResponse";
    blueprintId?: Maybe<Scalars["String"]>;
    enableLivePreview?: Maybe<Scalars["Boolean"]>;
    previewId?: Maybe<Scalars["String"]>;
    previewItemId?: Maybe<Scalars["String"]>;
    previewUrl?: Maybe<Scalars["String"]>;
};

export type PreviewItemUpsertInputInput = {
    blueprintId?: Maybe<Scalars["String"]>;
    enableLivePreview?: Maybe<Scalars["Boolean"]>;
    previewItemId?: Maybe<Scalars["String"]>;
    previewUrl?: Maybe<Scalars["String"]>;
};

export type PreviewResponse = {
    __typename?: "PreviewResponse";
    name?: Maybe<Scalars["String"]>;
    previewId?: Maybe<Scalars["String"]>;
};

export type PreviewUpsertInputInput = {
    name?: Maybe<Scalars["String"]>;
    previewId?: Maybe<Scalars["String"]>;
    previewItems?: Maybe<Array<Maybe<PreviewItemUpsertInputInput>>>;
};

export type PreviewWithItemsResponse = {
    __typename?: "PreviewWithItemsResponse";
    name?: Maybe<Scalars["String"]>;
    previewId?: Maybe<Scalars["String"]>;
    previewItems?: Maybe<Array<Maybe<PreviewItemResponse>>>;
};

export type ProjectInputInput = {
    alias?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    logoAssetUrl?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export type ProjectPortSelectionInput = {
    blueprint?: Maybe<Scalars["Boolean"]>;
    document?: Maybe<Scalars["Boolean"]>;
    documentFieldLocale?: Maybe<Scalars["Boolean"]>;
    documentHistory?: Maybe<Scalars["Boolean"]>;
    member?: Maybe<Scalars["Boolean"]>;
    preview?: Maybe<Scalars["Boolean"]>;
    tag?: Maybe<Scalars["Boolean"]>;
    view?: Maybe<Scalars["Boolean"]>;
    webhook?: Maybe<Scalars["Boolean"]>;
};

export type ProjectPortSelectionProgress = {
    __typename?: "ProjectPortSelectionProgress";
    blueprintCompleted?: Maybe<Scalars["Int"]>;
    blueprintTotal?: Maybe<Scalars["Int"]>;
    documentCompleted?: Maybe<Scalars["Int"]>;
    documentFieldLocaleCompleted?: Maybe<Scalars["Int"]>;
    documentFieldLocaleTotal?: Maybe<Scalars["Int"]>;
    documentTotal?: Maybe<Scalars["Int"]>;
    memberCompleted?: Maybe<Scalars["Int"]>;
    memberTotal?: Maybe<Scalars["Int"]>;
    previewCompleted?: Maybe<Scalars["Int"]>;
    previewTotal?: Maybe<Scalars["Int"]>;
    tagCompleted?: Maybe<Scalars["Int"]>;
    tagTotal?: Maybe<Scalars["Int"]>;
    viewCompleted?: Maybe<Scalars["Int"]>;
    viewTotal?: Maybe<Scalars["Int"]>;
    webhookCompleted?: Maybe<Scalars["Int"]>;
    webhookTotal?: Maybe<Scalars["Int"]>;
};

export type ProjectQuotaPlan = {
    __typename?: "ProjectQuotaPlan";
    maxBlueprints?: Maybe<Scalars["Int"]>;
    maxDocuments?: Maybe<Scalars["Int"]>;
    maxLocales?: Maybe<Scalars["Int"]>;
    maxMembers?: Maybe<Scalars["Int"]>;
    maxPreviews?: Maybe<Scalars["Int"]>;
    maxViews?: Maybe<Scalars["Int"]>;
    maxWebhooks?: Maybe<Scalars["Int"]>;
    name?: Maybe<Scalars["String"]>;
};

export type ProjectResponse = {
    __typename?: "ProjectResponse";
    alias?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    logoAssetUrl?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleByUser?: Maybe<AnyToRoleConnection>;
    updatedAt?: Maybe<Scalars["String"]>;
};

export type ProjectResponseConnection = {
    __typename?: "ProjectResponseConnection";
    edges?: Maybe<Array<Maybe<ProjectResponseConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type ProjectResponseConnectionEdge = {
    __typename?: "ProjectResponseConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<ProjectResponse>;
};

export type PutManyBlueprintsError = {
    __typename?: "PutManyBlueprintsError";
    blueprintId?: Maybe<Scalars["String"]>;
    errorMessage?: Maybe<Scalars["String"]>;
};

export type PutManyBlueprintsRequestInput = {
    blueprintInputs?: Maybe<Array<Maybe<BlueprintUpsertInputInput>>>;
    dryRun?: Maybe<Scalars["Boolean"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type PutManyBlueprintsResponse = {
    __typename?: "PutManyBlueprintsResponse";
    changeSet?: Maybe<Array<Maybe<BlueprintChangeSet>>>;
    errors?: Maybe<Array<Maybe<PutManyBlueprintsError>>>;
    successfulBlueprintIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type PutManyDocumentFieldLocalesError = {
    __typename?: "PutManyDocumentFieldLocalesError";
    documentFieldLocaleId?: Maybe<Scalars["String"]>;
    errorMessage?: Maybe<Scalars["String"]>;
};

export type PutManyDocumentFieldLocalesRequestInput = {
    documentFieldLocaleInputs?: Maybe<Array<Maybe<DocumentFieldLocaleUpsertInputInput>>>;
    dryRun?: Maybe<Scalars["Boolean"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type PutManyDocumentFieldLocalesResponse = {
    __typename?: "PutManyDocumentFieldLocalesResponse";
    changeSet?: Maybe<Array<Maybe<DocumentFieldLocaleChangeSet>>>;
    errors?: Maybe<Array<Maybe<PutManyDocumentFieldLocalesError>>>;
    successfulDocumentFieldLocaleIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type PutManyPreviewsError = {
    __typename?: "PutManyPreviewsError";
    errorMessage?: Maybe<Scalars["String"]>;
    previewId?: Maybe<Scalars["String"]>;
};

export type PutManyPreviewsRequestInput = {
    previewInputs?: Maybe<Array<Maybe<PreviewUpsertInputInput>>>;
    projectId?: Maybe<Scalars["String"]>;
};

export type PutManyPreviewsResponse = {
    __typename?: "PutManyPreviewsResponse";
    errors?: Maybe<Array<Maybe<PutManyPreviewsError>>>;
    successfulPreviewIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type PutManyTagsError = {
    __typename?: "PutManyTagsError";
    errorMessage?: Maybe<Scalars["String"]>;
    tagId?: Maybe<Scalars["String"]>;
};

export type PutManyTagsRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    tagInputs?: Maybe<Array<Maybe<TagUpsertInputInput>>>;
};

export type PutManyTagsResponse = {
    __typename?: "PutManyTagsResponse";
    errors?: Maybe<Array<Maybe<PutManyTagsError>>>;
    successfulTagIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type PutManyViewsError = {
    __typename?: "PutManyViewsError";
    errorMessage?: Maybe<Scalars["String"]>;
    viewId?: Maybe<Scalars["String"]>;
};

export type PutManyViewsRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    viewInputs?: Maybe<Array<Maybe<ViewUpsertInputInput>>>;
};

export type PutManyViewsResponse = {
    __typename?: "PutManyViewsResponse";
    errors?: Maybe<Array<Maybe<PutManyViewsError>>>;
    successfulViewIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type PutManyWebhooksRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    webhooks?: Maybe<Array<Maybe<WebhookUpsertInputInput>>>;
};

export type PutManyWebhooksResponse = {
    __typename?: "PutManyWebhooksResponse";
    webhooks?: Maybe<Array<Maybe<WebhookResponse>>>;
};

export type Query = {
    __typename?: "Query";
    GetAllCompletedOnboardingEvents?: Maybe<GetAllCompletedOnboardingEventsResponse>;
    GetAllDocumentFieldLocale?: Maybe<GetAllDocumentFieldLocaleResponse>;
    GetAllDocumentSnapshot?: Maybe<GetAllDocumentSnapshotResponse>;
    GetAllDocumentStatus?: Maybe<GetAllDocumentStatusResponse>;
    GetAllWebhooks?: Maybe<GetAllWebhooksResponse>;
    GetAmount?: Maybe<GetAmountResponse>;
    GetBlueprintById?: Maybe<GetBlueprintByIdResponse>;
    GetBlueprintByName?: Maybe<GetBlueprintByNameResponse>;
    GetCounts?: Maybe<GetCountsResponse>;
    GetDocumentById?: Maybe<GetDocumentByIdResponse>;
    GetDocumentCountsByBlueprints?: Maybe<GetDocumentCountsByBlueprintsResponse>;
    GetDocumentSnapshot?: Maybe<GetDocumentSnapshotResponse>;
    GetEntrypointByDomain?: Maybe<GetEntrypointByDomainResponse>;
    GetEntrypointByScope?: Maybe<GetEntrypointByScopeResponse>;
    GetGroupByID?: Maybe<GetGroupByIdResponse>;
    GetGroupByIDWithInheritance?: Maybe<GetGroupByIdWithInheritanceResponse>;
    GetGroupMembers?: Maybe<GetGroupMembersResponse>;
    GetGroupQuotaPlan?: Maybe<GetGroupQuotaPlanResponse>;
    GetManyApiKey?: Maybe<GetManyApiKeyResponse>;
    GetManyAuditEvents?: Maybe<GetManyAuditEventsResponse>;
    GetManyBlueprints?: Maybe<GetManyBlueprintsResponse>;
    GetManyDocumentFieldsByDocumentId?: Maybe<GetManyDocumentFieldsByDocumentIdResponse>;
    GetManyDocumentFieldsByFieldIds?: Maybe<GetManyDocumentFieldsByFieldIdsResponse>;
    GetManyDocuments?: Maybe<GetManyDocumentsResponse>;
    GetManyDocumentsByIds?: Maybe<GetManyDocumentsByIdsResponse>;
    GetManyGroupsByUserID?: Maybe<GetManyGroupsByUserIdResponse>;
    GetManyOrganizationsByUserID?: Maybe<GetManyOrganizationsByUserIdResponse>;
    GetManyPreviews?: Maybe<GetManyPreviewsResponse>;
    GetManyProjectsByUserID?: Maybe<GetManyProjectsByUserIdResponse>;
    GetManyReleasesByProjectId?: Maybe<GetManyReleasesByProjectIdResponse>;
    GetManyRoleRulesByRoleID?: Maybe<GetManyRoleRulesByRoleIdResponse>;
    GetManyTags?: Maybe<GetManyTagsResponse>;
    GetManyUserRoles?: Maybe<GetManyUserRolesResponse>;
    GetManyViews?: Maybe<GetManyViewsResponse>;
    GetManyWebhookCalls?: Maybe<GetManyWebhookCallsResponse>;
    GetOrganizationByID?: Maybe<GetOrganizationByIdResponse>;
    GetOrganizationMembers?: Maybe<GetOrganizationMembersResponse>;
    GetOrganizationQuotaPlan?: Maybe<GetOrganizationQuotaPlanResponse>;
    GetPermissionGrant?: Maybe<GetPermissionGrantResponse>;
    GetPermissionSet?: Maybe<GetPermissionSetResponse>;
    GetPreferredTheme?: Maybe<GetPreferredThemeResponse>;
    GetPreferredUiLanguage?: Maybe<GetPreferredUiLanguageResponse>;
    GetPreviewById?: Maybe<GetPreviewByIdResponse>;
    GetPreviewItemsByBlueprintId?: Maybe<GetPreviewItemsByBlueprintIdResponse>;
    GetProjectByID?: Maybe<GetProjectByIdResponse>;
    GetProjectByIDWithInheritance?: Maybe<GetProjectByIdWithInheritanceResponse>;
    GetProjectMembers?: Maybe<GetProjectMembersResponse>;
    GetProjectPort?: Maybe<GetProjectPortResponse>;
    GetProjectQuotaPlan?: Maybe<GetProjectQuotaPlanResponse>;
    GetReleaseById?: Maybe<GetReleaseByIdResponse>;
    GetRoleRuleByID?: Maybe<GetRoleRuleByIdResponse>;
    GetUnpublishedLinkedDocuments?: Maybe<GetUnpublishedLinkedDocumentsResponse>;
    GetUsageOfBlueprintField?: Maybe<GetUsageOfBlueprintFieldResponse>;
    GetUserRoleWithRoleRules?: Maybe<GetUserRoleWithRoleRulesResponse>;
    ReadUserAccessTokens?: Maybe<ReadUserAccessTokensResponse>;
    ValidateApiKey?: Maybe<ValidateApiKeyResponse>;
    getUser?: Maybe<GetUserResponse>;
    session?: Maybe<Session>;
    userProfile?: Maybe<CaisyUserProfile>;
};

export type QueryGetAllDocumentFieldLocaleArgs = {
    input?: Maybe<GetAllDocumentFieldLocaleRequestInput>;
};

export type QueryGetAllDocumentSnapshotArgs = {
    input?: Maybe<GetAllDocumentSnapshotRequestInput>;
};

export type QueryGetAllDocumentStatusArgs = {
    input?: Maybe<GetAllDocumentStatusRequestInput>;
};

export type QueryGetAllWebhooksArgs = {
    input?: Maybe<GetAllWebhooksRequestInput>;
};

export type QueryGetAmountArgs = {
    input?: Maybe<GetAmountRequestInput>;
};

export type QueryGetBlueprintByIdArgs = {
    input?: Maybe<GetBlueprintByIdRequest>;
};

export type QueryGetBlueprintByNameArgs = {
    input?: Maybe<GetBlueprintByNameRequest>;
};

export type QueryGetCountsArgs = {
    input?: Maybe<GetCountsRequestInput>;
};

export type QueryGetDocumentByIdArgs = {
    input?: Maybe<GetDocumentByIdRequestInput>;
};

export type QueryGetDocumentCountsByBlueprintsArgs = {
    input?: Maybe<GetDocumentCountsByBlueprintsRequestInput>;
};

export type QueryGetDocumentSnapshotArgs = {
    input?: Maybe<GetDocumentSnapshotRequestInput>;
};

export type QueryGetEntrypointByDomainArgs = {
    input?: Maybe<GetEntrypointByDomainRequestInput>;
};

export type QueryGetEntrypointByScopeArgs = {
    input?: Maybe<GetEntrypointByScopeRequestInput>;
};

export type QueryGetGroupByIdArgs = {
    input?: Maybe<GetGroupByIdRequestInput>;
};

export type QueryGetGroupByIdWithInheritanceArgs = {
    input?: Maybe<GetGroupByIdWithInheritanceRequestInput>;
};

export type QueryGetGroupMembersArgs = {
    input?: Maybe<GetGroupMembersRequestInput>;
};

export type QueryGetGroupQuotaPlanArgs = {
    input?: Maybe<GetGroupQuotaPlanRequestInput>;
};

export type QueryGetManyApiKeyArgs = {
    input?: Maybe<GetManyApiKeyRequestInput>;
};

export type QueryGetManyAuditEventsArgs = {
    input?: Maybe<GetManyAuditEventsRequestInput>;
};

export type QueryGetManyBlueprintsArgs = {
    input?: Maybe<GetManyBlueprintsRequest>;
};

export type QueryGetManyDocumentFieldsByDocumentIdArgs = {
    input?: Maybe<GetManyDocumentFieldsByDocumentIdRequestInput>;
};

export type QueryGetManyDocumentFieldsByFieldIdsArgs = {
    input?: Maybe<GetManyDocumentFieldsByFieldIdsRequestInput>;
};

export type QueryGetManyDocumentsArgs = {
    input?: Maybe<GetManyDocumentsRequestInput>;
};

export type QueryGetManyDocumentsByIdsArgs = {
    input?: Maybe<GetManyDocumentsByIdsRequestInput>;
};

export type QueryGetManyGroupsByUserIdArgs = {
    input?: Maybe<GetManyGroupsByUserIdRequestInput>;
};

export type QueryGetManyOrganizationsByUserIdArgs = {
    input?: Maybe<GetManyOrganizationsByUserIdRequestInput>;
};

export type QueryGetManyPreviewsArgs = {
    input?: Maybe<GetManyPreviewsRequestInput>;
};

export type QueryGetManyProjectsByUserIdArgs = {
    input?: Maybe<GetManyProjectsByUserIdRequestInput>;
};

export type QueryGetManyReleasesByProjectIdArgs = {
    input?: Maybe<GetManyReleasesByProjectIdRequestInput>;
};

export type QueryGetManyRoleRulesByRoleIdArgs = {
    input?: Maybe<GetManyRoleRulesByRoleIdRequestInput>;
};

export type QueryGetManyTagsArgs = {
    input?: Maybe<GetManyTagsRequest>;
};

export type QueryGetManyUserRolesArgs = {
    input?: Maybe<GetManyUserRolesRequestInput>;
};

export type QueryGetManyViewsArgs = {
    input?: Maybe<GetManyViewsRequestInput>;
};

export type QueryGetManyWebhookCallsArgs = {
    input?: Maybe<GetManyWebhookCallsRequestInput>;
};

export type QueryGetOrganizationByIdArgs = {
    input?: Maybe<GetOrganizationByIdRequestInput>;
};

export type QueryGetOrganizationMembersArgs = {
    input?: Maybe<GetOrganizationMembersRequestInput>;
};

export type QueryGetOrganizationQuotaPlanArgs = {
    input?: Maybe<GetOrganizationQuotaPlanRequestInput>;
};

export type QueryGetPermissionGrantArgs = {
    input?: Maybe<GetPermissionGrantRequestInput>;
};

export type QueryGetPermissionSetArgs = {
    input?: Maybe<GetPermissionSetRequestInput>;
};

export type QueryGetPreviewByIdArgs = {
    input?: Maybe<GetPreviewByIdRequestInput>;
};

export type QueryGetPreviewItemsByBlueprintIdArgs = {
    input?: Maybe<GetPreviewItemsByBlueprintIdRequestInput>;
};

export type QueryGetProjectByIdArgs = {
    input?: Maybe<GetProjectByIdRequestInput>;
};

export type QueryGetProjectByIdWithInheritanceArgs = {
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
};

export type QueryGetProjectMembersArgs = {
    input?: Maybe<GetProjectMembersRequestInput>;
};

export type QueryGetProjectPortArgs = {
    input?: Maybe<GetProjectPortRequestInput>;
};

export type QueryGetProjectQuotaPlanArgs = {
    input?: Maybe<GetProjectQuotaPlanRequestInput>;
};

export type QueryGetReleaseByIdArgs = {
    input?: Maybe<GetReleaseByIdRequestInput>;
};

export type QueryGetRoleRuleByIdArgs = {
    input?: Maybe<GetRoleRuleByIdRequestInput>;
};

export type QueryGetUnpublishedLinkedDocumentsArgs = {
    input?: Maybe<GetUnpublishedLinkedDocumentsRequestInput>;
};

export type QueryGetUsageOfBlueprintFieldArgs = {
    input?: Maybe<GetUsageOfBlueprintFieldRequestInput>;
};

export type QueryGetUserRoleWithRoleRulesArgs = {
    input?: Maybe<GetUserRoleWithRoleRulesRequestInput>;
};

export type QueryReadUserAccessTokensArgs = {
    input?: Maybe<ReadUserAccessTokensRequestInput>;
};

export type QueryValidateApiKeyArgs = {
    input?: Maybe<ValidateApiKeyRequestInput>;
};

export type QueryUserProfileArgs = {
    userId: Scalars["ID"];
};

export type QuotaCount = {
    __typename?: "QuotaCount";
    count?: Maybe<Scalars["Int"]>;
};

export type QuotaFilterInput = {
    operation?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export enum QuotaInterval {
    QuoutaIntervalDayly = "QUOUTA_INTERVAL_DAYLY",
    QuoutaIntervalUnspecified = "QUOUTA_INTERVAL_UNSPECIFIED",
}

export type QuotaPaginationInput = {
    endDate?: Maybe<DateInput>;
    interval?: Maybe<QuotaInterval>;
    limit?: Maybe<Scalars["Int"]>;
};

export type ReadUserAccessTokensRequestInput = {
    userId?: Maybe<Scalars["String"]>;
};

export type ReadUserAccessTokensResponse = {
    __typename?: "ReadUserAccessTokensResponse";
    tokens?: Maybe<Array<Maybe<AccessTokenResponse>>>;
};

export enum ReferenceType {
    Blueprint = "BLUEPRINT",
    Document = "DOCUMENT",
}

export type ReleaseDocumentFieldErrors = {
    __typename?: "ReleaseDocumentFieldErrors";
    blueprintFieldId?: Maybe<Scalars["String"]>;
    errorCodes?: Maybe<Array<Maybe<Scalars["String"]>>>;
    locale?: Maybe<Scalars["String"]>;
};

export type ReleaseFilterInput = {
    documentId?: Maybe<Scalars["String"]>;
    endDate?: Maybe<Scalars["Time"]>;
    startDate?: Maybe<Scalars["Time"]>;
    status?: Maybe<ReleaseStatus>;
};

export type ReleaseInputInput = {
    name?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    scheduledAt?: Maybe<Scalars["Time"]>;
    status?: Maybe<ReleaseStatus>;
    type?: Maybe<ReleaseType>;
};

export type ReleaseResponse = {
    __typename?: "ReleaseResponse";
    createdAt?: Maybe<Scalars["Time"]>;
    documentIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
    id?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    scheduledAt?: Maybe<Scalars["Time"]>;
    status?: Maybe<ReleaseStatus>;
    type?: Maybe<ReleaseType>;
    updatedAt?: Maybe<Scalars["Time"]>;
    validationErrors?: Maybe<Array<Maybe<ReleaseValidationDocumentErrors>>>;
};

export enum ReleaseStatus {
    Failed = "FAILED",
    Scheduled = "SCHEDULED",
    Successful = "SUCCESSFUL",
    Unscheduled = "UNSCHEDULED",
}

export enum ReleaseType {
    Publish = "PUBLISH",
    Unpublish = "UNPUBLISH",
}

export type ReleaseValidationDocumentErrors = {
    __typename?: "ReleaseValidationDocumentErrors";
    documentId?: Maybe<Scalars["String"]>;
    errors?: Maybe<Array<Maybe<ReleaseDocumentFieldErrors>>>;
};

export type Role = {
    __typename?: "Role";
    description?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    inheritedBySystemRole?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    systemRole?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
};

export type RoleRuleInputInput = {
    action?: Maybe<Scalars["String"]>;
    allow?: Maybe<Scalars["Boolean"]>;
    domain?: Maybe<Scalars["String"]>;
    object?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    target?: Maybe<Scalars["String"]>;
};

export type RoleRuleResponse = {
    __typename?: "RoleRuleResponse";
    action?: Maybe<Scalars["String"]>;
    allow?: Maybe<Scalars["Boolean"]>;
    domain?: Maybe<Scalars["String"]>;
    object?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    ruleId?: Maybe<Scalars["String"]>;
    target?: Maybe<Scalars["String"]>;
};

export type Session = {
    __typename?: "Session";
    activeProjectId?: Maybe<Scalars["String"]>;
    audience?: Maybe<Scalars["String"]>;
    authTime?: Maybe<Scalars["Int"]>;
    email?: Maybe<Scalars["String"]>;
    expires?: Maybe<Scalars["Int"]>;
    issuedAt?: Maybe<Scalars["Int"]>;
    issuer?: Maybe<Scalars["String"]>;
    provider?: Maybe<Scalars["String"]>;
    subject?: Maybe<Scalars["String"]>;
    token?: Maybe<Scalars["String"]>;
    uid?: Maybe<Scalars["String"]>;
};

export type SetCompletedOnboardingEventsRequest = {
    input?: Maybe<CompletedOnboardingEventInput>;
    replaceExistingEvents?: Maybe<Scalars["Boolean"]>;
};

export type SetCompletedOnboardingEventsResponse = {
    __typename?: "SetCompletedOnboardingEventsResponse";
    eventCodes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type SetPreferredThemeInput = {
    preferredTheme?: Maybe<Scalars["String"]>;
};

export type SetPreferredThemeRequest = {
    input?: Maybe<SetPreferredThemeInput>;
};

export type SetPreferredThemeResponse = {
    __typename?: "SetPreferredThemeResponse";
    preferredTheme?: Maybe<Scalars["String"]>;
};

export type SetPreferredUiLanguageInput = {
    preferredUiLanguage?: Maybe<Scalars["String"]>;
};

export type SetPreferredUiLanguageRequest = {
    input?: Maybe<SetPreferredUiLanguageInput>;
};

export type SetPreferredUiLanguageResponse = {
    __typename?: "SetPreferredUILanguageResponse";
    preferredUiLanguage?: Maybe<Scalars["String"]>;
};

export type TagConnection = {
    __typename?: "TagConnection";
    edges?: Maybe<Array<Maybe<TagConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type TagConnectionEdge = {
    __typename?: "TagConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<TagResponse>;
};

export type TagResponse = {
    __typename?: "TagResponse";
    color?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    referenceType?: Maybe<ReferenceType>;
    tagId?: Maybe<Scalars["String"]>;
};

export type TagUpsertInputInput = {
    color?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
    referenceType?: Maybe<ReferenceType>;
    tagId?: Maybe<Scalars["String"]>;
};

export type Tokens = {
    __typename?: "Tokens";
    accessToken?: Maybe<Scalars["String"]>;
    refreshToken?: Maybe<Scalars["String"]>;
};

export type UnlinkManyReleaseDocumentRequestInput = {
    documentId?: Maybe<Array<Maybe<Scalars["String"]>>>;
    projectId?: Maybe<Scalars["String"]>;
    releaseId?: Maybe<Scalars["String"]>;
};

export type UnlinkManyReleaseDocumentResponse = {
    __typename?: "UnlinkManyReleaseDocumentResponse";
    successful?: Maybe<Scalars["Boolean"]>;
};

export type UpdateBlueprintRequest = {
    blueprintId?: Maybe<Scalars["String"]>;
    input?: Maybe<BlueprintInputInput>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type UpdateBlueprintResponse = {
    __typename?: "UpdateBlueprintResponse";
    blueprint?: Maybe<BlueprintResponse>;
};

export type UpdateDocumentError = {
    __typename?: "UpdateDocumentError";
    documentId?: Maybe<Scalars["String"]>;
    errorMessage?: Maybe<Scalars["String"]>;
};

export type UpdateDocumentFieldLocaleRequestInput = {
    documentFieldLocaleId?: Maybe<Scalars["String"]>;
    input?: Maybe<DocumentFieldLocaleInputInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdateDocumentFieldLocaleResponse = {
    __typename?: "UpdateDocumentFieldLocaleResponse";
    documentFieldLocale?: Maybe<DocumentFieldLocaleResponse>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdateDocumentFieldRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintFieldId?: Maybe<Scalars["String"]>;
    data?: Maybe<Scalars["Any"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    locale?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type UpdateDocumentFieldResponse = {
    __typename?: "UpdateDocumentFieldResponse";
    blueprintFieldId?: Maybe<Scalars["String"]>;
    document?: Maybe<Document>;
};

export type UpdateDocumentRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintId?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    previewImageUrl?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    statusId?: Maybe<Scalars["Int"]>;
    title?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type UpdateDocumentResponse = {
    __typename?: "UpdateDocumentResponse";
    document?: Maybe<Document>;
};

export type UpdateEntrypointRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    input?: Maybe<EntrypointInput>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type UpdateEntrypointResponse = {
    __typename?: "UpdateEntrypointResponse";
    entrypoint?: Maybe<EntrypointResponse>;
};

export type UpdateGroupRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    input?: Maybe<GroupInputInput>;
    mask?: Maybe<Google_Protobuf_FieldMaskInput>;
};

export type UpdateGroupResponse = {
    __typename?: "UpdateGroupResponse";
    group?: Maybe<GroupResponse>;
};

export type UpdateManyDocumentRequestInput = {
    updateDocumentRequests?: Maybe<Array<Maybe<UpdateDocumentRequestInput>>>;
};

export type UpdateManyDocumentsResponse = {
    __typename?: "UpdateManyDocumentsResponse";
    batchErrors?: Maybe<Array<Maybe<UpdateDocumentError>>>;
    updatedDocumentIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type UpdateOrganizationRequestInput = {
    input?: Maybe<OrganizationInputInput>;
    mask?: Maybe<Google_Protobuf_FieldMaskInput>;
    organizationId?: Maybe<Scalars["String"]>;
};

export type UpdateOrganizationResponse = {
    __typename?: "UpdateOrganizationResponse";
    organization?: Maybe<OrganizationResponse>;
};

export type UpdatePreferredUiLanguageRequest = {
    preferredUILanguage?: Maybe<Scalars["String"]>;
};

export type UpdatePreferredUiLanguageResponse = {
    __typename?: "UpdatePreferredUILanguageResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type UpdatePreferredUiThemeRequest = {
    preferredUITheme?: Maybe<Scalars["Int"]>;
};

export type UpdatePreferredUiThemeResponse = {
    __typename?: "UpdatePreferredUIThemeResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type UpdatePreviewItemRequestInput = {
    previewId?: Maybe<Scalars["String"]>;
    previewItemId?: Maybe<Scalars["String"]>;
    previewUrl?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdatePreviewItemResponse = {
    __typename?: "UpdatePreviewItemResponse";
    previewItem?: Maybe<PreviewItemResponse>;
};

export type UpdatePreviewRequestInput = {
    input?: Maybe<PreviewInputInput>;
    previewId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdatePreviewResponse = {
    __typename?: "UpdatePreviewResponse";
    preview?: Maybe<PreviewResponse>;
};

export type UpdateProjectRequestInput = {
    input?: Maybe<ProjectInputInput>;
    mask?: Maybe<Google_Protobuf_FieldMaskInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdateProjectResponse = {
    __typename?: "UpdateProjectResponse";
    project?: Maybe<ProjectResponse>;
};

export type UpdateQuotaPlanRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    quotaPlanName?: Maybe<Scalars["String"]>;
};

export type UpdateQuotaPlanResponse = {
    __typename?: "UpdateQuotaPlanResponse";
    groupId?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    quotaPlan?: Maybe<ProjectQuotaPlan>;
};

export type UpdateReleaseRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    release?: Maybe<ReleaseInputInput>;
    releaseId?: Maybe<Scalars["String"]>;
};

export type UpdateReleaseResponse = {
    __typename?: "UpdateReleaseResponse";
    release?: Maybe<ReleaseResponse>;
};

export type UpdateRoleRuleRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    input?: Maybe<RoleRuleInputInput>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    ruleId?: Maybe<Scalars["String"]>;
};

export type UpdateRoleRuleResponse = {
    __typename?: "UpdateRoleRuleResponse";
    roleRule?: Maybe<RoleRuleResponse>;
};

export type UpdateTagInput = {
    color?: Maybe<Scalars["String"]>;
    name?: Maybe<Scalars["String"]>;
};

export type UpdateTagRequest = {
    input?: Maybe<UpdateTagInput>;
    projectId?: Maybe<Scalars["String"]>;
    tagId?: Maybe<Scalars["String"]>;
};

export type UpdateTagResponse = {
    __typename?: "UpdateTagResponse";
    tag?: Maybe<TagResponse>;
};

export type UpdateUserProfileRequestInput = {
    profile: CaisyUserProfileInput;
};

export type UpdateUserProfileResponse = {
    __typename?: "UpdateUserProfileResponse";
    success: Scalars["Boolean"];
};

export type UpdateUserRoleRequestInput = {
    groupId?: Maybe<Scalars["String"]>;
    input?: Maybe<UserRoleInputInput>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
};

export type UpdateUserRoleResponse = {
    __typename?: "UpdateUserRoleResponse";
    userRole?: Maybe<UserRoleResponse>;
};

export type UpdateViewRequestInput = {
    input?: Maybe<ViewUpdateInputInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdateViewResponse = {
    __typename?: "UpdateViewResponse";
    view?: Maybe<ViewResponse>;
};

export type UpdateWebhookRequestInput = {
    id?: Maybe<Scalars["String"]>;
    input?: Maybe<WebhookInputInput>;
    projectId?: Maybe<Scalars["String"]>;
};

export type UpdateWebhookResponse = {
    __typename?: "UpdateWebhookResponse";
    webhook?: Maybe<WebhookResponse>;
};

export type UserInput = {
    email?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["ID"]>;
    username?: Maybe<Scalars["String"]>;
};

export type UserProfile = {
    __typename?: "UserProfile";
    displayName?: Maybe<Scalars["String"]>;
    email?: Maybe<Scalars["String"]>;
    photoUrl?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type UserRoleInputInput = {
    description?: Maybe<Scalars["String"]>;
    inheritedBySystemRole?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
};

export type UserRoleResponse = {
    __typename?: "UserRoleResponse";
    description?: Maybe<Scalars["String"]>;
    groupId?: Maybe<Scalars["String"]>;
    inheritedBySystemRole?: Maybe<Scalars["String"]>;
    organizationId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
    roleId?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
};

export type UserSettings = {
    __typename?: "UserSettings";
    preferredUILanguage?: Maybe<Scalars["String"]>;
    preferredUITheme?: Maybe<Scalars["Int"]>;
};

export type ValidateApiKeyRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export type ValidateApiKeyResponse = {
    __typename?: "ValidateAPIKeyResponse";
    success?: Maybe<Scalars["Boolean"]>;
};

export type ValidateDocumentError = {
    __typename?: "ValidateDocumentError";
    documentId?: Maybe<Scalars["String"]>;
    errorMessage?: Maybe<Scalars["String"]>;
};

export type ValidateDocumentFieldRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    blueprintFieldId?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    locale?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type ValidateDocumentFieldResponse = {
    __typename?: "ValidateDocumentFieldResponse";
    validation?: Maybe<Validation>;
};

export type ValidateDocumentRequestInput = {
    blueprintBranch?: Maybe<Scalars["String"]>;
    documentId?: Maybe<Scalars["String"]>;
    environmentId?: Maybe<Scalars["String"]>;
    projectId?: Maybe<Scalars["String"]>;
};

export type ValidateDocumentResponse = {
    __typename?: "ValidateDocumentResponse";
    validation?: Maybe<Validation>;
};

export type ValidateManyDocumentsRequestInput = {
    validateDocumentRequests?: Maybe<Array<Maybe<ValidateDocumentRequestInput>>>;
};

export type ValidateManyDocumentsResponse = {
    __typename?: "ValidateManyDocumentsResponse";
    batchErrors?: Maybe<Array<Maybe<ValidateDocumentError>>>;
    documentsValidations?: Maybe<Array<Maybe<DocumentValidation>>>;
};

export type ValidateReleaseRequestInput = {
    projectId?: Maybe<Scalars["String"]>;
    releaseId?: Maybe<Scalars["String"]>;
};

export type ValidateReleaseResponse = {
    __typename?: "ValidateReleaseResponse";
    releaseId?: Maybe<Scalars["String"]>;
    valid?: Maybe<Scalars["Boolean"]>;
    validationErrors?: Maybe<Array<Maybe<ReleaseValidationDocumentErrors>>>;
};

export type Validation = {
    __typename?: "Validation";
    errors?: Maybe<Array<Maybe<ValidationError>>>;
    valid?: Maybe<Scalars["Boolean"]>;
};

export type ValidationError = {
    __typename?: "ValidationError";
    blueprintFieldId?: Maybe<Scalars["String"]>;
    errorCodes?: Maybe<Array<Maybe<Scalars["String"]>>>;
    errorDetails?: Maybe<Scalars["Map"]>;
    locale?: Maybe<Scalars["String"]>;
};

export type ViewCreateInputInput = {
    iconUrl?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    position?: Maybe<Scalars["Int"]>;
    query?: Maybe<Scalars["Any"]>;
    target?: Maybe<ViewTarget>;
    title?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type ViewResponse = {
    __typename?: "ViewResponse";
    iconUrl?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    pinned?: Maybe<Scalars["Boolean"]>;
    position?: Maybe<Scalars["Int"]>;
    privat?: Maybe<Scalars["Boolean"]>;
    query?: Maybe<Scalars["Any"]>;
    target?: Maybe<ViewTarget>;
    title?: Maybe<Scalars["String"]>;
};

export enum ViewTarget {
    Assets = "ASSETS",
    Components = "COMPONENTS",
    Documents = "DOCUMENTS",
}

export type ViewUpdateInputInput = {
    iconUrl?: Maybe<Scalars["String"]>;
    id?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    position?: Maybe<Scalars["Int"]>;
    query?: Maybe<Scalars["Any"]>;
    target?: Maybe<ViewTarget>;
    title?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
};

export type ViewUpsertInputInput = {
    iconUrl?: Maybe<Scalars["String"]>;
    parentId?: Maybe<Scalars["String"]>;
    position?: Maybe<Scalars["Int"]>;
    query?: Maybe<Scalars["Any"]>;
    target?: Maybe<ViewTarget>;
    title?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
    viewId?: Maybe<Scalars["String"]>;
};

export type WebhookCallConnection = {
    __typename?: "WebhookCallConnection";
    edges?: Maybe<Array<Maybe<WebhookCallConnectionEdge>>>;
    pageInfo?: Maybe<PageInfo>;
    totalCount?: Maybe<Scalars["Int"]>;
};

export type WebhookCallConnectionEdge = {
    __typename?: "WebhookCallConnectionEdge";
    cursor?: Maybe<Scalars["String"]>;
    node?: Maybe<WebhookCallResponse>;
};

export type WebhookCallResponse = {
    __typename?: "WebhookCallResponse";
    createdAt?: Maybe<Scalars["String"]>;
    eventId?: Maybe<Scalars["String"]>;
    requestBody?: Maybe<Scalars["Any"]>;
    requestHeaders?: Maybe<Array<Maybe<WebhookHeader>>>;
    responseBody?: Maybe<Scalars["Any"]>;
    responseHeaders?: Maybe<Array<Maybe<WebhookHeader>>>;
    responseStatusCode?: Maybe<Scalars["Int"]>;
    webhookCallId?: Maybe<Scalars["String"]>;
    webhookId?: Maybe<Scalars["String"]>;
};

export type WebhookCallsFilterInput = {
    webhookId?: Maybe<Scalars["String"]>;
};

export type WebhookHeader = {
    __typename?: "WebhookHeader";
    name?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export type WebhookHeaderInput = {
    name?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export type WebhookInputInput = {
    description?: Maybe<Scalars["String"]>;
    headers?: Maybe<Array<Maybe<WebhookHeaderInput>>>;
    method?: Maybe<HttpMethod>;
    name?: Maybe<Scalars["String"]>;
    trigger?: Maybe<Array<Maybe<WebhookTriggerEvent>>>;
    url?: Maybe<Scalars["String"]>;
};

export type WebhookResponse = {
    __typename?: "WebhookResponse";
    createdAt?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    headers?: Maybe<Array<Maybe<WebhookHeader>>>;
    method?: Maybe<HttpMethod>;
    name?: Maybe<Scalars["String"]>;
    sucessfulCallsLast30Days?: Maybe<Scalars["Int"]>;
    trigger?: Maybe<Array<Maybe<WebhookTriggerEvent>>>;
    unsucessfulCallsLast30Days?: Maybe<Scalars["Int"]>;
    updatedAt?: Maybe<Scalars["String"]>;
    url?: Maybe<Scalars["String"]>;
    webhookId?: Maybe<Scalars["String"]>;
};

export enum WebhookTriggerEvent {
    BlueprintCreate = "BLUEPRINT_CREATE",
    BlueprintDelete = "BLUEPRINT_DELETE",
    BlueprintUpdate = "BLUEPRINT_UPDATE",
    DocumentCreate = "DOCUMENT_CREATE",
    DocumentDelete = "DOCUMENT_DELETE",
    DocumentFieldUpdate = "DOCUMENT_FIELD_UPDATE",
    DocumentUpdate = "DOCUMENT_UPDATE",
    ProjectMemberAssinged = "PROJECT_MEMBER_ASSINGED",
    ProjectMemberDeassinged = "PROJECT_MEMBER_DEASSINGED",
}

export type WebhookUpsertInputInput = {
    description?: Maybe<Scalars["String"]>;
    headers?: Maybe<Array<Maybe<WebhookHeaderInput>>>;
    method?: Maybe<HttpMethod>;
    name?: Maybe<Scalars["String"]>;
    trigger?: Maybe<Array<Maybe<WebhookTriggerEvent>>>;
    url?: Maybe<Scalars["String"]>;
    webhookId?: Maybe<Scalars["String"]>;
};

export enum WithWithoutEnum {
    With = "WITH",
    Without = "WITHOUT",
}

export type Google_Protobuf_FieldMaskInput = {
    paths?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ApiKeyInitalResponseFragment = { __typename?: "APIKeyInitalResponse" } & Pick<
    ApiKeyInitalResponse,
    "apiKeyId" | "createdAt" | "name" | "value"
>;

export type ApiKeyResponseFragment = { __typename?: "APIKeyResponse" } & Pick<
    ApiKeyResponse,
    "apiKeyId" | "createdAt" | "name"
>;

export type AccessTokenResponseFragment = { __typename?: "AccessTokenResponse" } & Pick<
    AccessTokenResponse,
    "createdAt" | "id" | "name"
>;

export type AnyToRoleConnectionFragment = { __typename?: "AnyToRoleConnection" } & Pick<AnyToRoleConnection, "title">;

export type AssignRoleResponseFragment = { __typename?: "AssignRoleResponse" } & Pick<
    AssignRoleResponse,
    "success" | "userId"
>;

export type AuditEventConnectionFragment = { __typename?: "AuditEventConnection" } & Pick<
    AuditEventConnection,
    "totalCount"
> & {
    edges?: Maybe<Array<Maybe<{ __typename?: "AuditEventConnectionEdge" } & AuditEventConnectionEdgeFragment>>>;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type AuditEventConnectionEdgeFragment = { __typename?: "AuditEventConnectionEdge" } & Pick<
    AuditEventConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "AuditEventPayload" } & AuditEventPayloadFragment> };

export type AuditEventMetaFragment = { __typename?: "AuditEventMeta" } & Pick<
    AuditEventMeta,
    | "blueprintFieldId"
    | "blueprintId"
    | "createdAt"
    | "documentId"
    | "documentLocaleId"
    | "documentStatusId"
    | "effectedUserId"
    | "triggeredUserId"
    | "userRole"
>;

export type AuditEventPayloadFragment = { __typename?: "AuditEventPayload" } & Pick<
    AuditEventPayload,
    "body" | "eventId" | "trigger"
> & {
    metaData?: Maybe<{ __typename?: "AuditEventMeta" } & AuditEventMetaFragment>;
    scope?: Maybe<{ __typename?: "AuditEventScope" } & AuditEventScopeFragment>;
};

export type AuditEventScopeFragment = { __typename?: "AuditEventScope" } & Pick<AuditEventScope, "projectId">;

export type BlueprintChangeSetFragment = { __typename?: "BlueprintChangeSet" } & Pick<
    BlueprintChangeSet,
    "sourceBlueprintId" | "targetBlueprintId"
> & { fields?: Maybe<Array<Maybe<{ __typename?: "BlueprintFieldChangeSet" } & BlueprintFieldChangeSetFragment>>> };

export type BlueprintFieldFragment = { __typename?: "BlueprintField" } & Pick<
    BlueprintField,
    "blueprintFieldId" | "blueprintGroupId" | "blueprintId" | "description" | "name" | "system" | "title" | "type"
> & { options?: Maybe<{ __typename?: "BlueprintFieldOptions" } & BlueprintFieldOptionsFragment> };

export type BlueprintFieldChangeSetFragment = { __typename?: "BlueprintFieldChangeSet" } & Pick<
    BlueprintFieldChangeSet,
    "sourceBlueprintFieldId" | "targetBlueprintFieldId"
>;

export type BlueprintFieldCodeFragment = { __typename?: "BlueprintFieldCode" } & Pick<
    BlueprintFieldCode,
    "languages" | "max" | "min"
>;

export type BlueprintFieldConnectionFragment = { __typename?: "BlueprintFieldConnection" } & Pick<
    BlueprintFieldConnection,
    "connectedIds" | "max" | "min" | "multiple" | "variant"
>;

export type BlueprintFieldDatetimeFragment = { __typename?: "BlueprintFieldDatetime" } & Pick<
    BlueprintFieldDatetime,
    "time"
>;

export type BlueprintFieldExtensionFragment = { __typename?: "BlueprintFieldExtension" } & Pick<
    BlueprintFieldExtension,
    "height" | "pattern" | "url"
>;

export type BlueprintFieldFileFragment = { __typename?: "BlueprintFieldFile" } & Pick<BlueprintFieldFile, "pattern">;

export type BlueprintFieldFloatFragment = { __typename?: "BlueprintFieldFloat" } & Pick<
    BlueprintFieldFloat,
    "max" | "min"
>;

export type BlueprintFieldIntFragment = { __typename?: "BlueprintFieldInt" } & Pick<BlueprintFieldInt, "max" | "min">;

export type BlueprintFieldOptionsFragment = { __typename?: "BlueprintFieldOptions" } & Pick<
    BlueprintFieldOptions,
    "disableInApi" | "disableInUi" | "external" | "localized" | "primary" | "required" | "uniqueGlobal" | "uniqueLocal"
> & {
    code?: Maybe<{ __typename?: "BlueprintFieldCode" } & BlueprintFieldCodeFragment>;
    connection?: Maybe<{ __typename?: "BlueprintFieldConnection" } & BlueprintFieldConnectionFragment>;
    datetime?: Maybe<{ __typename?: "BlueprintFieldDatetime" } & BlueprintFieldDatetimeFragment>;
    extension?: Maybe<{ __typename?: "BlueprintFieldExtension" } & BlueprintFieldExtensionFragment>;
    file?: Maybe<{ __typename?: "BlueprintFieldFile" } & BlueprintFieldFileFragment>;
    float?: Maybe<{ __typename?: "BlueprintFieldFloat" } & BlueprintFieldFloatFragment>;
    int?: Maybe<{ __typename?: "BlueprintFieldInt" } & BlueprintFieldIntFragment>;
    richtext?: Maybe<{ __typename?: "BlueprintFieldRichtext" } & BlueprintFieldRichtextFragment>;
    select?: Maybe<{ __typename?: "BlueprintFieldSelect" } & BlueprintFieldSelectFragment>;
    string?: Maybe<{ __typename?: "BlueprintFieldString" } & BlueprintFieldStringFragment>;
    tag?: Maybe<{ __typename?: "BlueprintFieldTag" } & BlueprintFieldTagFragment>;
    video?: Maybe<{ __typename?: "BlueprintFieldVideo" } & BlueprintFieldVideoFragment>;
};

export type BlueprintFieldRichtextFragment = { __typename?: "BlueprintFieldRichtext" } & Pick<
    BlueprintFieldRichtext,
    | "assetBlueprintIds"
    | "assetLinking"
    | "componentBlueprintIds"
    | "componentLinking"
    | "documentBlueprintIds"
    | "documentLinking"
    | "max"
    | "min"
    | "pattern"
> & { features?: Maybe<{ __typename?: "BlueprintFieldRichtextFeatures" } & BlueprintFieldRichtextFeaturesFragment> };

export type BlueprintFieldRichtextFeaturesFragment = { __typename?: "BlueprintFieldRichtextFeatures" } & Pick<
    BlueprintFieldRichtextFeatures,
    | "alignCenter"
    | "alignJustify"
    | "alignLeft"
    | "alignRight"
    | "blockquote"
    | "bold"
    | "code"
    | "codeblock"
    | "frame"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "italic"
    | "link"
    | "ol"
    | "table"
    | "ul"
>;

export type BlueprintFieldSelectFragment = { __typename?: "BlueprintFieldSelect" } & Pick<
    BlueprintFieldSelect,
    "max" | "min" | "multiple" | "outputEnumType"
> & { items?: Maybe<Array<Maybe<{ __typename?: "BlueprintFieldSelectItem" } & BlueprintFieldSelectItemFragment>>> };

export type BlueprintFieldSelectItemFragment = { __typename?: "BlueprintFieldSelectItem" } & Pick<
    BlueprintFieldSelectItem,
    "key" | "value"
>;

export type BlueprintFieldStringFragment = { __typename?: "BlueprintFieldString" } & Pick<
    BlueprintFieldString,
    "max" | "min" | "multiline" | "pattern"
>;

export type BlueprintFieldTagFragment = { __typename?: "BlueprintFieldTag" } & Pick<
    BlueprintFieldTag,
    "max" | "min" | "pattern"
>;

export type BlueprintFieldVideoFragment = { __typename?: "BlueprintFieldVideo" } & Pick<BlueprintFieldVideo, "pattern">;

export type BlueprintGroupFragment = { __typename?: "BlueprintGroup" } & Pick<
    BlueprintGroup,
    "blueprintGroupId" | "name"
> & { fields?: Maybe<Array<Maybe<{ __typename?: "BlueprintField" } & BlueprintFieldFragment>>> };

export type BlueprintResponseFragment = { __typename?: "BlueprintResponse" } & Pick<
    BlueprintResponse,
    | "blueprintId"
    | "createdAt"
    | "createdBy"
    | "description"
    | "exposeMutations"
    | "name"
    | "previewImageUrl"
    | "projectId"
    | "single"
    | "system"
    | "tagIds"
    | "title"
    | "updatedAt"
    | "updatedBy"
    | "variant"
> & { groups?: Maybe<Array<Maybe<{ __typename?: "BlueprintGroup" } & BlueprintGroupFragment>>> };

export type BlueprintResponseConnectionFragment = { __typename?: "BlueprintResponseConnection" } & Pick<
    BlueprintResponseConnection,
    "totalCount"
> & {
    edges?: Maybe<
        Array<Maybe<{ __typename?: "BlueprintResponseConnectionEdge" } & BlueprintResponseConnectionEdgeFragment>>
    >;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type BlueprintResponseConnectionEdgeFragment = { __typename?: "BlueprintResponseConnectionEdge" } & Pick<
    BlueprintResponseConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment> };

export type CaisyUserProfileFragment = { __typename?: "CaisyUserProfile" } & Pick<
    CaisyUserProfile,
    "displayName" | "email" | "id" | "photoURL"
>;

export type CheckBlueprintNameAvailableResponseFragment = { __typename?: "CheckBlueprintNameAvailableResponse" } & Pick<
    CheckBlueprintNameAvailableResponse,
    "available"
>;

export type CopyMemberFromProjectToProjectErrorFragment = { __typename?: "CopyMemberFromProjectToProjectError" } & Pick<
    CopyMemberFromProjectToProjectError,
    "errorMessage" | "userId"
>;

export type CopyMemberFromProjectToProjectResponseFragment = {
    __typename?: "CopyMemberFromProjectToProjectResponse";
} & Pick<CopyMemberFromProjectToProjectResponse, "successfulMembers" | "totalMembers"> & {
    errors?: Maybe<
        Array<Maybe<{ __typename?: "CopyMemberFromProjectToProjectError" } & CopyMemberFromProjectToProjectErrorFragment>>
    >;
};

export type CreateApiKeyResponseFragment = { __typename?: "CreateAPIKeyResponse" } & Pick<
    CreateApiKeyResponse,
    "projectId"
> & { apikey?: Maybe<{ __typename?: "APIKeyInitalResponse" } & ApiKeyInitalResponseFragment> };

export type CreateBlueprintResponseFragment = { __typename?: "CreateBlueprintResponse" } & {
    blueprint?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment>;
};

export type CreateCaisyUserResultFragment = { __typename?: "CreateCaisyUserResult" } & Pick<
    CreateCaisyUserResult,
    "userId"
>;

export type CreateDocumentFieldLocaleResponseFragment = { __typename?: "CreateDocumentFieldLocaleResponse" } & Pick<
    CreateDocumentFieldLocaleResponse,
    "projectId"
> & {
    documentFieldLocale?: Maybe<{ __typename?: "DocumentFieldLocaleResponse" } & DocumentFieldLocaleResponseFragment>;
};

export type CreateDocumentResponseFragment = { __typename?: "CreateDocumentResponse" } & {
    document?: Maybe<{ __typename?: "Document" } & DocumentFragment>;
};

export type CreateGroupResponseFragment = { __typename?: "CreateGroupResponse" } & {
    group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
};

export type CreateManyViewsResponseFragment = { __typename?: "CreateManyViewsResponse" } & Pick<
    CreateManyViewsResponse,
    "success"
>;

export type CreateOrganizationResponseFragment = { __typename?: "CreateOrganizationResponse" } & {
    organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
};

export type CreatePreviewItemResponseFragment = { __typename?: "CreatePreviewItemResponse" } & {
    previewItem?: Maybe<{ __typename?: "PreviewItemResponse" } & PreviewItemResponseFragment>;
};

export type CreatePreviewResponseFragment = { __typename?: "CreatePreviewResponse" } & {
    preview?: Maybe<{ __typename?: "PreviewResponse" } & PreviewResponseFragment>;
};

export type CreateProjectResponseFragment = { __typename?: "CreateProjectResponse" } & {
    project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
};

export type CreateReleaseResponseFragment = { __typename?: "CreateReleaseResponse" } & {
    release?: Maybe<{ __typename?: "ReleaseResponse" } & ReleaseResponseFragment>;
};

export type CreateRoleRuleResponseFragment = { __typename?: "CreateRoleRuleResponse" } & {
    roleRule?: Maybe<{ __typename?: "RoleRuleResponse" } & RoleRuleResponseFragment>;
};

export type CreateTagResponseFragment = { __typename?: "CreateTagResponse" } & {
    tag?: Maybe<{ __typename?: "TagResponse" } & TagResponseFragment>;
};

export type CreateUserAccessTokenResponseFragment = { __typename?: "CreateUserAccessTokenResponse" } & Pick<
    CreateUserAccessTokenResponse,
    "createdAt" | "id" | "name" | "value"
>;

export type CreateUserRoleResponseFragment = { __typename?: "CreateUserRoleResponse" } & {
    userRole?: Maybe<{ __typename?: "UserRoleResponse" } & UserRoleResponseFragment>;
};

export type CreateViewPinResponseFragment = { __typename?: "CreateViewPinResponse" } & Pick<
    CreateViewPinResponse,
    "success"
>;

export type CreateViewResponseFragment = { __typename?: "CreateViewResponse" } & {
    view?: Maybe<{ __typename?: "ViewResponse" } & ViewResponseFragment>;
};

export type CreateWebhookResponseFragment = { __typename?: "CreateWebhookResponse" } & {
    webhook?: Maybe<{ __typename?: "WebhookResponse" } & WebhookResponseFragment>;
};

export type DeAssignRoleResponseFragment = { __typename?: "DeAssignRoleResponse" } & Pick<
    DeAssignRoleResponse,
    "success"
>;

export type DeleteApiKeyResponseFragment = { __typename?: "DeleteAPIKeyResponse" } & Pick<
    DeleteApiKeyResponse,
    "deleted"
>;

export type DeleteBlueprintResponseFragment = { __typename?: "DeleteBlueprintResponse" } & Pick<
    DeleteBlueprintResponse,
    "deleted"
>;

export type DeleteDocumentErrorFragment = { __typename?: "DeleteDocumentError" } & Pick<
    DeleteDocumentError,
    "documentId" | "errorMessage"
>;

export type DeleteDocumentFieldLocaleResponseFragment = { __typename?: "DeleteDocumentFieldLocaleResponse" } & Pick<
    DeleteDocumentFieldLocaleResponse,
    "deleted"
>;

export type DeleteDocumentResponseFragment = { __typename?: "DeleteDocumentResponse" } & Pick<
    DeleteDocumentResponse,
    "deleted"
>;

export type DeleteEntrypointResponseFragment = { __typename?: "DeleteEntrypointResponse" } & Pick<
    DeleteEntrypointResponse,
    "deleted"
>;

export type DeleteGroupResponseFragment = { __typename?: "DeleteGroupResponse" } & Pick<DeleteGroupResponse, "deleted">;

export type DeleteManyDocumentsResponseFragment = { __typename?: "DeleteManyDocumentsResponse" } & Pick<
    DeleteManyDocumentsResponse,
    "deletedDocumentIds"
> & { batchErrors?: Maybe<Array<Maybe<{ __typename?: "DeleteDocumentError" } & DeleteDocumentErrorFragment>>> };

export type DeleteManyReleasesResponseFragment = { __typename?: "DeleteManyReleasesResponse" } & Pick<
    DeleteManyReleasesResponse,
    "deleted"
>;

export type DeleteOrganizationResponseFragment = { __typename?: "DeleteOrganizationResponse" } & Pick<
    DeleteOrganizationResponse,
    "deleted"
>;

export type DeletePreviewItemResponseFragment = { __typename?: "DeletePreviewItemResponse" } & Pick<
    DeletePreviewItemResponse,
    "deleted"
>;

export type DeletePreviewResponseFragment = { __typename?: "DeletePreviewResponse" } & Pick<
    DeletePreviewResponse,
    "deleted"
>;

export type DeleteProjectResponseFragment = { __typename?: "DeleteProjectResponse" } & Pick<
    DeleteProjectResponse,
    "deleted"
>;

export type DeleteRoleRuleResponseFragment = { __typename?: "DeleteRoleRuleResponse" } & Pick<
    DeleteRoleRuleResponse,
    "deleted"
>;

export type DeleteTagResponseFragment = { __typename?: "DeleteTagResponse" } & Pick<DeleteTagResponse, "success">;

export type DeleteUserAccessTokenResponseFragment = { __typename?: "DeleteUserAccessTokenResponse" } & Pick<
    DeleteUserAccessTokenResponse,
    "deleted"
>;

export type DeleteUserRoleResponseFragment = { __typename?: "DeleteUserRoleResponse" } & Pick<
    DeleteUserRoleResponse,
    "deleted"
>;

export type DeleteViewPinResponseFragment = { __typename?: "DeleteViewPinResponse" } & Pick<
    DeleteViewPinResponse,
    "deleted"
>;

export type DeleteViewResponseFragment = { __typename?: "DeleteViewResponse" } & Pick<DeleteViewResponse, "deleted">;

export type DeleteWebhookResponseFragment = { __typename?: "DeleteWebhookResponse" } & Pick<
    DeleteWebhookResponse,
    "deleted"
>;

export type DocumentFragment = { __typename?: "Document" } & Pick<
    Document,
    | "archivedAt"
    | "blueprintBranch"
    | "blueprintId"
    | "blueprintVariant"
    | "createdAt"
    | "createdByUserId"
    | "documentId"
    | "environmentId"
    | "lastUpdatedByUserId"
    | "previewImageUrl"
    | "projectId"
    | "publishedAt"
    | "statusId"
    | "title"
    | "updatedAt"
>;

export type DocumentCountsByBlueprintsResponseFragment = { __typename?: "DocumentCountsByBlueprintsResponse" } & Pick<
    DocumentCountsByBlueprintsResponse,
    "blueprintId" | "count"
>;

export type DocumentFieldFragment = { __typename?: "DocumentField" } & Pick<
    DocumentField,
    "blueprintFieldId" | "createdAt" | "data" | "lastUpdatedByUserId" | "localeCode" | "type" | "updatedAt"
>;

export type DocumentFieldLocaleChangeSetFragment = { __typename?: "DocumentFieldLocaleChangeSet" } & Pick<
    DocumentFieldLocaleChangeSet,
    "sourceDocumentFieldLocaleId" | "targetDocumentFieldLocaleId"
>;

export type DocumentFieldLocaleResponseFragment = { __typename?: "DocumentFieldLocaleResponse" } & Pick<
    DocumentFieldLocaleResponse,
    | "allowEmptyRequired"
    | "apiName"
    | "default"
    | "disableEditing"
    | "disableInResponse"
    | "fallbackLocaleId"
    | "flag"
    | "id"
    | "title"
>;

export type DocumentFieldResponseFragment = { __typename?: "DocumentFieldResponse" } & {
    field?: Maybe<{ __typename?: "DocumentField" } & DocumentFieldFragment>;
    validation?: Maybe<{ __typename?: "Validation" } & ValidationFragment>;
};

export type DocumentResponseConnectionFragment = { __typename?: "DocumentResponseConnection" } & Pick<
    DocumentResponseConnection,
    "totalCount"
> & {
    edges?: Maybe<
        Array<Maybe<{ __typename?: "DocumentResponseConnectionEdge" } & DocumentResponseConnectionEdgeFragment>>
    >;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type DocumentResponseConnectionEdgeFragment = { __typename?: "DocumentResponseConnectionEdge" } & Pick<
    DocumentResponseConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "DocumentWithFieldsResponse" } & DocumentWithFieldsResponseFragment> };

export type DocumentSnapshotListFragmentFragment = { __typename?: "DocumentSnapshotListFragment" } & Pick<
    DocumentSnapshotListFragment,
    "publishedAt" | "snapshotId"
>;

export type DocumentStatusResponseFragment = { __typename?: "DocumentStatusResponse" } & Pick<
    DocumentStatusResponse,
    "name" | "statusId"
>;

export type DocumentValidationFragment = { __typename?: "DocumentValidation" } & Pick<
    DocumentValidation,
    "documentId"
> & { validation?: Maybe<{ __typename?: "Validation" } & ValidationFragment> };

export type DocumentWithFieldsResponseFragment = { __typename?: "DocumentWithFieldsResponse" } & Pick<
    DocumentWithFieldsResponse,
    | "archivedAt"
    | "blueprintBranch"
    | "blueprintId"
    | "createdAt"
    | "createdByUserId"
    | "documentId"
    | "environmentId"
    | "lastUpdatedByUserId"
    | "previewImageUrl"
    | "projectId"
    | "publishedAt"
    | "statusId"
    | "title"
    | "updatedAt"
> & { fields?: Maybe<Array<Maybe<{ __typename?: "DocumentField" } & DocumentFieldFragment>>> };

export type DuplicateDocumentResponseFragment = { __typename?: "DuplicateDocumentResponse" } & Pick<
    DuplicateDocumentResponse,
    "blueprintBranch" | "environmentId" | "parentId"
> & { response?: Maybe<{ __typename?: "Document" } & DocumentFragment> };

export type DuplicateToProjectResponseFragment = { __typename?: "DuplicateToProjectResponse" } & Pick<
    DuplicateToProjectResponse,
    "portId"
>;

export type EmailRecordFragment = { __typename?: "EmailRecord" } & Pick<EmailRecord, "address" | "verified">;

export type EntrypointResponseFragment = { __typename?: "EntrypointResponse" } & Pick<
    EntrypointResponse,
    "data" | "domain" | "groupId" | "lastUpdatedAt" | "lastUpdatedBy" | "organizationId" | "projectId"
>;

export type GetAllCompletedOnboardingEventsResponseFragment = {
    __typename?: "GetAllCompletedOnboardingEventsResponse";
} & Pick<GetAllCompletedOnboardingEventsResponse, "eventCodes">;

export type GetAllDocumentFieldLocaleResponseFragment = { __typename?: "GetAllDocumentFieldLocaleResponse" } & Pick<
    GetAllDocumentFieldLocaleResponse,
    "projectId"
> & {
    documentFieldLocales?: Maybe<
        Array<Maybe<{ __typename?: "DocumentFieldLocaleResponse" } & DocumentFieldLocaleResponseFragment>>
    >;
};

export type GetAllDocumentSnapshotResponseFragment = { __typename?: "GetAllDocumentSnapshotResponse" } & {
    documentSnapshots?: Maybe<
        Array<Maybe<{ __typename?: "DocumentSnapshotListFragment" } & DocumentSnapshotListFragmentFragment>>
    >;
};

export type GetAllDocumentStatusResponseFragment = { __typename?: "GetAllDocumentStatusResponse" } & {
    documentStatuses?: Maybe<Array<Maybe<{ __typename?: "DocumentStatusResponse" } & DocumentStatusResponseFragment>>>;
};

export type GetAllWebhooksResponseFragment = { __typename?: "GetAllWebhooksResponse" } & {
    webhooks?: Maybe<Array<Maybe<{ __typename?: "WebhookResponse" } & WebhookResponseFragment>>>;
};

export type GetAmountResponseFragment = { __typename?: "GetAmountResponse" } & Pick<GetAmountResponse, "value">;

export type GetBlueprintByIdResponseFragment = { __typename?: "GetBlueprintByIDResponse" } & {
    blueprint?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment>;
};

export type GetBlueprintByNameResponseFragment = { __typename?: "GetBlueprintByNameResponse" } & {
    blueprint?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment>;
};

export type GetCountsResponseFragment = { __typename?: "GetCountsResponse" } & {
    counts?: Maybe<Array<Maybe<{ __typename?: "QuotaCount" } & QuotaCountFragment>>>;
};

export type GetDocumentByIdResponseFragment = { __typename?: "GetDocumentByIdResponse" } & {
    document?: Maybe<{ __typename?: "DocumentWithFieldsResponse" } & DocumentWithFieldsResponseFragment>;
};

export type GetDocumentCountsByBlueprintsResponseFragment = { __typename?: "GetDocumentCountsByBlueprintsResponse" } & {
    counts?: Maybe<
        Array<Maybe<{ __typename?: "DocumentCountsByBlueprintsResponse" } & DocumentCountsByBlueprintsResponseFragment>>
    >;
};

export type GetDocumentSnapshotResponseFragment = { __typename?: "GetDocumentSnapshotResponse" } & {
    document?: Maybe<{ __typename?: "DocumentWithFieldsResponse" } & DocumentWithFieldsResponseFragment>;
};

export type GetEntrypointByDomainResponseFragment = { __typename?: "GetEntrypointByDomainResponse" } & {
    entrypoint?: Maybe<{ __typename?: "EntrypointResponse" } & EntrypointResponseFragment>;
};

export type GetEntrypointByScopeResponseFragment = { __typename?: "GetEntrypointByScopeResponse" } & {
    entrypoint?: Maybe<{ __typename?: "EntrypointResponse" } & EntrypointResponseFragment>;
};

export type GetGroupByIdResponseFragment = { __typename?: "GetGroupByIDResponse" } & {
    group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
};

export type GetGroupByIdWithInheritanceResponseFragment = { __typename?: "GetGroupByIDWithInheritanceResponse" } & {
    group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
    organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
};

export type GetGroupMembersResponseFragment = { __typename?: "GetGroupMembersResponse" } & {
    connection?: Maybe<{ __typename?: "MemberConnection" } & MemberConnectionFragment>;
};

export type GetGroupQuotaPlanResponseFragment = { __typename?: "GetGroupQuotaPlanResponse" } & Pick<
    GetGroupQuotaPlanResponse,
    "groupId"
> & { quotaPlan?: Maybe<{ __typename?: "GroupQuotaPlan" } & GroupQuotaPlanFragment> };

export type GetManyApiKeyResponseFragment = { __typename?: "GetManyAPIKeyResponse" } & Pick<
    GetManyApiKeyResponse,
    "projectId"
> & { apiKeys?: Maybe<Array<Maybe<{ __typename?: "APIKeyResponse" } & ApiKeyResponseFragment>>> };

export type GetManyAuditEventsResponseFragment = { __typename?: "GetManyAuditEventsResponse" } & {
    connection?: Maybe<{ __typename?: "AuditEventConnection" } & AuditEventConnectionFragment>;
};

export type GetManyBlueprintsResponseFragment = { __typename?: "GetManyBlueprintsResponse" } & {
    connection?: Maybe<{ __typename?: "BlueprintResponseConnection" } & BlueprintResponseConnectionFragment>;
};

export type GetManyDocumentFieldsByDocumentIdResponseFragment = {
    __typename?: "GetManyDocumentFieldsByDocumentIdResponse";
} & { fields?: Maybe<Array<Maybe<{ __typename?: "DocumentFieldResponse" } & DocumentFieldResponseFragment>>> };

export type GetManyDocumentFieldsByFieldIdsResponseFragment = {
    __typename?: "GetManyDocumentFieldsByFieldIdsResponse";
} & { fields?: Maybe<Array<Maybe<{ __typename?: "DocumentFieldResponse" } & DocumentFieldResponseFragment>>> };

export type GetManyDocumentsByIdsResponseFragment = { __typename?: "GetManyDocumentsByIdsResponse" } & {
    documents?: Maybe<Array<Maybe<{ __typename?: "DocumentWithFieldsResponse" } & DocumentWithFieldsResponseFragment>>>;
};

export type GetManyDocumentsResponseFragment = { __typename?: "GetManyDocumentsResponse" } & {
    connection?: Maybe<{ __typename?: "DocumentResponseConnection" } & DocumentResponseConnectionFragment>;
};

export type GetManyGroupsByUserIdResponseFragment = { __typename?: "GetManyGroupsByUserIDResponse" } & {
    connection?: Maybe<{ __typename?: "GroupResponseConnection" } & GroupResponseConnectionFragment>;
};

export type GetManyOrganizationsByUserIdResponseFragment = { __typename?: "GetManyOrganizationsByUserIDResponse" } & {
    connection?: Maybe<{ __typename?: "OrganizationResponseConnection" } & OrganizationResponseConnectionFragment>;
};

export type GetManyPreviewsResponseFragment = { __typename?: "GetManyPreviewsResponse" } & {
    connection?: Maybe<{ __typename?: "PreviewConnection" } & PreviewConnectionFragment>;
};

export type GetManyProjectsByUserIdResponseFragment = { __typename?: "GetManyProjectsByUserIDResponse" } & {
    connection?: Maybe<{ __typename?: "ProjectResponseConnection" } & ProjectResponseConnectionFragment>;
};

export type GetManyReleasesByProjectIdResponseFragment = { __typename?: "GetManyReleasesByProjectIdResponse" } & {
    node?: Maybe<Array<Maybe<{ __typename?: "ReleaseResponse" } & ReleaseResponseFragment>>>;
};

export type GetManyRoleRulesByRoleIdResponseFragment = { __typename?: "GetManyRoleRulesByRoleIDResponse" } & {
    roleRules?: Maybe<Array<Maybe<{ __typename?: "RoleRuleResponse" } & RoleRuleResponseFragment>>>;
};

export type GetManyTagsResponseFragment = { __typename?: "GetManyTagsResponse" } & {
    connection?: Maybe<{ __typename?: "TagConnection" } & TagConnectionFragment>;
};

export type GetManyUserRolesResponseFragment = { __typename?: "GetManyUserRolesResponse" } & {
    userRoles?: Maybe<Array<Maybe<{ __typename?: "UserRoleResponse" } & UserRoleResponseFragment>>>;
};

export type GetManyViewsResponseFragment = { __typename?: "GetManyViewsResponse" } & {
    views?: Maybe<Array<Maybe<{ __typename?: "ViewResponse" } & ViewResponseFragment>>>;
};

export type GetManyWebhookCallsResponseFragment = { __typename?: "GetManyWebhookCallsResponse" } & {
    connection?: Maybe<{ __typename?: "WebhookCallConnection" } & WebhookCallConnectionFragment>;
};

export type GetOrganizationByIdResponseFragment = { __typename?: "GetOrganizationByIDResponse" } & {
    organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
};

export type GetOrganizationMembersResponseFragment = { __typename?: "GetOrganizationMembersResponse" } & {
    connection?: Maybe<{ __typename?: "MemberConnection" } & MemberConnectionFragment>;
};

export type GetOrganizationQuotaPlanResponseFragment = { __typename?: "GetOrganizationQuotaPlanResponse" } & Pick<
    GetOrganizationQuotaPlanResponse,
    "organizationId"
> & { quotaPlan?: Maybe<{ __typename?: "OrganizationQuotaPlan" } & OrganizationQuotaPlanFragment> };

export type GetPermissionGrantResponseFragment = { __typename?: "GetPermissionGrantResponse" } & Pick<
    GetPermissionGrantResponse,
    "success"
> & { appliedRole?: Maybe<{ __typename?: "Role" } & RoleFragment> };

export type GetPermissionSetResponseFragment = { __typename?: "GetPermissionSetResponse" } & {
    appliedRole?: Maybe<{ __typename?: "Role" } & RoleFragment>;
    permissionSet?: Maybe<Array<Maybe<{ __typename?: "PermissionSet" } & PermissionSetFragment>>>;
};

export type GetPreferredThemeResponseFragment = { __typename?: "GetPreferredThemeResponse" } & Pick<
    GetPreferredThemeResponse,
    "preferredTheme"
>;

export type GetPreferredUiLanguageResponseFragment = { __typename?: "GetPreferredUILanguageResponse" } & Pick<
    GetPreferredUiLanguageResponse,
    "preferredUiLanguage"
>;

export type GetPreviewByIdResponseFragment = { __typename?: "GetPreviewByIdResponse" } & {
    preview?: Maybe<{ __typename?: "PreviewWithItemsResponse" } & PreviewWithItemsResponseFragment>;
};

export type GetPreviewItemsByBlueprintIdResponseFragment = { __typename?: "GetPreviewItemsByBlueprintIdResponse" } & {
    previewItems?: Maybe<Array<Maybe<{ __typename?: "PreviewItemResponse" } & PreviewItemResponseFragment>>>;
};

export type GetProjectByIdResponseFragment = { __typename?: "GetProjectByIDResponse" } & {
    project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
};

export type GetProjectByIdWithInheritanceResponseFragment = { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
    group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
    organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
    project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
};

export type GetProjectMembersResponseFragment = { __typename?: "GetProjectMembersResponse" } & {
    connection?: Maybe<{ __typename?: "MemberConnection" } & MemberConnectionFragment>;
};

export type GetProjectPortResponseFragment = { __typename?: "GetProjectPortResponse" } & Pick<
    GetProjectPortResponse,
    "createdAt" | "expiresAt" | "finished" | "portType" | "projectId"
> & {
    portErrors?: Maybe<Array<Maybe<{ __typename?: "PortError" } & PortErrorFragment>>>;
    selectionProgress?: Maybe<{ __typename?: "ProjectPortSelectionProgress" } & ProjectPortSelectionProgressFragment>;
};

export type GetProjectQuotaPlanResponseFragment = { __typename?: "GetProjectQuotaPlanResponse" } & Pick<
    GetProjectQuotaPlanResponse,
    "projectId"
> & { quotaPlan?: Maybe<{ __typename?: "ProjectQuotaPlan" } & ProjectQuotaPlanFragment> };

export type GetReleaseByIdResponseFragment = { __typename?: "GetReleaseByIdResponse" } & {
    release?: Maybe<{ __typename?: "ReleaseResponse" } & ReleaseResponseFragment>;
};

export type GetRoleRuleByIdResponseFragment = { __typename?: "GetRoleRuleByIDResponse" } & {
    roleRule?: Maybe<{ __typename?: "RoleRuleResponse" } & RoleRuleResponseFragment>;
};

export type GetUnpublishedLinkedDocumentsResponseFragment = { __typename?: "GetUnpublishedLinkedDocumentsResponse" } & {
    document?: Maybe<Array<Maybe<{ __typename?: "Document" } & DocumentFragment>>>;
};

export type GetUsageOfBlueprintFieldResponseFragment = { __typename?: "GetUsageOfBlueprintFieldResponse" } & Pick<
    GetUsageOfBlueprintFieldResponse,
    "usageAmount"
>;

export type GetUserResponseFragment = { __typename?: "GetUserResponse" } & {
    profile?: Maybe<{ __typename?: "CaisyUserProfile" } & CaisyUserProfileFragment>;
    session?: Maybe<{ __typename?: "Session" } & SessionFragment>;
    settings?: Maybe<{ __typename?: "UserSettings" } & UserSettingsFragment>;
};

export type GetUserRoleWithRoleRulesResponseFragment = { __typename?: "GetUserRoleWithRoleRulesResponse" } & Pick<
    GetUserRoleWithRoleRulesResponse,
    "description" | "inheritedBySystemRole" | "roleId" | "title"
> & { roleRules?: Maybe<Array<Maybe<{ __typename?: "RoleRuleResponse" } & RoleRuleResponseFragment>>> };

export type GroupQuotaPlanFragment = { __typename?: "GroupQuotaPlan" } & Pick<GroupQuotaPlan, "maxMembers">;

export type GroupResponseFragment = { __typename?: "GroupResponse" } & Pick<
    GroupResponse,
    "alias" | "createdAt" | "description" | "groupId" | "logoAssetUrl" | "name" | "organizationId" | "updatedAt"
> & { roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment> };

export type GroupResponseConnectionFragment = { __typename?: "GroupResponseConnection" } & Pick<
    GroupResponseConnection,
    "totalCount"
> & {
    edges?: Maybe<Array<Maybe<{ __typename?: "GroupResponseConnectionEdge" } & GroupResponseConnectionEdgeFragment>>>;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type GroupResponseConnectionEdgeFragment = { __typename?: "GroupResponseConnectionEdge" } & Pick<
    GroupResponseConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment> };

export type LinkManyReleaseDocumentResponseFragment = { __typename?: "LinkManyReleaseDocumentResponse" } & Pick<
    LinkManyReleaseDocumentResponse,
    "successful"
>;

export type ListenOnDocumentResponseFragment = { __typename?: "ListenOnDocumentResponse" } & {
    document?: Maybe<{ __typename?: "Document" } & DocumentFragment>;
};

export type LoginResultFragment = { __typename?: "LoginResult" } & Pick<LoginResult, "sessionId"> & {
    tokens?: Maybe<{ __typename?: "Tokens" } & TokensFragment>;
    user?: Maybe<{ __typename?: "LoginResultUser" } & LoginResultUserFragment>;
};

export type LoginResultUserFragment = { __typename?: "LoginResultUser" } & Pick<
    LoginResultUser,
    "email" | "id" | "username"
>;

export type MemberConnectionFragment = { __typename?: "MemberConnection" } & Pick<MemberConnection, "totalCount"> & {
    edges?: Maybe<Array<Maybe<{ __typename?: "MemberConnectionEdge" } & MemberConnectionEdgeFragment>>>;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type MemberConnectionEdgeFragment = { __typename?: "MemberConnectionEdge" } & Pick<
    MemberConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "MemberResponse" } & MemberResponseFragment> };

export type MemberResponseFragment = { __typename?: "MemberResponse" } & {
    role?: Maybe<{ __typename?: "Role" } & RoleFragment>;
    user?: Maybe<{ __typename?: "UserProfile" } & UserProfileFragment>;
};

export type MoveProjectResponseFragment = { __typename?: "MoveProjectResponse" } & {
    project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
};

export type OrganizationQuotaPlanFragment = { __typename?: "OrganizationQuotaPlan" } & Pick<
    OrganizationQuotaPlan,
    "maxMembers"
>;

export type OrganizationResponseFragment = { __typename?: "OrganizationResponse" } & Pick<
    OrganizationResponse,
    "alias" | "createdAt" | "description" | "logoAssetUrl" | "name" | "organizationId" | "updatedAt"
> & { roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment> };

export type OrganizationResponseConnectionFragment = { __typename?: "OrganizationResponseConnection" } & Pick<
    OrganizationResponseConnection,
    "totalCount"
> & {
    edges?: Maybe<
        Array<Maybe<{ __typename?: "OrganizationResponseConnectionEdge" } & OrganizationResponseConnectionEdgeFragment>>
    >;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type OrganizationResponseConnectionEdgeFragment = { __typename?: "OrganizationResponseConnectionEdge" } & Pick<
    OrganizationResponseConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment> };

export type PageInfoFragment = { __typename?: "PageInfo" } & Pick<
    PageInfo,
    "endCursor" | "hasNextPage" | "hasPreviousPage" | "startCursor"
>;

export type PermissionSetFragment = { __typename?: "PermissionSet" } & Pick<
    PermissionSet,
    "action" | "allow" | "domain" | "object" | "target"
>;

export type PortErrorFragment = { __typename?: "PortError" } & Pick<
    PortError,
    "errorMessage" | "objectId" | "objectType"
>;

export type PreviewConnectionFragment = { __typename?: "PreviewConnection" } & Pick<PreviewConnection, "totalCount"> & {
    edges?: Maybe<Array<Maybe<{ __typename?: "PreviewConnectionEdge" } & PreviewConnectionEdgeFragment>>>;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type PreviewConnectionEdgeFragment = { __typename?: "PreviewConnectionEdge" } & Pick<
    PreviewConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "PreviewWithItemsResponse" } & PreviewWithItemsResponseFragment> };

export type PreviewItemResponseFragment = { __typename?: "PreviewItemResponse" } & Pick<
    PreviewItemResponse,
    "blueprintId" | "enableLivePreview" | "previewId" | "previewItemId" | "previewUrl"
>;

export type PreviewResponseFragment = { __typename?: "PreviewResponse" } & Pick<PreviewResponse, "name" | "previewId">;

export type PreviewWithItemsResponseFragment = { __typename?: "PreviewWithItemsResponse" } & Pick<
    PreviewWithItemsResponse,
    "name" | "previewId"
> & { previewItems?: Maybe<Array<Maybe<{ __typename?: "PreviewItemResponse" } & PreviewItemResponseFragment>>> };

export type ProjectPortSelectionProgressFragment = { __typename?: "ProjectPortSelectionProgress" } & Pick<
    ProjectPortSelectionProgress,
    | "blueprintCompleted"
    | "blueprintTotal"
    | "documentCompleted"
    | "documentFieldLocaleCompleted"
    | "documentFieldLocaleTotal"
    | "documentTotal"
    | "memberCompleted"
    | "memberTotal"
    | "previewCompleted"
    | "previewTotal"
    | "tagCompleted"
    | "tagTotal"
    | "viewCompleted"
    | "viewTotal"
    | "webhookCompleted"
    | "webhookTotal"
>;

export type ProjectQuotaPlanFragment = { __typename?: "ProjectQuotaPlan" } & Pick<
    ProjectQuotaPlan,
    "maxBlueprints" | "maxDocuments" | "maxLocales" | "maxMembers" | "maxPreviews" | "maxViews" | "maxWebhooks" | "name"
>;

export type ProjectResponseFragment = { __typename?: "ProjectResponse" } & Pick<
    ProjectResponse,
    | "alias"
    | "createdAt"
    | "description"
    | "groupId"
    | "logoAssetUrl"
    | "name"
    | "organizationId"
    | "projectId"
    | "updatedAt"
> & { roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment> };

export type ProjectResponseConnectionFragment = { __typename?: "ProjectResponseConnection" } & Pick<
    ProjectResponseConnection,
    "totalCount"
> & {
    edges?: Maybe<
        Array<Maybe<{ __typename?: "ProjectResponseConnectionEdge" } & ProjectResponseConnectionEdgeFragment>>
    >;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type ProjectResponseConnectionEdgeFragment = { __typename?: "ProjectResponseConnectionEdge" } & Pick<
    ProjectResponseConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment> };

export type PutManyBlueprintsErrorFragment = { __typename?: "PutManyBlueprintsError" } & Pick<
    PutManyBlueprintsError,
    "blueprintId" | "errorMessage"
>;

export type PutManyBlueprintsResponseFragment = { __typename?: "PutManyBlueprintsResponse" } & Pick<
    PutManyBlueprintsResponse,
    "successfulBlueprintIds"
> & {
    changeSet?: Maybe<Array<Maybe<{ __typename?: "BlueprintChangeSet" } & BlueprintChangeSetFragment>>>;
    errors?: Maybe<Array<Maybe<{ __typename?: "PutManyBlueprintsError" } & PutManyBlueprintsErrorFragment>>>;
};

export type PutManyDocumentFieldLocalesErrorFragment = { __typename?: "PutManyDocumentFieldLocalesError" } & Pick<
    PutManyDocumentFieldLocalesError,
    "documentFieldLocaleId" | "errorMessage"
>;

export type PutManyDocumentFieldLocalesResponseFragment = { __typename?: "PutManyDocumentFieldLocalesResponse" } & Pick<
    PutManyDocumentFieldLocalesResponse,
    "successfulDocumentFieldLocaleIds"
> & {
    changeSet?: Maybe<
        Array<Maybe<{ __typename?: "DocumentFieldLocaleChangeSet" } & DocumentFieldLocaleChangeSetFragment>>
    >;
    errors?: Maybe<
        Array<Maybe<{ __typename?: "PutManyDocumentFieldLocalesError" } & PutManyDocumentFieldLocalesErrorFragment>>
    >;
};

export type PutManyPreviewsErrorFragment = { __typename?: "PutManyPreviewsError" } & Pick<
    PutManyPreviewsError,
    "errorMessage" | "previewId"
>;

export type PutManyPreviewsResponseFragment = { __typename?: "PutManyPreviewsResponse" } & Pick<
    PutManyPreviewsResponse,
    "successfulPreviewIds"
> & { errors?: Maybe<Array<Maybe<{ __typename?: "PutManyPreviewsError" } & PutManyPreviewsErrorFragment>>> };

export type PutManyTagsErrorFragment = { __typename?: "PutManyTagsError" } & Pick<
    PutManyTagsError,
    "errorMessage" | "tagId"
>;

export type PutManyTagsResponseFragment = { __typename?: "PutManyTagsResponse" } & Pick<
    PutManyTagsResponse,
    "successfulTagIds"
> & { errors?: Maybe<Array<Maybe<{ __typename?: "PutManyTagsError" } & PutManyTagsErrorFragment>>> };

export type PutManyViewsErrorFragment = { __typename?: "PutManyViewsError" } & Pick<
    PutManyViewsError,
    "errorMessage" | "viewId"
>;

export type PutManyViewsResponseFragment = { __typename?: "PutManyViewsResponse" } & Pick<
    PutManyViewsResponse,
    "successfulViewIds"
> & { errors?: Maybe<Array<Maybe<{ __typename?: "PutManyViewsError" } & PutManyViewsErrorFragment>>> };

export type PutManyWebhooksResponseFragment = { __typename?: "PutManyWebhooksResponse" } & {
    webhooks?: Maybe<Array<Maybe<{ __typename?: "WebhookResponse" } & WebhookResponseFragment>>>;
};

export type QuotaCountFragment = { __typename?: "QuotaCount" } & Pick<QuotaCount, "count">;

export type ReadUserAccessTokensResponseFragment = { __typename?: "ReadUserAccessTokensResponse" } & {
    tokens?: Maybe<Array<Maybe<{ __typename?: "AccessTokenResponse" } & AccessTokenResponseFragment>>>;
};

export type ReleaseDocumentFieldErrorsFragment = { __typename?: "ReleaseDocumentFieldErrors" } & Pick<
    ReleaseDocumentFieldErrors,
    "blueprintFieldId" | "errorCodes" | "locale"
>;

export type ReleaseResponseFragment = { __typename?: "ReleaseResponse" } & Pick<
    ReleaseResponse,
    "createdAt" | "documentIds" | "id" | "name" | "projectId" | "scheduledAt" | "status" | "type" | "updatedAt"
> & {
    validationErrors?: Maybe<
        Array<Maybe<{ __typename?: "ReleaseValidationDocumentErrors" } & ReleaseValidationDocumentErrorsFragment>>
    >;
};

export type ReleaseValidationDocumentErrorsFragment = { __typename?: "ReleaseValidationDocumentErrors" } & Pick<
    ReleaseValidationDocumentErrors,
    "documentId"
> & {
    errors?: Maybe<Array<Maybe<{ __typename?: "ReleaseDocumentFieldErrors" } & ReleaseDocumentFieldErrorsFragment>>>;
};

export type RoleFragment = { __typename?: "Role" } & Pick<
    Role,
    | "description"
    | "groupId"
    | "inheritedBySystemRole"
    | "organizationId"
    | "projectId"
    | "roleId"
    | "systemRole"
    | "title"
>;

export type RoleRuleResponseFragment = { __typename?: "RoleRuleResponse" } & Pick<
    RoleRuleResponse,
    "action" | "allow" | "domain" | "object" | "roleId" | "ruleId" | "target"
>;

export type SessionFragment = { __typename?: "Session" } & Pick<
    Session,
    | "activeProjectId"
    | "audience"
    | "authTime"
    | "email"
    | "expires"
    | "issuedAt"
    | "issuer"
    | "provider"
    | "subject"
    | "token"
    | "uid"
>;

export type SetCompletedOnboardingEventsResponseFragment = {
    __typename?: "SetCompletedOnboardingEventsResponse";
} & Pick<SetCompletedOnboardingEventsResponse, "eventCodes">;

export type SetPreferredThemeResponseFragment = { __typename?: "SetPreferredThemeResponse" } & Pick<
    SetPreferredThemeResponse,
    "preferredTheme"
>;

export type SetPreferredUiLanguageResponseFragment = { __typename?: "SetPreferredUILanguageResponse" } & Pick<
    SetPreferredUiLanguageResponse,
    "preferredUiLanguage"
>;

export type TagConnectionFragment = { __typename?: "TagConnection" } & Pick<TagConnection, "totalCount"> & {
    edges?: Maybe<Array<Maybe<{ __typename?: "TagConnectionEdge" } & TagConnectionEdgeFragment>>>;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type TagConnectionEdgeFragment = { __typename?: "TagConnectionEdge" } & Pick<TagConnectionEdge, "cursor"> & {
    node?: Maybe<{ __typename?: "TagResponse" } & TagResponseFragment>;
};

export type TagResponseFragment = { __typename?: "TagResponse" } & Pick<
    TagResponse,
    "color" | "name" | "projectId" | "referenceType" | "tagId"
>;

export type TokensFragment = { __typename?: "Tokens" } & Pick<Tokens, "accessToken" | "refreshToken">;

export type UnlinkManyReleaseDocumentResponseFragment = { __typename?: "UnlinkManyReleaseDocumentResponse" } & Pick<
    UnlinkManyReleaseDocumentResponse,
    "successful"
>;

export type UpdateBlueprintResponseFragment = { __typename?: "UpdateBlueprintResponse" } & {
    blueprint?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment>;
};

export type UpdateDocumentErrorFragment = { __typename?: "UpdateDocumentError" } & Pick<
    UpdateDocumentError,
    "documentId" | "errorMessage"
>;

export type UpdateDocumentFieldLocaleResponseFragment = { __typename?: "UpdateDocumentFieldLocaleResponse" } & Pick<
    UpdateDocumentFieldLocaleResponse,
    "projectId"
> & {
    documentFieldLocale?: Maybe<{ __typename?: "DocumentFieldLocaleResponse" } & DocumentFieldLocaleResponseFragment>;
};

export type UpdateDocumentFieldResponseFragment = { __typename?: "UpdateDocumentFieldResponse" } & Pick<
    UpdateDocumentFieldResponse,
    "blueprintFieldId"
> & { document?: Maybe<{ __typename?: "Document" } & DocumentFragment> };

export type UpdateDocumentResponseFragment = { __typename?: "UpdateDocumentResponse" } & {
    document?: Maybe<{ __typename?: "Document" } & DocumentFragment>;
};

export type UpdateEntrypointResponseFragment = { __typename?: "UpdateEntrypointResponse" } & {
    entrypoint?: Maybe<{ __typename?: "EntrypointResponse" } & EntrypointResponseFragment>;
};

export type UpdateGroupResponseFragment = { __typename?: "UpdateGroupResponse" } & {
    group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
};

export type UpdateManyDocumentsResponseFragment = { __typename?: "UpdateManyDocumentsResponse" } & Pick<
    UpdateManyDocumentsResponse,
    "updatedDocumentIds"
> & { batchErrors?: Maybe<Array<Maybe<{ __typename?: "UpdateDocumentError" } & UpdateDocumentErrorFragment>>> };

export type UpdateOrganizationResponseFragment = { __typename?: "UpdateOrganizationResponse" } & {
    organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
};

export type UpdatePreferredUiLanguageResponseFragment = { __typename?: "UpdatePreferredUILanguageResponse" } & Pick<
    UpdatePreferredUiLanguageResponse,
    "success"
>;

export type UpdatePreferredUiThemeResponseFragment = { __typename?: "UpdatePreferredUIThemeResponse" } & Pick<
    UpdatePreferredUiThemeResponse,
    "success"
>;

export type UpdatePreviewItemResponseFragment = { __typename?: "UpdatePreviewItemResponse" } & {
    previewItem?: Maybe<{ __typename?: "PreviewItemResponse" } & PreviewItemResponseFragment>;
};

export type UpdatePreviewResponseFragment = { __typename?: "UpdatePreviewResponse" } & {
    preview?: Maybe<{ __typename?: "PreviewResponse" } & PreviewResponseFragment>;
};

export type UpdateProjectResponseFragment = { __typename?: "UpdateProjectResponse" } & {
    project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
};

export type UpdateQuotaPlanResponseFragment = { __typename?: "UpdateQuotaPlanResponse" } & Pick<
    UpdateQuotaPlanResponse,
    "groupId" | "organizationId" | "projectId"
> & { quotaPlan?: Maybe<{ __typename?: "ProjectQuotaPlan" } & ProjectQuotaPlanFragment> };

export type UpdateReleaseResponseFragment = { __typename?: "UpdateReleaseResponse" } & {
    release?: Maybe<{ __typename?: "ReleaseResponse" } & ReleaseResponseFragment>;
};

export type UpdateRoleRuleResponseFragment = { __typename?: "UpdateRoleRuleResponse" } & {
    roleRule?: Maybe<{ __typename?: "RoleRuleResponse" } & RoleRuleResponseFragment>;
};

export type UpdateTagResponseFragment = { __typename?: "UpdateTagResponse" } & {
    tag?: Maybe<{ __typename?: "TagResponse" } & TagResponseFragment>;
};

export type UpdateUserProfileResponseFragment = { __typename?: "UpdateUserProfileResponse" } & Pick<
    UpdateUserProfileResponse,
    "success"
>;

export type UpdateUserRoleResponseFragment = { __typename?: "UpdateUserRoleResponse" } & {
    userRole?: Maybe<{ __typename?: "UserRoleResponse" } & UserRoleResponseFragment>;
};

export type UpdateViewResponseFragment = { __typename?: "UpdateViewResponse" } & {
    view?: Maybe<{ __typename?: "ViewResponse" } & ViewResponseFragment>;
};

export type UpdateWebhookResponseFragment = { __typename?: "UpdateWebhookResponse" } & {
    webhook?: Maybe<{ __typename?: "WebhookResponse" } & WebhookResponseFragment>;
};

export type UserProfileFragment = { __typename?: "UserProfile" } & Pick<
    UserProfile,
    "displayName" | "email" | "photoUrl" | "userId"
>;

export type UserRoleResponseFragment = { __typename?: "UserRoleResponse" } & Pick<
    UserRoleResponse,
    "description" | "groupId" | "inheritedBySystemRole" | "organizationId" | "projectId" | "roleId" | "title"
>;

export type UserSettingsFragment = { __typename?: "UserSettings" } & Pick<
    UserSettings,
    "preferredUILanguage" | "preferredUITheme"
>;

export type ValidateApiKeyResponseFragment = { __typename?: "ValidateAPIKeyResponse" } & Pick<
    ValidateApiKeyResponse,
    "success"
>;

export type ValidateDocumentErrorFragment = { __typename?: "ValidateDocumentError" } & Pick<
    ValidateDocumentError,
    "documentId" | "errorMessage"
>;

export type ValidateDocumentFieldResponseFragment = { __typename?: "ValidateDocumentFieldResponse" } & {
    validation?: Maybe<{ __typename?: "Validation" } & ValidationFragment>;
};

export type ValidateDocumentResponseFragment = { __typename?: "ValidateDocumentResponse" } & {
    validation?: Maybe<{ __typename?: "Validation" } & ValidationFragment>;
};

export type ValidateManyDocumentsResponseFragment = { __typename?: "ValidateManyDocumentsResponse" } & {
    batchErrors?: Maybe<Array<Maybe<{ __typename?: "ValidateDocumentError" } & ValidateDocumentErrorFragment>>>;
    documentsValidations?: Maybe<Array<Maybe<{ __typename?: "DocumentValidation" } & DocumentValidationFragment>>>;
};

export type ValidateReleaseResponseFragment = { __typename?: "ValidateReleaseResponse" } & Pick<
    ValidateReleaseResponse,
    "releaseId" | "valid"
> & {
    validationErrors?: Maybe<
        Array<Maybe<{ __typename?: "ReleaseValidationDocumentErrors" } & ReleaseValidationDocumentErrorsFragment>>
    >;
};

export type ValidationFragment = { __typename?: "Validation" } & Pick<Validation, "valid"> & {
    errors?: Maybe<Array<Maybe<{ __typename?: "ValidationError" } & ValidationErrorFragment>>>;
};

export type ValidationErrorFragment = { __typename?: "ValidationError" } & Pick<
    ValidationError,
    "blueprintFieldId" | "errorCodes" | "errorDetails" | "locale"
>;

export type ViewResponseFragment = { __typename?: "ViewResponse" } & Pick<
    ViewResponse,
    "iconUrl" | "id" | "parentId" | "pinned" | "position" | "privat" | "query" | "target" | "title"
>;

export type WebhookCallConnectionFragment = { __typename?: "WebhookCallConnection" } & Pick<
    WebhookCallConnection,
    "totalCount"
> & {
    edges?: Maybe<Array<Maybe<{ __typename?: "WebhookCallConnectionEdge" } & WebhookCallConnectionEdgeFragment>>>;
    pageInfo?: Maybe<{ __typename?: "PageInfo" } & PageInfoFragment>;
};

export type WebhookCallConnectionEdgeFragment = { __typename?: "WebhookCallConnectionEdge" } & Pick<
    WebhookCallConnectionEdge,
    "cursor"
> & { node?: Maybe<{ __typename?: "WebhookCallResponse" } & WebhookCallResponseFragment> };

export type WebhookCallResponseFragment = { __typename?: "WebhookCallResponse" } & Pick<
    WebhookCallResponse,
    "createdAt" | "eventId" | "requestBody" | "responseBody" | "responseStatusCode" | "webhookCallId" | "webhookId"
> & {
    requestHeaders?: Maybe<Array<Maybe<{ __typename?: "WebhookHeader" } & WebhookHeaderFragment>>>;
    responseHeaders?: Maybe<Array<Maybe<{ __typename?: "WebhookHeader" } & WebhookHeaderFragment>>>;
};

export type WebhookHeaderFragment = { __typename?: "WebhookHeader" } & Pick<WebhookHeader, "name" | "value">;

export type WebhookResponseFragment = { __typename?: "WebhookResponse" } & Pick<
    WebhookResponse,
    | "createdAt"
    | "description"
    | "method"
    | "name"
    | "sucessfulCallsLast30Days"
    | "trigger"
    | "unsucessfulCallsLast30Days"
    | "updatedAt"
    | "url"
    | "webhookId"
> & { headers?: Maybe<Array<Maybe<{ __typename?: "WebhookHeader" } & WebhookHeaderFragment>>> };

export type AssignRoleMutationVariables = Exact<{
    input?: Maybe<AssignRoleRequestInput>;
}>;

export type AssignRoleMutation = { __typename?: "Mutation" } & {
    AssignRole?: Maybe<{ __typename?: "AssignRoleResponse" } & AssignRoleResponseFragment>;
};

export type CheckBlueprintNameAvailableMutationVariables = Exact<{
    input?: Maybe<CheckBlueprintNameAvailableRequest>;
}>;

export type CheckBlueprintNameAvailableMutation = { __typename?: "Mutation" } & {
    CheckBlueprintNameAvailable?: Maybe<
        { __typename?: "CheckBlueprintNameAvailableResponse" } & CheckBlueprintNameAvailableResponseFragment
    >;
};

export type CopyMemberFromProjectToProjectMutationVariables = Exact<{
    input?: Maybe<CopyMemberFromProjectToProjectRequestInput>;
}>;

export type CopyMemberFromProjectToProjectMutation = { __typename?: "Mutation" } & {
    CopyMemberFromProjectToProject?: Maybe<
        { __typename?: "CopyMemberFromProjectToProjectResponse" } & CopyMemberFromProjectToProjectResponseFragment
    >;
};

export type CreateApiKeyMutationVariables = Exact<{
    input?: Maybe<CreateApiKeyRequestInput>;
}>;

export type CreateApiKeyMutation = { __typename?: "Mutation" } & {
    CreateApiKey?: Maybe<{ __typename?: "CreateAPIKeyResponse" } & CreateApiKeyResponseFragment>;
};

export type CreateBlueprintMutationVariables = Exact<{
    input?: Maybe<CreateBlueprintRequest>;
}>;

export type CreateBlueprintMutation = { __typename?: "Mutation" } & {
    CreateBlueprint?: Maybe<{ __typename?: "CreateBlueprintResponse" } & CreateBlueprintResponseFragment>;
};

export type CreateDocumentMutationVariables = Exact<{
    input?: Maybe<CreateDocumentRequestInput>;
}>;

export type CreateDocumentMutation = { __typename?: "Mutation" } & {
    CreateDocument?: Maybe<{ __typename?: "CreateDocumentResponse" } & CreateDocumentResponseFragment>;
};

export type CreateDocumentFieldLocaleMutationVariables = Exact<{
    input?: Maybe<CreateDocumentFieldLocaleRequestInput>;
}>;

export type CreateDocumentFieldLocaleMutation = { __typename?: "Mutation" } & {
    CreateDocumentFieldLocale?: Maybe<
        { __typename?: "CreateDocumentFieldLocaleResponse" } & CreateDocumentFieldLocaleResponseFragment
    >;
};

export type CreateGroupMutationVariables = Exact<{
    input?: Maybe<CreateGroupRequestInput>;
}>;

export type CreateGroupMutation = { __typename?: "Mutation" } & {
    CreateGroup?: Maybe<{ __typename?: "CreateGroupResponse" } & CreateGroupResponseFragment>;
};

export type CreateManyViewsMutationVariables = Exact<{
    input?: Maybe<CreateManyViewsRequestInput>;
}>;

export type CreateManyViewsMutation = { __typename?: "Mutation" } & {
    CreateManyViews?: Maybe<{ __typename?: "CreateManyViewsResponse" } & CreateManyViewsResponseFragment>;
};

export type CreateOrganizationMutationVariables = Exact<{
    input?: Maybe<CreateOrganizationRequestInput>;
}>;

export type CreateOrganizationMutation = { __typename?: "Mutation" } & {
    CreateOrganization?: Maybe<{ __typename?: "CreateOrganizationResponse" } & CreateOrganizationResponseFragment>;
};

export type CreatePreviewMutationVariables = Exact<{
    input?: Maybe<CreatePreviewRequestInput>;
}>;

export type CreatePreviewMutation = { __typename?: "Mutation" } & {
    CreatePreview?: Maybe<{ __typename?: "CreatePreviewResponse" } & CreatePreviewResponseFragment>;
};

export type CreatePreviewItemMutationVariables = Exact<{
    input?: Maybe<CreatePreviewItemRequestInput>;
}>;

export type CreatePreviewItemMutation = { __typename?: "Mutation" } & {
    CreatePreviewItem?: Maybe<{ __typename?: "CreatePreviewItemResponse" } & CreatePreviewItemResponseFragment>;
};

export type CreateProjectMutationVariables = Exact<{
    input?: Maybe<CreateProjectRequestInput>;
}>;

export type CreateProjectMutation = { __typename?: "Mutation" } & {
    CreateProject?: Maybe<{ __typename?: "CreateProjectResponse" } & CreateProjectResponseFragment>;
};

export type CreateReleaseMutationVariables = Exact<{
    input?: Maybe<CreateReleaseRequestInput>;
}>;

export type CreateReleaseMutation = { __typename?: "Mutation" } & {
    CreateRelease?: Maybe<{ __typename?: "CreateReleaseResponse" } & CreateReleaseResponseFragment>;
};

export type CreateRoleRuleMutationVariables = Exact<{
    input?: Maybe<CreateRoleRuleRequestInput>;
}>;

export type CreateRoleRuleMutation = { __typename?: "Mutation" } & {
    CreateRoleRule?: Maybe<{ __typename?: "CreateRoleRuleResponse" } & CreateRoleRuleResponseFragment>;
};

export type CreateTagMutationVariables = Exact<{
    input?: Maybe<CreateTagRequest>;
}>;

export type CreateTagMutation = { __typename?: "Mutation" } & {
    CreateTag?: Maybe<{ __typename?: "CreateTagResponse" } & CreateTagResponseFragment>;
};

export type CreateUserAccessTokenMutationVariables = Exact<{
    input?: Maybe<CreateUserAccessTokenRequestInput>;
}>;

export type CreateUserAccessTokenMutation = { __typename?: "Mutation" } & {
    CreateUserAccessToken?: Maybe<
        { __typename?: "CreateUserAccessTokenResponse" } & CreateUserAccessTokenResponseFragment
    >;
};

export type CreateUserRoleMutationVariables = Exact<{
    input?: Maybe<CreateUserRoleRequestInput>;
}>;

export type CreateUserRoleMutation = { __typename?: "Mutation" } & {
    CreateUserRole?: Maybe<{ __typename?: "CreateUserRoleResponse" } & CreateUserRoleResponseFragment>;
};

export type CreateViewMutationVariables = Exact<{
    input?: Maybe<CreateViewRequestInput>;
}>;

export type CreateViewMutation = { __typename?: "Mutation" } & {
    CreateView?: Maybe<{ __typename?: "CreateViewResponse" } & CreateViewResponseFragment>;
};

export type CreateViewPinMutationVariables = Exact<{
    input?: Maybe<CreateViewPinRequestInput>;
}>;

export type CreateViewPinMutation = { __typename?: "Mutation" } & {
    CreateViewPin?: Maybe<{ __typename?: "CreateViewPinResponse" } & CreateViewPinResponseFragment>;
};

export type CreateWebhookMutationVariables = Exact<{
    input?: Maybe<CreateWebhookRequestInput>;
}>;

export type CreateWebhookMutation = { __typename?: "Mutation" } & {
    CreateWebhook?: Maybe<{ __typename?: "CreateWebhookResponse" } & CreateWebhookResponseFragment>;
};

export type DeAssignRoleMutationVariables = Exact<{
    input?: Maybe<DeAssignRoleRequestInput>;
}>;

export type DeAssignRoleMutation = { __typename?: "Mutation" } & {
    DeAssignRole?: Maybe<{ __typename?: "DeAssignRoleResponse" } & DeAssignRoleResponseFragment>;
};

export type DeleteApiKeyMutationVariables = Exact<{
    input?: Maybe<DeleteApiKeyRequestInput>;
}>;

export type DeleteApiKeyMutation = { __typename?: "Mutation" } & {
    DeleteApiKey?: Maybe<{ __typename?: "DeleteAPIKeyResponse" } & DeleteApiKeyResponseFragment>;
};

export type DeleteBlueprintMutationVariables = Exact<{
    input?: Maybe<DeleteBlueprintRequest>;
}>;

export type DeleteBlueprintMutation = { __typename?: "Mutation" } & {
    DeleteBlueprint?: Maybe<{ __typename?: "DeleteBlueprintResponse" } & DeleteBlueprintResponseFragment>;
};

export type DeleteDocumentMutationVariables = Exact<{
    input?: Maybe<DeleteDocumentRequestInput>;
}>;

export type DeleteDocumentMutation = { __typename?: "Mutation" } & {
    DeleteDocument?: Maybe<{ __typename?: "DeleteDocumentResponse" } & DeleteDocumentResponseFragment>;
};

export type DeleteDocumentFieldLocaleMutationVariables = Exact<{
    input?: Maybe<DeleteDocumentFieldLocaleRequestInput>;
}>;

export type DeleteDocumentFieldLocaleMutation = { __typename?: "Mutation" } & {
    DeleteDocumentFieldLocale?: Maybe<
        { __typename?: "DeleteDocumentFieldLocaleResponse" } & DeleteDocumentFieldLocaleResponseFragment
    >;
};

export type DeleteEntrypointMutationVariables = Exact<{
    input?: Maybe<DeleteEntrypointRequestInput>;
}>;

export type DeleteEntrypointMutation = { __typename?: "Mutation" } & {
    DeleteEntrypoint?: Maybe<{ __typename?: "DeleteEntrypointResponse" } & DeleteEntrypointResponseFragment>;
};

export type DeleteGroupMutationVariables = Exact<{
    input?: Maybe<DeleteGroupRequestInput>;
}>;

export type DeleteGroupMutation = { __typename?: "Mutation" } & {
    DeleteGroup?: Maybe<{ __typename?: "DeleteGroupResponse" } & DeleteGroupResponseFragment>;
};

export type DeleteManyDocumentsMutationVariables = Exact<{
    input?: Maybe<DeleteManyDocumentsRequestInput>;
}>;

export type DeleteManyDocumentsMutation = { __typename?: "Mutation" } & {
    DeleteManyDocuments?: Maybe<{ __typename?: "DeleteManyDocumentsResponse" } & DeleteManyDocumentsResponseFragment>;
};

export type DeleteManyReleasesMutationVariables = Exact<{
    input?: Maybe<DeleteManyReleasesRequestInput>;
}>;

export type DeleteManyReleasesMutation = { __typename?: "Mutation" } & {
    DeleteManyReleases?: Maybe<{ __typename?: "DeleteManyReleasesResponse" } & DeleteManyReleasesResponseFragment>;
};

export type DeleteOrganizationMutationVariables = Exact<{
    input?: Maybe<DeleteOrganizationRequestInput>;
}>;

export type DeleteOrganizationMutation = { __typename?: "Mutation" } & {
    DeleteOrganization?: Maybe<{ __typename?: "DeleteOrganizationResponse" } & DeleteOrganizationResponseFragment>;
};

export type DeletePreviewMutationVariables = Exact<{
    input?: Maybe<DeletePreviewRequestInput>;
}>;

export type DeletePreviewMutation = { __typename?: "Mutation" } & {
    DeletePreview?: Maybe<{ __typename?: "DeletePreviewResponse" } & DeletePreviewResponseFragment>;
};

export type DeletePreviewItemMutationVariables = Exact<{
    input?: Maybe<DeletePreviewItemRequestInput>;
}>;

export type DeletePreviewItemMutation = { __typename?: "Mutation" } & {
    DeletePreviewItem?: Maybe<{ __typename?: "DeletePreviewItemResponse" } & DeletePreviewItemResponseFragment>;
};

export type DeleteProjectMutationVariables = Exact<{
    input?: Maybe<DeleteProjectRequestInput>;
}>;

export type DeleteProjectMutation = { __typename?: "Mutation" } & {
    DeleteProject?: Maybe<{ __typename?: "DeleteProjectResponse" } & DeleteProjectResponseFragment>;
};

export type DeleteRoleRuleMutationVariables = Exact<{
    input?: Maybe<DeleteRoleRuleRequestInput>;
}>;

export type DeleteRoleRuleMutation = { __typename?: "Mutation" } & {
    DeleteRoleRule?: Maybe<{ __typename?: "DeleteRoleRuleResponse" } & DeleteRoleRuleResponseFragment>;
};

export type DeleteTagMutationVariables = Exact<{
    input?: Maybe<DeleteTagRequest>;
}>;

export type DeleteTagMutation = { __typename?: "Mutation" } & {
    DeleteTag?: Maybe<{ __typename?: "DeleteTagResponse" } & DeleteTagResponseFragment>;
};

export type DeleteUserAccessTokenMutationVariables = Exact<{
    input?: Maybe<DeleteUserAccessTokenRequestInput>;
}>;

export type DeleteUserAccessTokenMutation = { __typename?: "Mutation" } & {
    DeleteUserAccessToken?: Maybe<
        { __typename?: "DeleteUserAccessTokenResponse" } & DeleteUserAccessTokenResponseFragment
    >;
};

export type DeleteUserRoleMutationVariables = Exact<{
    input?: Maybe<DeleteUserRoleRequestInput>;
}>;

export type DeleteUserRoleMutation = { __typename?: "Mutation" } & {
    DeleteUserRole?: Maybe<{ __typename?: "DeleteUserRoleResponse" } & DeleteUserRoleResponseFragment>;
};

export type DeleteViewMutationVariables = Exact<{
    input?: Maybe<DeleteViewRequestInput>;
}>;

export type DeleteViewMutation = { __typename?: "Mutation" } & {
    DeleteView?: Maybe<{ __typename?: "DeleteViewResponse" } & DeleteViewResponseFragment>;
};

export type DeleteViewPinMutationVariables = Exact<{
    input?: Maybe<DeleteViewPinRequestInput>;
}>;

export type DeleteViewPinMutation = { __typename?: "Mutation" } & {
    DeleteViewPin?: Maybe<{ __typename?: "DeleteViewPinResponse" } & DeleteViewPinResponseFragment>;
};

export type DeleteWebhookMutationVariables = Exact<{
    input?: Maybe<DeleteWebhookRequestInput>;
}>;

export type DeleteWebhookMutation = { __typename?: "Mutation" } & {
    DeleteWebhook?: Maybe<{ __typename?: "DeleteWebhookResponse" } & DeleteWebhookResponseFragment>;
};

export type DuplicateDocumentMutationVariables = Exact<{
    input?: Maybe<DuplicateDocumentRequestInput>;
}>;

export type DuplicateDocumentMutation = { __typename?: "Mutation" } & {
    DuplicateDocument?: Maybe<{ __typename?: "DuplicateDocumentResponse" } & DuplicateDocumentResponseFragment>;
};

export type DuplicateToProjectMutationVariables = Exact<{
    input?: Maybe<DuplicateToProjectRequestInput>;
}>;

export type DuplicateToProjectMutation = { __typename?: "Mutation" } & {
    DuplicateToProject?: Maybe<{ __typename?: "DuplicateToProjectResponse" } & DuplicateToProjectResponseFragment>;
};

export type LinkManyReleaseDocumentMutationVariables = Exact<{
    input?: Maybe<LinkManyReleaseDocumentRequestInput>;
}>;

export type LinkManyReleaseDocumentMutation = { __typename?: "Mutation" } & {
    LinkManyReleaseDocument?: Maybe<
        { __typename?: "LinkManyReleaseDocumentResponse" } & LinkManyReleaseDocumentResponseFragment
    >;
};

export type MoveProjectMutationVariables = Exact<{
    input?: Maybe<MoveProjectRequestInput>;
}>;

export type MoveProjectMutation = { __typename?: "Mutation" } & {
    MoveProject?: Maybe<{ __typename?: "MoveProjectResponse" } & MoveProjectResponseFragment>;
};

export type PutManyBlueprintsMutationVariables = Exact<{
    input?: Maybe<PutManyBlueprintsRequestInput>;
}>;

export type PutManyBlueprintsMutation = { __typename?: "Mutation" } & {
    PutManyBlueprints?: Maybe<{ __typename?: "PutManyBlueprintsResponse" } & PutManyBlueprintsResponseFragment>;
};

export type PutManyDocumentFieldLocalesMutationVariables = Exact<{
    input?: Maybe<PutManyDocumentFieldLocalesRequestInput>;
}>;

export type PutManyDocumentFieldLocalesMutation = { __typename?: "Mutation" } & {
    PutManyDocumentFieldLocales?: Maybe<
        { __typename?: "PutManyDocumentFieldLocalesResponse" } & PutManyDocumentFieldLocalesResponseFragment
    >;
};

export type PutManyPreviewsMutationVariables = Exact<{
    input?: Maybe<PutManyPreviewsRequestInput>;
}>;

export type PutManyPreviewsMutation = { __typename?: "Mutation" } & {
    PutManyPreviews?: Maybe<{ __typename?: "PutManyPreviewsResponse" } & PutManyPreviewsResponseFragment>;
};

export type PutManyTagsMutationVariables = Exact<{
    input?: Maybe<PutManyTagsRequestInput>;
}>;

export type PutManyTagsMutation = { __typename?: "Mutation" } & {
    PutManyTags?: Maybe<{ __typename?: "PutManyTagsResponse" } & PutManyTagsResponseFragment>;
};

export type PutManyViewsMutationVariables = Exact<{
    input?: Maybe<PutManyViewsRequestInput>;
}>;

export type PutManyViewsMutation = { __typename?: "Mutation" } & {
    PutManyViews?: Maybe<{ __typename?: "PutManyViewsResponse" } & PutManyViewsResponseFragment>;
};

export type PutManyWebhooksMutationVariables = Exact<{
    input?: Maybe<PutManyWebhooksRequestInput>;
}>;

export type PutManyWebhooksMutation = { __typename?: "Mutation" } & {
    PutManyWebhooks?: Maybe<{ __typename?: "PutManyWebhooksResponse" } & PutManyWebhooksResponseFragment>;
};

export type SetCompletedOnboardingEventsMutationVariables = Exact<{
    input?: Maybe<SetCompletedOnboardingEventsRequest>;
}>;

export type SetCompletedOnboardingEventsMutation = { __typename?: "Mutation" } & {
    SetCompletedOnboardingEvents?: Maybe<
        { __typename?: "SetCompletedOnboardingEventsResponse" } & SetCompletedOnboardingEventsResponseFragment
    >;
};

export type SetPreferredThemeMutationVariables = Exact<{
    input?: Maybe<SetPreferredThemeRequest>;
}>;

export type SetPreferredThemeMutation = { __typename?: "Mutation" } & {
    SetPreferredTheme?: Maybe<{ __typename?: "SetPreferredThemeResponse" } & SetPreferredThemeResponseFragment>;
};

export type SetPreferredUiLanguageMutationVariables = Exact<{
    input?: Maybe<SetPreferredUiLanguageRequest>;
}>;

export type SetPreferredUiLanguageMutation = { __typename?: "Mutation" } & {
    SetPreferredUiLanguage?: Maybe<
        { __typename?: "SetPreferredUILanguageResponse" } & SetPreferredUiLanguageResponseFragment
    >;
};

export type UnlinkManyReleaseDocumentMutationVariables = Exact<{
    input?: Maybe<UnlinkManyReleaseDocumentRequestInput>;
}>;

export type UnlinkManyReleaseDocumentMutation = { __typename?: "Mutation" } & {
    UnlinkManyReleaseDocument?: Maybe<
        { __typename?: "UnlinkManyReleaseDocumentResponse" } & UnlinkManyReleaseDocumentResponseFragment
    >;
};

export type UpdateBlueprintMutationVariables = Exact<{
    input?: Maybe<UpdateBlueprintRequest>;
}>;

export type UpdateBlueprintMutation = { __typename?: "Mutation" } & {
    UpdateBlueprint?: Maybe<{ __typename?: "UpdateBlueprintResponse" } & UpdateBlueprintResponseFragment>;
};

export type UpdateDocumentMutationVariables = Exact<{
    input?: Maybe<UpdateDocumentRequestInput>;
}>;

export type UpdateDocumentMutation = { __typename?: "Mutation" } & {
    UpdateDocument?: Maybe<{ __typename?: "UpdateDocumentResponse" } & UpdateDocumentResponseFragment>;
};

export type UpdateDocumentFieldMutationVariables = Exact<{
    input?: Maybe<UpdateDocumentFieldRequestInput>;
}>;

export type UpdateDocumentFieldMutation = { __typename?: "Mutation" } & {
    UpdateDocumentField?: Maybe<{ __typename?: "UpdateDocumentFieldResponse" } & UpdateDocumentFieldResponseFragment>;
};

export type UpdateDocumentFieldLocaleMutationVariables = Exact<{
    input?: Maybe<UpdateDocumentFieldLocaleRequestInput>;
}>;

export type UpdateDocumentFieldLocaleMutation = { __typename?: "Mutation" } & {
    UpdateDocumentFieldLocale?: Maybe<
        { __typename?: "UpdateDocumentFieldLocaleResponse" } & UpdateDocumentFieldLocaleResponseFragment
    >;
};

export type UpdateEntrypointMutationVariables = Exact<{
    input?: Maybe<UpdateEntrypointRequestInput>;
}>;

export type UpdateEntrypointMutation = { __typename?: "Mutation" } & {
    UpdateEntrypoint?: Maybe<{ __typename?: "UpdateEntrypointResponse" } & UpdateEntrypointResponseFragment>;
};

export type UpdateGroupMutationVariables = Exact<{
    input?: Maybe<UpdateGroupRequestInput>;
}>;

export type UpdateGroupMutation = { __typename?: "Mutation" } & {
    UpdateGroup?: Maybe<{ __typename?: "UpdateGroupResponse" } & UpdateGroupResponseFragment>;
};

export type UpdateManyDocumentsMutationVariables = Exact<{
    input?: Maybe<UpdateManyDocumentRequestInput>;
}>;

export type UpdateManyDocumentsMutation = { __typename?: "Mutation" } & {
    UpdateManyDocuments?: Maybe<{ __typename?: "UpdateManyDocumentsResponse" } & UpdateManyDocumentsResponseFragment>;
};

export type UpdateOrganizationMutationVariables = Exact<{
    input?: Maybe<UpdateOrganizationRequestInput>;
}>;

export type UpdateOrganizationMutation = { __typename?: "Mutation" } & {
    UpdateOrganization?: Maybe<{ __typename?: "UpdateOrganizationResponse" } & UpdateOrganizationResponseFragment>;
};

export type UpdatePreviewMutationVariables = Exact<{
    input?: Maybe<UpdatePreviewRequestInput>;
}>;

export type UpdatePreviewMutation = { __typename?: "Mutation" } & {
    UpdatePreview?: Maybe<{ __typename?: "UpdatePreviewResponse" } & UpdatePreviewResponseFragment>;
};

export type UpdatePreviewItemMutationVariables = Exact<{
    input?: Maybe<UpdatePreviewItemRequestInput>;
}>;

export type UpdatePreviewItemMutation = { __typename?: "Mutation" } & {
    UpdatePreviewItem?: Maybe<{ __typename?: "UpdatePreviewItemResponse" } & UpdatePreviewItemResponseFragment>;
};

export type UpdateProjectMutationVariables = Exact<{
    input?: Maybe<UpdateProjectRequestInput>;
}>;

export type UpdateProjectMutation = { __typename?: "Mutation" } & {
    UpdateProject?: Maybe<{ __typename?: "UpdateProjectResponse" } & UpdateProjectResponseFragment>;
};

export type UpdateReleaseMutationVariables = Exact<{
    input?: Maybe<UpdateReleaseRequestInput>;
}>;

export type UpdateReleaseMutation = { __typename?: "Mutation" } & {
    UpdateRelease?: Maybe<{ __typename?: "UpdateReleaseResponse" } & UpdateReleaseResponseFragment>;
};

export type UpdateRoleRuleMutationVariables = Exact<{
    input?: Maybe<UpdateRoleRuleRequestInput>;
}>;

export type UpdateRoleRuleMutation = { __typename?: "Mutation" } & {
    UpdateRoleRule?: Maybe<{ __typename?: "UpdateRoleRuleResponse" } & UpdateRoleRuleResponseFragment>;
};

export type UpdateTagMutationVariables = Exact<{
    input?: Maybe<UpdateTagRequest>;
}>;

export type UpdateTagMutation = { __typename?: "Mutation" } & {
    UpdateTag?: Maybe<{ __typename?: "UpdateTagResponse" } & UpdateTagResponseFragment>;
};

export type UpdateUserProfileRequestMutationVariables = Exact<{
    input: UpdateUserProfileRequestInput;
}>;

export type UpdateUserProfileRequestMutation = { __typename?: "Mutation" } & {
    UpdateUserProfileRequest?: Maybe<{ __typename?: "UpdateUserProfileResponse" } & UpdateUserProfileResponseFragment>;
};

export type UpdateUserRoleMutationVariables = Exact<{
    input?: Maybe<UpdateUserRoleRequestInput>;
}>;

export type UpdateUserRoleMutation = { __typename?: "Mutation" } & {
    UpdateUserRole?: Maybe<{ __typename?: "UpdateUserRoleResponse" } & UpdateUserRoleResponseFragment>;
};

export type UpdateViewMutationVariables = Exact<{
    input?: Maybe<UpdateViewRequestInput>;
}>;

export type UpdateViewMutation = { __typename?: "Mutation" } & {
    UpdateView?: Maybe<{ __typename?: "UpdateViewResponse" } & UpdateViewResponseFragment>;
};

export type UpdateWebhookMutationVariables = Exact<{
    input?: Maybe<UpdateWebhookRequestInput>;
}>;

export type UpdateWebhookMutation = { __typename?: "Mutation" } & {
    UpdateWebhook?: Maybe<{ __typename?: "UpdateWebhookResponse" } & UpdateWebhookResponseFragment>;
};

export type ValidateDocumentMutationVariables = Exact<{
    input?: Maybe<ValidateDocumentRequestInput>;
}>;

export type ValidateDocumentMutation = { __typename?: "Mutation" } & {
    ValidateDocument?: Maybe<{ __typename?: "ValidateDocumentResponse" } & ValidateDocumentResponseFragment>;
};

export type ValidateDocumentFieldMutationVariables = Exact<{
    input?: Maybe<ValidateDocumentFieldRequestInput>;
}>;

export type ValidateDocumentFieldMutation = { __typename?: "Mutation" } & {
    ValidateDocumentField?: Maybe<
        { __typename?: "ValidateDocumentFieldResponse" } & ValidateDocumentFieldResponseFragment
    >;
};

export type ValidateManyDocumentsMutationVariables = Exact<{
    input?: Maybe<ValidateManyDocumentsRequestInput>;
}>;

export type ValidateManyDocumentsMutation = { __typename?: "Mutation" } & {
    ValidateManyDocuments?: Maybe<
        { __typename?: "ValidateManyDocumentsResponse" } & ValidateManyDocumentsResponseFragment
    >;
};

export type ValidateReleaseMutationVariables = Exact<{
    input?: Maybe<ValidateReleaseRequestInput>;
}>;

export type ValidateReleaseMutation = { __typename?: "Mutation" } & {
    ValidateRelease?: Maybe<{ __typename?: "ValidateReleaseResponse" } & ValidateReleaseResponseFragment>;
};

export type AuthenticateMutationVariables = Exact<{
    params: AuthenticateParamsInput;
    serviceName: Scalars["String"];
}>;

export type AuthenticateMutation = { __typename?: "Mutation" } & {
    authenticate?: Maybe<{ __typename?: "LoginResult" } & LoginResultFragment>;
};

export type CreateCaisyUserMutationVariables = Exact<{
    email: Scalars["String"];
    password?: Maybe<Scalars["String"]>;
    phoneNumber?: Maybe<Scalars["String"]>;
    profile?: Maybe<CaisyUserProfileInput>;
    provider?: Maybe<Scalars["String"]>;
    providerUserId?: Maybe<Scalars["String"]>;
    username?: Maybe<Scalars["String"]>;
}>;

export type CreateCaisyUserMutation = { __typename?: "Mutation" } & {
    createCaisyUser?: Maybe<{ __typename?: "CreateCaisyUserResult" } & CreateCaisyUserResultFragment>;
};

export type UpdatePreferredUiLanguageMutationVariables = Exact<{
    input: UpdatePreferredUiLanguageRequest;
}>;

export type UpdatePreferredUiLanguageMutation = { __typename?: "Mutation" } & {
    updatePreferredUILanguage?: Maybe<
        { __typename?: "UpdatePreferredUILanguageResponse" } & UpdatePreferredUiLanguageResponseFragment
    >;
};

export type UpdatePreferredUiThemeMutationVariables = Exact<{
    input: UpdatePreferredUiThemeRequest;
}>;

export type UpdatePreferredUiThemeMutation = { __typename?: "Mutation" } & {
    updatePreferredUITheme?: Maybe<
        { __typename?: "UpdatePreferredUIThemeResponse" } & UpdatePreferredUiThemeResponseFragment
    >;
};

export type GetAllCompletedOnboardingEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCompletedOnboardingEventsQuery = { __typename?: "Query" } & {
    GetAllCompletedOnboardingEvents?: Maybe<
        { __typename?: "GetAllCompletedOnboardingEventsResponse" } & GetAllCompletedOnboardingEventsResponseFragment
    >;
};

export type GetAllDocumentFieldLocaleQueryVariables = Exact<{
    input?: Maybe<GetAllDocumentFieldLocaleRequestInput>;
}>;

export type GetAllDocumentFieldLocaleQuery = { __typename?: "Query" } & {
    GetAllDocumentFieldLocale?: Maybe<
        { __typename?: "GetAllDocumentFieldLocaleResponse" } & GetAllDocumentFieldLocaleResponseFragment
    >;
};

export type GetAllDocumentSnapshotQueryVariables = Exact<{
    input?: Maybe<GetAllDocumentSnapshotRequestInput>;
}>;

export type GetAllDocumentSnapshotQuery = { __typename?: "Query" } & {
    GetAllDocumentSnapshot?: Maybe<
        { __typename?: "GetAllDocumentSnapshotResponse" } & GetAllDocumentSnapshotResponseFragment
    >;
};

export type GetAllDocumentStatusQueryVariables = Exact<{
    input?: Maybe<GetAllDocumentStatusRequestInput>;
}>;

export type GetAllDocumentStatusQuery = { __typename?: "Query" } & {
    GetAllDocumentStatus?: Maybe<{ __typename?: "GetAllDocumentStatusResponse" } & GetAllDocumentStatusResponseFragment>;
};

export type GetAllWebhooksQueryVariables = Exact<{
    input?: Maybe<GetAllWebhooksRequestInput>;
}>;

export type GetAllWebhooksQuery = { __typename?: "Query" } & {
    GetAllWebhooks?: Maybe<{ __typename?: "GetAllWebhooksResponse" } & GetAllWebhooksResponseFragment>;
};

export type GetAmountQueryVariables = Exact<{
    input?: Maybe<GetAmountRequestInput>;
}>;

export type GetAmountQuery = { __typename?: "Query" } & {
    GetAmount?: Maybe<{ __typename?: "GetAmountResponse" } & GetAmountResponseFragment>;
};

export type GetBlueprintByIdQueryVariables = Exact<{
    input?: Maybe<GetBlueprintByIdRequest>;
}>;

export type GetBlueprintByIdQuery = { __typename?: "Query" } & {
    GetBlueprintById?: Maybe<{ __typename?: "GetBlueprintByIDResponse" } & GetBlueprintByIdResponseFragment>;
};

export type GetBlueprintById_BlueprintQueryVariables = Exact<{
    input?: Maybe<GetBlueprintByIdRequest>;
}>;

export type GetBlueprintById_BlueprintQuery = { __typename?: "Query" } & {
    GetBlueprintById?: Maybe<
        { __typename?: "GetBlueprintByIDResponse" } & {
            blueprint?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment>;
        }
    >;
};

export type GetBlueprintByNameQueryVariables = Exact<{
    input?: Maybe<GetBlueprintByNameRequest>;
}>;

export type GetBlueprintByNameQuery = { __typename?: "Query" } & {
    GetBlueprintByName?: Maybe<{ __typename?: "GetBlueprintByNameResponse" } & GetBlueprintByNameResponseFragment>;
};

export type GetBlueprintByName_BlueprintQueryVariables = Exact<{
    input?: Maybe<GetBlueprintByNameRequest>;
}>;

export type GetBlueprintByName_BlueprintQuery = { __typename?: "Query" } & {
    GetBlueprintByName?: Maybe<
        { __typename?: "GetBlueprintByNameResponse" } & {
            blueprint?: Maybe<{ __typename?: "BlueprintResponse" } & BlueprintResponseFragment>;
        }
    >;
};

export type GetCountsQueryVariables = Exact<{
    input?: Maybe<GetCountsRequestInput>;
}>;

export type GetCountsQuery = { __typename?: "Query" } & {
    GetCounts?: Maybe<{ __typename?: "GetCountsResponse" } & GetCountsResponseFragment>;
};

export type GetDocumentByIdQueryVariables = Exact<{
    input?: Maybe<GetDocumentByIdRequestInput>;
}>;

export type GetDocumentByIdQuery = { __typename?: "Query" } & {
    GetDocumentById?: Maybe<{ __typename?: "GetDocumentByIdResponse" } & GetDocumentByIdResponseFragment>;
};

export type GetDocumentById_DocumentQueryVariables = Exact<{
    input?: Maybe<GetDocumentByIdRequestInput>;
}>;

export type GetDocumentById_DocumentQuery = { __typename?: "Query" } & {
    GetDocumentById?: Maybe<
        { __typename?: "GetDocumentByIdResponse" } & {
            document?: Maybe<{ __typename?: "DocumentWithFieldsResponse" } & DocumentWithFieldsResponseFragment>;
        }
    >;
};

export type GetDocumentCountsByBlueprintsQueryVariables = Exact<{
    input?: Maybe<GetDocumentCountsByBlueprintsRequestInput>;
}>;

export type GetDocumentCountsByBlueprintsQuery = { __typename?: "Query" } & {
    GetDocumentCountsByBlueprints?: Maybe<
        { __typename?: "GetDocumentCountsByBlueprintsResponse" } & GetDocumentCountsByBlueprintsResponseFragment
    >;
};

export type GetDocumentSnapshotQueryVariables = Exact<{
    input?: Maybe<GetDocumentSnapshotRequestInput>;
}>;

export type GetDocumentSnapshotQuery = { __typename?: "Query" } & {
    GetDocumentSnapshot?: Maybe<{ __typename?: "GetDocumentSnapshotResponse" } & GetDocumentSnapshotResponseFragment>;
};

export type GetDocumentSnapshot_DocumentQueryVariables = Exact<{
    input?: Maybe<GetDocumentSnapshotRequestInput>;
}>;

export type GetDocumentSnapshot_DocumentQuery = { __typename?: "Query" } & {
    GetDocumentSnapshot?: Maybe<
        { __typename?: "GetDocumentSnapshotResponse" } & {
            document?: Maybe<{ __typename?: "DocumentWithFieldsResponse" } & DocumentWithFieldsResponseFragment>;
        }
    >;
};

export type GetEntrypointByDomainQueryVariables = Exact<{
    input?: Maybe<GetEntrypointByDomainRequestInput>;
}>;

export type GetEntrypointByDomainQuery = { __typename?: "Query" } & {
    GetEntrypointByDomain?: Maybe<
        { __typename?: "GetEntrypointByDomainResponse" } & GetEntrypointByDomainResponseFragment
    >;
};

export type GetEntrypointByDomain_EntrypointQueryVariables = Exact<{
    input?: Maybe<GetEntrypointByDomainRequestInput>;
}>;

export type GetEntrypointByDomain_EntrypointQuery = { __typename?: "Query" } & {
    GetEntrypointByDomain?: Maybe<
        { __typename?: "GetEntrypointByDomainResponse" } & {
            entrypoint?: Maybe<{ __typename?: "EntrypointResponse" } & EntrypointResponseFragment>;
        }
    >;
};

export type GetEntrypointByScopeQueryVariables = Exact<{
    input?: Maybe<GetEntrypointByScopeRequestInput>;
}>;

export type GetEntrypointByScopeQuery = { __typename?: "Query" } & {
    GetEntrypointByScope?: Maybe<{ __typename?: "GetEntrypointByScopeResponse" } & GetEntrypointByScopeResponseFragment>;
};

export type GetEntrypointByScope_EntrypointQueryVariables = Exact<{
    input?: Maybe<GetEntrypointByScopeRequestInput>;
}>;

export type GetEntrypointByScope_EntrypointQuery = { __typename?: "Query" } & {
    GetEntrypointByScope?: Maybe<
        { __typename?: "GetEntrypointByScopeResponse" } & {
            entrypoint?: Maybe<{ __typename?: "EntrypointResponse" } & EntrypointResponseFragment>;
        }
    >;
};

export type GetGroupByIdQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdRequestInput>;
}>;

export type GetGroupByIdQuery = { __typename?: "Query" } & {
    GetGroupByID?: Maybe<{ __typename?: "GetGroupByIDResponse" } & GetGroupByIdResponseFragment>;
};

export type GetGroupById_GroupQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdRequestInput>;
}>;

export type GetGroupById_GroupQuery = { __typename?: "Query" } & {
    GetGroupByID?: Maybe<
        { __typename?: "GetGroupByIDResponse" } & {
            group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
        }
    >;
};

export type GetGroupById_Group_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdRequestInput>;
}>;

export type GetGroupById_Group_RoleByUserQuery = { __typename?: "Query" } & {
    GetGroupByID?: Maybe<
        { __typename?: "GetGroupByIDResponse" } & {
            group?: Maybe<
                { __typename?: "GroupResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetGroupByIdWithInheritanceQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdWithInheritanceRequestInput>;
}>;

export type GetGroupByIdWithInheritanceQuery = { __typename?: "Query" } & {
    GetGroupByIDWithInheritance?: Maybe<
        { __typename?: "GetGroupByIDWithInheritanceResponse" } & GetGroupByIdWithInheritanceResponseFragment
    >;
};

export type GetGroupByIdWithInheritance_GroupQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdWithInheritanceRequestInput>;
}>;

export type GetGroupByIdWithInheritance_GroupQuery = { __typename?: "Query" } & {
    GetGroupByIDWithInheritance?: Maybe<
        { __typename?: "GetGroupByIDWithInheritanceResponse" } & {
            group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
        }
    >;
};

export type GetGroupByIdWithInheritance_Group_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdWithInheritanceRequestInput>;
}>;

export type GetGroupByIdWithInheritance_Group_RoleByUserQuery = { __typename?: "Query" } & {
    GetGroupByIDWithInheritance?: Maybe<
        { __typename?: "GetGroupByIDWithInheritanceResponse" } & {
            group?: Maybe<
                { __typename?: "GroupResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetGroupByIdWithInheritance_OrganizationQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdWithInheritanceRequestInput>;
}>;

export type GetGroupByIdWithInheritance_OrganizationQuery = { __typename?: "Query" } & {
    GetGroupByIDWithInheritance?: Maybe<
        { __typename?: "GetGroupByIDWithInheritanceResponse" } & {
            organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
        }
    >;
};

export type GetGroupByIdWithInheritance_Organization_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetGroupByIdWithInheritanceRequestInput>;
}>;

export type GetGroupByIdWithInheritance_Organization_RoleByUserQuery = { __typename?: "Query" } & {
    GetGroupByIDWithInheritance?: Maybe<
        { __typename?: "GetGroupByIDWithInheritanceResponse" } & {
            organization?: Maybe<
                { __typename?: "OrganizationResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetGroupMembersQueryVariables = Exact<{
    input?: Maybe<GetGroupMembersRequestInput>;
}>;

export type GetGroupMembersQuery = { __typename?: "Query" } & {
    GetGroupMembers?: Maybe<{ __typename?: "GetGroupMembersResponse" } & GetGroupMembersResponseFragment>;
};

export type GetGroupMembers_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetGroupMembersRequestInput>;
}>;

export type GetGroupMembers_ConnectionQuery = { __typename?: "Query" } & {
    GetGroupMembers?: Maybe<
        { __typename?: "GetGroupMembersResponse" } & {
            connection?: Maybe<{ __typename?: "MemberConnection" } & MemberConnectionFragment>;
        }
    >;
};

export type GetGroupQuotaPlanQueryVariables = Exact<{
    input?: Maybe<GetGroupQuotaPlanRequestInput>;
}>;

export type GetGroupQuotaPlanQuery = { __typename?: "Query" } & {
    GetGroupQuotaPlan?: Maybe<{ __typename?: "GetGroupQuotaPlanResponse" } & GetGroupQuotaPlanResponseFragment>;
};

export type GetGroupQuotaPlan_QuotaPlanQueryVariables = Exact<{
    input?: Maybe<GetGroupQuotaPlanRequestInput>;
}>;

export type GetGroupQuotaPlan_QuotaPlanQuery = { __typename?: "Query" } & {
    GetGroupQuotaPlan?: Maybe<
        { __typename?: "GetGroupQuotaPlanResponse" } & {
            quotaPlan?: Maybe<{ __typename?: "GroupQuotaPlan" } & GroupQuotaPlanFragment>;
        }
    >;
};

export type GetManyApiKeyQueryVariables = Exact<{
    input?: Maybe<GetManyApiKeyRequestInput>;
}>;

export type GetManyApiKeyQuery = { __typename?: "Query" } & {
    GetManyApiKey?: Maybe<{ __typename?: "GetManyAPIKeyResponse" } & GetManyApiKeyResponseFragment>;
};

export type GetManyAuditEventsQueryVariables = Exact<{
    input?: Maybe<GetManyAuditEventsRequestInput>;
}>;

export type GetManyAuditEventsQuery = { __typename?: "Query" } & {
    GetManyAuditEvents?: Maybe<{ __typename?: "GetManyAuditEventsResponse" } & GetManyAuditEventsResponseFragment>;
};

export type GetManyAuditEvents_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyAuditEventsRequestInput>;
}>;

export type GetManyAuditEvents_ConnectionQuery = { __typename?: "Query" } & {
    GetManyAuditEvents?: Maybe<
        { __typename?: "GetManyAuditEventsResponse" } & {
            connection?: Maybe<{ __typename?: "AuditEventConnection" } & AuditEventConnectionFragment>;
        }
    >;
};

export type GetManyBlueprintsQueryVariables = Exact<{
    input?: Maybe<GetManyBlueprintsRequest>;
}>;

export type GetManyBlueprintsQuery = { __typename?: "Query" } & {
    GetManyBlueprints?: Maybe<{ __typename?: "GetManyBlueprintsResponse" } & GetManyBlueprintsResponseFragment>;
};

export type GetManyBlueprints_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyBlueprintsRequest>;
}>;

export type GetManyBlueprints_ConnectionQuery = { __typename?: "Query" } & {
    GetManyBlueprints?: Maybe<
        { __typename?: "GetManyBlueprintsResponse" } & {
            connection?: Maybe<{ __typename?: "BlueprintResponseConnection" } & BlueprintResponseConnectionFragment>;
        }
    >;
};

export type GetManyDocumentFieldsByDocumentIdQueryVariables = Exact<{
    input?: Maybe<GetManyDocumentFieldsByDocumentIdRequestInput>;
}>;

export type GetManyDocumentFieldsByDocumentIdQuery = { __typename?: "Query" } & {
    GetManyDocumentFieldsByDocumentId?: Maybe<
        { __typename?: "GetManyDocumentFieldsByDocumentIdResponse" } & GetManyDocumentFieldsByDocumentIdResponseFragment
    >;
};

export type GetManyDocumentFieldsByFieldIdsQueryVariables = Exact<{
    input?: Maybe<GetManyDocumentFieldsByFieldIdsRequestInput>;
}>;

export type GetManyDocumentFieldsByFieldIdsQuery = { __typename?: "Query" } & {
    GetManyDocumentFieldsByFieldIds?: Maybe<
        { __typename?: "GetManyDocumentFieldsByFieldIdsResponse" } & GetManyDocumentFieldsByFieldIdsResponseFragment
    >;
};

export type GetManyDocumentsQueryVariables = Exact<{
    input?: Maybe<GetManyDocumentsRequestInput>;
}>;

export type GetManyDocumentsQuery = { __typename?: "Query" } & {
    GetManyDocuments?: Maybe<{ __typename?: "GetManyDocumentsResponse" } & GetManyDocumentsResponseFragment>;
};

export type GetManyDocuments_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyDocumentsRequestInput>;
}>;

export type GetManyDocuments_ConnectionQuery = { __typename?: "Query" } & {
    GetManyDocuments?: Maybe<
        { __typename?: "GetManyDocumentsResponse" } & {
            connection?: Maybe<{ __typename?: "DocumentResponseConnection" } & DocumentResponseConnectionFragment>;
        }
    >;
};

export type GetManyDocumentsByIdsQueryVariables = Exact<{
    input?: Maybe<GetManyDocumentsByIdsRequestInput>;
}>;

export type GetManyDocumentsByIdsQuery = { __typename?: "Query" } & {
    GetManyDocumentsByIds?: Maybe<
        { __typename?: "GetManyDocumentsByIdsResponse" } & GetManyDocumentsByIdsResponseFragment
    >;
};

export type GetManyGroupsByUserIdQueryVariables = Exact<{
    input?: Maybe<GetManyGroupsByUserIdRequestInput>;
}>;

export type GetManyGroupsByUserIdQuery = { __typename?: "Query" } & {
    GetManyGroupsByUserID?: Maybe<
        { __typename?: "GetManyGroupsByUserIDResponse" } & GetManyGroupsByUserIdResponseFragment
    >;
};

export type GetManyGroupsByUserId_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyGroupsByUserIdRequestInput>;
}>;

export type GetManyGroupsByUserId_ConnectionQuery = { __typename?: "Query" } & {
    GetManyGroupsByUserID?: Maybe<
        { __typename?: "GetManyGroupsByUserIDResponse" } & {
            connection?: Maybe<{ __typename?: "GroupResponseConnection" } & GroupResponseConnectionFragment>;
        }
    >;
};

export type GetManyOrganizationsByUserIdQueryVariables = Exact<{
    input?: Maybe<GetManyOrganizationsByUserIdRequestInput>;
}>;

export type GetManyOrganizationsByUserIdQuery = { __typename?: "Query" } & {
    GetManyOrganizationsByUserID?: Maybe<
        { __typename?: "GetManyOrganizationsByUserIDResponse" } & GetManyOrganizationsByUserIdResponseFragment
    >;
};

export type GetManyOrganizationsByUserId_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyOrganizationsByUserIdRequestInput>;
}>;

export type GetManyOrganizationsByUserId_ConnectionQuery = { __typename?: "Query" } & {
    GetManyOrganizationsByUserID?: Maybe<
        { __typename?: "GetManyOrganizationsByUserIDResponse" } & {
            connection?: Maybe<{ __typename?: "OrganizationResponseConnection" } & OrganizationResponseConnectionFragment>;
        }
    >;
};

export type GetManyPreviewsQueryVariables = Exact<{
    input?: Maybe<GetManyPreviewsRequestInput>;
}>;

export type GetManyPreviewsQuery = { __typename?: "Query" } & {
    GetManyPreviews?: Maybe<{ __typename?: "GetManyPreviewsResponse" } & GetManyPreviewsResponseFragment>;
};

export type GetManyPreviews_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyPreviewsRequestInput>;
}>;

export type GetManyPreviews_ConnectionQuery = { __typename?: "Query" } & {
    GetManyPreviews?: Maybe<
        { __typename?: "GetManyPreviewsResponse" } & {
            connection?: Maybe<{ __typename?: "PreviewConnection" } & PreviewConnectionFragment>;
        }
    >;
};

export type GetManyProjectsByUserIdQueryVariables = Exact<{
    input?: Maybe<GetManyProjectsByUserIdRequestInput>;
}>;

export type GetManyProjectsByUserIdQuery = { __typename?: "Query" } & {
    GetManyProjectsByUserID?: Maybe<
        { __typename?: "GetManyProjectsByUserIDResponse" } & GetManyProjectsByUserIdResponseFragment
    >;
};

export type GetManyProjectsByUserId_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyProjectsByUserIdRequestInput>;
}>;

export type GetManyProjectsByUserId_ConnectionQuery = { __typename?: "Query" } & {
    GetManyProjectsByUserID?: Maybe<
        { __typename?: "GetManyProjectsByUserIDResponse" } & {
            connection?: Maybe<{ __typename?: "ProjectResponseConnection" } & ProjectResponseConnectionFragment>;
        }
    >;
};

export type GetManyReleasesByProjectIdQueryVariables = Exact<{
    input?: Maybe<GetManyReleasesByProjectIdRequestInput>;
}>;

export type GetManyReleasesByProjectIdQuery = { __typename?: "Query" } & {
    GetManyReleasesByProjectId?: Maybe<
        { __typename?: "GetManyReleasesByProjectIdResponse" } & GetManyReleasesByProjectIdResponseFragment
    >;
};

export type GetManyRoleRulesByRoleIdQueryVariables = Exact<{
    input?: Maybe<GetManyRoleRulesByRoleIdRequestInput>;
}>;

export type GetManyRoleRulesByRoleIdQuery = { __typename?: "Query" } & {
    GetManyRoleRulesByRoleID?: Maybe<
        { __typename?: "GetManyRoleRulesByRoleIDResponse" } & GetManyRoleRulesByRoleIdResponseFragment
    >;
};

export type GetManyTagsQueryVariables = Exact<{
    input?: Maybe<GetManyTagsRequest>;
}>;

export type GetManyTagsQuery = { __typename?: "Query" } & {
    GetManyTags?: Maybe<{ __typename?: "GetManyTagsResponse" } & GetManyTagsResponseFragment>;
};

export type GetManyTags_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyTagsRequest>;
}>;

export type GetManyTags_ConnectionQuery = { __typename?: "Query" } & {
    GetManyTags?: Maybe<
        { __typename?: "GetManyTagsResponse" } & {
            connection?: Maybe<{ __typename?: "TagConnection" } & TagConnectionFragment>;
        }
    >;
};

export type GetManyUserRolesQueryVariables = Exact<{
    input?: Maybe<GetManyUserRolesRequestInput>;
}>;

export type GetManyUserRolesQuery = { __typename?: "Query" } & {
    GetManyUserRoles?: Maybe<{ __typename?: "GetManyUserRolesResponse" } & GetManyUserRolesResponseFragment>;
};

export type GetManyViewsQueryVariables = Exact<{
    input?: Maybe<GetManyViewsRequestInput>;
}>;

export type GetManyViewsQuery = { __typename?: "Query" } & {
    GetManyViews?: Maybe<{ __typename?: "GetManyViewsResponse" } & GetManyViewsResponseFragment>;
};

export type GetManyWebhookCallsQueryVariables = Exact<{
    input?: Maybe<GetManyWebhookCallsRequestInput>;
}>;

export type GetManyWebhookCallsQuery = { __typename?: "Query" } & {
    GetManyWebhookCalls?: Maybe<{ __typename?: "GetManyWebhookCallsResponse" } & GetManyWebhookCallsResponseFragment>;
};

export type GetManyWebhookCalls_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetManyWebhookCallsRequestInput>;
}>;

export type GetManyWebhookCalls_ConnectionQuery = { __typename?: "Query" } & {
    GetManyWebhookCalls?: Maybe<
        { __typename?: "GetManyWebhookCallsResponse" } & {
            connection?: Maybe<{ __typename?: "WebhookCallConnection" } & WebhookCallConnectionFragment>;
        }
    >;
};

export type GetOrganizationByIdQueryVariables = Exact<{
    input?: Maybe<GetOrganizationByIdRequestInput>;
}>;

export type GetOrganizationByIdQuery = { __typename?: "Query" } & {
    GetOrganizationByID?: Maybe<{ __typename?: "GetOrganizationByIDResponse" } & GetOrganizationByIdResponseFragment>;
};

export type GetOrganizationById_OrganizationQueryVariables = Exact<{
    input?: Maybe<GetOrganizationByIdRequestInput>;
}>;

export type GetOrganizationById_OrganizationQuery = { __typename?: "Query" } & {
    GetOrganizationByID?: Maybe<
        { __typename?: "GetOrganizationByIDResponse" } & {
            organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
        }
    >;
};

export type GetOrganizationById_Organization_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetOrganizationByIdRequestInput>;
}>;

export type GetOrganizationById_Organization_RoleByUserQuery = { __typename?: "Query" } & {
    GetOrganizationByID?: Maybe<
        { __typename?: "GetOrganizationByIDResponse" } & {
            organization?: Maybe<
                { __typename?: "OrganizationResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetOrganizationMembersQueryVariables = Exact<{
    input?: Maybe<GetOrganizationMembersRequestInput>;
}>;

export type GetOrganizationMembersQuery = { __typename?: "Query" } & {
    GetOrganizationMembers?: Maybe<
        { __typename?: "GetOrganizationMembersResponse" } & GetOrganizationMembersResponseFragment
    >;
};

export type GetOrganizationMembers_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetOrganizationMembersRequestInput>;
}>;

export type GetOrganizationMembers_ConnectionQuery = { __typename?: "Query" } & {
    GetOrganizationMembers?: Maybe<
        { __typename?: "GetOrganizationMembersResponse" } & {
            connection?: Maybe<{ __typename?: "MemberConnection" } & MemberConnectionFragment>;
        }
    >;
};

export type GetOrganizationQuotaPlanQueryVariables = Exact<{
    input?: Maybe<GetOrganizationQuotaPlanRequestInput>;
}>;

export type GetOrganizationQuotaPlanQuery = { __typename?: "Query" } & {
    GetOrganizationQuotaPlan?: Maybe<
        { __typename?: "GetOrganizationQuotaPlanResponse" } & GetOrganizationQuotaPlanResponseFragment
    >;
};

export type GetOrganizationQuotaPlan_QuotaPlanQueryVariables = Exact<{
    input?: Maybe<GetOrganizationQuotaPlanRequestInput>;
}>;

export type GetOrganizationQuotaPlan_QuotaPlanQuery = { __typename?: "Query" } & {
    GetOrganizationQuotaPlan?: Maybe<
        { __typename?: "GetOrganizationQuotaPlanResponse" } & {
            quotaPlan?: Maybe<{ __typename?: "OrganizationQuotaPlan" } & OrganizationQuotaPlanFragment>;
        }
    >;
};

export type GetPermissionGrantQueryVariables = Exact<{
    input?: Maybe<GetPermissionGrantRequestInput>;
}>;

export type GetPermissionGrantQuery = { __typename?: "Query" } & {
    GetPermissionGrant?: Maybe<{ __typename?: "GetPermissionGrantResponse" } & GetPermissionGrantResponseFragment>;
};

export type GetPermissionGrant_AppliedRoleQueryVariables = Exact<{
    input?: Maybe<GetPermissionGrantRequestInput>;
}>;

export type GetPermissionGrant_AppliedRoleQuery = { __typename?: "Query" } & {
    GetPermissionGrant?: Maybe<
        { __typename?: "GetPermissionGrantResponse" } & { appliedRole?: Maybe<{ __typename?: "Role" } & RoleFragment> }
    >;
};

export type GetPermissionSetQueryVariables = Exact<{
    input?: Maybe<GetPermissionSetRequestInput>;
}>;

export type GetPermissionSetQuery = { __typename?: "Query" } & {
    GetPermissionSet?: Maybe<{ __typename?: "GetPermissionSetResponse" } & GetPermissionSetResponseFragment>;
};

export type GetPermissionSet_AppliedRoleQueryVariables = Exact<{
    input?: Maybe<GetPermissionSetRequestInput>;
}>;

export type GetPermissionSet_AppliedRoleQuery = { __typename?: "Query" } & {
    GetPermissionSet?: Maybe<
        { __typename?: "GetPermissionSetResponse" } & { appliedRole?: Maybe<{ __typename?: "Role" } & RoleFragment> }
    >;
};

export type GetPreferredThemeQueryVariables = Exact<{ [key: string]: never }>;

export type GetPreferredThemeQuery = { __typename?: "Query" } & {
    GetPreferredTheme?: Maybe<{ __typename?: "GetPreferredThemeResponse" } & GetPreferredThemeResponseFragment>;
};

export type GetPreferredUiLanguageQueryVariables = Exact<{ [key: string]: never }>;

export type GetPreferredUiLanguageQuery = { __typename?: "Query" } & {
    GetPreferredUiLanguage?: Maybe<
        { __typename?: "GetPreferredUILanguageResponse" } & GetPreferredUiLanguageResponseFragment
    >;
};

export type GetPreviewByIdQueryVariables = Exact<{
    input?: Maybe<GetPreviewByIdRequestInput>;
}>;

export type GetPreviewByIdQuery = { __typename?: "Query" } & {
    GetPreviewById?: Maybe<{ __typename?: "GetPreviewByIdResponse" } & GetPreviewByIdResponseFragment>;
};

export type GetPreviewById_PreviewQueryVariables = Exact<{
    input?: Maybe<GetPreviewByIdRequestInput>;
}>;

export type GetPreviewById_PreviewQuery = { __typename?: "Query" } & {
    GetPreviewById?: Maybe<
        { __typename?: "GetPreviewByIdResponse" } & {
            preview?: Maybe<{ __typename?: "PreviewWithItemsResponse" } & PreviewWithItemsResponseFragment>;
        }
    >;
};

export type GetPreviewItemsByBlueprintIdQueryVariables = Exact<{
    input?: Maybe<GetPreviewItemsByBlueprintIdRequestInput>;
}>;

export type GetPreviewItemsByBlueprintIdQuery = { __typename?: "Query" } & {
    GetPreviewItemsByBlueprintId?: Maybe<
        { __typename?: "GetPreviewItemsByBlueprintIdResponse" } & GetPreviewItemsByBlueprintIdResponseFragment
    >;
};

export type GetProjectByIdQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdRequestInput>;
}>;

export type GetProjectByIdQuery = { __typename?: "Query" } & {
    GetProjectByID?: Maybe<{ __typename?: "GetProjectByIDResponse" } & GetProjectByIdResponseFragment>;
};

export type GetProjectById_ProjectQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdRequestInput>;
}>;

export type GetProjectById_ProjectQuery = { __typename?: "Query" } & {
    GetProjectByID?: Maybe<
        { __typename?: "GetProjectByIDResponse" } & {
            project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
        }
    >;
};

export type GetProjectById_Project_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdRequestInput>;
}>;

export type GetProjectById_Project_RoleByUserQuery = { __typename?: "Query" } & {
    GetProjectByID?: Maybe<
        { __typename?: "GetProjectByIDResponse" } & {
            project?: Maybe<
                { __typename?: "ProjectResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetProjectByIdWithInheritanceQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritanceQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & GetProjectByIdWithInheritanceResponseFragment
    >;
};

export type GetProjectByIdWithInheritance_GroupQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritance_GroupQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
            group?: Maybe<{ __typename?: "GroupResponse" } & GroupResponseFragment>;
        }
    >;
};

export type GetProjectByIdWithInheritance_Group_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritance_Group_RoleByUserQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
            group?: Maybe<
                { __typename?: "GroupResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetProjectByIdWithInheritance_OrganizationQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritance_OrganizationQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
            organization?: Maybe<{ __typename?: "OrganizationResponse" } & OrganizationResponseFragment>;
        }
    >;
};

export type GetProjectByIdWithInheritance_Organization_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritance_Organization_RoleByUserQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
            organization?: Maybe<
                { __typename?: "OrganizationResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetProjectByIdWithInheritance_ProjectQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritance_ProjectQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
            project?: Maybe<{ __typename?: "ProjectResponse" } & ProjectResponseFragment>;
        }
    >;
};

export type GetProjectByIdWithInheritance_Project_RoleByUserQueryVariables = Exact<{
    input?: Maybe<GetProjectByIdWithInheritanceRequestInput>;
}>;

export type GetProjectByIdWithInheritance_Project_RoleByUserQuery = { __typename?: "Query" } & {
    GetProjectByIDWithInheritance?: Maybe<
        { __typename?: "GetProjectByIDWithInheritanceResponse" } & {
            project?: Maybe<
                { __typename?: "ProjectResponse" } & {
                    roleByUser?: Maybe<{ __typename?: "AnyToRoleConnection" } & AnyToRoleConnectionFragment>;
                }
            >;
        }
    >;
};

export type GetProjectMembersQueryVariables = Exact<{
    input?: Maybe<GetProjectMembersRequestInput>;
}>;

export type GetProjectMembersQuery = { __typename?: "Query" } & {
    GetProjectMembers?: Maybe<{ __typename?: "GetProjectMembersResponse" } & GetProjectMembersResponseFragment>;
};

export type GetProjectMembers_ConnectionQueryVariables = Exact<{
    input?: Maybe<GetProjectMembersRequestInput>;
}>;

export type GetProjectMembers_ConnectionQuery = { __typename?: "Query" } & {
    GetProjectMembers?: Maybe<
        { __typename?: "GetProjectMembersResponse" } & {
            connection?: Maybe<{ __typename?: "MemberConnection" } & MemberConnectionFragment>;
        }
    >;
};

export type GetProjectPortQueryVariables = Exact<{
    input?: Maybe<GetProjectPortRequestInput>;
}>;

export type GetProjectPortQuery = { __typename?: "Query" } & {
    GetProjectPort?: Maybe<{ __typename?: "GetProjectPortResponse" } & GetProjectPortResponseFragment>;
};

export type GetProjectPort_SelectionProgressQueryVariables = Exact<{
    input?: Maybe<GetProjectPortRequestInput>;
}>;

export type GetProjectPort_SelectionProgressQuery = { __typename?: "Query" } & {
    GetProjectPort?: Maybe<
        { __typename?: "GetProjectPortResponse" } & {
            selectionProgress?: Maybe<{ __typename?: "ProjectPortSelectionProgress" } & ProjectPortSelectionProgressFragment>;
        }
    >;
};

export type GetProjectQuotaPlanQueryVariables = Exact<{
    input?: Maybe<GetProjectQuotaPlanRequestInput>;
}>;

export type GetProjectQuotaPlanQuery = { __typename?: "Query" } & {
    GetProjectQuotaPlan?: Maybe<{ __typename?: "GetProjectQuotaPlanResponse" } & GetProjectQuotaPlanResponseFragment>;
};

export type GetProjectQuotaPlan_QuotaPlanQueryVariables = Exact<{
    input?: Maybe<GetProjectQuotaPlanRequestInput>;
}>;

export type GetProjectQuotaPlan_QuotaPlanQuery = { __typename?: "Query" } & {
    GetProjectQuotaPlan?: Maybe<
        { __typename?: "GetProjectQuotaPlanResponse" } & {
            quotaPlan?: Maybe<{ __typename?: "ProjectQuotaPlan" } & ProjectQuotaPlanFragment>;
        }
    >;
};

export type GetReleaseByIdQueryVariables = Exact<{
    input?: Maybe<GetReleaseByIdRequestInput>;
}>;

export type GetReleaseByIdQuery = { __typename?: "Query" } & {
    GetReleaseById?: Maybe<{ __typename?: "GetReleaseByIdResponse" } & GetReleaseByIdResponseFragment>;
};

export type GetReleaseById_ReleaseQueryVariables = Exact<{
    input?: Maybe<GetReleaseByIdRequestInput>;
}>;

export type GetReleaseById_ReleaseQuery = { __typename?: "Query" } & {
    GetReleaseById?: Maybe<
        { __typename?: "GetReleaseByIdResponse" } & {
            release?: Maybe<{ __typename?: "ReleaseResponse" } & ReleaseResponseFragment>;
        }
    >;
};

export type GetRoleRuleByIdQueryVariables = Exact<{
    input?: Maybe<GetRoleRuleByIdRequestInput>;
}>;

export type GetRoleRuleByIdQuery = { __typename?: "Query" } & {
    GetRoleRuleByID?: Maybe<{ __typename?: "GetRoleRuleByIDResponse" } & GetRoleRuleByIdResponseFragment>;
};

export type GetRoleRuleById_RoleRuleQueryVariables = Exact<{
    input?: Maybe<GetRoleRuleByIdRequestInput>;
}>;

export type GetRoleRuleById_RoleRuleQuery = { __typename?: "Query" } & {
    GetRoleRuleByID?: Maybe<
        { __typename?: "GetRoleRuleByIDResponse" } & {
            roleRule?: Maybe<{ __typename?: "RoleRuleResponse" } & RoleRuleResponseFragment>;
        }
    >;
};

export type GetUnpublishedLinkedDocumentsQueryVariables = Exact<{
    input?: Maybe<GetUnpublishedLinkedDocumentsRequestInput>;
}>;

export type GetUnpublishedLinkedDocumentsQuery = { __typename?: "Query" } & {
    GetUnpublishedLinkedDocuments?: Maybe<
        { __typename?: "GetUnpublishedLinkedDocumentsResponse" } & GetUnpublishedLinkedDocumentsResponseFragment
    >;
};

export type GetUsageOfBlueprintFieldQueryVariables = Exact<{
    input?: Maybe<GetUsageOfBlueprintFieldRequestInput>;
}>;

export type GetUsageOfBlueprintFieldQuery = { __typename?: "Query" } & {
    GetUsageOfBlueprintField?: Maybe<
        { __typename?: "GetUsageOfBlueprintFieldResponse" } & GetUsageOfBlueprintFieldResponseFragment
    >;
};

export type GetUserRoleWithRoleRulesQueryVariables = Exact<{
    input?: Maybe<GetUserRoleWithRoleRulesRequestInput>;
}>;

export type GetUserRoleWithRoleRulesQuery = { __typename?: "Query" } & {
    GetUserRoleWithRoleRules?: Maybe<
        { __typename?: "GetUserRoleWithRoleRulesResponse" } & GetUserRoleWithRoleRulesResponseFragment
    >;
};

export type ReadUserAccessTokensQueryVariables = Exact<{
    input?: Maybe<ReadUserAccessTokensRequestInput>;
}>;

export type ReadUserAccessTokensQuery = { __typename?: "Query" } & {
    ReadUserAccessTokens?: Maybe<{ __typename?: "ReadUserAccessTokensResponse" } & ReadUserAccessTokensResponseFragment>;
};

export type ValidateApiKeyQueryVariables = Exact<{
    input?: Maybe<ValidateApiKeyRequestInput>;
}>;

export type ValidateApiKeyQuery = { __typename?: "Query" } & {
    ValidateApiKey?: Maybe<{ __typename?: "ValidateAPIKeyResponse" } & ValidateApiKeyResponseFragment>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = { __typename?: "Query" } & {
    getUser?: Maybe<{ __typename?: "GetUserResponse" } & GetUserResponseFragment>;
};

export type GetUser_ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetUser_ProfileQuery = { __typename?: "Query" } & {
    getUser?: Maybe<
        { __typename?: "GetUserResponse" } & {
            profile?: Maybe<{ __typename?: "CaisyUserProfile" } & CaisyUserProfileFragment>;
        }
    >;
};

export type GetUser_SettingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUser_SettingsQuery = { __typename?: "Query" } & {
    getUser?: Maybe<
        { __typename?: "GetUserResponse" } & { settings?: Maybe<{ __typename?: "UserSettings" } & UserSettingsFragment> }
    >;
};

export type SessionQueryVariables = Exact<{ [key: string]: never }>;

export type SessionQuery = { __typename?: "Query" } & { session?: Maybe<{ __typename?: "Session" } & SessionFragment> };

export type UserProfileQueryVariables = Exact<{
    userId: Scalars["ID"];
}>;

export type UserProfileQuery = { __typename?: "Query" } & {
    userProfile?: Maybe<{ __typename?: "CaisyUserProfile" } & CaisyUserProfileFragment>;
};

export const AssignRoleResponseFragmentDoc = gql`
  fragment AssignRoleResponse on AssignRoleResponse {
    success
    userId
  }
`;
export const CheckBlueprintNameAvailableResponseFragmentDoc = gql`
  fragment CheckBlueprintNameAvailableResponse on CheckBlueprintNameAvailableResponse {
    available
  }
`;
export const CopyMemberFromProjectToProjectErrorFragmentDoc = gql`
  fragment CopyMemberFromProjectToProjectError on CopyMemberFromProjectToProjectError {
    errorMessage
    userId
  }
`;
export const CopyMemberFromProjectToProjectResponseFragmentDoc = gql`
  fragment CopyMemberFromProjectToProjectResponse on CopyMemberFromProjectToProjectResponse {
    errors {
      ...CopyMemberFromProjectToProjectError
    }
    successfulMembers
    totalMembers
  }
  ${CopyMemberFromProjectToProjectErrorFragmentDoc}
`;
export const ApiKeyInitalResponseFragmentDoc = gql`
  fragment APIKeyInitalResponse on APIKeyInitalResponse {
    apiKeyId
    createdAt
    name
    value
  }
`;
export const CreateApiKeyResponseFragmentDoc = gql`
  fragment CreateAPIKeyResponse on CreateAPIKeyResponse {
    apikey {
      ...APIKeyInitalResponse
    }
    projectId
  }
  ${ApiKeyInitalResponseFragmentDoc}
`;
export const BlueprintFieldCodeFragmentDoc = gql`
  fragment BlueprintFieldCode on BlueprintFieldCode {
    languages
    max
    min
  }
`;
export const BlueprintFieldConnectionFragmentDoc = gql`
  fragment BlueprintFieldConnection on BlueprintFieldConnection {
    connectedIds
    max
    min
    multiple
    variant
  }
`;
export const BlueprintFieldDatetimeFragmentDoc = gql`
  fragment BlueprintFieldDatetime on BlueprintFieldDatetime {
    time
  }
`;
export const BlueprintFieldExtensionFragmentDoc = gql`
  fragment BlueprintFieldExtension on BlueprintFieldExtension {
    height
    pattern
    url
  }
`;
export const BlueprintFieldFileFragmentDoc = gql`
  fragment BlueprintFieldFile on BlueprintFieldFile {
    pattern
  }
`;
export const BlueprintFieldFloatFragmentDoc = gql`
  fragment BlueprintFieldFloat on BlueprintFieldFloat {
    max
    min
  }
`;
export const BlueprintFieldIntFragmentDoc = gql`
  fragment BlueprintFieldInt on BlueprintFieldInt {
    max
    min
  }
`;
export const BlueprintFieldRichtextFeaturesFragmentDoc = gql`
  fragment BlueprintFieldRichtextFeatures on BlueprintFieldRichtextFeatures {
    alignCenter
    alignJustify
    alignLeft
    alignRight
    blockquote
    bold
    code
    codeblock
    frame
    h1
    h2
    h3
    h4
    h5
    h6
    italic
    link
    ol
    table
    ul
  }
`;
export const BlueprintFieldRichtextFragmentDoc = gql`
  fragment BlueprintFieldRichtext on BlueprintFieldRichtext {
    assetBlueprintIds
    assetLinking
    componentBlueprintIds
    componentLinking
    documentBlueprintIds
    documentLinking
    features {
      ...BlueprintFieldRichtextFeatures
    }
    max
    min
    pattern
  }
  ${BlueprintFieldRichtextFeaturesFragmentDoc}
`;
export const BlueprintFieldSelectItemFragmentDoc = gql`
  fragment BlueprintFieldSelectItem on BlueprintFieldSelectItem {
    key
    value
  }
`;
export const BlueprintFieldSelectFragmentDoc = gql`
  fragment BlueprintFieldSelect on BlueprintFieldSelect {
    items {
      ...BlueprintFieldSelectItem
    }
    max
    min
    multiple
    outputEnumType
  }
  ${BlueprintFieldSelectItemFragmentDoc}
`;
export const BlueprintFieldStringFragmentDoc = gql`
  fragment BlueprintFieldString on BlueprintFieldString {
    max
    min
    multiline
    pattern
  }
`;
export const BlueprintFieldTagFragmentDoc = gql`
  fragment BlueprintFieldTag on BlueprintFieldTag {
    max
    min
    pattern
  }
`;
export const BlueprintFieldVideoFragmentDoc = gql`
  fragment BlueprintFieldVideo on BlueprintFieldVideo {
    pattern
  }
`;
export const BlueprintFieldOptionsFragmentDoc = gql`
  fragment BlueprintFieldOptions on BlueprintFieldOptions {
    code {
      ...BlueprintFieldCode
    }
    connection {
      ...BlueprintFieldConnection
    }
    datetime {
      ...BlueprintFieldDatetime
    }
    disableInApi
    disableInUi
    extension {
      ...BlueprintFieldExtension
    }
    external
    file {
      ...BlueprintFieldFile
    }
    float {
      ...BlueprintFieldFloat
    }
    int {
      ...BlueprintFieldInt
    }
    localized
    primary
    required
    richtext {
      ...BlueprintFieldRichtext
    }
    select {
      ...BlueprintFieldSelect
    }
    string {
      ...BlueprintFieldString
    }
    tag {
      ...BlueprintFieldTag
    }
    uniqueGlobal
    uniqueLocal
    video {
      ...BlueprintFieldVideo
    }
  }
  ${BlueprintFieldCodeFragmentDoc}
  ${BlueprintFieldConnectionFragmentDoc}
  ${BlueprintFieldDatetimeFragmentDoc}
  ${BlueprintFieldExtensionFragmentDoc}
  ${BlueprintFieldFileFragmentDoc}
  ${BlueprintFieldFloatFragmentDoc}
  ${BlueprintFieldIntFragmentDoc}
  ${BlueprintFieldRichtextFragmentDoc}
  ${BlueprintFieldSelectFragmentDoc}
  ${BlueprintFieldStringFragmentDoc}
  ${BlueprintFieldTagFragmentDoc}
  ${BlueprintFieldVideoFragmentDoc}
`;
export const BlueprintFieldFragmentDoc = gql`
  fragment BlueprintField on BlueprintField {
    blueprintFieldId
    blueprintGroupId
    blueprintId
    description
    name
    options {
      ...BlueprintFieldOptions
    }
    system
    title
    type
  }
  ${BlueprintFieldOptionsFragmentDoc}
`;
export const BlueprintGroupFragmentDoc = gql`
  fragment BlueprintGroup on BlueprintGroup {
    blueprintGroupId
    fields {
      ...BlueprintField
    }
    name
  }
  ${BlueprintFieldFragmentDoc}
`;
export const BlueprintResponseFragmentDoc = gql`
  fragment BlueprintResponse on BlueprintResponse {
    blueprintId
    createdAt
    createdBy
    description
    exposeMutations
    groups {
      ...BlueprintGroup
    }
    name
    previewImageUrl
    projectId
    single
    system
    tagIds
    title
    updatedAt
    updatedBy
    variant
  }
  ${BlueprintGroupFragmentDoc}
`;
export const CreateBlueprintResponseFragmentDoc = gql`
  fragment CreateBlueprintResponse on CreateBlueprintResponse {
    blueprint {
      ...BlueprintResponse
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const CreateCaisyUserResultFragmentDoc = gql`
  fragment CreateCaisyUserResult on CreateCaisyUserResult {
    userId
  }
`;
export const DocumentFieldLocaleResponseFragmentDoc = gql`
  fragment DocumentFieldLocaleResponse on DocumentFieldLocaleResponse {
    allowEmptyRequired
    apiName
    default
    disableEditing
    disableInResponse
    fallbackLocaleId
    flag
    id
    title
  }
`;
export const CreateDocumentFieldLocaleResponseFragmentDoc = gql`
  fragment CreateDocumentFieldLocaleResponse on CreateDocumentFieldLocaleResponse {
    documentFieldLocale {
      ...DocumentFieldLocaleResponse
    }
    projectId
  }
  ${DocumentFieldLocaleResponseFragmentDoc}
`;
export const DocumentFragmentDoc = gql`
  fragment Document on Document {
    archivedAt
    blueprintBranch
    blueprintId
    blueprintVariant
    createdAt
    createdByUserId
    documentId
    environmentId
    lastUpdatedByUserId
    previewImageUrl
    projectId
    publishedAt
    statusId
    title
    updatedAt
  }
`;
export const CreateDocumentResponseFragmentDoc = gql`
  fragment CreateDocumentResponse on CreateDocumentResponse {
    document {
      ...Document
    }
  }
  ${DocumentFragmentDoc}
`;
export const AnyToRoleConnectionFragmentDoc = gql`
  fragment AnyToRoleConnection on AnyToRoleConnection {
    title
  }
`;
export const GroupResponseFragmentDoc = gql`
  fragment GroupResponse on GroupResponse {
    alias
    createdAt
    description
    groupId
    logoAssetUrl
    name
    organizationId
    roleByUser {
      ...AnyToRoleConnection
    }
    updatedAt
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const CreateGroupResponseFragmentDoc = gql`
  fragment CreateGroupResponse on CreateGroupResponse {
    group {
      ...GroupResponse
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const CreateManyViewsResponseFragmentDoc = gql`
  fragment CreateManyViewsResponse on CreateManyViewsResponse {
    success
  }
`;
export const OrganizationResponseFragmentDoc = gql`
  fragment OrganizationResponse on OrganizationResponse {
    alias
    createdAt
    description
    logoAssetUrl
    name
    organizationId
    roleByUser {
      ...AnyToRoleConnection
    }
    updatedAt
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const CreateOrganizationResponseFragmentDoc = gql`
  fragment CreateOrganizationResponse on CreateOrganizationResponse {
    organization {
      ...OrganizationResponse
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const PreviewItemResponseFragmentDoc = gql`
  fragment PreviewItemResponse on PreviewItemResponse {
    blueprintId
    enableLivePreview
    previewId
    previewItemId
    previewUrl
  }
`;
export const CreatePreviewItemResponseFragmentDoc = gql`
  fragment CreatePreviewItemResponse on CreatePreviewItemResponse {
    previewItem {
      ...PreviewItemResponse
    }
  }
  ${PreviewItemResponseFragmentDoc}
`;
export const PreviewResponseFragmentDoc = gql`
  fragment PreviewResponse on PreviewResponse {
    name
    previewId
  }
`;
export const CreatePreviewResponseFragmentDoc = gql`
  fragment CreatePreviewResponse on CreatePreviewResponse {
    preview {
      ...PreviewResponse
    }
  }
  ${PreviewResponseFragmentDoc}
`;
export const ProjectResponseFragmentDoc = gql`
  fragment ProjectResponse on ProjectResponse {
    alias
    createdAt
    description
    groupId
    logoAssetUrl
    name
    organizationId
    projectId
    roleByUser {
      ...AnyToRoleConnection
    }
    updatedAt
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const CreateProjectResponseFragmentDoc = gql`
  fragment CreateProjectResponse on CreateProjectResponse {
    project {
      ...ProjectResponse
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const ReleaseDocumentFieldErrorsFragmentDoc = gql`
  fragment ReleaseDocumentFieldErrors on ReleaseDocumentFieldErrors {
    blueprintFieldId
    errorCodes
    locale
  }
`;
export const ReleaseValidationDocumentErrorsFragmentDoc = gql`
  fragment ReleaseValidationDocumentErrors on ReleaseValidationDocumentErrors {
    documentId
    errors {
      ...ReleaseDocumentFieldErrors
    }
  }
  ${ReleaseDocumentFieldErrorsFragmentDoc}
`;
export const ReleaseResponseFragmentDoc = gql`
  fragment ReleaseResponse on ReleaseResponse {
    createdAt
    documentIds
    id
    name
    projectId
    scheduledAt
    status
    type
    updatedAt
    validationErrors {
      ...ReleaseValidationDocumentErrors
    }
  }
  ${ReleaseValidationDocumentErrorsFragmentDoc}
`;
export const CreateReleaseResponseFragmentDoc = gql`
  fragment CreateReleaseResponse on CreateReleaseResponse {
    release {
      ...ReleaseResponse
    }
  }
  ${ReleaseResponseFragmentDoc}
`;
export const RoleRuleResponseFragmentDoc = gql`
  fragment RoleRuleResponse on RoleRuleResponse {
    action
    allow
    domain
    object
    roleId
    ruleId
    target
  }
`;
export const CreateRoleRuleResponseFragmentDoc = gql`
  fragment CreateRoleRuleResponse on CreateRoleRuleResponse {
    roleRule {
      ...RoleRuleResponse
    }
  }
  ${RoleRuleResponseFragmentDoc}
`;
export const TagResponseFragmentDoc = gql`
  fragment TagResponse on TagResponse {
    color
    name
    projectId
    referenceType
    tagId
  }
`;
export const CreateTagResponseFragmentDoc = gql`
  fragment CreateTagResponse on CreateTagResponse {
    tag {
      ...TagResponse
    }
  }
  ${TagResponseFragmentDoc}
`;
export const CreateUserAccessTokenResponseFragmentDoc = gql`
  fragment CreateUserAccessTokenResponse on CreateUserAccessTokenResponse {
    createdAt
    id
    name
    value
  }
`;
export const UserRoleResponseFragmentDoc = gql`
  fragment UserRoleResponse on UserRoleResponse {
    description
    groupId
    inheritedBySystemRole
    organizationId
    projectId
    roleId
    title
  }
`;
export const CreateUserRoleResponseFragmentDoc = gql`
  fragment CreateUserRoleResponse on CreateUserRoleResponse {
    userRole {
      ...UserRoleResponse
    }
  }
  ${UserRoleResponseFragmentDoc}
`;
export const CreateViewPinResponseFragmentDoc = gql`
  fragment CreateViewPinResponse on CreateViewPinResponse {
    success
  }
`;
export const ViewResponseFragmentDoc = gql`
  fragment ViewResponse on ViewResponse {
    iconUrl
    id
    parentId
    pinned
    position
    privat
    query
    target
    title
  }
`;
export const CreateViewResponseFragmentDoc = gql`
  fragment CreateViewResponse on CreateViewResponse {
    view {
      ...ViewResponse
    }
  }
  ${ViewResponseFragmentDoc}
`;
export const WebhookHeaderFragmentDoc = gql`
  fragment WebhookHeader on WebhookHeader {
    name
    value
  }
`;
export const WebhookResponseFragmentDoc = gql`
  fragment WebhookResponse on WebhookResponse {
    createdAt
    description
    headers {
      ...WebhookHeader
    }
    method
    name
    sucessfulCallsLast30Days
    trigger
    unsucessfulCallsLast30Days
    updatedAt
    url
    webhookId
  }
  ${WebhookHeaderFragmentDoc}
`;
export const CreateWebhookResponseFragmentDoc = gql`
  fragment CreateWebhookResponse on CreateWebhookResponse {
    webhook {
      ...WebhookResponse
    }
  }
  ${WebhookResponseFragmentDoc}
`;
export const DeAssignRoleResponseFragmentDoc = gql`
  fragment DeAssignRoleResponse on DeAssignRoleResponse {
    success
  }
`;
export const DeleteApiKeyResponseFragmentDoc = gql`
  fragment DeleteAPIKeyResponse on DeleteAPIKeyResponse {
    deleted
  }
`;
export const DeleteBlueprintResponseFragmentDoc = gql`
  fragment DeleteBlueprintResponse on DeleteBlueprintResponse {
    deleted
  }
`;
export const DeleteDocumentFieldLocaleResponseFragmentDoc = gql`
  fragment DeleteDocumentFieldLocaleResponse on DeleteDocumentFieldLocaleResponse {
    deleted
  }
`;
export const DeleteDocumentResponseFragmentDoc = gql`
  fragment DeleteDocumentResponse on DeleteDocumentResponse {
    deleted
  }
`;
export const DeleteEntrypointResponseFragmentDoc = gql`
  fragment DeleteEntrypointResponse on DeleteEntrypointResponse {
    deleted
  }
`;
export const DeleteGroupResponseFragmentDoc = gql`
  fragment DeleteGroupResponse on DeleteGroupResponse {
    deleted
  }
`;
export const DeleteDocumentErrorFragmentDoc = gql`
  fragment DeleteDocumentError on DeleteDocumentError {
    documentId
    errorMessage
  }
`;
export const DeleteManyDocumentsResponseFragmentDoc = gql`
  fragment DeleteManyDocumentsResponse on DeleteManyDocumentsResponse {
    batchErrors {
      ...DeleteDocumentError
    }
    deletedDocumentIds
  }
  ${DeleteDocumentErrorFragmentDoc}
`;
export const DeleteManyReleasesResponseFragmentDoc = gql`
  fragment DeleteManyReleasesResponse on DeleteManyReleasesResponse {
    deleted
  }
`;
export const DeleteOrganizationResponseFragmentDoc = gql`
  fragment DeleteOrganizationResponse on DeleteOrganizationResponse {
    deleted
  }
`;
export const DeletePreviewItemResponseFragmentDoc = gql`
  fragment DeletePreviewItemResponse on DeletePreviewItemResponse {
    deleted
  }
`;
export const DeletePreviewResponseFragmentDoc = gql`
  fragment DeletePreviewResponse on DeletePreviewResponse {
    deleted
  }
`;
export const DeleteProjectResponseFragmentDoc = gql`
  fragment DeleteProjectResponse on DeleteProjectResponse {
    deleted
  }
`;
export const DeleteRoleRuleResponseFragmentDoc = gql`
  fragment DeleteRoleRuleResponse on DeleteRoleRuleResponse {
    deleted
  }
`;
export const DeleteTagResponseFragmentDoc = gql`
  fragment DeleteTagResponse on DeleteTagResponse {
    success
  }
`;
export const DeleteUserAccessTokenResponseFragmentDoc = gql`
  fragment DeleteUserAccessTokenResponse on DeleteUserAccessTokenResponse {
    deleted
  }
`;
export const DeleteUserRoleResponseFragmentDoc = gql`
  fragment DeleteUserRoleResponse on DeleteUserRoleResponse {
    deleted
  }
`;
export const DeleteViewPinResponseFragmentDoc = gql`
  fragment DeleteViewPinResponse on DeleteViewPinResponse {
    deleted
  }
`;
export const DeleteViewResponseFragmentDoc = gql`
  fragment DeleteViewResponse on DeleteViewResponse {
    deleted
  }
`;
export const DeleteWebhookResponseFragmentDoc = gql`
  fragment DeleteWebhookResponse on DeleteWebhookResponse {
    deleted
  }
`;
export const DuplicateDocumentResponseFragmentDoc = gql`
  fragment DuplicateDocumentResponse on DuplicateDocumentResponse {
    blueprintBranch
    environmentId
    parentId
    response {
      ...Document
    }
  }
  ${DocumentFragmentDoc}
`;
export const DuplicateToProjectResponseFragmentDoc = gql`
  fragment DuplicateToProjectResponse on DuplicateToProjectResponse {
    portId
  }
`;
export const EmailRecordFragmentDoc = gql`
  fragment EmailRecord on EmailRecord {
    address
    verified
  }
`;
export const GetAllCompletedOnboardingEventsResponseFragmentDoc = gql`
  fragment GetAllCompletedOnboardingEventsResponse on GetAllCompletedOnboardingEventsResponse {
    eventCodes
  }
`;
export const GetAllDocumentFieldLocaleResponseFragmentDoc = gql`
  fragment GetAllDocumentFieldLocaleResponse on GetAllDocumentFieldLocaleResponse {
    documentFieldLocales {
      ...DocumentFieldLocaleResponse
    }
    projectId
  }
  ${DocumentFieldLocaleResponseFragmentDoc}
`;
export const DocumentSnapshotListFragmentFragmentDoc = gql`
  fragment DocumentSnapshotListFragment on DocumentSnapshotListFragment {
    publishedAt
    snapshotId
  }
`;
export const GetAllDocumentSnapshotResponseFragmentDoc = gql`
  fragment GetAllDocumentSnapshotResponse on GetAllDocumentSnapshotResponse {
    documentSnapshots {
      ...DocumentSnapshotListFragment
    }
  }
  ${DocumentSnapshotListFragmentFragmentDoc}
`;
export const DocumentStatusResponseFragmentDoc = gql`
  fragment DocumentStatusResponse on DocumentStatusResponse {
    name
    statusId
  }
`;
export const GetAllDocumentStatusResponseFragmentDoc = gql`
  fragment GetAllDocumentStatusResponse on GetAllDocumentStatusResponse {
    documentStatuses {
      ...DocumentStatusResponse
    }
  }
  ${DocumentStatusResponseFragmentDoc}
`;
export const GetAllWebhooksResponseFragmentDoc = gql`
  fragment GetAllWebhooksResponse on GetAllWebhooksResponse {
    webhooks {
      ...WebhookResponse
    }
  }
  ${WebhookResponseFragmentDoc}
`;
export const GetAmountResponseFragmentDoc = gql`
  fragment GetAmountResponse on GetAmountResponse {
    value
  }
`;
export const GetBlueprintByIdResponseFragmentDoc = gql`
  fragment GetBlueprintByIDResponse on GetBlueprintByIDResponse {
    blueprint {
      ...BlueprintResponse
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const GetBlueprintByNameResponseFragmentDoc = gql`
  fragment GetBlueprintByNameResponse on GetBlueprintByNameResponse {
    blueprint {
      ...BlueprintResponse
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const QuotaCountFragmentDoc = gql`
  fragment QuotaCount on QuotaCount {
    count
  }
`;
export const GetCountsResponseFragmentDoc = gql`
  fragment GetCountsResponse on GetCountsResponse {
    counts {
      ...QuotaCount
    }
  }
  ${QuotaCountFragmentDoc}
`;
export const DocumentFieldFragmentDoc = gql`
  fragment DocumentField on DocumentField {
    blueprintFieldId
    createdAt
    data
    lastUpdatedByUserId
    localeCode
    type
    updatedAt
  }
`;
export const DocumentWithFieldsResponseFragmentDoc = gql`
  fragment DocumentWithFieldsResponse on DocumentWithFieldsResponse {
    archivedAt
    blueprintBranch
    blueprintId
    createdAt
    createdByUserId
    documentId
    environmentId
    fields {
      ...DocumentField
    }
    lastUpdatedByUserId
    previewImageUrl
    projectId
    publishedAt
    statusId
    title
    updatedAt
  }
  ${DocumentFieldFragmentDoc}
`;
export const GetDocumentByIdResponseFragmentDoc = gql`
  fragment GetDocumentByIdResponse on GetDocumentByIdResponse {
    document {
      ...DocumentWithFieldsResponse
    }
  }
  ${DocumentWithFieldsResponseFragmentDoc}
`;
export const DocumentCountsByBlueprintsResponseFragmentDoc = gql`
  fragment DocumentCountsByBlueprintsResponse on DocumentCountsByBlueprintsResponse {
    blueprintId
    count
  }
`;
export const GetDocumentCountsByBlueprintsResponseFragmentDoc = gql`
  fragment GetDocumentCountsByBlueprintsResponse on GetDocumentCountsByBlueprintsResponse {
    counts {
      ...DocumentCountsByBlueprintsResponse
    }
  }
  ${DocumentCountsByBlueprintsResponseFragmentDoc}
`;
export const GetDocumentSnapshotResponseFragmentDoc = gql`
  fragment GetDocumentSnapshotResponse on GetDocumentSnapshotResponse {
    document {
      ...DocumentWithFieldsResponse
    }
  }
  ${DocumentWithFieldsResponseFragmentDoc}
`;
export const EntrypointResponseFragmentDoc = gql`
  fragment EntrypointResponse on EntrypointResponse {
    data
    domain
    groupId
    lastUpdatedAt
    lastUpdatedBy
    organizationId
    projectId
  }
`;
export const GetEntrypointByDomainResponseFragmentDoc = gql`
  fragment GetEntrypointByDomainResponse on GetEntrypointByDomainResponse {
    entrypoint {
      ...EntrypointResponse
    }
  }
  ${EntrypointResponseFragmentDoc}
`;
export const GetEntrypointByScopeResponseFragmentDoc = gql`
  fragment GetEntrypointByScopeResponse on GetEntrypointByScopeResponse {
    entrypoint {
      ...EntrypointResponse
    }
  }
  ${EntrypointResponseFragmentDoc}
`;
export const GetGroupByIdResponseFragmentDoc = gql`
  fragment GetGroupByIDResponse on GetGroupByIDResponse {
    group {
      ...GroupResponse
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const GetGroupByIdWithInheritanceResponseFragmentDoc = gql`
  fragment GetGroupByIDWithInheritanceResponse on GetGroupByIDWithInheritanceResponse {
    group {
      ...GroupResponse
    }
    organization {
      ...OrganizationResponse
    }
  }
  ${GroupResponseFragmentDoc}
  ${OrganizationResponseFragmentDoc}
`;
export const RoleFragmentDoc = gql`
  fragment Role on Role {
    description
    groupId
    inheritedBySystemRole
    organizationId
    projectId
    roleId
    systemRole
    title
  }
`;
export const UserProfileFragmentDoc = gql`
  fragment UserProfile on UserProfile {
    displayName
    email
    photoUrl
    userId
  }
`;
export const MemberResponseFragmentDoc = gql`
  fragment MemberResponse on MemberResponse {
    role {
      ...Role
    }
    user {
      ...UserProfile
    }
  }
  ${RoleFragmentDoc}
  ${UserProfileFragmentDoc}
`;
export const MemberConnectionEdgeFragmentDoc = gql`
  fragment MemberConnectionEdge on MemberConnectionEdge {
    cursor
    node {
      ...MemberResponse
    }
  }
  ${MemberResponseFragmentDoc}
`;
export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
export const MemberConnectionFragmentDoc = gql`
  fragment MemberConnection on MemberConnection {
    edges {
      ...MemberConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${MemberConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetGroupMembersResponseFragmentDoc = gql`
  fragment GetGroupMembersResponse on GetGroupMembersResponse {
    connection {
      ...MemberConnection
    }
  }
  ${MemberConnectionFragmentDoc}
`;
export const GroupQuotaPlanFragmentDoc = gql`
  fragment GroupQuotaPlan on GroupQuotaPlan {
    maxMembers
  }
`;
export const GetGroupQuotaPlanResponseFragmentDoc = gql`
  fragment GetGroupQuotaPlanResponse on GetGroupQuotaPlanResponse {
    groupId
    quotaPlan {
      ...GroupQuotaPlan
    }
  }
  ${GroupQuotaPlanFragmentDoc}
`;
export const ApiKeyResponseFragmentDoc = gql`
  fragment APIKeyResponse on APIKeyResponse {
    apiKeyId
    createdAt
    name
  }
`;
export const GetManyApiKeyResponseFragmentDoc = gql`
  fragment GetManyAPIKeyResponse on GetManyAPIKeyResponse {
    apiKeys {
      ...APIKeyResponse
    }
    projectId
  }
  ${ApiKeyResponseFragmentDoc}
`;
export const AuditEventMetaFragmentDoc = gql`
  fragment AuditEventMeta on AuditEventMeta {
    blueprintFieldId
    blueprintId
    createdAt
    documentId
    documentLocaleId
    documentStatusId
    effectedUserId
    triggeredUserId
    userRole
  }
`;
export const AuditEventScopeFragmentDoc = gql`
  fragment AuditEventScope on AuditEventScope {
    projectId
  }
`;
export const AuditEventPayloadFragmentDoc = gql`
  fragment AuditEventPayload on AuditEventPayload {
    body
    eventId
    metaData {
      ...AuditEventMeta
    }
    scope {
      ...AuditEventScope
    }
    trigger
  }
  ${AuditEventMetaFragmentDoc}
  ${AuditEventScopeFragmentDoc}
`;
export const AuditEventConnectionEdgeFragmentDoc = gql`
  fragment AuditEventConnectionEdge on AuditEventConnectionEdge {
    cursor
    node {
      ...AuditEventPayload
    }
  }
  ${AuditEventPayloadFragmentDoc}
`;
export const AuditEventConnectionFragmentDoc = gql`
  fragment AuditEventConnection on AuditEventConnection {
    edges {
      ...AuditEventConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${AuditEventConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyAuditEventsResponseFragmentDoc = gql`
  fragment GetManyAuditEventsResponse on GetManyAuditEventsResponse {
    connection {
      ...AuditEventConnection
    }
  }
  ${AuditEventConnectionFragmentDoc}
`;
export const BlueprintResponseConnectionEdgeFragmentDoc = gql`
  fragment BlueprintResponseConnectionEdge on BlueprintResponseConnectionEdge {
    cursor
    node {
      ...BlueprintResponse
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const BlueprintResponseConnectionFragmentDoc = gql`
  fragment BlueprintResponseConnection on BlueprintResponseConnection {
    edges {
      ...BlueprintResponseConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${BlueprintResponseConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyBlueprintsResponseFragmentDoc = gql`
  fragment GetManyBlueprintsResponse on GetManyBlueprintsResponse {
    connection {
      ...BlueprintResponseConnection
    }
  }
  ${BlueprintResponseConnectionFragmentDoc}
`;
export const ValidationErrorFragmentDoc = gql`
  fragment ValidationError on ValidationError {
    blueprintFieldId
    errorCodes
    errorDetails
    locale
  }
`;
export const ValidationFragmentDoc = gql`
  fragment Validation on Validation {
    errors {
      ...ValidationError
    }
    valid
  }
  ${ValidationErrorFragmentDoc}
`;
export const DocumentFieldResponseFragmentDoc = gql`
  fragment DocumentFieldResponse on DocumentFieldResponse {
    field {
      ...DocumentField
    }
    validation {
      ...Validation
    }
  }
  ${DocumentFieldFragmentDoc}
  ${ValidationFragmentDoc}
`;
export const GetManyDocumentFieldsByDocumentIdResponseFragmentDoc = gql`
  fragment GetManyDocumentFieldsByDocumentIdResponse on GetManyDocumentFieldsByDocumentIdResponse {
    fields {
      ...DocumentFieldResponse
    }
  }
  ${DocumentFieldResponseFragmentDoc}
`;
export const GetManyDocumentFieldsByFieldIdsResponseFragmentDoc = gql`
  fragment GetManyDocumentFieldsByFieldIdsResponse on GetManyDocumentFieldsByFieldIdsResponse {
    fields {
      ...DocumentFieldResponse
    }
  }
  ${DocumentFieldResponseFragmentDoc}
`;
export const GetManyDocumentsByIdsResponseFragmentDoc = gql`
  fragment GetManyDocumentsByIdsResponse on GetManyDocumentsByIdsResponse {
    documents {
      ...DocumentWithFieldsResponse
    }
  }
  ${DocumentWithFieldsResponseFragmentDoc}
`;
export const DocumentResponseConnectionEdgeFragmentDoc = gql`
  fragment DocumentResponseConnectionEdge on DocumentResponseConnectionEdge {
    cursor
    node {
      ...DocumentWithFieldsResponse
    }
  }
  ${DocumentWithFieldsResponseFragmentDoc}
`;
export const DocumentResponseConnectionFragmentDoc = gql`
  fragment DocumentResponseConnection on DocumentResponseConnection {
    edges {
      ...DocumentResponseConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${DocumentResponseConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyDocumentsResponseFragmentDoc = gql`
  fragment GetManyDocumentsResponse on GetManyDocumentsResponse {
    connection {
      ...DocumentResponseConnection
    }
  }
  ${DocumentResponseConnectionFragmentDoc}
`;
export const GroupResponseConnectionEdgeFragmentDoc = gql`
  fragment GroupResponseConnectionEdge on GroupResponseConnectionEdge {
    cursor
    node {
      ...GroupResponse
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const GroupResponseConnectionFragmentDoc = gql`
  fragment GroupResponseConnection on GroupResponseConnection {
    edges {
      ...GroupResponseConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${GroupResponseConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyGroupsByUserIdResponseFragmentDoc = gql`
  fragment GetManyGroupsByUserIDResponse on GetManyGroupsByUserIDResponse {
    connection {
      ...GroupResponseConnection
    }
  }
  ${GroupResponseConnectionFragmentDoc}
`;
export const OrganizationResponseConnectionEdgeFragmentDoc = gql`
  fragment OrganizationResponseConnectionEdge on OrganizationResponseConnectionEdge {
    cursor
    node {
      ...OrganizationResponse
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const OrganizationResponseConnectionFragmentDoc = gql`
  fragment OrganizationResponseConnection on OrganizationResponseConnection {
    edges {
      ...OrganizationResponseConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${OrganizationResponseConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyOrganizationsByUserIdResponseFragmentDoc = gql`
  fragment GetManyOrganizationsByUserIDResponse on GetManyOrganizationsByUserIDResponse {
    connection {
      ...OrganizationResponseConnection
    }
  }
  ${OrganizationResponseConnectionFragmentDoc}
`;
export const PreviewWithItemsResponseFragmentDoc = gql`
  fragment PreviewWithItemsResponse on PreviewWithItemsResponse {
    name
    previewId
    previewItems {
      ...PreviewItemResponse
    }
  }
  ${PreviewItemResponseFragmentDoc}
`;
export const PreviewConnectionEdgeFragmentDoc = gql`
  fragment PreviewConnectionEdge on PreviewConnectionEdge {
    cursor
    node {
      ...PreviewWithItemsResponse
    }
  }
  ${PreviewWithItemsResponseFragmentDoc}
`;
export const PreviewConnectionFragmentDoc = gql`
  fragment PreviewConnection on PreviewConnection {
    edges {
      ...PreviewConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${PreviewConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyPreviewsResponseFragmentDoc = gql`
  fragment GetManyPreviewsResponse on GetManyPreviewsResponse {
    connection {
      ...PreviewConnection
    }
  }
  ${PreviewConnectionFragmentDoc}
`;
export const ProjectResponseConnectionEdgeFragmentDoc = gql`
  fragment ProjectResponseConnectionEdge on ProjectResponseConnectionEdge {
    cursor
    node {
      ...ProjectResponse
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const ProjectResponseConnectionFragmentDoc = gql`
  fragment ProjectResponseConnection on ProjectResponseConnection {
    edges {
      ...ProjectResponseConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${ProjectResponseConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyProjectsByUserIdResponseFragmentDoc = gql`
  fragment GetManyProjectsByUserIDResponse on GetManyProjectsByUserIDResponse {
    connection {
      ...ProjectResponseConnection
    }
  }
  ${ProjectResponseConnectionFragmentDoc}
`;
export const GetManyReleasesByProjectIdResponseFragmentDoc = gql`
  fragment GetManyReleasesByProjectIdResponse on GetManyReleasesByProjectIdResponse {
    node {
      ...ReleaseResponse
    }
  }
  ${ReleaseResponseFragmentDoc}
`;
export const GetManyRoleRulesByRoleIdResponseFragmentDoc = gql`
  fragment GetManyRoleRulesByRoleIDResponse on GetManyRoleRulesByRoleIDResponse {
    roleRules {
      ...RoleRuleResponse
    }
  }
  ${RoleRuleResponseFragmentDoc}
`;
export const TagConnectionEdgeFragmentDoc = gql`
  fragment TagConnectionEdge on TagConnectionEdge {
    cursor
    node {
      ...TagResponse
    }
  }
  ${TagResponseFragmentDoc}
`;
export const TagConnectionFragmentDoc = gql`
  fragment TagConnection on TagConnection {
    edges {
      ...TagConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${TagConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyTagsResponseFragmentDoc = gql`
  fragment GetManyTagsResponse on GetManyTagsResponse {
    connection {
      ...TagConnection
    }
  }
  ${TagConnectionFragmentDoc}
`;
export const GetManyUserRolesResponseFragmentDoc = gql`
  fragment GetManyUserRolesResponse on GetManyUserRolesResponse {
    userRoles {
      ...UserRoleResponse
    }
  }
  ${UserRoleResponseFragmentDoc}
`;
export const GetManyViewsResponseFragmentDoc = gql`
  fragment GetManyViewsResponse on GetManyViewsResponse {
    views {
      ...ViewResponse
    }
  }
  ${ViewResponseFragmentDoc}
`;
export const WebhookCallResponseFragmentDoc = gql`
  fragment WebhookCallResponse on WebhookCallResponse {
    createdAt
    eventId
    requestBody
    requestHeaders {
      ...WebhookHeader
    }
    responseBody
    responseHeaders {
      ...WebhookHeader
    }
    responseStatusCode
    webhookCallId
    webhookId
  }
  ${WebhookHeaderFragmentDoc}
`;
export const WebhookCallConnectionEdgeFragmentDoc = gql`
  fragment WebhookCallConnectionEdge on WebhookCallConnectionEdge {
    cursor
    node {
      ...WebhookCallResponse
    }
  }
  ${WebhookCallResponseFragmentDoc}
`;
export const WebhookCallConnectionFragmentDoc = gql`
  fragment WebhookCallConnection on WebhookCallConnection {
    edges {
      ...WebhookCallConnectionEdge
    }
    pageInfo {
      ...PageInfo
    }
    totalCount
  }
  ${WebhookCallConnectionEdgeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const GetManyWebhookCallsResponseFragmentDoc = gql`
  fragment GetManyWebhookCallsResponse on GetManyWebhookCallsResponse {
    connection {
      ...WebhookCallConnection
    }
  }
  ${WebhookCallConnectionFragmentDoc}
`;
export const GetOrganizationByIdResponseFragmentDoc = gql`
  fragment GetOrganizationByIDResponse on GetOrganizationByIDResponse {
    organization {
      ...OrganizationResponse
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const GetOrganizationMembersResponseFragmentDoc = gql`
  fragment GetOrganizationMembersResponse on GetOrganizationMembersResponse {
    connection {
      ...MemberConnection
    }
  }
  ${MemberConnectionFragmentDoc}
`;
export const OrganizationQuotaPlanFragmentDoc = gql`
  fragment OrganizationQuotaPlan on OrganizationQuotaPlan {
    maxMembers
  }
`;
export const GetOrganizationQuotaPlanResponseFragmentDoc = gql`
  fragment GetOrganizationQuotaPlanResponse on GetOrganizationQuotaPlanResponse {
    organizationId
    quotaPlan {
      ...OrganizationQuotaPlan
    }
  }
  ${OrganizationQuotaPlanFragmentDoc}
`;
export const GetPermissionGrantResponseFragmentDoc = gql`
  fragment GetPermissionGrantResponse on GetPermissionGrantResponse {
    appliedRole {
      ...Role
    }
    success
  }
  ${RoleFragmentDoc}
`;
export const PermissionSetFragmentDoc = gql`
  fragment PermissionSet on PermissionSet {
    action
    allow
    domain
    object
    target
  }
`;
export const GetPermissionSetResponseFragmentDoc = gql`
  fragment GetPermissionSetResponse on GetPermissionSetResponse {
    appliedRole {
      ...Role
    }
    permissionSet {
      ...PermissionSet
    }
  }
  ${RoleFragmentDoc}
  ${PermissionSetFragmentDoc}
`;
export const GetPreferredThemeResponseFragmentDoc = gql`
  fragment GetPreferredThemeResponse on GetPreferredThemeResponse {
    preferredTheme
  }
`;
export const GetPreferredUiLanguageResponseFragmentDoc = gql`
  fragment GetPreferredUILanguageResponse on GetPreferredUILanguageResponse {
    preferredUiLanguage
  }
`;
export const GetPreviewByIdResponseFragmentDoc = gql`
  fragment GetPreviewByIdResponse on GetPreviewByIdResponse {
    preview {
      ...PreviewWithItemsResponse
    }
  }
  ${PreviewWithItemsResponseFragmentDoc}
`;
export const GetPreviewItemsByBlueprintIdResponseFragmentDoc = gql`
  fragment GetPreviewItemsByBlueprintIdResponse on GetPreviewItemsByBlueprintIdResponse {
    previewItems {
      ...PreviewItemResponse
    }
  }
  ${PreviewItemResponseFragmentDoc}
`;
export const GetProjectByIdResponseFragmentDoc = gql`
  fragment GetProjectByIDResponse on GetProjectByIDResponse {
    project {
      ...ProjectResponse
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const GetProjectByIdWithInheritanceResponseFragmentDoc = gql`
  fragment GetProjectByIDWithInheritanceResponse on GetProjectByIDWithInheritanceResponse {
    group {
      ...GroupResponse
    }
    organization {
      ...OrganizationResponse
    }
    project {
      ...ProjectResponse
    }
  }
  ${GroupResponseFragmentDoc}
  ${OrganizationResponseFragmentDoc}
  ${ProjectResponseFragmentDoc}
`;
export const GetProjectMembersResponseFragmentDoc = gql`
  fragment GetProjectMembersResponse on GetProjectMembersResponse {
    connection {
      ...MemberConnection
    }
  }
  ${MemberConnectionFragmentDoc}
`;
export const PortErrorFragmentDoc = gql`
  fragment PortError on PortError {
    errorMessage
    objectId
    objectType
  }
`;
export const ProjectPortSelectionProgressFragmentDoc = gql`
  fragment ProjectPortSelectionProgress on ProjectPortSelectionProgress {
    blueprintCompleted
    blueprintTotal
    documentCompleted
    documentFieldLocaleCompleted
    documentFieldLocaleTotal
    documentTotal
    memberCompleted
    memberTotal
    previewCompleted
    previewTotal
    tagCompleted
    tagTotal
    viewCompleted
    viewTotal
    webhookCompleted
    webhookTotal
  }
`;
export const GetProjectPortResponseFragmentDoc = gql`
  fragment GetProjectPortResponse on GetProjectPortResponse {
    createdAt
    expiresAt
    finished
    portErrors {
      ...PortError
    }
    portType
    projectId
    selectionProgress {
      ...ProjectPortSelectionProgress
    }
  }
  ${PortErrorFragmentDoc}
  ${ProjectPortSelectionProgressFragmentDoc}
`;
export const ProjectQuotaPlanFragmentDoc = gql`
  fragment ProjectQuotaPlan on ProjectQuotaPlan {
    maxBlueprints
    maxDocuments
    maxLocales
    maxMembers
    maxPreviews
    maxViews
    maxWebhooks
    name
  }
`;
export const GetProjectQuotaPlanResponseFragmentDoc = gql`
  fragment GetProjectQuotaPlanResponse on GetProjectQuotaPlanResponse {
    projectId
    quotaPlan {
      ...ProjectQuotaPlan
    }
  }
  ${ProjectQuotaPlanFragmentDoc}
`;
export const GetReleaseByIdResponseFragmentDoc = gql`
  fragment GetReleaseByIdResponse on GetReleaseByIdResponse {
    release {
      ...ReleaseResponse
    }
  }
  ${ReleaseResponseFragmentDoc}
`;
export const GetRoleRuleByIdResponseFragmentDoc = gql`
  fragment GetRoleRuleByIDResponse on GetRoleRuleByIDResponse {
    roleRule {
      ...RoleRuleResponse
    }
  }
  ${RoleRuleResponseFragmentDoc}
`;
export const GetUnpublishedLinkedDocumentsResponseFragmentDoc = gql`
  fragment GetUnpublishedLinkedDocumentsResponse on GetUnpublishedLinkedDocumentsResponse {
    document {
      ...Document
    }
  }
  ${DocumentFragmentDoc}
`;
export const GetUsageOfBlueprintFieldResponseFragmentDoc = gql`
  fragment GetUsageOfBlueprintFieldResponse on GetUsageOfBlueprintFieldResponse {
    usageAmount
  }
`;
export const CaisyUserProfileFragmentDoc = gql`
  fragment CaisyUserProfile on CaisyUserProfile {
    displayName
    email
    id
    photoURL
  }
`;
export const SessionFragmentDoc = gql`
  fragment Session on Session {
    activeProjectId
    audience
    authTime
    email
    expires
    issuedAt
    issuer
    provider
    subject
    token
    uid
  }
`;
export const UserSettingsFragmentDoc = gql`
  fragment UserSettings on UserSettings {
    preferredUILanguage
    preferredUITheme
  }
`;
export const GetUserResponseFragmentDoc = gql`
  fragment GetUserResponse on GetUserResponse {
    profile {
      ...CaisyUserProfile
    }
    session {
      ...Session
    }
    settings {
      ...UserSettings
    }
  }
  ${CaisyUserProfileFragmentDoc}
  ${SessionFragmentDoc}
  ${UserSettingsFragmentDoc}
`;
export const GetUserRoleWithRoleRulesResponseFragmentDoc = gql`
  fragment GetUserRoleWithRoleRulesResponse on GetUserRoleWithRoleRulesResponse {
    description
    inheritedBySystemRole
    roleId
    roleRules {
      ...RoleRuleResponse
    }
    title
  }
  ${RoleRuleResponseFragmentDoc}
`;
export const LinkManyReleaseDocumentResponseFragmentDoc = gql`
  fragment LinkManyReleaseDocumentResponse on LinkManyReleaseDocumentResponse {
    successful
  }
`;
export const ListenOnDocumentResponseFragmentDoc = gql`
  fragment ListenOnDocumentResponse on ListenOnDocumentResponse {
    document {
      ...Document
    }
  }
  ${DocumentFragmentDoc}
`;
export const TokensFragmentDoc = gql`
  fragment Tokens on Tokens {
    accessToken
    refreshToken
  }
`;
export const LoginResultUserFragmentDoc = gql`
  fragment LoginResultUser on LoginResultUser {
    email
    id
    username
  }
`;
export const LoginResultFragmentDoc = gql`
  fragment LoginResult on LoginResult {
    sessionId
    tokens {
      ...Tokens
    }
    user {
      ...LoginResultUser
    }
  }
  ${TokensFragmentDoc}
  ${LoginResultUserFragmentDoc}
`;
export const MoveProjectResponseFragmentDoc = gql`
  fragment MoveProjectResponse on MoveProjectResponse {
    project {
      ...ProjectResponse
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const BlueprintFieldChangeSetFragmentDoc = gql`
  fragment BlueprintFieldChangeSet on BlueprintFieldChangeSet {
    sourceBlueprintFieldId
    targetBlueprintFieldId
  }
`;
export const BlueprintChangeSetFragmentDoc = gql`
  fragment BlueprintChangeSet on BlueprintChangeSet {
    fields {
      ...BlueprintFieldChangeSet
    }
    sourceBlueprintId
    targetBlueprintId
  }
  ${BlueprintFieldChangeSetFragmentDoc}
`;
export const PutManyBlueprintsErrorFragmentDoc = gql`
  fragment PutManyBlueprintsError on PutManyBlueprintsError {
    blueprintId
    errorMessage
  }
`;
export const PutManyBlueprintsResponseFragmentDoc = gql`
  fragment PutManyBlueprintsResponse on PutManyBlueprintsResponse {
    changeSet {
      ...BlueprintChangeSet
    }
    errors {
      ...PutManyBlueprintsError
    }
    successfulBlueprintIds
  }
  ${BlueprintChangeSetFragmentDoc}
  ${PutManyBlueprintsErrorFragmentDoc}
`;
export const DocumentFieldLocaleChangeSetFragmentDoc = gql`
  fragment DocumentFieldLocaleChangeSet on DocumentFieldLocaleChangeSet {
    sourceDocumentFieldLocaleId
    targetDocumentFieldLocaleId
  }
`;
export const PutManyDocumentFieldLocalesErrorFragmentDoc = gql`
  fragment PutManyDocumentFieldLocalesError on PutManyDocumentFieldLocalesError {
    documentFieldLocaleId
    errorMessage
  }
`;
export const PutManyDocumentFieldLocalesResponseFragmentDoc = gql`
  fragment PutManyDocumentFieldLocalesResponse on PutManyDocumentFieldLocalesResponse {
    changeSet {
      ...DocumentFieldLocaleChangeSet
    }
    errors {
      ...PutManyDocumentFieldLocalesError
    }
    successfulDocumentFieldLocaleIds
  }
  ${DocumentFieldLocaleChangeSetFragmentDoc}
  ${PutManyDocumentFieldLocalesErrorFragmentDoc}
`;
export const PutManyPreviewsErrorFragmentDoc = gql`
  fragment PutManyPreviewsError on PutManyPreviewsError {
    errorMessage
    previewId
  }
`;
export const PutManyPreviewsResponseFragmentDoc = gql`
  fragment PutManyPreviewsResponse on PutManyPreviewsResponse {
    errors {
      ...PutManyPreviewsError
    }
    successfulPreviewIds
  }
  ${PutManyPreviewsErrorFragmentDoc}
`;
export const PutManyTagsErrorFragmentDoc = gql`
  fragment PutManyTagsError on PutManyTagsError {
    errorMessage
    tagId
  }
`;
export const PutManyTagsResponseFragmentDoc = gql`
  fragment PutManyTagsResponse on PutManyTagsResponse {
    errors {
      ...PutManyTagsError
    }
    successfulTagIds
  }
  ${PutManyTagsErrorFragmentDoc}
`;
export const PutManyViewsErrorFragmentDoc = gql`
  fragment PutManyViewsError on PutManyViewsError {
    errorMessage
    viewId
  }
`;
export const PutManyViewsResponseFragmentDoc = gql`
  fragment PutManyViewsResponse on PutManyViewsResponse {
    errors {
      ...PutManyViewsError
    }
    successfulViewIds
  }
  ${PutManyViewsErrorFragmentDoc}
`;
export const PutManyWebhooksResponseFragmentDoc = gql`
  fragment PutManyWebhooksResponse on PutManyWebhooksResponse {
    webhooks {
      ...WebhookResponse
    }
  }
  ${WebhookResponseFragmentDoc}
`;
export const AccessTokenResponseFragmentDoc = gql`
  fragment AccessTokenResponse on AccessTokenResponse {
    createdAt
    id
    name
  }
`;
export const ReadUserAccessTokensResponseFragmentDoc = gql`
  fragment ReadUserAccessTokensResponse on ReadUserAccessTokensResponse {
    tokens {
      ...AccessTokenResponse
    }
  }
  ${AccessTokenResponseFragmentDoc}
`;
export const SetCompletedOnboardingEventsResponseFragmentDoc = gql`
  fragment SetCompletedOnboardingEventsResponse on SetCompletedOnboardingEventsResponse {
    eventCodes
  }
`;
export const SetPreferredThemeResponseFragmentDoc = gql`
  fragment SetPreferredThemeResponse on SetPreferredThemeResponse {
    preferredTheme
  }
`;
export const SetPreferredUiLanguageResponseFragmentDoc = gql`
  fragment SetPreferredUILanguageResponse on SetPreferredUILanguageResponse {
    preferredUiLanguage
  }
`;
export const UnlinkManyReleaseDocumentResponseFragmentDoc = gql`
  fragment UnlinkManyReleaseDocumentResponse on UnlinkManyReleaseDocumentResponse {
    successful
  }
`;
export const UpdateBlueprintResponseFragmentDoc = gql`
  fragment UpdateBlueprintResponse on UpdateBlueprintResponse {
    blueprint {
      ...BlueprintResponse
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const UpdateDocumentFieldLocaleResponseFragmentDoc = gql`
  fragment UpdateDocumentFieldLocaleResponse on UpdateDocumentFieldLocaleResponse {
    documentFieldLocale {
      ...DocumentFieldLocaleResponse
    }
    projectId
  }
  ${DocumentFieldLocaleResponseFragmentDoc}
`;
export const UpdateDocumentFieldResponseFragmentDoc = gql`
  fragment UpdateDocumentFieldResponse on UpdateDocumentFieldResponse {
    blueprintFieldId
    document {
      ...Document
    }
  }
  ${DocumentFragmentDoc}
`;
export const UpdateDocumentResponseFragmentDoc = gql`
  fragment UpdateDocumentResponse on UpdateDocumentResponse {
    document {
      ...Document
    }
  }
  ${DocumentFragmentDoc}
`;
export const UpdateEntrypointResponseFragmentDoc = gql`
  fragment UpdateEntrypointResponse on UpdateEntrypointResponse {
    entrypoint {
      ...EntrypointResponse
    }
  }
  ${EntrypointResponseFragmentDoc}
`;
export const UpdateGroupResponseFragmentDoc = gql`
  fragment UpdateGroupResponse on UpdateGroupResponse {
    group {
      ...GroupResponse
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const UpdateDocumentErrorFragmentDoc = gql`
  fragment UpdateDocumentError on UpdateDocumentError {
    documentId
    errorMessage
  }
`;
export const UpdateManyDocumentsResponseFragmentDoc = gql`
  fragment UpdateManyDocumentsResponse on UpdateManyDocumentsResponse {
    batchErrors {
      ...UpdateDocumentError
    }
    updatedDocumentIds
  }
  ${UpdateDocumentErrorFragmentDoc}
`;
export const UpdateOrganizationResponseFragmentDoc = gql`
  fragment UpdateOrganizationResponse on UpdateOrganizationResponse {
    organization {
      ...OrganizationResponse
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const UpdatePreferredUiLanguageResponseFragmentDoc = gql`
  fragment UpdatePreferredUILanguageResponse on UpdatePreferredUILanguageResponse {
    success
  }
`;
export const UpdatePreferredUiThemeResponseFragmentDoc = gql`
  fragment UpdatePreferredUIThemeResponse on UpdatePreferredUIThemeResponse {
    success
  }
`;
export const UpdatePreviewItemResponseFragmentDoc = gql`
  fragment UpdatePreviewItemResponse on UpdatePreviewItemResponse {
    previewItem {
      ...PreviewItemResponse
    }
  }
  ${PreviewItemResponseFragmentDoc}
`;
export const UpdatePreviewResponseFragmentDoc = gql`
  fragment UpdatePreviewResponse on UpdatePreviewResponse {
    preview {
      ...PreviewResponse
    }
  }
  ${PreviewResponseFragmentDoc}
`;
export const UpdateProjectResponseFragmentDoc = gql`
  fragment UpdateProjectResponse on UpdateProjectResponse {
    project {
      ...ProjectResponse
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const UpdateQuotaPlanResponseFragmentDoc = gql`
  fragment UpdateQuotaPlanResponse on UpdateQuotaPlanResponse {
    groupId
    organizationId
    projectId
    quotaPlan {
      ...ProjectQuotaPlan
    }
  }
  ${ProjectQuotaPlanFragmentDoc}
`;
export const UpdateReleaseResponseFragmentDoc = gql`
  fragment UpdateReleaseResponse on UpdateReleaseResponse {
    release {
      ...ReleaseResponse
    }
  }
  ${ReleaseResponseFragmentDoc}
`;
export const UpdateRoleRuleResponseFragmentDoc = gql`
  fragment UpdateRoleRuleResponse on UpdateRoleRuleResponse {
    roleRule {
      ...RoleRuleResponse
    }
  }
  ${RoleRuleResponseFragmentDoc}
`;
export const UpdateTagResponseFragmentDoc = gql`
  fragment UpdateTagResponse on UpdateTagResponse {
    tag {
      ...TagResponse
    }
  }
  ${TagResponseFragmentDoc}
`;
export const UpdateUserProfileResponseFragmentDoc = gql`
  fragment UpdateUserProfileResponse on UpdateUserProfileResponse {
    success
  }
`;
export const UpdateUserRoleResponseFragmentDoc = gql`
  fragment UpdateUserRoleResponse on UpdateUserRoleResponse {
    userRole {
      ...UserRoleResponse
    }
  }
  ${UserRoleResponseFragmentDoc}
`;
export const UpdateViewResponseFragmentDoc = gql`
  fragment UpdateViewResponse on UpdateViewResponse {
    view {
      ...ViewResponse
    }
  }
  ${ViewResponseFragmentDoc}
`;
export const UpdateWebhookResponseFragmentDoc = gql`
  fragment UpdateWebhookResponse on UpdateWebhookResponse {
    webhook {
      ...WebhookResponse
    }
  }
  ${WebhookResponseFragmentDoc}
`;
export const ValidateApiKeyResponseFragmentDoc = gql`
  fragment ValidateAPIKeyResponse on ValidateAPIKeyResponse {
    success
  }
`;
export const ValidateDocumentFieldResponseFragmentDoc = gql`
  fragment ValidateDocumentFieldResponse on ValidateDocumentFieldResponse {
    validation {
      ...Validation
    }
  }
  ${ValidationFragmentDoc}
`;
export const ValidateDocumentResponseFragmentDoc = gql`
  fragment ValidateDocumentResponse on ValidateDocumentResponse {
    validation {
      ...Validation
    }
  }
  ${ValidationFragmentDoc}
`;
export const ValidateDocumentErrorFragmentDoc = gql`
  fragment ValidateDocumentError on ValidateDocumentError {
    documentId
    errorMessage
  }
`;
export const DocumentValidationFragmentDoc = gql`
  fragment DocumentValidation on DocumentValidation {
    documentId
    validation {
      ...Validation
    }
  }
  ${ValidationFragmentDoc}
`;
export const ValidateManyDocumentsResponseFragmentDoc = gql`
  fragment ValidateManyDocumentsResponse on ValidateManyDocumentsResponse {
    batchErrors {
      ...ValidateDocumentError
    }
    documentsValidations {
      ...DocumentValidation
    }
  }
  ${ValidateDocumentErrorFragmentDoc}
  ${DocumentValidationFragmentDoc}
`;
export const ValidateReleaseResponseFragmentDoc = gql`
  fragment ValidateReleaseResponse on ValidateReleaseResponse {
    releaseId
    valid
    validationErrors {
      ...ReleaseValidationDocumentErrors
    }
  }
  ${ReleaseValidationDocumentErrorsFragmentDoc}
`;
export const AssignRoleDocument = gql`
  mutation AssignRole($input: AssignRoleRequestInput) {
    AssignRole(input: $input) {
      ...AssignRoleResponse
    }
  }
  ${AssignRoleResponseFragmentDoc}
`;
export const CheckBlueprintNameAvailableDocument = gql`
  mutation CheckBlueprintNameAvailable($input: CheckBlueprintNameAvailableRequest) {
    CheckBlueprintNameAvailable(input: $input) {
      ...CheckBlueprintNameAvailableResponse
    }
  }
  ${CheckBlueprintNameAvailableResponseFragmentDoc}
`;
export const CopyMemberFromProjectToProjectDocument = gql`
  mutation CopyMemberFromProjectToProject($input: CopyMemberFromProjectToProjectRequestInput) {
    CopyMemberFromProjectToProject(input: $input) {
      ...CopyMemberFromProjectToProjectResponse
    }
  }
  ${CopyMemberFromProjectToProjectResponseFragmentDoc}
`;
export const CreateApiKeyDocument = gql`
  mutation CreateApiKey($input: CreateAPIKeyRequestInput) {
    CreateApiKey(input: $input) {
      ...CreateAPIKeyResponse
    }
  }
  ${CreateApiKeyResponseFragmentDoc}
`;
export const CreateBlueprintDocument = gql`
  mutation CreateBlueprint($input: CreateBlueprintRequest) {
    CreateBlueprint(input: $input) {
      ...CreateBlueprintResponse
    }
  }
  ${CreateBlueprintResponseFragmentDoc}
`;
export const CreateDocumentDocument = gql`
  mutation CreateDocument($input: CreateDocumentRequestInput) {
    CreateDocument(input: $input) {
      ...CreateDocumentResponse
    }
  }
  ${CreateDocumentResponseFragmentDoc}
`;
export const CreateDocumentFieldLocaleDocument = gql`
  mutation CreateDocumentFieldLocale($input: CreateDocumentFieldLocaleRequestInput) {
    CreateDocumentFieldLocale(input: $input) {
      ...CreateDocumentFieldLocaleResponse
    }
  }
  ${CreateDocumentFieldLocaleResponseFragmentDoc}
`;
export const CreateGroupDocument = gql`
  mutation CreateGroup($input: CreateGroupRequestInput) {
    CreateGroup(input: $input) {
      ...CreateGroupResponse
    }
  }
  ${CreateGroupResponseFragmentDoc}
`;
export const CreateManyViewsDocument = gql`
  mutation CreateManyViews($input: CreateManyViewsRequestInput) {
    CreateManyViews(input: $input) {
      ...CreateManyViewsResponse
    }
  }
  ${CreateManyViewsResponseFragmentDoc}
`;
export const CreateOrganizationDocument = gql`
  mutation CreateOrganization($input: CreateOrganizationRequestInput) {
    CreateOrganization(input: $input) {
      ...CreateOrganizationResponse
    }
  }
  ${CreateOrganizationResponseFragmentDoc}
`;
export const CreatePreviewDocument = gql`
  mutation CreatePreview($input: CreatePreviewRequestInput) {
    CreatePreview(input: $input) {
      ...CreatePreviewResponse
    }
  }
  ${CreatePreviewResponseFragmentDoc}
`;
export const CreatePreviewItemDocument = gql`
  mutation CreatePreviewItem($input: CreatePreviewItemRequestInput) {
    CreatePreviewItem(input: $input) {
      ...CreatePreviewItemResponse
    }
  }
  ${CreatePreviewItemResponseFragmentDoc}
`;
export const CreateProjectDocument = gql`
  mutation CreateProject($input: CreateProjectRequestInput) {
    CreateProject(input: $input) {
      ...CreateProjectResponse
    }
  }
  ${CreateProjectResponseFragmentDoc}
`;
export const CreateReleaseDocument = gql`
  mutation CreateRelease($input: CreateReleaseRequestInput) {
    CreateRelease(input: $input) {
      ...CreateReleaseResponse
    }
  }
  ${CreateReleaseResponseFragmentDoc}
`;
export const CreateRoleRuleDocument = gql`
  mutation CreateRoleRule($input: CreateRoleRuleRequestInput) {
    CreateRoleRule(input: $input) {
      ...CreateRoleRuleResponse
    }
  }
  ${CreateRoleRuleResponseFragmentDoc}
`;
export const CreateTagDocument = gql`
  mutation CreateTag($input: CreateTagRequest) {
    CreateTag(input: $input) {
      ...CreateTagResponse
    }
  }
  ${CreateTagResponseFragmentDoc}
`;
export const CreateUserAccessTokenDocument = gql`
  mutation CreateUserAccessToken($input: CreateUserAccessTokenRequestInput) {
    CreateUserAccessToken(input: $input) {
      ...CreateUserAccessTokenResponse
    }
  }
  ${CreateUserAccessTokenResponseFragmentDoc}
`;
export const CreateUserRoleDocument = gql`
  mutation CreateUserRole($input: CreateUserRoleRequestInput) {
    CreateUserRole(input: $input) {
      ...CreateUserRoleResponse
    }
  }
  ${CreateUserRoleResponseFragmentDoc}
`;
export const CreateViewDocument = gql`
  mutation CreateView($input: CreateViewRequestInput) {
    CreateView(input: $input) {
      ...CreateViewResponse
    }
  }
  ${CreateViewResponseFragmentDoc}
`;
export const CreateViewPinDocument = gql`
  mutation CreateViewPin($input: CreateViewPinRequestInput) {
    CreateViewPin(input: $input) {
      ...CreateViewPinResponse
    }
  }
  ${CreateViewPinResponseFragmentDoc}
`;
export const CreateWebhookDocument = gql`
  mutation CreateWebhook($input: CreateWebhookRequestInput) {
    CreateWebhook(input: $input) {
      ...CreateWebhookResponse
    }
  }
  ${CreateWebhookResponseFragmentDoc}
`;
export const DeAssignRoleDocument = gql`
  mutation DeAssignRole($input: DeAssignRoleRequestInput) {
    DeAssignRole(input: $input) {
      ...DeAssignRoleResponse
    }
  }
  ${DeAssignRoleResponseFragmentDoc}
`;
export const DeleteApiKeyDocument = gql`
  mutation DeleteApiKey($input: DeleteAPIKeyRequestInput) {
    DeleteApiKey(input: $input) {
      ...DeleteAPIKeyResponse
    }
  }
  ${DeleteApiKeyResponseFragmentDoc}
`;
export const DeleteBlueprintDocument = gql`
  mutation DeleteBlueprint($input: DeleteBlueprintRequest) {
    DeleteBlueprint(input: $input) {
      ...DeleteBlueprintResponse
    }
  }
  ${DeleteBlueprintResponseFragmentDoc}
`;
export const DeleteDocumentDocument = gql`
  mutation DeleteDocument($input: DeleteDocumentRequestInput) {
    DeleteDocument(input: $input) {
      ...DeleteDocumentResponse
    }
  }
  ${DeleteDocumentResponseFragmentDoc}
`;
export const DeleteDocumentFieldLocaleDocument = gql`
  mutation DeleteDocumentFieldLocale($input: DeleteDocumentFieldLocaleRequestInput) {
    DeleteDocumentFieldLocale(input: $input) {
      ...DeleteDocumentFieldLocaleResponse
    }
  }
  ${DeleteDocumentFieldLocaleResponseFragmentDoc}
`;
export const DeleteEntrypointDocument = gql`
  mutation DeleteEntrypoint($input: DeleteEntrypointRequestInput) {
    DeleteEntrypoint(input: $input) {
      ...DeleteEntrypointResponse
    }
  }
  ${DeleteEntrypointResponseFragmentDoc}
`;
export const DeleteGroupDocument = gql`
  mutation DeleteGroup($input: DeleteGroupRequestInput) {
    DeleteGroup(input: $input) {
      ...DeleteGroupResponse
    }
  }
  ${DeleteGroupResponseFragmentDoc}
`;
export const DeleteManyDocumentsDocument = gql`
  mutation DeleteManyDocuments($input: DeleteManyDocumentsRequestInput) {
    DeleteManyDocuments(input: $input) {
      ...DeleteManyDocumentsResponse
    }
  }
  ${DeleteManyDocumentsResponseFragmentDoc}
`;
export const DeleteManyReleasesDocument = gql`
  mutation DeleteManyReleases($input: DeleteManyReleasesRequestInput) {
    DeleteManyReleases(input: $input) {
      ...DeleteManyReleasesResponse
    }
  }
  ${DeleteManyReleasesResponseFragmentDoc}
`;
export const DeleteOrganizationDocument = gql`
  mutation DeleteOrganization($input: DeleteOrganizationRequestInput) {
    DeleteOrganization(input: $input) {
      ...DeleteOrganizationResponse
    }
  }
  ${DeleteOrganizationResponseFragmentDoc}
`;
export const DeletePreviewDocument = gql`
  mutation DeletePreview($input: DeletePreviewRequestInput) {
    DeletePreview(input: $input) {
      ...DeletePreviewResponse
    }
  }
  ${DeletePreviewResponseFragmentDoc}
`;
export const DeletePreviewItemDocument = gql`
  mutation DeletePreviewItem($input: DeletePreviewItemRequestInput) {
    DeletePreviewItem(input: $input) {
      ...DeletePreviewItemResponse
    }
  }
  ${DeletePreviewItemResponseFragmentDoc}
`;
export const DeleteProjectDocument = gql`
  mutation DeleteProject($input: DeleteProjectRequestInput) {
    DeleteProject(input: $input) {
      ...DeleteProjectResponse
    }
  }
  ${DeleteProjectResponseFragmentDoc}
`;
export const DeleteRoleRuleDocument = gql`
  mutation DeleteRoleRule($input: DeleteRoleRuleRequestInput) {
    DeleteRoleRule(input: $input) {
      ...DeleteRoleRuleResponse
    }
  }
  ${DeleteRoleRuleResponseFragmentDoc}
`;
export const DeleteTagDocument = gql`
  mutation DeleteTag($input: DeleteTagRequest) {
    DeleteTag(input: $input) {
      ...DeleteTagResponse
    }
  }
  ${DeleteTagResponseFragmentDoc}
`;
export const DeleteUserAccessTokenDocument = gql`
  mutation DeleteUserAccessToken($input: DeleteUserAccessTokenRequestInput) {
    DeleteUserAccessToken(input: $input) {
      ...DeleteUserAccessTokenResponse
    }
  }
  ${DeleteUserAccessTokenResponseFragmentDoc}
`;
export const DeleteUserRoleDocument = gql`
  mutation DeleteUserRole($input: DeleteUserRoleRequestInput) {
    DeleteUserRole(input: $input) {
      ...DeleteUserRoleResponse
    }
  }
  ${DeleteUserRoleResponseFragmentDoc}
`;
export const DeleteViewDocument = gql`
  mutation DeleteView($input: DeleteViewRequestInput) {
    DeleteView(input: $input) {
      ...DeleteViewResponse
    }
  }
  ${DeleteViewResponseFragmentDoc}
`;
export const DeleteViewPinDocument = gql`
  mutation DeleteViewPin($input: DeleteViewPinRequestInput) {
    DeleteViewPin(input: $input) {
      ...DeleteViewPinResponse
    }
  }
  ${DeleteViewPinResponseFragmentDoc}
`;
export const DeleteWebhookDocument = gql`
  mutation DeleteWebhook($input: DeleteWebhookRequestInput) {
    DeleteWebhook(input: $input) {
      ...DeleteWebhookResponse
    }
  }
  ${DeleteWebhookResponseFragmentDoc}
`;
export const DuplicateDocumentDocument = gql`
  mutation DuplicateDocument($input: DuplicateDocumentRequestInput) {
    DuplicateDocument(input: $input) {
      ...DuplicateDocumentResponse
    }
  }
  ${DuplicateDocumentResponseFragmentDoc}
`;
export const DuplicateToProjectDocument = gql`
  mutation DuplicateToProject($input: DuplicateToProjectRequestInput) {
    DuplicateToProject(input: $input) {
      ...DuplicateToProjectResponse
    }
  }
  ${DuplicateToProjectResponseFragmentDoc}
`;
export const LinkManyReleaseDocumentDocument = gql`
  mutation LinkManyReleaseDocument($input: LinkManyReleaseDocumentRequestInput) {
    LinkManyReleaseDocument(input: $input) {
      ...LinkManyReleaseDocumentResponse
    }
  }
  ${LinkManyReleaseDocumentResponseFragmentDoc}
`;
export const MoveProjectDocument = gql`
  mutation MoveProject($input: MoveProjectRequestInput) {
    MoveProject(input: $input) {
      ...MoveProjectResponse
    }
  }
  ${MoveProjectResponseFragmentDoc}
`;
export const PutManyBlueprintsDocument = gql`
  mutation PutManyBlueprints($input: PutManyBlueprintsRequestInput) {
    PutManyBlueprints(input: $input) {
      ...PutManyBlueprintsResponse
    }
  }
  ${PutManyBlueprintsResponseFragmentDoc}
`;
export const PutManyDocumentFieldLocalesDocument = gql`
  mutation PutManyDocumentFieldLocales($input: PutManyDocumentFieldLocalesRequestInput) {
    PutManyDocumentFieldLocales(input: $input) {
      ...PutManyDocumentFieldLocalesResponse
    }
  }
  ${PutManyDocumentFieldLocalesResponseFragmentDoc}
`;
export const PutManyPreviewsDocument = gql`
  mutation PutManyPreviews($input: PutManyPreviewsRequestInput) {
    PutManyPreviews(input: $input) {
      ...PutManyPreviewsResponse
    }
  }
  ${PutManyPreviewsResponseFragmentDoc}
`;
export const PutManyTagsDocument = gql`
  mutation PutManyTags($input: PutManyTagsRequestInput) {
    PutManyTags(input: $input) {
      ...PutManyTagsResponse
    }
  }
  ${PutManyTagsResponseFragmentDoc}
`;
export const PutManyViewsDocument = gql`
  mutation PutManyViews($input: PutManyViewsRequestInput) {
    PutManyViews(input: $input) {
      ...PutManyViewsResponse
    }
  }
  ${PutManyViewsResponseFragmentDoc}
`;
export const PutManyWebhooksDocument = gql`
  mutation PutManyWebhooks($input: PutManyWebhooksRequestInput) {
    PutManyWebhooks(input: $input) {
      ...PutManyWebhooksResponse
    }
  }
  ${PutManyWebhooksResponseFragmentDoc}
`;
export const SetCompletedOnboardingEventsDocument = gql`
  mutation SetCompletedOnboardingEvents($input: SetCompletedOnboardingEventsRequest) {
    SetCompletedOnboardingEvents(input: $input) {
      ...SetCompletedOnboardingEventsResponse
    }
  }
  ${SetCompletedOnboardingEventsResponseFragmentDoc}
`;
export const SetPreferredThemeDocument = gql`
  mutation SetPreferredTheme($input: SetPreferredThemeRequest) {
    SetPreferredTheme(input: $input) {
      ...SetPreferredThemeResponse
    }
  }
  ${SetPreferredThemeResponseFragmentDoc}
`;
export const SetPreferredUiLanguageDocument = gql`
  mutation SetPreferredUiLanguage($input: SetPreferredUILanguageRequest) {
    SetPreferredUiLanguage(input: $input) {
      ...SetPreferredUILanguageResponse
    }
  }
  ${SetPreferredUiLanguageResponseFragmentDoc}
`;
export const UnlinkManyReleaseDocumentDocument = gql`
  mutation UnlinkManyReleaseDocument($input: UnlinkManyReleaseDocumentRequestInput) {
    UnlinkManyReleaseDocument(input: $input) {
      ...UnlinkManyReleaseDocumentResponse
    }
  }
  ${UnlinkManyReleaseDocumentResponseFragmentDoc}
`;
export const UpdateBlueprintDocument = gql`
  mutation UpdateBlueprint($input: UpdateBlueprintRequest) {
    UpdateBlueprint(input: $input) {
      ...UpdateBlueprintResponse
    }
  }
  ${UpdateBlueprintResponseFragmentDoc}
`;
export const UpdateDocumentDocument = gql`
  mutation UpdateDocument($input: UpdateDocumentRequestInput) {
    UpdateDocument(input: $input) {
      ...UpdateDocumentResponse
    }
  }
  ${UpdateDocumentResponseFragmentDoc}
`;
export const UpdateDocumentFieldDocument = gql`
  mutation UpdateDocumentField($input: UpdateDocumentFieldRequestInput) {
    UpdateDocumentField(input: $input) {
      ...UpdateDocumentFieldResponse
    }
  }
  ${UpdateDocumentFieldResponseFragmentDoc}
`;
export const UpdateDocumentFieldLocaleDocument = gql`
  mutation UpdateDocumentFieldLocale($input: UpdateDocumentFieldLocaleRequestInput) {
    UpdateDocumentFieldLocale(input: $input) {
      ...UpdateDocumentFieldLocaleResponse
    }
  }
  ${UpdateDocumentFieldLocaleResponseFragmentDoc}
`;
export const UpdateEntrypointDocument = gql`
  mutation UpdateEntrypoint($input: UpdateEntrypointRequestInput) {
    UpdateEntrypoint(input: $input) {
      ...UpdateEntrypointResponse
    }
  }
  ${UpdateEntrypointResponseFragmentDoc}
`;
export const UpdateGroupDocument = gql`
  mutation UpdateGroup($input: UpdateGroupRequestInput) {
    UpdateGroup(input: $input) {
      ...UpdateGroupResponse
    }
  }
  ${UpdateGroupResponseFragmentDoc}
`;
export const UpdateManyDocumentsDocument = gql`
  mutation UpdateManyDocuments($input: UpdateManyDocumentRequestInput) {
    UpdateManyDocuments(input: $input) {
      ...UpdateManyDocumentsResponse
    }
  }
  ${UpdateManyDocumentsResponseFragmentDoc}
`;
export const UpdateOrganizationDocument = gql`
  mutation UpdateOrganization($input: UpdateOrganizationRequestInput) {
    UpdateOrganization(input: $input) {
      ...UpdateOrganizationResponse
    }
  }
  ${UpdateOrganizationResponseFragmentDoc}
`;
export const UpdatePreviewDocument = gql`
  mutation UpdatePreview($input: UpdatePreviewRequestInput) {
    UpdatePreview(input: $input) {
      ...UpdatePreviewResponse
    }
  }
  ${UpdatePreviewResponseFragmentDoc}
`;
export const UpdatePreviewItemDocument = gql`
  mutation UpdatePreviewItem($input: UpdatePreviewItemRequestInput) {
    UpdatePreviewItem(input: $input) {
      ...UpdatePreviewItemResponse
    }
  }
  ${UpdatePreviewItemResponseFragmentDoc}
`;
export const UpdateProjectDocument = gql`
  mutation UpdateProject($input: UpdateProjectRequestInput) {
    UpdateProject(input: $input) {
      ...UpdateProjectResponse
    }
  }
  ${UpdateProjectResponseFragmentDoc}
`;
export const UpdateReleaseDocument = gql`
  mutation UpdateRelease($input: UpdateReleaseRequestInput) {
    UpdateRelease(input: $input) {
      ...UpdateReleaseResponse
    }
  }
  ${UpdateReleaseResponseFragmentDoc}
`;
export const UpdateRoleRuleDocument = gql`
  mutation UpdateRoleRule($input: UpdateRoleRuleRequestInput) {
    UpdateRoleRule(input: $input) {
      ...UpdateRoleRuleResponse
    }
  }
  ${UpdateRoleRuleResponseFragmentDoc}
`;
export const UpdateTagDocument = gql`
  mutation UpdateTag($input: UpdateTagRequest) {
    UpdateTag(input: $input) {
      ...UpdateTagResponse
    }
  }
  ${UpdateTagResponseFragmentDoc}
`;
export const UpdateUserProfileRequestDocument = gql`
  mutation UpdateUserProfileRequest($input: UpdateUserProfileRequestInput!) {
    UpdateUserProfileRequest(input: $input) {
      ...UpdateUserProfileResponse
    }
  }
  ${UpdateUserProfileResponseFragmentDoc}
`;
export const UpdateUserRoleDocument = gql`
  mutation UpdateUserRole($input: UpdateUserRoleRequestInput) {
    UpdateUserRole(input: $input) {
      ...UpdateUserRoleResponse
    }
  }
  ${UpdateUserRoleResponseFragmentDoc}
`;
export const UpdateViewDocument = gql`
  mutation UpdateView($input: UpdateViewRequestInput) {
    UpdateView(input: $input) {
      ...UpdateViewResponse
    }
  }
  ${UpdateViewResponseFragmentDoc}
`;
export const UpdateWebhookDocument = gql`
  mutation UpdateWebhook($input: UpdateWebhookRequestInput) {
    UpdateWebhook(input: $input) {
      ...UpdateWebhookResponse
    }
  }
  ${UpdateWebhookResponseFragmentDoc}
`;
export const ValidateDocumentDocument = gql`
  mutation ValidateDocument($input: ValidateDocumentRequestInput) {
    ValidateDocument(input: $input) {
      ...ValidateDocumentResponse
    }
  }
  ${ValidateDocumentResponseFragmentDoc}
`;
export const ValidateDocumentFieldDocument = gql`
  mutation ValidateDocumentField($input: ValidateDocumentFieldRequestInput) {
    ValidateDocumentField(input: $input) {
      ...ValidateDocumentFieldResponse
    }
  }
  ${ValidateDocumentFieldResponseFragmentDoc}
`;
export const ValidateManyDocumentsDocument = gql`
  mutation ValidateManyDocuments($input: ValidateManyDocumentsRequestInput) {
    ValidateManyDocuments(input: $input) {
      ...ValidateManyDocumentsResponse
    }
  }
  ${ValidateManyDocumentsResponseFragmentDoc}
`;
export const ValidateReleaseDocument = gql`
  mutation ValidateRelease($input: ValidateReleaseRequestInput) {
    ValidateRelease(input: $input) {
      ...ValidateReleaseResponse
    }
  }
  ${ValidateReleaseResponseFragmentDoc}
`;
export const AuthenticateDocument = gql`
  mutation authenticate($params: AuthenticateParamsInput!, $serviceName: String!) {
    authenticate(params: $params, serviceName: $serviceName) {
      ...LoginResult
    }
  }
  ${LoginResultFragmentDoc}
`;
export const CreateCaisyUserDocument = gql`
  mutation createCaisyUser(
    $email: String!
    $password: String
    $phoneNumber: String
    $profile: CaisyUserProfileInput
    $provider: String
    $providerUserId: String
    $username: String
  ) {
    createCaisyUser(
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      profile: $profile
      provider: $provider
      providerUserId: $providerUserId
      username: $username
    ) {
      ...CreateCaisyUserResult
    }
  }
  ${CreateCaisyUserResultFragmentDoc}
`;
export const UpdatePreferredUiLanguageDocument = gql`
  mutation updatePreferredUILanguage($input: UpdatePreferredUILanguageRequest!) {
    updatePreferredUILanguage(input: $input) {
      ...UpdatePreferredUILanguageResponse
    }
  }
  ${UpdatePreferredUiLanguageResponseFragmentDoc}
`;
export const UpdatePreferredUiThemeDocument = gql`
  mutation updatePreferredUITheme($input: UpdatePreferredUIThemeRequest!) {
    updatePreferredUITheme(input: $input) {
      ...UpdatePreferredUIThemeResponse
    }
  }
  ${UpdatePreferredUiThemeResponseFragmentDoc}
`;
export const GetAllCompletedOnboardingEventsDocument = gql`
  query GetAllCompletedOnboardingEvents {
    GetAllCompletedOnboardingEvents {
      ...GetAllCompletedOnboardingEventsResponse
    }
  }
  ${GetAllCompletedOnboardingEventsResponseFragmentDoc}
`;
export const GetAllDocumentFieldLocaleDocument = gql`
  query GetAllDocumentFieldLocale($input: GetAllDocumentFieldLocaleRequestInput) {
    GetAllDocumentFieldLocale(input: $input) {
      ...GetAllDocumentFieldLocaleResponse
    }
  }
  ${GetAllDocumentFieldLocaleResponseFragmentDoc}
`;
export const GetAllDocumentSnapshotDocument = gql`
  query GetAllDocumentSnapshot($input: GetAllDocumentSnapshotRequestInput) {
    GetAllDocumentSnapshot(input: $input) {
      ...GetAllDocumentSnapshotResponse
    }
  }
  ${GetAllDocumentSnapshotResponseFragmentDoc}
`;
export const GetAllDocumentStatusDocument = gql`
  query GetAllDocumentStatus($input: GetAllDocumentStatusRequestInput) {
    GetAllDocumentStatus(input: $input) {
      ...GetAllDocumentStatusResponse
    }
  }
  ${GetAllDocumentStatusResponseFragmentDoc}
`;
export const GetAllWebhooksDocument = gql`
  query GetAllWebhooks($input: GetAllWebhooksRequestInput) {
    GetAllWebhooks(input: $input) {
      ...GetAllWebhooksResponse
    }
  }
  ${GetAllWebhooksResponseFragmentDoc}
`;
export const GetAmountDocument = gql`
  query GetAmount($input: GetAmountRequestInput) {
    GetAmount(input: $input) {
      ...GetAmountResponse
    }
  }
  ${GetAmountResponseFragmentDoc}
`;
export const GetBlueprintByIdDocument = gql`
  query GetBlueprintById($input: GetBlueprintByIDRequest) {
    GetBlueprintById(input: $input) {
      ...GetBlueprintByIDResponse
    }
  }
  ${GetBlueprintByIdResponseFragmentDoc}
`;
export const GetBlueprintById_BlueprintDocument = gql`
  query GetBlueprintById_blueprint($input: GetBlueprintByIDRequest) {
    GetBlueprintById(input: $input) {
      blueprint {
        ...BlueprintResponse
      }
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const GetBlueprintByNameDocument = gql`
  query GetBlueprintByName($input: GetBlueprintByNameRequest) {
    GetBlueprintByName(input: $input) {
      ...GetBlueprintByNameResponse
    }
  }
  ${GetBlueprintByNameResponseFragmentDoc}
`;
export const GetBlueprintByName_BlueprintDocument = gql`
  query GetBlueprintByName_blueprint($input: GetBlueprintByNameRequest) {
    GetBlueprintByName(input: $input) {
      blueprint {
        ...BlueprintResponse
      }
    }
  }
  ${BlueprintResponseFragmentDoc}
`;
export const GetCountsDocument = gql`
  query GetCounts($input: GetCountsRequestInput) {
    GetCounts(input: $input) {
      ...GetCountsResponse
    }
  }
  ${GetCountsResponseFragmentDoc}
`;
export const GetDocumentByIdDocument = gql`
  query GetDocumentById($input: GetDocumentByIdRequestInput) {
    GetDocumentById(input: $input) {
      ...GetDocumentByIdResponse
    }
  }
  ${GetDocumentByIdResponseFragmentDoc}
`;
export const GetDocumentById_DocumentDocument = gql`
  query GetDocumentById_document($input: GetDocumentByIdRequestInput) {
    GetDocumentById(input: $input) {
      document {
        ...DocumentWithFieldsResponse
      }
    }
  }
  ${DocumentWithFieldsResponseFragmentDoc}
`;
export const GetDocumentCountsByBlueprintsDocument = gql`
  query GetDocumentCountsByBlueprints($input: GetDocumentCountsByBlueprintsRequestInput) {
    GetDocumentCountsByBlueprints(input: $input) {
      ...GetDocumentCountsByBlueprintsResponse
    }
  }
  ${GetDocumentCountsByBlueprintsResponseFragmentDoc}
`;
export const GetDocumentSnapshotDocument = gql`
  query GetDocumentSnapshot($input: GetDocumentSnapshotRequestInput) {
    GetDocumentSnapshot(input: $input) {
      ...GetDocumentSnapshotResponse
    }
  }
  ${GetDocumentSnapshotResponseFragmentDoc}
`;
export const GetDocumentSnapshot_DocumentDocument = gql`
  query GetDocumentSnapshot_document($input: GetDocumentSnapshotRequestInput) {
    GetDocumentSnapshot(input: $input) {
      document {
        ...DocumentWithFieldsResponse
      }
    }
  }
  ${DocumentWithFieldsResponseFragmentDoc}
`;
export const GetEntrypointByDomainDocument = gql`
  query GetEntrypointByDomain($input: GetEntrypointByDomainRequestInput) {
    GetEntrypointByDomain(input: $input) {
      ...GetEntrypointByDomainResponse
    }
  }
  ${GetEntrypointByDomainResponseFragmentDoc}
`;
export const GetEntrypointByDomain_EntrypointDocument = gql`
  query GetEntrypointByDomain_entrypoint($input: GetEntrypointByDomainRequestInput) {
    GetEntrypointByDomain(input: $input) {
      entrypoint {
        ...EntrypointResponse
      }
    }
  }
  ${EntrypointResponseFragmentDoc}
`;
export const GetEntrypointByScopeDocument = gql`
  query GetEntrypointByScope($input: GetEntrypointByScopeRequestInput) {
    GetEntrypointByScope(input: $input) {
      ...GetEntrypointByScopeResponse
    }
  }
  ${GetEntrypointByScopeResponseFragmentDoc}
`;
export const GetEntrypointByScope_EntrypointDocument = gql`
  query GetEntrypointByScope_entrypoint($input: GetEntrypointByScopeRequestInput) {
    GetEntrypointByScope(input: $input) {
      entrypoint {
        ...EntrypointResponse
      }
    }
  }
  ${EntrypointResponseFragmentDoc}
`;
export const GetGroupByIdDocument = gql`
  query GetGroupByID($input: GetGroupByIDRequestInput) {
    GetGroupByID(input: $input) {
      ...GetGroupByIDResponse
    }
  }
  ${GetGroupByIdResponseFragmentDoc}
`;
export const GetGroupById_GroupDocument = gql`
  query GetGroupByID_group($input: GetGroupByIDRequestInput) {
    GetGroupByID(input: $input) {
      group {
        ...GroupResponse
      }
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const GetGroupById_Group_RoleByUserDocument = gql`
  query GetGroupByID_group_roleByUser($input: GetGroupByIDRequestInput) {
    GetGroupByID(input: $input) {
      group {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetGroupByIdWithInheritanceDocument = gql`
  query GetGroupByIDWithInheritance($input: GetGroupByIDWithInheritanceRequestInput) {
    GetGroupByIDWithInheritance(input: $input) {
      ...GetGroupByIDWithInheritanceResponse
    }
  }
  ${GetGroupByIdWithInheritanceResponseFragmentDoc}
`;
export const GetGroupByIdWithInheritance_GroupDocument = gql`
  query GetGroupByIDWithInheritance_group($input: GetGroupByIDWithInheritanceRequestInput) {
    GetGroupByIDWithInheritance(input: $input) {
      group {
        ...GroupResponse
      }
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const GetGroupByIdWithInheritance_Group_RoleByUserDocument = gql`
  query GetGroupByIDWithInheritance_group_roleByUser($input: GetGroupByIDWithInheritanceRequestInput) {
    GetGroupByIDWithInheritance(input: $input) {
      group {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetGroupByIdWithInheritance_OrganizationDocument = gql`
  query GetGroupByIDWithInheritance_organization($input: GetGroupByIDWithInheritanceRequestInput) {
    GetGroupByIDWithInheritance(input: $input) {
      organization {
        ...OrganizationResponse
      }
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const GetGroupByIdWithInheritance_Organization_RoleByUserDocument = gql`
  query GetGroupByIDWithInheritance_organization_roleByUser($input: GetGroupByIDWithInheritanceRequestInput) {
    GetGroupByIDWithInheritance(input: $input) {
      organization {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetGroupMembersDocument = gql`
  query GetGroupMembers($input: GetGroupMembersRequestInput) {
    GetGroupMembers(input: $input) {
      ...GetGroupMembersResponse
    }
  }
  ${GetGroupMembersResponseFragmentDoc}
`;
export const GetGroupMembers_ConnectionDocument = gql`
  query GetGroupMembers_connection($input: GetGroupMembersRequestInput) {
    GetGroupMembers(input: $input) {
      connection {
        ...MemberConnection
      }
    }
  }
  ${MemberConnectionFragmentDoc}
`;
export const GetGroupQuotaPlanDocument = gql`
  query GetGroupQuotaPlan($input: GetGroupQuotaPlanRequestInput) {
    GetGroupQuotaPlan(input: $input) {
      ...GetGroupQuotaPlanResponse
    }
  }
  ${GetGroupQuotaPlanResponseFragmentDoc}
`;
export const GetGroupQuotaPlan_QuotaPlanDocument = gql`
  query GetGroupQuotaPlan_quotaPlan($input: GetGroupQuotaPlanRequestInput) {
    GetGroupQuotaPlan(input: $input) {
      quotaPlan {
        ...GroupQuotaPlan
      }
    }
  }
  ${GroupQuotaPlanFragmentDoc}
`;
export const GetManyApiKeyDocument = gql`
  query GetManyApiKey($input: GetManyAPIKeyRequestInput) {
    GetManyApiKey(input: $input) {
      ...GetManyAPIKeyResponse
    }
  }
  ${GetManyApiKeyResponseFragmentDoc}
`;
export const GetManyAuditEventsDocument = gql`
  query GetManyAuditEvents($input: GetManyAuditEventsRequestInput) {
    GetManyAuditEvents(input: $input) {
      ...GetManyAuditEventsResponse
    }
  }
  ${GetManyAuditEventsResponseFragmentDoc}
`;
export const GetManyAuditEvents_ConnectionDocument = gql`
  query GetManyAuditEvents_connection($input: GetManyAuditEventsRequestInput) {
    GetManyAuditEvents(input: $input) {
      connection {
        ...AuditEventConnection
      }
    }
  }
  ${AuditEventConnectionFragmentDoc}
`;
export const GetManyBlueprintsDocument = gql`
  query GetManyBlueprints($input: GetManyBlueprintsRequest) {
    GetManyBlueprints(input: $input) {
      ...GetManyBlueprintsResponse
    }
  }
  ${GetManyBlueprintsResponseFragmentDoc}
`;
export const GetManyBlueprints_ConnectionDocument = gql`
  query GetManyBlueprints_connection($input: GetManyBlueprintsRequest) {
    GetManyBlueprints(input: $input) {
      connection {
        ...BlueprintResponseConnection
      }
    }
  }
  ${BlueprintResponseConnectionFragmentDoc}
`;
export const GetManyDocumentFieldsByDocumentIdDocument = gql`
  query GetManyDocumentFieldsByDocumentId($input: GetManyDocumentFieldsByDocumentIdRequestInput) {
    GetManyDocumentFieldsByDocumentId(input: $input) {
      ...GetManyDocumentFieldsByDocumentIdResponse
    }
  }
  ${GetManyDocumentFieldsByDocumentIdResponseFragmentDoc}
`;
export const GetManyDocumentFieldsByFieldIdsDocument = gql`
  query GetManyDocumentFieldsByFieldIds($input: GetManyDocumentFieldsByFieldIdsRequestInput) {
    GetManyDocumentFieldsByFieldIds(input: $input) {
      ...GetManyDocumentFieldsByFieldIdsResponse
    }
  }
  ${GetManyDocumentFieldsByFieldIdsResponseFragmentDoc}
`;
export const GetManyDocumentsDocument = gql`
  query GetManyDocuments($input: GetManyDocumentsRequestInput) {
    GetManyDocuments(input: $input) {
      ...GetManyDocumentsResponse
    }
  }
  ${GetManyDocumentsResponseFragmentDoc}
`;
export const GetManyDocuments_ConnectionDocument = gql`
  query GetManyDocuments_connection($input: GetManyDocumentsRequestInput) {
    GetManyDocuments(input: $input) {
      connection {
        ...DocumentResponseConnection
      }
    }
  }
  ${DocumentResponseConnectionFragmentDoc}
`;
export const GetManyDocumentsByIdsDocument = gql`
  query GetManyDocumentsByIds($input: GetManyDocumentsByIdsRequestInput) {
    GetManyDocumentsByIds(input: $input) {
      ...GetManyDocumentsByIdsResponse
    }
  }
  ${GetManyDocumentsByIdsResponseFragmentDoc}
`;
export const GetManyGroupsByUserIdDocument = gql`
  query GetManyGroupsByUserID($input: GetManyGroupsByUserIDRequestInput) {
    GetManyGroupsByUserID(input: $input) {
      ...GetManyGroupsByUserIDResponse
    }
  }
  ${GetManyGroupsByUserIdResponseFragmentDoc}
`;
export const GetManyGroupsByUserId_ConnectionDocument = gql`
  query GetManyGroupsByUserID_connection($input: GetManyGroupsByUserIDRequestInput) {
    GetManyGroupsByUserID(input: $input) {
      connection {
        ...GroupResponseConnection
      }
    }
  }
  ${GroupResponseConnectionFragmentDoc}
`;
export const GetManyOrganizationsByUserIdDocument = gql`
  query GetManyOrganizationsByUserID($input: GetManyOrganizationsByUserIDRequestInput) {
    GetManyOrganizationsByUserID(input: $input) {
      ...GetManyOrganizationsByUserIDResponse
    }
  }
  ${GetManyOrganizationsByUserIdResponseFragmentDoc}
`;
export const GetManyOrganizationsByUserId_ConnectionDocument = gql`
  query GetManyOrganizationsByUserID_connection($input: GetManyOrganizationsByUserIDRequestInput) {
    GetManyOrganizationsByUserID(input: $input) {
      connection {
        ...OrganizationResponseConnection
      }
    }
  }
  ${OrganizationResponseConnectionFragmentDoc}
`;
export const GetManyPreviewsDocument = gql`
  query GetManyPreviews($input: GetManyPreviewsRequestInput) {
    GetManyPreviews(input: $input) {
      ...GetManyPreviewsResponse
    }
  }
  ${GetManyPreviewsResponseFragmentDoc}
`;
export const GetManyPreviews_ConnectionDocument = gql`
  query GetManyPreviews_connection($input: GetManyPreviewsRequestInput) {
    GetManyPreviews(input: $input) {
      connection {
        ...PreviewConnection
      }
    }
  }
  ${PreviewConnectionFragmentDoc}
`;
export const GetManyProjectsByUserIdDocument = gql`
  query GetManyProjectsByUserID($input: GetManyProjectsByUserIDRequestInput) {
    GetManyProjectsByUserID(input: $input) {
      ...GetManyProjectsByUserIDResponse
    }
  }
  ${GetManyProjectsByUserIdResponseFragmentDoc}
`;
export const GetManyProjectsByUserId_ConnectionDocument = gql`
  query GetManyProjectsByUserID_connection($input: GetManyProjectsByUserIDRequestInput) {
    GetManyProjectsByUserID(input: $input) {
      connection {
        ...ProjectResponseConnection
      }
    }
  }
  ${ProjectResponseConnectionFragmentDoc}
`;
export const GetManyReleasesByProjectIdDocument = gql`
  query GetManyReleasesByProjectId($input: GetManyReleasesByProjectIdRequestInput) {
    GetManyReleasesByProjectId(input: $input) {
      ...GetManyReleasesByProjectIdResponse
    }
  }
  ${GetManyReleasesByProjectIdResponseFragmentDoc}
`;
export const GetManyRoleRulesByRoleIdDocument = gql`
  query GetManyRoleRulesByRoleID($input: GetManyRoleRulesByRoleIDRequestInput) {
    GetManyRoleRulesByRoleID(input: $input) {
      ...GetManyRoleRulesByRoleIDResponse
    }
  }
  ${GetManyRoleRulesByRoleIdResponseFragmentDoc}
`;
export const GetManyTagsDocument = gql`
  query GetManyTags($input: GetManyTagsRequest) {
    GetManyTags(input: $input) {
      ...GetManyTagsResponse
    }
  }
  ${GetManyTagsResponseFragmentDoc}
`;
export const GetManyTags_ConnectionDocument = gql`
  query GetManyTags_connection($input: GetManyTagsRequest) {
    GetManyTags(input: $input) {
      connection {
        ...TagConnection
      }
    }
  }
  ${TagConnectionFragmentDoc}
`;
export const GetManyUserRolesDocument = gql`
  query GetManyUserRoles($input: GetManyUserRolesRequestInput) {
    GetManyUserRoles(input: $input) {
      ...GetManyUserRolesResponse
    }
  }
  ${GetManyUserRolesResponseFragmentDoc}
`;
export const GetManyViewsDocument = gql`
  query GetManyViews($input: GetManyViewsRequestInput) {
    GetManyViews(input: $input) {
      ...GetManyViewsResponse
    }
  }
  ${GetManyViewsResponseFragmentDoc}
`;
export const GetManyWebhookCallsDocument = gql`
  query GetManyWebhookCalls($input: GetManyWebhookCallsRequestInput) {
    GetManyWebhookCalls(input: $input) {
      ...GetManyWebhookCallsResponse
    }
  }
  ${GetManyWebhookCallsResponseFragmentDoc}
`;
export const GetManyWebhookCalls_ConnectionDocument = gql`
  query GetManyWebhookCalls_connection($input: GetManyWebhookCallsRequestInput) {
    GetManyWebhookCalls(input: $input) {
      connection {
        ...WebhookCallConnection
      }
    }
  }
  ${WebhookCallConnectionFragmentDoc}
`;
export const GetOrganizationByIdDocument = gql`
  query GetOrganizationByID($input: GetOrganizationByIDRequestInput) {
    GetOrganizationByID(input: $input) {
      ...GetOrganizationByIDResponse
    }
  }
  ${GetOrganizationByIdResponseFragmentDoc}
`;
export const GetOrganizationById_OrganizationDocument = gql`
  query GetOrganizationByID_organization($input: GetOrganizationByIDRequestInput) {
    GetOrganizationByID(input: $input) {
      organization {
        ...OrganizationResponse
      }
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const GetOrganizationById_Organization_RoleByUserDocument = gql`
  query GetOrganizationByID_organization_roleByUser($input: GetOrganizationByIDRequestInput) {
    GetOrganizationByID(input: $input) {
      organization {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetOrganizationMembersDocument = gql`
  query GetOrganizationMembers($input: GetOrganizationMembersRequestInput) {
    GetOrganizationMembers(input: $input) {
      ...GetOrganizationMembersResponse
    }
  }
  ${GetOrganizationMembersResponseFragmentDoc}
`;
export const GetOrganizationMembers_ConnectionDocument = gql`
  query GetOrganizationMembers_connection($input: GetOrganizationMembersRequestInput) {
    GetOrganizationMembers(input: $input) {
      connection {
        ...MemberConnection
      }
    }
  }
  ${MemberConnectionFragmentDoc}
`;
export const GetOrganizationQuotaPlanDocument = gql`
  query GetOrganizationQuotaPlan($input: GetOrganizationQuotaPlanRequestInput) {
    GetOrganizationQuotaPlan(input: $input) {
      ...GetOrganizationQuotaPlanResponse
    }
  }
  ${GetOrganizationQuotaPlanResponseFragmentDoc}
`;
export const GetOrganizationQuotaPlan_QuotaPlanDocument = gql`
  query GetOrganizationQuotaPlan_quotaPlan($input: GetOrganizationQuotaPlanRequestInput) {
    GetOrganizationQuotaPlan(input: $input) {
      quotaPlan {
        ...OrganizationQuotaPlan
      }
    }
  }
  ${OrganizationQuotaPlanFragmentDoc}
`;
export const GetPermissionGrantDocument = gql`
  query GetPermissionGrant($input: GetPermissionGrantRequestInput) {
    GetPermissionGrant(input: $input) {
      ...GetPermissionGrantResponse
    }
  }
  ${GetPermissionGrantResponseFragmentDoc}
`;
export const GetPermissionGrant_AppliedRoleDocument = gql`
  query GetPermissionGrant_appliedRole($input: GetPermissionGrantRequestInput) {
    GetPermissionGrant(input: $input) {
      appliedRole {
        ...Role
      }
    }
  }
  ${RoleFragmentDoc}
`;
export const GetPermissionSetDocument = gql`
  query GetPermissionSet($input: GetPermissionSetRequestInput) {
    GetPermissionSet(input: $input) {
      ...GetPermissionSetResponse
    }
  }
  ${GetPermissionSetResponseFragmentDoc}
`;
export const GetPermissionSet_AppliedRoleDocument = gql`
  query GetPermissionSet_appliedRole($input: GetPermissionSetRequestInput) {
    GetPermissionSet(input: $input) {
      appliedRole {
        ...Role
      }
    }
  }
  ${RoleFragmentDoc}
`;
export const GetPreferredThemeDocument = gql`
  query GetPreferredTheme {
    GetPreferredTheme {
      ...GetPreferredThemeResponse
    }
  }
  ${GetPreferredThemeResponseFragmentDoc}
`;
export const GetPreferredUiLanguageDocument = gql`
  query GetPreferredUiLanguage {
    GetPreferredUiLanguage {
      ...GetPreferredUILanguageResponse
    }
  }
  ${GetPreferredUiLanguageResponseFragmentDoc}
`;
export const GetPreviewByIdDocument = gql`
  query GetPreviewById($input: GetPreviewByIdRequestInput) {
    GetPreviewById(input: $input) {
      ...GetPreviewByIdResponse
    }
  }
  ${GetPreviewByIdResponseFragmentDoc}
`;
export const GetPreviewById_PreviewDocument = gql`
  query GetPreviewById_preview($input: GetPreviewByIdRequestInput) {
    GetPreviewById(input: $input) {
      preview {
        ...PreviewWithItemsResponse
      }
    }
  }
  ${PreviewWithItemsResponseFragmentDoc}
`;
export const GetPreviewItemsByBlueprintIdDocument = gql`
  query GetPreviewItemsByBlueprintId($input: GetPreviewItemsByBlueprintIdRequestInput) {
    GetPreviewItemsByBlueprintId(input: $input) {
      ...GetPreviewItemsByBlueprintIdResponse
    }
  }
  ${GetPreviewItemsByBlueprintIdResponseFragmentDoc}
`;
export const GetProjectByIdDocument = gql`
  query GetProjectByID($input: GetProjectByIDRequestInput) {
    GetProjectByID(input: $input) {
      ...GetProjectByIDResponse
    }
  }
  ${GetProjectByIdResponseFragmentDoc}
`;
export const GetProjectById_ProjectDocument = gql`
  query GetProjectByID_project($input: GetProjectByIDRequestInput) {
    GetProjectByID(input: $input) {
      project {
        ...ProjectResponse
      }
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const GetProjectById_Project_RoleByUserDocument = gql`
  query GetProjectByID_project_roleByUser($input: GetProjectByIDRequestInput) {
    GetProjectByID(input: $input) {
      project {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetProjectByIdWithInheritanceDocument = gql`
  query GetProjectByIDWithInheritance($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      ...GetProjectByIDWithInheritanceResponse
    }
  }
  ${GetProjectByIdWithInheritanceResponseFragmentDoc}
`;
export const GetProjectByIdWithInheritance_GroupDocument = gql`
  query GetProjectByIDWithInheritance_group($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      group {
        ...GroupResponse
      }
    }
  }
  ${GroupResponseFragmentDoc}
`;
export const GetProjectByIdWithInheritance_Group_RoleByUserDocument = gql`
  query GetProjectByIDWithInheritance_group_roleByUser($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      group {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetProjectByIdWithInheritance_OrganizationDocument = gql`
  query GetProjectByIDWithInheritance_organization($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      organization {
        ...OrganizationResponse
      }
    }
  }
  ${OrganizationResponseFragmentDoc}
`;
export const GetProjectByIdWithInheritance_Organization_RoleByUserDocument = gql`
  query GetProjectByIDWithInheritance_organization_roleByUser($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      organization {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetProjectByIdWithInheritance_ProjectDocument = gql`
  query GetProjectByIDWithInheritance_project($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      project {
        ...ProjectResponse
      }
    }
  }
  ${ProjectResponseFragmentDoc}
`;
export const GetProjectByIdWithInheritance_Project_RoleByUserDocument = gql`
  query GetProjectByIDWithInheritance_project_roleByUser($input: GetProjectByIDWithInheritanceRequestInput) {
    GetProjectByIDWithInheritance(input: $input) {
      project {
        roleByUser {
          ...AnyToRoleConnection
        }
      }
    }
  }
  ${AnyToRoleConnectionFragmentDoc}
`;
export const GetProjectMembersDocument = gql`
  query GetProjectMembers($input: GetProjectMembersRequestInput) {
    GetProjectMembers(input: $input) {
      ...GetProjectMembersResponse
    }
  }
  ${GetProjectMembersResponseFragmentDoc}
`;
export const GetProjectMembers_ConnectionDocument = gql`
  query GetProjectMembers_connection($input: GetProjectMembersRequestInput) {
    GetProjectMembers(input: $input) {
      connection {
        ...MemberConnection
      }
    }
  }
  ${MemberConnectionFragmentDoc}
`;
export const GetProjectPortDocument = gql`
  query GetProjectPort($input: GetProjectPortRequestInput) {
    GetProjectPort(input: $input) {
      ...GetProjectPortResponse
    }
  }
  ${GetProjectPortResponseFragmentDoc}
`;
export const GetProjectPort_SelectionProgressDocument = gql`
  query GetProjectPort_selectionProgress($input: GetProjectPortRequestInput) {
    GetProjectPort(input: $input) {
      selectionProgress {
        ...ProjectPortSelectionProgress
      }
    }
  }
  ${ProjectPortSelectionProgressFragmentDoc}
`;
export const GetProjectQuotaPlanDocument = gql`
  query GetProjectQuotaPlan($input: GetProjectQuotaPlanRequestInput) {
    GetProjectQuotaPlan(input: $input) {
      ...GetProjectQuotaPlanResponse
    }
  }
  ${GetProjectQuotaPlanResponseFragmentDoc}
`;
export const GetProjectQuotaPlan_QuotaPlanDocument = gql`
  query GetProjectQuotaPlan_quotaPlan($input: GetProjectQuotaPlanRequestInput) {
    GetProjectQuotaPlan(input: $input) {
      quotaPlan {
        ...ProjectQuotaPlan
      }
    }
  }
  ${ProjectQuotaPlanFragmentDoc}
`;
export const GetReleaseByIdDocument = gql`
  query GetReleaseById($input: GetReleaseByIdRequestInput) {
    GetReleaseById(input: $input) {
      ...GetReleaseByIdResponse
    }
  }
  ${GetReleaseByIdResponseFragmentDoc}
`;
export const GetReleaseById_ReleaseDocument = gql`
  query GetReleaseById_release($input: GetReleaseByIdRequestInput) {
    GetReleaseById(input: $input) {
      release {
        ...ReleaseResponse
      }
    }
  }
  ${ReleaseResponseFragmentDoc}
`;
export const GetRoleRuleByIdDocument = gql`
  query GetRoleRuleByID($input: GetRoleRuleByIDRequestInput) {
    GetRoleRuleByID(input: $input) {
      ...GetRoleRuleByIDResponse
    }
  }
  ${GetRoleRuleByIdResponseFragmentDoc}
`;
export const GetRoleRuleById_RoleRuleDocument = gql`
  query GetRoleRuleByID_roleRule($input: GetRoleRuleByIDRequestInput) {
    GetRoleRuleByID(input: $input) {
      roleRule {
        ...RoleRuleResponse
      }
    }
  }
  ${RoleRuleResponseFragmentDoc}
`;
export const GetUnpublishedLinkedDocumentsDocument = gql`
  query GetUnpublishedLinkedDocuments($input: GetUnpublishedLinkedDocumentsRequestInput) {
    GetUnpublishedLinkedDocuments(input: $input) {
      ...GetUnpublishedLinkedDocumentsResponse
    }
  }
  ${GetUnpublishedLinkedDocumentsResponseFragmentDoc}
`;
export const GetUsageOfBlueprintFieldDocument = gql`
  query GetUsageOfBlueprintField($input: GetUsageOfBlueprintFieldRequestInput) {
    GetUsageOfBlueprintField(input: $input) {
      ...GetUsageOfBlueprintFieldResponse
    }
  }
  ${GetUsageOfBlueprintFieldResponseFragmentDoc}
`;
export const GetUserRoleWithRoleRulesDocument = gql`
  query GetUserRoleWithRoleRules($input: GetUserRoleWithRoleRulesRequestInput) {
    GetUserRoleWithRoleRules(input: $input) {
      ...GetUserRoleWithRoleRulesResponse
    }
  }
  ${GetUserRoleWithRoleRulesResponseFragmentDoc}
`;
export const ReadUserAccessTokensDocument = gql`
  query ReadUserAccessTokens($input: ReadUserAccessTokensRequestInput) {
    ReadUserAccessTokens(input: $input) {
      ...ReadUserAccessTokensResponse
    }
  }
  ${ReadUserAccessTokensResponseFragmentDoc}
`;
export const ValidateApiKeyDocument = gql`
  query ValidateApiKey($input: ValidateAPIKeyRequestInput) {
    ValidateApiKey(input: $input) {
      ...ValidateAPIKeyResponse
    }
  }
  ${ValidateApiKeyResponseFragmentDoc}
`;
export const GetUserDocument = gql`
  query getUser {
    getUser {
      ...GetUserResponse
    }
  }
  ${GetUserResponseFragmentDoc}
`;
export const GetUser_ProfileDocument = gql`
  query getUser_profile {
    getUser {
      profile {
        ...CaisyUserProfile
      }
    }
  }
  ${CaisyUserProfileFragmentDoc}
`;
export const GetUser_SettingsDocument = gql`
  query getUser_settings {
    getUser {
      settings {
        ...UserSettings
      }
    }
  }
  ${UserSettingsFragmentDoc}
`;
export const SessionDocument = gql`
  query session {
    session {
      ...Session
    }
  }
  ${SessionFragmentDoc}
`;
export const UserProfileDocument = gql`
  query userProfile($userId: ID!) {
    userProfile(userId: $userId) {
      ...CaisyUserProfile
    }
  }
  ${CaisyUserProfileFragmentDoc}
`;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Maybe<R>;
export function getSdk<C>(requester: Requester<C>) {
    return {
        AssignRole(variables?: AssignRoleMutationVariables, options?: C): Maybe<AssignRoleMutation> {
            return requester<AssignRoleMutation, AssignRoleMutationVariables>(AssignRoleDocument, variables, options);
        },
        CheckBlueprintNameAvailable(
            variables?: CheckBlueprintNameAvailableMutationVariables,
            options?: C,
        ): Maybe<CheckBlueprintNameAvailableMutation> {
            return requester<CheckBlueprintNameAvailableMutation, CheckBlueprintNameAvailableMutationVariables>(
                CheckBlueprintNameAvailableDocument,
                variables,
                options,
            );
        },
        CopyMemberFromProjectToProject(
            variables?: CopyMemberFromProjectToProjectMutationVariables,
            options?: C,
        ): Maybe<CopyMemberFromProjectToProjectMutation> {
            return requester<CopyMemberFromProjectToProjectMutation, CopyMemberFromProjectToProjectMutationVariables>(
                CopyMemberFromProjectToProjectDocument,
                variables,
                options,
            );
        },
        CreateApiKey(variables?: CreateApiKeyMutationVariables, options?: C): Maybe<CreateApiKeyMutation> {
            return requester<CreateApiKeyMutation, CreateApiKeyMutationVariables>(CreateApiKeyDocument, variables, options);
        },
        CreateBlueprint(variables?: CreateBlueprintMutationVariables, options?: C): Maybe<CreateBlueprintMutation> {
            return requester<CreateBlueprintMutation, CreateBlueprintMutationVariables>(
                CreateBlueprintDocument,
                variables,
                options,
            );
        },
        CreateDocument(variables?: CreateDocumentMutationVariables, options?: C): Maybe<CreateDocumentMutation> {
            return requester<CreateDocumentMutation, CreateDocumentMutationVariables>(
                CreateDocumentDocument,
                variables,
                options,
            );
        },
        CreateDocumentFieldLocale(
            variables?: CreateDocumentFieldLocaleMutationVariables,
            options?: C,
        ): Maybe<CreateDocumentFieldLocaleMutation> {
            return requester<CreateDocumentFieldLocaleMutation, CreateDocumentFieldLocaleMutationVariables>(
                CreateDocumentFieldLocaleDocument,
                variables,
                options,
            );
        },
        CreateGroup(variables?: CreateGroupMutationVariables, options?: C): Maybe<CreateGroupMutation> {
            return requester<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, variables, options);
        },
        CreateManyViews(variables?: CreateManyViewsMutationVariables, options?: C): Maybe<CreateManyViewsMutation> {
            return requester<CreateManyViewsMutation, CreateManyViewsMutationVariables>(
                CreateManyViewsDocument,
                variables,
                options,
            );
        },
        CreateOrganization(
            variables?: CreateOrganizationMutationVariables,
            options?: C,
        ): Maybe<CreateOrganizationMutation> {
            return requester<CreateOrganizationMutation, CreateOrganizationMutationVariables>(
                CreateOrganizationDocument,
                variables,
                options,
            );
        },
        CreatePreview(variables?: CreatePreviewMutationVariables, options?: C): Maybe<CreatePreviewMutation> {
            return requester<CreatePreviewMutation, CreatePreviewMutationVariables>(
                CreatePreviewDocument,
                variables,
                options,
            );
        },
        CreatePreviewItem(variables?: CreatePreviewItemMutationVariables, options?: C): Maybe<CreatePreviewItemMutation> {
            return requester<CreatePreviewItemMutation, CreatePreviewItemMutationVariables>(
                CreatePreviewItemDocument,
                variables,
                options,
            );
        },
        CreateProject(variables?: CreateProjectMutationVariables, options?: C): Maybe<CreateProjectMutation> {
            return requester<CreateProjectMutation, CreateProjectMutationVariables>(
                CreateProjectDocument,
                variables,
                options,
            );
        },
        CreateRelease(variables?: CreateReleaseMutationVariables, options?: C): Maybe<CreateReleaseMutation> {
            return requester<CreateReleaseMutation, CreateReleaseMutationVariables>(
                CreateReleaseDocument,
                variables,
                options,
            );
        },
        CreateRoleRule(variables?: CreateRoleRuleMutationVariables, options?: C): Maybe<CreateRoleRuleMutation> {
            return requester<CreateRoleRuleMutation, CreateRoleRuleMutationVariables>(
                CreateRoleRuleDocument,
                variables,
                options,
            );
        },
        CreateTag(variables?: CreateTagMutationVariables, options?: C): Maybe<CreateTagMutation> {
            return requester<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, variables, options);
        },
        CreateUserAccessToken(
            variables?: CreateUserAccessTokenMutationVariables,
            options?: C,
        ): Maybe<CreateUserAccessTokenMutation> {
            return requester<CreateUserAccessTokenMutation, CreateUserAccessTokenMutationVariables>(
                CreateUserAccessTokenDocument,
                variables,
                options,
            );
        },
        CreateUserRole(variables?: CreateUserRoleMutationVariables, options?: C): Maybe<CreateUserRoleMutation> {
            return requester<CreateUserRoleMutation, CreateUserRoleMutationVariables>(
                CreateUserRoleDocument,
                variables,
                options,
            );
        },
        CreateView(variables?: CreateViewMutationVariables, options?: C): Maybe<CreateViewMutation> {
            return requester<CreateViewMutation, CreateViewMutationVariables>(CreateViewDocument, variables, options);
        },
        CreateViewPin(variables?: CreateViewPinMutationVariables, options?: C): Maybe<CreateViewPinMutation> {
            return requester<CreateViewPinMutation, CreateViewPinMutationVariables>(
                CreateViewPinDocument,
                variables,
                options,
            );
        },
        CreateWebhook(variables?: CreateWebhookMutationVariables, options?: C): Maybe<CreateWebhookMutation> {
            return requester<CreateWebhookMutation, CreateWebhookMutationVariables>(
                CreateWebhookDocument,
                variables,
                options,
            );
        },
        DeAssignRole(variables?: DeAssignRoleMutationVariables, options?: C): Maybe<DeAssignRoleMutation> {
            return requester<DeAssignRoleMutation, DeAssignRoleMutationVariables>(DeAssignRoleDocument, variables, options);
        },
        DeleteApiKey(variables?: DeleteApiKeyMutationVariables, options?: C): Maybe<DeleteApiKeyMutation> {
            return requester<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>(DeleteApiKeyDocument, variables, options);
        },
        DeleteBlueprint(variables?: DeleteBlueprintMutationVariables, options?: C): Maybe<DeleteBlueprintMutation> {
            return requester<DeleteBlueprintMutation, DeleteBlueprintMutationVariables>(
                DeleteBlueprintDocument,
                variables,
                options,
            );
        },
        DeleteDocument(variables?: DeleteDocumentMutationVariables, options?: C): Maybe<DeleteDocumentMutation> {
            return requester<DeleteDocumentMutation, DeleteDocumentMutationVariables>(
                DeleteDocumentDocument,
                variables,
                options,
            );
        },
        DeleteDocumentFieldLocale(
            variables?: DeleteDocumentFieldLocaleMutationVariables,
            options?: C,
        ): Maybe<DeleteDocumentFieldLocaleMutation> {
            return requester<DeleteDocumentFieldLocaleMutation, DeleteDocumentFieldLocaleMutationVariables>(
                DeleteDocumentFieldLocaleDocument,
                variables,
                options,
            );
        },
        DeleteEntrypoint(variables?: DeleteEntrypointMutationVariables, options?: C): Maybe<DeleteEntrypointMutation> {
            return requester<DeleteEntrypointMutation, DeleteEntrypointMutationVariables>(
                DeleteEntrypointDocument,
                variables,
                options,
            );
        },
        DeleteGroup(variables?: DeleteGroupMutationVariables, options?: C): Maybe<DeleteGroupMutation> {
            return requester<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, variables, options);
        },
        DeleteManyDocuments(
            variables?: DeleteManyDocumentsMutationVariables,
            options?: C,
        ): Maybe<DeleteManyDocumentsMutation> {
            return requester<DeleteManyDocumentsMutation, DeleteManyDocumentsMutationVariables>(
                DeleteManyDocumentsDocument,
                variables,
                options,
            );
        },
        DeleteManyReleases(
            variables?: DeleteManyReleasesMutationVariables,
            options?: C,
        ): Maybe<DeleteManyReleasesMutation> {
            return requester<DeleteManyReleasesMutation, DeleteManyReleasesMutationVariables>(
                DeleteManyReleasesDocument,
                variables,
                options,
            );
        },
        DeleteOrganization(
            variables?: DeleteOrganizationMutationVariables,
            options?: C,
        ): Maybe<DeleteOrganizationMutation> {
            return requester<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(
                DeleteOrganizationDocument,
                variables,
                options,
            );
        },
        DeletePreview(variables?: DeletePreviewMutationVariables, options?: C): Maybe<DeletePreviewMutation> {
            return requester<DeletePreviewMutation, DeletePreviewMutationVariables>(
                DeletePreviewDocument,
                variables,
                options,
            );
        },
        DeletePreviewItem(variables?: DeletePreviewItemMutationVariables, options?: C): Maybe<DeletePreviewItemMutation> {
            return requester<DeletePreviewItemMutation, DeletePreviewItemMutationVariables>(
                DeletePreviewItemDocument,
                variables,
                options,
            );
        },
        DeleteProject(variables?: DeleteProjectMutationVariables, options?: C): Maybe<DeleteProjectMutation> {
            return requester<DeleteProjectMutation, DeleteProjectMutationVariables>(
                DeleteProjectDocument,
                variables,
                options,
            );
        },
        DeleteRoleRule(variables?: DeleteRoleRuleMutationVariables, options?: C): Maybe<DeleteRoleRuleMutation> {
            return requester<DeleteRoleRuleMutation, DeleteRoleRuleMutationVariables>(
                DeleteRoleRuleDocument,
                variables,
                options,
            );
        },
        DeleteTag(variables?: DeleteTagMutationVariables, options?: C): Maybe<DeleteTagMutation> {
            return requester<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, variables, options);
        },
        DeleteUserAccessToken(
            variables?: DeleteUserAccessTokenMutationVariables,
            options?: C,
        ): Maybe<DeleteUserAccessTokenMutation> {
            return requester<DeleteUserAccessTokenMutation, DeleteUserAccessTokenMutationVariables>(
                DeleteUserAccessTokenDocument,
                variables,
                options,
            );
        },
        DeleteUserRole(variables?: DeleteUserRoleMutationVariables, options?: C): Maybe<DeleteUserRoleMutation> {
            return requester<DeleteUserRoleMutation, DeleteUserRoleMutationVariables>(
                DeleteUserRoleDocument,
                variables,
                options,
            );
        },
        DeleteView(variables?: DeleteViewMutationVariables, options?: C): Maybe<DeleteViewMutation> {
            return requester<DeleteViewMutation, DeleteViewMutationVariables>(DeleteViewDocument, variables, options);
        },
        DeleteViewPin(variables?: DeleteViewPinMutationVariables, options?: C): Maybe<DeleteViewPinMutation> {
            return requester<DeleteViewPinMutation, DeleteViewPinMutationVariables>(
                DeleteViewPinDocument,
                variables,
                options,
            );
        },
        DeleteWebhook(variables?: DeleteWebhookMutationVariables, options?: C): Maybe<DeleteWebhookMutation> {
            return requester<DeleteWebhookMutation, DeleteWebhookMutationVariables>(
                DeleteWebhookDocument,
                variables,
                options,
            );
        },
        DuplicateDocument(variables?: DuplicateDocumentMutationVariables, options?: C): Maybe<DuplicateDocumentMutation> {
            return requester<DuplicateDocumentMutation, DuplicateDocumentMutationVariables>(
                DuplicateDocumentDocument,
                variables,
                options,
            );
        },
        DuplicateToProject(
            variables?: DuplicateToProjectMutationVariables,
            options?: C,
        ): Maybe<DuplicateToProjectMutation> {
            return requester<DuplicateToProjectMutation, DuplicateToProjectMutationVariables>(
                DuplicateToProjectDocument,
                variables,
                options,
            );
        },
        LinkManyReleaseDocument(
            variables?: LinkManyReleaseDocumentMutationVariables,
            options?: C,
        ): Maybe<LinkManyReleaseDocumentMutation> {
            return requester<LinkManyReleaseDocumentMutation, LinkManyReleaseDocumentMutationVariables>(
                LinkManyReleaseDocumentDocument,
                variables,
                options,
            );
        },
        MoveProject(variables?: MoveProjectMutationVariables, options?: C): Maybe<MoveProjectMutation> {
            return requester<MoveProjectMutation, MoveProjectMutationVariables>(MoveProjectDocument, variables, options);
        },
        PutManyBlueprints(variables?: PutManyBlueprintsMutationVariables, options?: C): Maybe<PutManyBlueprintsMutation> {
            return requester<PutManyBlueprintsMutation, PutManyBlueprintsMutationVariables>(
                PutManyBlueprintsDocument,
                variables,
                options,
            );
        },
        PutManyDocumentFieldLocales(
            variables?: PutManyDocumentFieldLocalesMutationVariables,
            options?: C,
        ): Maybe<PutManyDocumentFieldLocalesMutation> {
            return requester<PutManyDocumentFieldLocalesMutation, PutManyDocumentFieldLocalesMutationVariables>(
                PutManyDocumentFieldLocalesDocument,
                variables,
                options,
            );
        },
        PutManyPreviews(variables?: PutManyPreviewsMutationVariables, options?: C): Maybe<PutManyPreviewsMutation> {
            return requester<PutManyPreviewsMutation, PutManyPreviewsMutationVariables>(
                PutManyPreviewsDocument,
                variables,
                options,
            );
        },
        PutManyTags(variables?: PutManyTagsMutationVariables, options?: C): Maybe<PutManyTagsMutation> {
            return requester<PutManyTagsMutation, PutManyTagsMutationVariables>(PutManyTagsDocument, variables, options);
        },
        PutManyViews(variables?: PutManyViewsMutationVariables, options?: C): Maybe<PutManyViewsMutation> {
            return requester<PutManyViewsMutation, PutManyViewsMutationVariables>(PutManyViewsDocument, variables, options);
        },
        PutManyWebhooks(variables?: PutManyWebhooksMutationVariables, options?: C): Maybe<PutManyWebhooksMutation> {
            return requester<PutManyWebhooksMutation, PutManyWebhooksMutationVariables>(
                PutManyWebhooksDocument,
                variables,
                options,
            );
        },
        SetCompletedOnboardingEvents(
            variables?: SetCompletedOnboardingEventsMutationVariables,
            options?: C,
        ): Maybe<SetCompletedOnboardingEventsMutation> {
            return requester<SetCompletedOnboardingEventsMutation, SetCompletedOnboardingEventsMutationVariables>(
                SetCompletedOnboardingEventsDocument,
                variables,
                options,
            );
        },
        SetPreferredTheme(variables?: SetPreferredThemeMutationVariables, options?: C): Maybe<SetPreferredThemeMutation> {
            return requester<SetPreferredThemeMutation, SetPreferredThemeMutationVariables>(
                SetPreferredThemeDocument,
                variables,
                options,
            );
        },
        SetPreferredUiLanguage(
            variables?: SetPreferredUiLanguageMutationVariables,
            options?: C,
        ): Maybe<SetPreferredUiLanguageMutation> {
            return requester<SetPreferredUiLanguageMutation, SetPreferredUiLanguageMutationVariables>(
                SetPreferredUiLanguageDocument,
                variables,
                options,
            );
        },
        UnlinkManyReleaseDocument(
            variables?: UnlinkManyReleaseDocumentMutationVariables,
            options?: C,
        ): Maybe<UnlinkManyReleaseDocumentMutation> {
            return requester<UnlinkManyReleaseDocumentMutation, UnlinkManyReleaseDocumentMutationVariables>(
                UnlinkManyReleaseDocumentDocument,
                variables,
                options,
            );
        },
        UpdateBlueprint(variables?: UpdateBlueprintMutationVariables, options?: C): Maybe<UpdateBlueprintMutation> {
            return requester<UpdateBlueprintMutation, UpdateBlueprintMutationVariables>(
                UpdateBlueprintDocument,
                variables,
                options,
            );
        },
        UpdateDocument(variables?: UpdateDocumentMutationVariables, options?: C): Maybe<UpdateDocumentMutation> {
            return requester<UpdateDocumentMutation, UpdateDocumentMutationVariables>(
                UpdateDocumentDocument,
                variables,
                options,
            );
        },
        UpdateDocumentField(
            variables?: UpdateDocumentFieldMutationVariables,
            options?: C,
        ): Maybe<UpdateDocumentFieldMutation> {
            return requester<UpdateDocumentFieldMutation, UpdateDocumentFieldMutationVariables>(
                UpdateDocumentFieldDocument,
                variables,
                options,
            );
        },
        UpdateDocumentFieldLocale(
            variables?: UpdateDocumentFieldLocaleMutationVariables,
            options?: C,
        ): Maybe<UpdateDocumentFieldLocaleMutation> {
            return requester<UpdateDocumentFieldLocaleMutation, UpdateDocumentFieldLocaleMutationVariables>(
                UpdateDocumentFieldLocaleDocument,
                variables,
                options,
            );
        },
        UpdateEntrypoint(variables?: UpdateEntrypointMutationVariables, options?: C): Maybe<UpdateEntrypointMutation> {
            return requester<UpdateEntrypointMutation, UpdateEntrypointMutationVariables>(
                UpdateEntrypointDocument,
                variables,
                options,
            );
        },
        UpdateGroup(variables?: UpdateGroupMutationVariables, options?: C): Maybe<UpdateGroupMutation> {
            return requester<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, variables, options);
        },
        UpdateManyDocuments(
            variables?: UpdateManyDocumentsMutationVariables,
            options?: C,
        ): Maybe<UpdateManyDocumentsMutation> {
            return requester<UpdateManyDocumentsMutation, UpdateManyDocumentsMutationVariables>(
                UpdateManyDocumentsDocument,
                variables,
                options,
            );
        },
        UpdateOrganization(
            variables?: UpdateOrganizationMutationVariables,
            options?: C,
        ): Maybe<UpdateOrganizationMutation> {
            return requester<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(
                UpdateOrganizationDocument,
                variables,
                options,
            );
        },
        UpdatePreview(variables?: UpdatePreviewMutationVariables, options?: C): Maybe<UpdatePreviewMutation> {
            return requester<UpdatePreviewMutation, UpdatePreviewMutationVariables>(
                UpdatePreviewDocument,
                variables,
                options,
            );
        },
        UpdatePreviewItem(variables?: UpdatePreviewItemMutationVariables, options?: C): Maybe<UpdatePreviewItemMutation> {
            return requester<UpdatePreviewItemMutation, UpdatePreviewItemMutationVariables>(
                UpdatePreviewItemDocument,
                variables,
                options,
            );
        },
        UpdateProject(variables?: UpdateProjectMutationVariables, options?: C): Maybe<UpdateProjectMutation> {
            return requester<UpdateProjectMutation, UpdateProjectMutationVariables>(
                UpdateProjectDocument,
                variables,
                options,
            );
        },
        UpdateRelease(variables?: UpdateReleaseMutationVariables, options?: C): Maybe<UpdateReleaseMutation> {
            return requester<UpdateReleaseMutation, UpdateReleaseMutationVariables>(
                UpdateReleaseDocument,
                variables,
                options,
            );
        },
        UpdateRoleRule(variables?: UpdateRoleRuleMutationVariables, options?: C): Maybe<UpdateRoleRuleMutation> {
            return requester<UpdateRoleRuleMutation, UpdateRoleRuleMutationVariables>(
                UpdateRoleRuleDocument,
                variables,
                options,
            );
        },
        UpdateTag(variables?: UpdateTagMutationVariables, options?: C): Maybe<UpdateTagMutation> {
            return requester<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, variables, options);
        },
        UpdateUserProfileRequest(
            variables: UpdateUserProfileRequestMutationVariables,
            options?: C,
        ): Maybe<UpdateUserProfileRequestMutation> {
            return requester<UpdateUserProfileRequestMutation, UpdateUserProfileRequestMutationVariables>(
                UpdateUserProfileRequestDocument,
                variables,
                options,
            );
        },
        UpdateUserRole(variables?: UpdateUserRoleMutationVariables, options?: C): Maybe<UpdateUserRoleMutation> {
            return requester<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(
                UpdateUserRoleDocument,
                variables,
                options,
            );
        },
        UpdateView(variables?: UpdateViewMutationVariables, options?: C): Maybe<UpdateViewMutation> {
            return requester<UpdateViewMutation, UpdateViewMutationVariables>(UpdateViewDocument, variables, options);
        },
        UpdateWebhook(variables?: UpdateWebhookMutationVariables, options?: C): Maybe<UpdateWebhookMutation> {
            return requester<UpdateWebhookMutation, UpdateWebhookMutationVariables>(
                UpdateWebhookDocument,
                variables,
                options,
            );
        },
        ValidateDocument(variables?: ValidateDocumentMutationVariables, options?: C): Maybe<ValidateDocumentMutation> {
            return requester<ValidateDocumentMutation, ValidateDocumentMutationVariables>(
                ValidateDocumentDocument,
                variables,
                options,
            );
        },
        ValidateDocumentField(
            variables?: ValidateDocumentFieldMutationVariables,
            options?: C,
        ): Maybe<ValidateDocumentFieldMutation> {
            return requester<ValidateDocumentFieldMutation, ValidateDocumentFieldMutationVariables>(
                ValidateDocumentFieldDocument,
                variables,
                options,
            );
        },
        ValidateManyDocuments(
            variables?: ValidateManyDocumentsMutationVariables,
            options?: C,
        ): Maybe<ValidateManyDocumentsMutation> {
            return requester<ValidateManyDocumentsMutation, ValidateManyDocumentsMutationVariables>(
                ValidateManyDocumentsDocument,
                variables,
                options,
            );
        },
        ValidateRelease(variables?: ValidateReleaseMutationVariables, options?: C): Maybe<ValidateReleaseMutation> {
            return requester<ValidateReleaseMutation, ValidateReleaseMutationVariables>(
                ValidateReleaseDocument,
                variables,
                options,
            );
        },
        authenticate(variables: AuthenticateMutationVariables, options?: C): Maybe<AuthenticateMutation> {
            return requester<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, variables, options);
        },
        createCaisyUser(variables: CreateCaisyUserMutationVariables, options?: C): Maybe<CreateCaisyUserMutation> {
            return requester<CreateCaisyUserMutation, CreateCaisyUserMutationVariables>(
                CreateCaisyUserDocument,
                variables,
                options,
            );
        },
        updatePreferredUILanguage(
            variables: UpdatePreferredUiLanguageMutationVariables,
            options?: C,
        ): Maybe<UpdatePreferredUiLanguageMutation> {
            return requester<UpdatePreferredUiLanguageMutation, UpdatePreferredUiLanguageMutationVariables>(
                UpdatePreferredUiLanguageDocument,
                variables,
                options,
            );
        },
        updatePreferredUITheme(
            variables: UpdatePreferredUiThemeMutationVariables,
            options?: C,
        ): Maybe<UpdatePreferredUiThemeMutation> {
            return requester<UpdatePreferredUiThemeMutation, UpdatePreferredUiThemeMutationVariables>(
                UpdatePreferredUiThemeDocument,
                variables,
                options,
            );
        },
        GetAllCompletedOnboardingEvents(
            variables?: GetAllCompletedOnboardingEventsQueryVariables,
            options?: C,
        ): Maybe<GetAllCompletedOnboardingEventsQuery> {
            return requester<GetAllCompletedOnboardingEventsQuery, GetAllCompletedOnboardingEventsQueryVariables>(
                GetAllCompletedOnboardingEventsDocument,
                variables,
                options,
            );
        },
        GetAllDocumentFieldLocale(
            variables?: GetAllDocumentFieldLocaleQueryVariables,
            options?: C,
        ): Maybe<GetAllDocumentFieldLocaleQuery> {
            return requester<GetAllDocumentFieldLocaleQuery, GetAllDocumentFieldLocaleQueryVariables>(
                GetAllDocumentFieldLocaleDocument,
                variables,
                options,
            );
        },
        GetAllDocumentSnapshot(
            variables?: GetAllDocumentSnapshotQueryVariables,
            options?: C,
        ): Maybe<GetAllDocumentSnapshotQuery> {
            return requester<GetAllDocumentSnapshotQuery, GetAllDocumentSnapshotQueryVariables>(
                GetAllDocumentSnapshotDocument,
                variables,
                options,
            );
        },
        GetAllDocumentStatus(
            variables?: GetAllDocumentStatusQueryVariables,
            options?: C,
        ): Maybe<GetAllDocumentStatusQuery> {
            return requester<GetAllDocumentStatusQuery, GetAllDocumentStatusQueryVariables>(
                GetAllDocumentStatusDocument,
                variables,
                options,
            );
        },
        GetAllWebhooks(variables?: GetAllWebhooksQueryVariables, options?: C): Maybe<GetAllWebhooksQuery> {
            return requester<GetAllWebhooksQuery, GetAllWebhooksQueryVariables>(GetAllWebhooksDocument, variables, options);
        },
        GetAmount(variables?: GetAmountQueryVariables, options?: C): Maybe<GetAmountQuery> {
            return requester<GetAmountQuery, GetAmountQueryVariables>(GetAmountDocument, variables, options);
        },
        GetBlueprintById(variables?: GetBlueprintByIdQueryVariables, options?: C): Maybe<GetBlueprintByIdQuery> {
            return requester<GetBlueprintByIdQuery, GetBlueprintByIdQueryVariables>(
                GetBlueprintByIdDocument,
                variables,
                options,
            );
        },
        GetBlueprintById_blueprint(
            variables?: GetBlueprintById_BlueprintQueryVariables,
            options?: C,
        ): Maybe<GetBlueprintById_BlueprintQuery> {
            return requester<GetBlueprintById_BlueprintQuery, GetBlueprintById_BlueprintQueryVariables>(
                GetBlueprintById_BlueprintDocument,
                variables,
                options,
            );
        },
        GetBlueprintByName(variables?: GetBlueprintByNameQueryVariables, options?: C): Maybe<GetBlueprintByNameQuery> {
            return requester<GetBlueprintByNameQuery, GetBlueprintByNameQueryVariables>(
                GetBlueprintByNameDocument,
                variables,
                options,
            );
        },
        GetBlueprintByName_blueprint(
            variables?: GetBlueprintByName_BlueprintQueryVariables,
            options?: C,
        ): Maybe<GetBlueprintByName_BlueprintQuery> {
            return requester<GetBlueprintByName_BlueprintQuery, GetBlueprintByName_BlueprintQueryVariables>(
                GetBlueprintByName_BlueprintDocument,
                variables,
                options,
            );
        },
        GetCounts(variables?: GetCountsQueryVariables, options?: C): Maybe<GetCountsQuery> {
            return requester<GetCountsQuery, GetCountsQueryVariables>(GetCountsDocument, variables, options);
        },
        GetDocumentById(variables?: GetDocumentByIdQueryVariables, options?: C): Maybe<GetDocumentByIdQuery> {
            return requester<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>(
                GetDocumentByIdDocument,
                variables,
                options,
            );
        },
        GetDocumentById_document(
            variables?: GetDocumentById_DocumentQueryVariables,
            options?: C,
        ): Maybe<GetDocumentById_DocumentQuery> {
            return requester<GetDocumentById_DocumentQuery, GetDocumentById_DocumentQueryVariables>(
                GetDocumentById_DocumentDocument,
                variables,
                options,
            );
        },
        GetDocumentCountsByBlueprints(
            variables?: GetDocumentCountsByBlueprintsQueryVariables,
            options?: C,
        ): Maybe<GetDocumentCountsByBlueprintsQuery> {
            return requester<GetDocumentCountsByBlueprintsQuery, GetDocumentCountsByBlueprintsQueryVariables>(
                GetDocumentCountsByBlueprintsDocument,
                variables,
                options,
            );
        },
        GetDocumentSnapshot(variables?: GetDocumentSnapshotQueryVariables, options?: C): Maybe<GetDocumentSnapshotQuery> {
            return requester<GetDocumentSnapshotQuery, GetDocumentSnapshotQueryVariables>(
                GetDocumentSnapshotDocument,
                variables,
                options,
            );
        },
        GetDocumentSnapshot_document(
            variables?: GetDocumentSnapshot_DocumentQueryVariables,
            options?: C,
        ): Maybe<GetDocumentSnapshot_DocumentQuery> {
            return requester<GetDocumentSnapshot_DocumentQuery, GetDocumentSnapshot_DocumentQueryVariables>(
                GetDocumentSnapshot_DocumentDocument,
                variables,
                options,
            );
        },
        GetEntrypointByDomain(
            variables?: GetEntrypointByDomainQueryVariables,
            options?: C,
        ): Maybe<GetEntrypointByDomainQuery> {
            return requester<GetEntrypointByDomainQuery, GetEntrypointByDomainQueryVariables>(
                GetEntrypointByDomainDocument,
                variables,
                options,
            );
        },
        GetEntrypointByDomain_entrypoint(
            variables?: GetEntrypointByDomain_EntrypointQueryVariables,
            options?: C,
        ): Maybe<GetEntrypointByDomain_EntrypointQuery> {
            return requester<GetEntrypointByDomain_EntrypointQuery, GetEntrypointByDomain_EntrypointQueryVariables>(
                GetEntrypointByDomain_EntrypointDocument,
                variables,
                options,
            );
        },
        GetEntrypointByScope(
            variables?: GetEntrypointByScopeQueryVariables,
            options?: C,
        ): Maybe<GetEntrypointByScopeQuery> {
            return requester<GetEntrypointByScopeQuery, GetEntrypointByScopeQueryVariables>(
                GetEntrypointByScopeDocument,
                variables,
                options,
            );
        },
        GetEntrypointByScope_entrypoint(
            variables?: GetEntrypointByScope_EntrypointQueryVariables,
            options?: C,
        ): Maybe<GetEntrypointByScope_EntrypointQuery> {
            return requester<GetEntrypointByScope_EntrypointQuery, GetEntrypointByScope_EntrypointQueryVariables>(
                GetEntrypointByScope_EntrypointDocument,
                variables,
                options,
            );
        },
        GetGroupByID(variables?: GetGroupByIdQueryVariables, options?: C): Maybe<GetGroupByIdQuery> {
            return requester<GetGroupByIdQuery, GetGroupByIdQueryVariables>(GetGroupByIdDocument, variables, options);
        },
        GetGroupByID_group(variables?: GetGroupById_GroupQueryVariables, options?: C): Maybe<GetGroupById_GroupQuery> {
            return requester<GetGroupById_GroupQuery, GetGroupById_GroupQueryVariables>(
                GetGroupById_GroupDocument,
                variables,
                options,
            );
        },
        GetGroupByID_group_roleByUser(
            variables?: GetGroupById_Group_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetGroupById_Group_RoleByUserQuery> {
            return requester<GetGroupById_Group_RoleByUserQuery, GetGroupById_Group_RoleByUserQueryVariables>(
                GetGroupById_Group_RoleByUserDocument,
                variables,
                options,
            );
        },
        GetGroupByIDWithInheritance(
            variables?: GetGroupByIdWithInheritanceQueryVariables,
            options?: C,
        ): Maybe<GetGroupByIdWithInheritanceQuery> {
            return requester<GetGroupByIdWithInheritanceQuery, GetGroupByIdWithInheritanceQueryVariables>(
                GetGroupByIdWithInheritanceDocument,
                variables,
                options,
            );
        },
        GetGroupByIDWithInheritance_group(
            variables?: GetGroupByIdWithInheritance_GroupQueryVariables,
            options?: C,
        ): Maybe<GetGroupByIdWithInheritance_GroupQuery> {
            return requester<GetGroupByIdWithInheritance_GroupQuery, GetGroupByIdWithInheritance_GroupQueryVariables>(
                GetGroupByIdWithInheritance_GroupDocument,
                variables,
                options,
            );
        },
        GetGroupByIDWithInheritance_group_roleByUser(
            variables?: GetGroupByIdWithInheritance_Group_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetGroupByIdWithInheritance_Group_RoleByUserQuery> {
            return requester<
                GetGroupByIdWithInheritance_Group_RoleByUserQuery,
                GetGroupByIdWithInheritance_Group_RoleByUserQueryVariables
            >(GetGroupByIdWithInheritance_Group_RoleByUserDocument, variables, options);
        },
        GetGroupByIDWithInheritance_organization(
            variables?: GetGroupByIdWithInheritance_OrganizationQueryVariables,
            options?: C,
        ): Maybe<GetGroupByIdWithInheritance_OrganizationQuery> {
            return requester<
                GetGroupByIdWithInheritance_OrganizationQuery,
                GetGroupByIdWithInheritance_OrganizationQueryVariables
            >(GetGroupByIdWithInheritance_OrganizationDocument, variables, options);
        },
        GetGroupByIDWithInheritance_organization_roleByUser(
            variables?: GetGroupByIdWithInheritance_Organization_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetGroupByIdWithInheritance_Organization_RoleByUserQuery> {
            return requester<
                GetGroupByIdWithInheritance_Organization_RoleByUserQuery,
                GetGroupByIdWithInheritance_Organization_RoleByUserQueryVariables
            >(GetGroupByIdWithInheritance_Organization_RoleByUserDocument, variables, options);
        },
        GetGroupMembers(variables?: GetGroupMembersQueryVariables, options?: C): Maybe<GetGroupMembersQuery> {
            return requester<GetGroupMembersQuery, GetGroupMembersQueryVariables>(
                GetGroupMembersDocument,
                variables,
                options,
            );
        },
        GetGroupMembers_connection(
            variables?: GetGroupMembers_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetGroupMembers_ConnectionQuery> {
            return requester<GetGroupMembers_ConnectionQuery, GetGroupMembers_ConnectionQueryVariables>(
                GetGroupMembers_ConnectionDocument,
                variables,
                options,
            );
        },
        GetGroupQuotaPlan(variables?: GetGroupQuotaPlanQueryVariables, options?: C): Maybe<GetGroupQuotaPlanQuery> {
            return requester<GetGroupQuotaPlanQuery, GetGroupQuotaPlanQueryVariables>(
                GetGroupQuotaPlanDocument,
                variables,
                options,
            );
        },
        GetGroupQuotaPlan_quotaPlan(
            variables?: GetGroupQuotaPlan_QuotaPlanQueryVariables,
            options?: C,
        ): Maybe<GetGroupQuotaPlan_QuotaPlanQuery> {
            return requester<GetGroupQuotaPlan_QuotaPlanQuery, GetGroupQuotaPlan_QuotaPlanQueryVariables>(
                GetGroupQuotaPlan_QuotaPlanDocument,
                variables,
                options,
            );
        },
        GetManyApiKey(variables?: GetManyApiKeyQueryVariables, options?: C): Maybe<GetManyApiKeyQuery> {
            return requester<GetManyApiKeyQuery, GetManyApiKeyQueryVariables>(GetManyApiKeyDocument, variables, options);
        },
        GetManyAuditEvents(variables?: GetManyAuditEventsQueryVariables, options?: C): Maybe<GetManyAuditEventsQuery> {
            return requester<GetManyAuditEventsQuery, GetManyAuditEventsQueryVariables>(
                GetManyAuditEventsDocument,
                variables,
                options,
            );
        },
        GetManyAuditEvents_connection(
            variables?: GetManyAuditEvents_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyAuditEvents_ConnectionQuery> {
            return requester<GetManyAuditEvents_ConnectionQuery, GetManyAuditEvents_ConnectionQueryVariables>(
                GetManyAuditEvents_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyBlueprints(variables?: GetManyBlueprintsQueryVariables, options?: C): Maybe<GetManyBlueprintsQuery> {
            return requester<GetManyBlueprintsQuery, GetManyBlueprintsQueryVariables>(
                GetManyBlueprintsDocument,
                variables,
                options,
            );
        },
        GetManyBlueprints_connection(
            variables?: GetManyBlueprints_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyBlueprints_ConnectionQuery> {
            return requester<GetManyBlueprints_ConnectionQuery, GetManyBlueprints_ConnectionQueryVariables>(
                GetManyBlueprints_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyDocumentFieldsByDocumentId(
            variables?: GetManyDocumentFieldsByDocumentIdQueryVariables,
            options?: C,
        ): Maybe<GetManyDocumentFieldsByDocumentIdQuery> {
            return requester<GetManyDocumentFieldsByDocumentIdQuery, GetManyDocumentFieldsByDocumentIdQueryVariables>(
                GetManyDocumentFieldsByDocumentIdDocument,
                variables,
                options,
            );
        },
        GetManyDocumentFieldsByFieldIds(
            variables?: GetManyDocumentFieldsByFieldIdsQueryVariables,
            options?: C,
        ): Maybe<GetManyDocumentFieldsByFieldIdsQuery> {
            return requester<GetManyDocumentFieldsByFieldIdsQuery, GetManyDocumentFieldsByFieldIdsQueryVariables>(
                GetManyDocumentFieldsByFieldIdsDocument,
                variables,
                options,
            );
        },
        GetManyDocuments(variables?: GetManyDocumentsQueryVariables, options?: C): Maybe<GetManyDocumentsQuery> {
            return requester<GetManyDocumentsQuery, GetManyDocumentsQueryVariables>(
                GetManyDocumentsDocument,
                variables,
                options,
            );
        },
        GetManyDocuments_connection(
            variables?: GetManyDocuments_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyDocuments_ConnectionQuery> {
            return requester<GetManyDocuments_ConnectionQuery, GetManyDocuments_ConnectionQueryVariables>(
                GetManyDocuments_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyDocumentsByIds(
            variables?: GetManyDocumentsByIdsQueryVariables,
            options?: C,
        ): Maybe<GetManyDocumentsByIdsQuery> {
            return requester<GetManyDocumentsByIdsQuery, GetManyDocumentsByIdsQueryVariables>(
                GetManyDocumentsByIdsDocument,
                variables,
                options,
            );
        },
        GetManyGroupsByUserID(
            variables?: GetManyGroupsByUserIdQueryVariables,
            options?: C,
        ): Maybe<GetManyGroupsByUserIdQuery> {
            return requester<GetManyGroupsByUserIdQuery, GetManyGroupsByUserIdQueryVariables>(
                GetManyGroupsByUserIdDocument,
                variables,
                options,
            );
        },
        GetManyGroupsByUserID_connection(
            variables?: GetManyGroupsByUserId_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyGroupsByUserId_ConnectionQuery> {
            return requester<GetManyGroupsByUserId_ConnectionQuery, GetManyGroupsByUserId_ConnectionQueryVariables>(
                GetManyGroupsByUserId_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyOrganizationsByUserID(
            variables?: GetManyOrganizationsByUserIdQueryVariables,
            options?: C,
        ): Maybe<GetManyOrganizationsByUserIdQuery> {
            return requester<GetManyOrganizationsByUserIdQuery, GetManyOrganizationsByUserIdQueryVariables>(
                GetManyOrganizationsByUserIdDocument,
                variables,
                options,
            );
        },
        GetManyOrganizationsByUserID_connection(
            variables?: GetManyOrganizationsByUserId_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyOrganizationsByUserId_ConnectionQuery> {
            return requester<
                GetManyOrganizationsByUserId_ConnectionQuery,
                GetManyOrganizationsByUserId_ConnectionQueryVariables
            >(GetManyOrganizationsByUserId_ConnectionDocument, variables, options);
        },
        GetManyPreviews(variables?: GetManyPreviewsQueryVariables, options?: C): Maybe<GetManyPreviewsQuery> {
            return requester<GetManyPreviewsQuery, GetManyPreviewsQueryVariables>(
                GetManyPreviewsDocument,
                variables,
                options,
            );
        },
        GetManyPreviews_connection(
            variables?: GetManyPreviews_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyPreviews_ConnectionQuery> {
            return requester<GetManyPreviews_ConnectionQuery, GetManyPreviews_ConnectionQueryVariables>(
                GetManyPreviews_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyProjectsByUserID(
            variables?: GetManyProjectsByUserIdQueryVariables,
            options?: C,
        ): Maybe<GetManyProjectsByUserIdQuery> {
            return requester<GetManyProjectsByUserIdQuery, GetManyProjectsByUserIdQueryVariables>(
                GetManyProjectsByUserIdDocument,
                variables,
                options,
            );
        },
        GetManyProjectsByUserID_connection(
            variables?: GetManyProjectsByUserId_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyProjectsByUserId_ConnectionQuery> {
            return requester<GetManyProjectsByUserId_ConnectionQuery, GetManyProjectsByUserId_ConnectionQueryVariables>(
                GetManyProjectsByUserId_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyReleasesByProjectId(
            variables?: GetManyReleasesByProjectIdQueryVariables,
            options?: C,
        ): Maybe<GetManyReleasesByProjectIdQuery> {
            return requester<GetManyReleasesByProjectIdQuery, GetManyReleasesByProjectIdQueryVariables>(
                GetManyReleasesByProjectIdDocument,
                variables,
                options,
            );
        },
        GetManyRoleRulesByRoleID(
            variables?: GetManyRoleRulesByRoleIdQueryVariables,
            options?: C,
        ): Maybe<GetManyRoleRulesByRoleIdQuery> {
            return requester<GetManyRoleRulesByRoleIdQuery, GetManyRoleRulesByRoleIdQueryVariables>(
                GetManyRoleRulesByRoleIdDocument,
                variables,
                options,
            );
        },
        GetManyTags(variables?: GetManyTagsQueryVariables, options?: C): Maybe<GetManyTagsQuery> {
            return requester<GetManyTagsQuery, GetManyTagsQueryVariables>(GetManyTagsDocument, variables, options);
        },
        GetManyTags_connection(
            variables?: GetManyTags_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyTags_ConnectionQuery> {
            return requester<GetManyTags_ConnectionQuery, GetManyTags_ConnectionQueryVariables>(
                GetManyTags_ConnectionDocument,
                variables,
                options,
            );
        },
        GetManyUserRoles(variables?: GetManyUserRolesQueryVariables, options?: C): Maybe<GetManyUserRolesQuery> {
            return requester<GetManyUserRolesQuery, GetManyUserRolesQueryVariables>(
                GetManyUserRolesDocument,
                variables,
                options,
            );
        },
        GetManyViews(variables?: GetManyViewsQueryVariables, options?: C): Maybe<GetManyViewsQuery> {
            return requester<GetManyViewsQuery, GetManyViewsQueryVariables>(GetManyViewsDocument, variables, options);
        },
        GetManyWebhookCalls(variables?: GetManyWebhookCallsQueryVariables, options?: C): Maybe<GetManyWebhookCallsQuery> {
            return requester<GetManyWebhookCallsQuery, GetManyWebhookCallsQueryVariables>(
                GetManyWebhookCallsDocument,
                variables,
                options,
            );
        },
        GetManyWebhookCalls_connection(
            variables?: GetManyWebhookCalls_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetManyWebhookCalls_ConnectionQuery> {
            return requester<GetManyWebhookCalls_ConnectionQuery, GetManyWebhookCalls_ConnectionQueryVariables>(
                GetManyWebhookCalls_ConnectionDocument,
                variables,
                options,
            );
        },
        GetOrganizationByID(variables?: GetOrganizationByIdQueryVariables, options?: C): Maybe<GetOrganizationByIdQuery> {
            return requester<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>(
                GetOrganizationByIdDocument,
                variables,
                options,
            );
        },
        GetOrganizationByID_organization(
            variables?: GetOrganizationById_OrganizationQueryVariables,
            options?: C,
        ): Maybe<GetOrganizationById_OrganizationQuery> {
            return requester<GetOrganizationById_OrganizationQuery, GetOrganizationById_OrganizationQueryVariables>(
                GetOrganizationById_OrganizationDocument,
                variables,
                options,
            );
        },
        GetOrganizationByID_organization_roleByUser(
            variables?: GetOrganizationById_Organization_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetOrganizationById_Organization_RoleByUserQuery> {
            return requester<
                GetOrganizationById_Organization_RoleByUserQuery,
                GetOrganizationById_Organization_RoleByUserQueryVariables
            >(GetOrganizationById_Organization_RoleByUserDocument, variables, options);
        },
        GetOrganizationMembers(
            variables?: GetOrganizationMembersQueryVariables,
            options?: C,
        ): Maybe<GetOrganizationMembersQuery> {
            return requester<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(
                GetOrganizationMembersDocument,
                variables,
                options,
            );
        },
        GetOrganizationMembers_connection(
            variables?: GetOrganizationMembers_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetOrganizationMembers_ConnectionQuery> {
            return requester<GetOrganizationMembers_ConnectionQuery, GetOrganizationMembers_ConnectionQueryVariables>(
                GetOrganizationMembers_ConnectionDocument,
                variables,
                options,
            );
        },
        GetOrganizationQuotaPlan(
            variables?: GetOrganizationQuotaPlanQueryVariables,
            options?: C,
        ): Maybe<GetOrganizationQuotaPlanQuery> {
            return requester<GetOrganizationQuotaPlanQuery, GetOrganizationQuotaPlanQueryVariables>(
                GetOrganizationQuotaPlanDocument,
                variables,
                options,
            );
        },
        GetOrganizationQuotaPlan_quotaPlan(
            variables?: GetOrganizationQuotaPlan_QuotaPlanQueryVariables,
            options?: C,
        ): Maybe<GetOrganizationQuotaPlan_QuotaPlanQuery> {
            return requester<GetOrganizationQuotaPlan_QuotaPlanQuery, GetOrganizationQuotaPlan_QuotaPlanQueryVariables>(
                GetOrganizationQuotaPlan_QuotaPlanDocument,
                variables,
                options,
            );
        },
        GetPermissionGrant(variables?: GetPermissionGrantQueryVariables, options?: C): Maybe<GetPermissionGrantQuery> {
            return requester<GetPermissionGrantQuery, GetPermissionGrantQueryVariables>(
                GetPermissionGrantDocument,
                variables,
                options,
            );
        },
        GetPermissionGrant_appliedRole(
            variables?: GetPermissionGrant_AppliedRoleQueryVariables,
            options?: C,
        ): Maybe<GetPermissionGrant_AppliedRoleQuery> {
            return requester<GetPermissionGrant_AppliedRoleQuery, GetPermissionGrant_AppliedRoleQueryVariables>(
                GetPermissionGrant_AppliedRoleDocument,
                variables,
                options,
            );
        },
        GetPermissionSet(variables?: GetPermissionSetQueryVariables, options?: C): Maybe<GetPermissionSetQuery> {
            return requester<GetPermissionSetQuery, GetPermissionSetQueryVariables>(
                GetPermissionSetDocument,
                variables,
                options,
            );
        },
        GetPermissionSet_appliedRole(
            variables?: GetPermissionSet_AppliedRoleQueryVariables,
            options?: C,
        ): Maybe<GetPermissionSet_AppliedRoleQuery> {
            return requester<GetPermissionSet_AppliedRoleQuery, GetPermissionSet_AppliedRoleQueryVariables>(
                GetPermissionSet_AppliedRoleDocument,
                variables,
                options,
            );
        },
        GetPreferredTheme(variables?: GetPreferredThemeQueryVariables, options?: C): Maybe<GetPreferredThemeQuery> {
            return requester<GetPreferredThemeQuery, GetPreferredThemeQueryVariables>(
                GetPreferredThemeDocument,
                variables,
                options,
            );
        },
        GetPreferredUiLanguage(
            variables?: GetPreferredUiLanguageQueryVariables,
            options?: C,
        ): Maybe<GetPreferredUiLanguageQuery> {
            return requester<GetPreferredUiLanguageQuery, GetPreferredUiLanguageQueryVariables>(
                GetPreferredUiLanguageDocument,
                variables,
                options,
            );
        },
        GetPreviewById(variables?: GetPreviewByIdQueryVariables, options?: C): Maybe<GetPreviewByIdQuery> {
            return requester<GetPreviewByIdQuery, GetPreviewByIdQueryVariables>(GetPreviewByIdDocument, variables, options);
        },
        GetPreviewById_preview(
            variables?: GetPreviewById_PreviewQueryVariables,
            options?: C,
        ): Maybe<GetPreviewById_PreviewQuery> {
            return requester<GetPreviewById_PreviewQuery, GetPreviewById_PreviewQueryVariables>(
                GetPreviewById_PreviewDocument,
                variables,
                options,
            );
        },
        GetPreviewItemsByBlueprintId(
            variables?: GetPreviewItemsByBlueprintIdQueryVariables,
            options?: C,
        ): Maybe<GetPreviewItemsByBlueprintIdQuery> {
            return requester<GetPreviewItemsByBlueprintIdQuery, GetPreviewItemsByBlueprintIdQueryVariables>(
                GetPreviewItemsByBlueprintIdDocument,
                variables,
                options,
            );
        },
        GetProjectByID(variables?: GetProjectByIdQueryVariables, options?: C): Maybe<GetProjectByIdQuery> {
            return requester<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, variables, options);
        },
        GetProjectByID_project(
            variables?: GetProjectById_ProjectQueryVariables,
            options?: C,
        ): Maybe<GetProjectById_ProjectQuery> {
            return requester<GetProjectById_ProjectQuery, GetProjectById_ProjectQueryVariables>(
                GetProjectById_ProjectDocument,
                variables,
                options,
            );
        },
        GetProjectByID_project_roleByUser(
            variables?: GetProjectById_Project_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetProjectById_Project_RoleByUserQuery> {
            return requester<GetProjectById_Project_RoleByUserQuery, GetProjectById_Project_RoleByUserQueryVariables>(
                GetProjectById_Project_RoleByUserDocument,
                variables,
                options,
            );
        },
        GetProjectByIDWithInheritance(
            variables?: GetProjectByIdWithInheritanceQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritanceQuery> {
            return requester<GetProjectByIdWithInheritanceQuery, GetProjectByIdWithInheritanceQueryVariables>(
                GetProjectByIdWithInheritanceDocument,
                variables,
                options,
            );
        },
        GetProjectByIDWithInheritance_group(
            variables?: GetProjectByIdWithInheritance_GroupQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritance_GroupQuery> {
            return requester<GetProjectByIdWithInheritance_GroupQuery, GetProjectByIdWithInheritance_GroupQueryVariables>(
                GetProjectByIdWithInheritance_GroupDocument,
                variables,
                options,
            );
        },
        GetProjectByIDWithInheritance_group_roleByUser(
            variables?: GetProjectByIdWithInheritance_Group_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritance_Group_RoleByUserQuery> {
            return requester<
                GetProjectByIdWithInheritance_Group_RoleByUserQuery,
                GetProjectByIdWithInheritance_Group_RoleByUserQueryVariables
            >(GetProjectByIdWithInheritance_Group_RoleByUserDocument, variables, options);
        },
        GetProjectByIDWithInheritance_organization(
            variables?: GetProjectByIdWithInheritance_OrganizationQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritance_OrganizationQuery> {
            return requester<
                GetProjectByIdWithInheritance_OrganizationQuery,
                GetProjectByIdWithInheritance_OrganizationQueryVariables
            >(GetProjectByIdWithInheritance_OrganizationDocument, variables, options);
        },
        GetProjectByIDWithInheritance_organization_roleByUser(
            variables?: GetProjectByIdWithInheritance_Organization_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritance_Organization_RoleByUserQuery> {
            return requester<
                GetProjectByIdWithInheritance_Organization_RoleByUserQuery,
                GetProjectByIdWithInheritance_Organization_RoleByUserQueryVariables
            >(GetProjectByIdWithInheritance_Organization_RoleByUserDocument, variables, options);
        },
        GetProjectByIDWithInheritance_project(
            variables?: GetProjectByIdWithInheritance_ProjectQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritance_ProjectQuery> {
            return requester<GetProjectByIdWithInheritance_ProjectQuery, GetProjectByIdWithInheritance_ProjectQueryVariables>(
                GetProjectByIdWithInheritance_ProjectDocument,
                variables,
                options,
            );
        },
        GetProjectByIDWithInheritance_project_roleByUser(
            variables?: GetProjectByIdWithInheritance_Project_RoleByUserQueryVariables,
            options?: C,
        ): Maybe<GetProjectByIdWithInheritance_Project_RoleByUserQuery> {
            return requester<
                GetProjectByIdWithInheritance_Project_RoleByUserQuery,
                GetProjectByIdWithInheritance_Project_RoleByUserQueryVariables
            >(GetProjectByIdWithInheritance_Project_RoleByUserDocument, variables, options);
        },
        GetProjectMembers(variables?: GetProjectMembersQueryVariables, options?: C): Maybe<GetProjectMembersQuery> {
            return requester<GetProjectMembersQuery, GetProjectMembersQueryVariables>(
                GetProjectMembersDocument,
                variables,
                options,
            );
        },
        GetProjectMembers_connection(
            variables?: GetProjectMembers_ConnectionQueryVariables,
            options?: C,
        ): Maybe<GetProjectMembers_ConnectionQuery> {
            return requester<GetProjectMembers_ConnectionQuery, GetProjectMembers_ConnectionQueryVariables>(
                GetProjectMembers_ConnectionDocument,
                variables,
                options,
            );
        },
        GetProjectPort(variables?: GetProjectPortQueryVariables, options?: C): Maybe<GetProjectPortQuery> {
            return requester<GetProjectPortQuery, GetProjectPortQueryVariables>(GetProjectPortDocument, variables, options);
        },
        GetProjectPort_selectionProgress(
            variables?: GetProjectPort_SelectionProgressQueryVariables,
            options?: C,
        ): Maybe<GetProjectPort_SelectionProgressQuery> {
            return requester<GetProjectPort_SelectionProgressQuery, GetProjectPort_SelectionProgressQueryVariables>(
                GetProjectPort_SelectionProgressDocument,
                variables,
                options,
            );
        },
        GetProjectQuotaPlan(variables?: GetProjectQuotaPlanQueryVariables, options?: C): Maybe<GetProjectQuotaPlanQuery> {
            return requester<GetProjectQuotaPlanQuery, GetProjectQuotaPlanQueryVariables>(
                GetProjectQuotaPlanDocument,
                variables,
                options,
            );
        },
        GetProjectQuotaPlan_quotaPlan(
            variables?: GetProjectQuotaPlan_QuotaPlanQueryVariables,
            options?: C,
        ): Maybe<GetProjectQuotaPlan_QuotaPlanQuery> {
            return requester<GetProjectQuotaPlan_QuotaPlanQuery, GetProjectQuotaPlan_QuotaPlanQueryVariables>(
                GetProjectQuotaPlan_QuotaPlanDocument,
                variables,
                options,
            );
        },
        GetReleaseById(variables?: GetReleaseByIdQueryVariables, options?: C): Maybe<GetReleaseByIdQuery> {
            return requester<GetReleaseByIdQuery, GetReleaseByIdQueryVariables>(GetReleaseByIdDocument, variables, options);
        },
        GetReleaseById_release(
            variables?: GetReleaseById_ReleaseQueryVariables,
            options?: C,
        ): Maybe<GetReleaseById_ReleaseQuery> {
            return requester<GetReleaseById_ReleaseQuery, GetReleaseById_ReleaseQueryVariables>(
                GetReleaseById_ReleaseDocument,
                variables,
                options,
            );
        },
        GetRoleRuleByID(variables?: GetRoleRuleByIdQueryVariables, options?: C): Maybe<GetRoleRuleByIdQuery> {
            return requester<GetRoleRuleByIdQuery, GetRoleRuleByIdQueryVariables>(
                GetRoleRuleByIdDocument,
                variables,
                options,
            );
        },
        GetRoleRuleByID_roleRule(
            variables?: GetRoleRuleById_RoleRuleQueryVariables,
            options?: C,
        ): Maybe<GetRoleRuleById_RoleRuleQuery> {
            return requester<GetRoleRuleById_RoleRuleQuery, GetRoleRuleById_RoleRuleQueryVariables>(
                GetRoleRuleById_RoleRuleDocument,
                variables,
                options,
            );
        },
        GetUnpublishedLinkedDocuments(
            variables?: GetUnpublishedLinkedDocumentsQueryVariables,
            options?: C,
        ): Maybe<GetUnpublishedLinkedDocumentsQuery> {
            return requester<GetUnpublishedLinkedDocumentsQuery, GetUnpublishedLinkedDocumentsQueryVariables>(
                GetUnpublishedLinkedDocumentsDocument,
                variables,
                options,
            );
        },
        GetUsageOfBlueprintField(
            variables?: GetUsageOfBlueprintFieldQueryVariables,
            options?: C,
        ): Maybe<GetUsageOfBlueprintFieldQuery> {
            return requester<GetUsageOfBlueprintFieldQuery, GetUsageOfBlueprintFieldQueryVariables>(
                GetUsageOfBlueprintFieldDocument,
                variables,
                options,
            );
        },
        GetUserRoleWithRoleRules(
            variables?: GetUserRoleWithRoleRulesQueryVariables,
            options?: C,
        ): Maybe<GetUserRoleWithRoleRulesQuery> {
            return requester<GetUserRoleWithRoleRulesQuery, GetUserRoleWithRoleRulesQueryVariables>(
                GetUserRoleWithRoleRulesDocument,
                variables,
                options,
            );
        },
        ReadUserAccessTokens(
            variables?: ReadUserAccessTokensQueryVariables,
            options?: C,
        ): Maybe<ReadUserAccessTokensQuery> {
            return requester<ReadUserAccessTokensQuery, ReadUserAccessTokensQueryVariables>(
                ReadUserAccessTokensDocument,
                variables,
                options,
            );
        },
        ValidateApiKey(variables?: ValidateApiKeyQueryVariables, options?: C): Maybe<ValidateApiKeyQuery> {
            return requester<ValidateApiKeyQuery, ValidateApiKeyQueryVariables>(ValidateApiKeyDocument, variables, options);
        },
        getUser(variables?: GetUserQueryVariables, options?: C): Maybe<GetUserQuery> {
            return requester<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
        },
        getUser_profile(variables?: GetUser_ProfileQueryVariables, options?: C): Maybe<GetUser_ProfileQuery> {
            return requester<GetUser_ProfileQuery, GetUser_ProfileQueryVariables>(
                GetUser_ProfileDocument,
                variables,
                options,
            );
        },
        getUser_settings(variables?: GetUser_SettingsQueryVariables, options?: C): Maybe<GetUser_SettingsQuery> {
            return requester<GetUser_SettingsQuery, GetUser_SettingsQueryVariables>(
                GetUser_SettingsDocument,
                variables,
                options,
            );
        },
        session(variables?: SessionQueryVariables, options?: C): Maybe<SessionQuery> {
            return requester<SessionQuery, SessionQueryVariables>(SessionDocument, variables, options);
        },
        userProfile(variables: UserProfileQueryVariables, options?: C): Maybe<UserProfileQuery> {
            return requester<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, variables, options);
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
