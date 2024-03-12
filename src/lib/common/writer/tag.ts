import { db } from "../db";
import { tag } from "../schema";
import { z } from "zod";
import { tagSchema } from "../zod/tag";

export const writeTag = (locale: z.infer<typeof tagSchema>) => {
  const input = tagSchema.parse({
    id: locale.id,
    name: locale.name,
    color: locale.color,
  });

  return db
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
};
