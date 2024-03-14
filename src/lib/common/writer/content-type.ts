import { normalizeCaisyContentType } from "../../caisy/content-type/normalize";
import { db } from "../db";
import { ContentTypeVariant, contentType, contentTypeField, contentTypeGroup, contentTypeTag } from "../schema";

export const writeContentType = async (contentTypeInput: ReturnType<typeof normalizeCaisyContentType>) => {
  try {
    const contentTypeResult = await insertContentType(contentTypeInput);
    await insertContentTypeGroups(contentTypeInput);
    await insertContentTypeTags(contentTypeInput);
    return contentTypeResult;
  } catch (err) {
    throw new Error(err);
  }
};

const insertContentType = async (contentTypeInput: ReturnType<typeof normalizeCaisyContentType>) => {
  return await db
    .insert(contentType)
    .values({
      id: contentTypeInput.id,
      name: contentTypeInput.name,
      title: contentTypeInput.title,
      variant: contentTypeInput.variant as ContentTypeVariant,
      single: contentTypeInput.single ? 1 : 0,
      exposeMutations: contentTypeInput.exposeMutations ? 1 : 0,
      system: contentTypeInput.system ? 1 : 0,
      description: contentTypeInput.description,
      previewImageUrl: contentTypeInput.previewImageUrl,
    })
    .returning({
      id: contentType.id,
      name: contentType.name,
      title: contentType.title,
      variant: contentType.variant,
      single: contentType.single,
      exposeMutations: contentType.exposeMutations,
      system: contentType.system,
      description: contentType.description,
      previewImageUrl: contentType.previewImageUrl,
    })
    .execute();
};

const insertContentTypeGroups = async (contentTypeInput: ReturnType<typeof normalizeCaisyContentType>) => {
  for (const group of contentTypeInput.groups) {
    await insertContentTypeGroup(group, contentTypeInput.id);
    await insertContentTypeFields(group.fields, group.id, contentTypeInput.id);
  }
};

const insertContentTypeGroup = async (
  group: ReturnType<typeof normalizeCaisyContentType>["groups"][number],
  contentTypeId: string,
) => {
  return await db
    .insert(contentTypeGroup)
    .values({
      id: group.id,
      name: group.name,
      contentTypeId: contentTypeId,
      position: group.position,
    })
    .returning({
      id: contentTypeGroup.id,
      name: contentTypeGroup.name,
      contentTypeId: contentTypeGroup.contentTypeId,
      position: contentTypeGroup.position,
    })
    .execute();
};

const insertContentTypeFields = async (
  fields: ReturnType<typeof normalizeCaisyContentType>["groups"][number]["fields"],
  groupId: string,
  contentTypeId: string,
) => {
  for (const field of fields) {
    await db
      .insert(contentTypeField)
      .values({
        id: `${field.id}`,
        name: field.name,
        title: field.title,
        description: field.description,
        type: field.type,
        groupId: groupId,
        position: field.position,
        primary: field.primary ? 1 : 0,
        options: field.options || "{}",
        contentTypeId: contentTypeId,
        disableInUi: field.disableInUi ? 1 : 0,
        localized: field.localized ? 1 : 0,
        disableInApi: field.disableInApi ? 1 : 0,
        system: field.system ? 1 : 0,
      })
      .returning({
        id: contentTypeField.id,
        name: contentTypeField.name,
        title: contentTypeField.title,
        description: contentTypeField.description,
        type: contentTypeField.type,
        groupId: contentTypeField.groupId,
        position: contentTypeField.position,
        primary: contentTypeField.primary,
        options: contentTypeField.options,
        contentTypeId: contentTypeField.contentTypeId,
        disableInUi: contentTypeField.disableInUi,
        localized: contentTypeField.localized,
        disableInApi: contentTypeField.disableInApi,
        system: contentTypeField.system,
      })
      .execute();
  }
};

const insertContentTypeTags = async (contentTypeInput: ReturnType<typeof normalizeCaisyContentType>) => {
  for (const tagId of contentTypeInput.tagIds) {
    await db
      .insert(contentTypeTag)
      .values({
        contentTypeId: contentTypeInput.id,
        tagId,
      })
      .returning({
        contentTypeId: contentTypeTag.contentTypeId,
        tagId: contentTypeTag.tagId,
      })
      .execute();
  }
};
