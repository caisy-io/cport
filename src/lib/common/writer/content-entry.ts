import { db } from "../db";
import { contentLocale } from "../schema";
import { contentLocaleSchema } from "../zod/content-entry";
import { InferInsertModel } from "drizzle-orm";

export const writeContentLocale = async (locale: InferInsertModel<typeof contentLocale>) => {
  const input = contentLocaleSchema.parse(locale) as InferInsertModel<typeof contentLocale>;

  const dbRes = await db
    .insert(contentLocale)
    .values(input)
    .returning({
      id: contentLocale.id,
      apiName: contentLocale.apiName,
      title: contentLocale.title,
      flag: contentLocale.flag,
      fallbackLocaleId: contentLocale.fallbackLocaleId,
      default: contentLocale.default,
      disableInResponse: contentLocale.disableInResponse,
      disableEditing: contentLocale.disableEditing,
      allowEmptyRequired: contentLocale.allowEmptyRequired,
    })
    .execute();

  return dbRes;
};
