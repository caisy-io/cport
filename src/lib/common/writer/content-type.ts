import { db } from "../db";
import { contentType, contentTypeField, contentTypeGroup, contentTypeTag } from "../schema";
import { ContentType, ContentTypeField, ContentTypeGroup } from "../types/content-type";
import { contentTypeSchema } from "../zod/content-type";
import { z } from "zod";

export const writeContentType = async (contentTypeInput: ContentType) => {
  const contentTypeResult = await insertContentType(contentTypeInput);
  await insertContentTypeGroups(contentTypeInput);
  await insertContentTypeTags(contentTypeInput);
  return contentTypeResult;
};

const insertContentType = async (contentTypeInput: ContentType) => {
  try {
    return await db
      .insert(contentType)
      .values({
        id: contentTypeInput.id,
        name: contentTypeInput.name,
        title: contentTypeInput.title,
        variant: contentTypeInput.variant,
        single: contentTypeInput.single,
        exposeMutations: contentTypeInput.exposeMutations,
        system: contentTypeInput.system,
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
  } catch (err) {
    console.log(` insertContentType`);
    throw new Error(err);
  }
};

const insertContentTypeGroups = async (contentTypeInput: ContentType) => {
  for (const group of contentTypeInput.groups) {
    await insertContentTypeGroup(group);
    await insertContentTypeFields(group.fields);
  }
};

const insertContentTypeGroup = async (group: ContentTypeGroup) => {
  try {
    return await db
      .insert(contentTypeGroup)
      .values({
        id: group.id,
        name: group.name,
        contentTypeId: group.contentTypeId,
        position: group.position,
      })
      .returning({
        id: contentTypeGroup.id,
        name: contentTypeGroup.name,
        contentTypeId: contentTypeGroup.contentTypeId,
        position: contentTypeGroup.position,
      })
      .execute();
  } catch (err) {
    console.log(` insertContentTypeGroup`);
    throw new Error(err);
  }
};

const insertContentTypeFields = async (fields: ContentTypeField[]) => {
  try {
    for (const field of fields) {
      await db
        .insert(contentTypeField)
        .values({
          id: field.id,
          name: field.name,
          title: field.title,
          description: field.description,
          type: field.type,
          groupId: field.groupId,
          position: field.position,
          primary: field.primary,
          options: field.options,
          disableInUi: field.disableInUi,
          localized: field.localized,
          disableInApi: field.disableInApi,
          system: field.system,
          contentTypeId: field.contentTypeId,
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
  } catch (err) {
    console.log(` insertContentTypeFields`);
    throw new Error(err);
  }
};

const insertContentTypeTags = async (contentTypeInput: z.infer<typeof contentTypeSchema>) => {
  try {
    for (const tagId of contentTypeInput.tagIds || []) {
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
  } catch (err) {
    console.log(` insertContentTypeTags`);
    throw new Error(err);
  }
};
