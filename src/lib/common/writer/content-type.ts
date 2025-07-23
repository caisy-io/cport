import { db } from "../db";
import { contentType, contentTypeField, contentTypeGroup, contentTypeTag } from "../schema";
import { ContentType, ContentTypeField, ContentTypeGroup } from "../types/content-type";
import { contentTypeSchema } from "../zod/content-type";
import { z } from "zod";
import { requireString } from "../utils/type-guards";

export const writeContentType = async (contentTypeInput: ContentType) => {
  const contentTypeResult = await insertContentType(contentTypeInput);
  await insertContentTypeGroups(contentTypeInput);
  await insertContentTypeTags(contentTypeInput);
  return contentTypeResult;
};

const insertContentType = async (contentTypeInput: ContentType) => {
  try {
    if (!contentTypeInput.id) {
      throw new Error("Content type id is required");
    }
    return await db
      .insert(contentType)
      .values({
        id: contentTypeInput.id,
        name: contentTypeInput.name || "",
        title: contentTypeInput.title || "",
        variant: contentTypeInput.variant || "Document",
        single: contentTypeInput.single || false,
        exposeMutations: contentTypeInput.exposeMutations || false,
        system: contentTypeInput.system || false,
        description: contentTypeInput.description || null,
        previewImageUrl: contentTypeInput.previewImageUrl || null,
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
      .onConflictDoNothing()
      .execute();
  } catch (err) {
    console.log(` insertContentType`);
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};

const insertContentTypeGroups = async (contentTypeInput: ContentType) => {
  if (contentTypeInput.groups) {
    for (const group of contentTypeInput.groups) {
      if (group) {
        await insertContentTypeGroup(group);
        if (group.fields) {
          await insertContentTypeFields(group.fields);
        }
      }
    }
  }
};

const insertContentTypeGroup = async (group: ContentTypeGroup) => {
  if (!group.id) {
    throw new Error("Content type group id is required");
  }
  return await db
    .insert(contentTypeGroup)
    .values({
      id: group.id,
      name: group.name || "",
      contentTypeId: group.contentTypeId || "",
      position: group.position || 0,
    })
    .returning({
      id: contentTypeGroup.id,
      name: contentTypeGroup.name,
      contentTypeId: contentTypeGroup.contentTypeId,
      position: contentTypeGroup.position,
    })
    .onConflictDoNothing()
    .execute();
};

const insertContentTypeFields = async (fields: (ContentTypeField | null | undefined)[]) => {
  try {
    for (const field of fields) {
      if (field && field.id) {
        await db
          .insert(contentTypeField)
          .values({
            id: field.id,
            name: field.name || "",
            title: field.title || "",
            description: field.description || null,
            type: field.type || "String",
            groupId: field.groupId || "",
            position: field.position || 0,
            primary: field.primary || false,
            options: field.options || {},
            disableInUi: field.disableInUi || false,
            localized: field.localized || false,
            disableInApi: field.disableInApi || false,
            system: field.system || false,
            contentTypeId: field.contentTypeId || "",
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
          .onConflictDoNothing()
          .execute();
      }
    }
  } catch (err) {
    console.log(` insertContentTypeFields`);
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};

const insertContentTypeTags = async (contentTypeInput: ContentType) => {
  try {
    if (!contentTypeInput.id) {
      throw new Error("Content type id is required");
    }
    for (const tagId of contentTypeInput.tagIds || []) {
      if (!tagId) continue;
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
        .onConflictDoNothing()
        .execute();
    }
  } catch (err) {
    console.log(` insertContentTypeTags`);
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};
