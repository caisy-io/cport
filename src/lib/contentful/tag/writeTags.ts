import { Tag } from "contentful";
import { writeTag } from "../../common/writer/tag";
import { z } from "zod";
import { tagSchema } from "../../common/zod/tag";

export const writeTags = async (tags: Tag[]) => {
  for (const tag of tags) {
    try {
      const normalizedTag = normalizeContentfulTag(tag);
      console.info(JSON.stringify(normalizedTag, null, 2));
      await writeTag(normalizedTag);
    } catch (e) {
      const normalizedTag = normalizeContentfulTag(tag);
      console.error(JSON.stringify(normalizedTag, null, 2));
      throw new Error(`Error writing tag: ${e}`);
    }
  }
};

export const normalizeContentfulTag = (tag: Tag): z.infer<typeof tagSchema> => {
  // generate random color with the id
  return {
    id: tag.sys.id,
    name: tag.name,
    // color: tag.color,
  };
};
