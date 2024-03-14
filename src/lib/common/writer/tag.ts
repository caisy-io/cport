import { db } from "../db";
import { tag } from "../schema";
import { z } from "zod";
import { tagSchema } from "../zod/tag";

export const writeTag = async (tagInput: z.infer<typeof tagSchema>) => {
  try {
    const input = tagSchema.parse({
      id: tagInput.id,
      name: tagInput.name,
      color: tagInput.color,
    });

    const r = await db
      .insert(tag)
      .values({
        id: input.id,
        color: input.color,
        name: input.name,
      })
      .returning({
        id: tag.id,
        color: tag.color,
        name: tag.name,
      })
      .execute();
    return r;
  } catch (err) {
    throw new Error(err);
  }
};
