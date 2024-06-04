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
  return {
    id: tag.sys.id,
    name: tag.name,
    color: stringToColorCode(tag.sys.id),
  };
};

function stringToColorCode(inputString) {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
