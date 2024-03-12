import { db } from "../db";
import { contentLocale } from "../schema";
import { contentLocaleSchema } from "../zod/content-entry";
import { z } from "zod";

export const writeContentLocale = async (locale: z.infer<typeof contentLocaleSchema>) => {
  console.log(` writeContentLocale`);
  const input = contentLocaleSchema.parse({
    id: locale.id,
    apiName: locale.apiName,
    title: locale.title,
    flag: locale.flag,
    fallbackLocaleId: locale.fallbackLocaleId,
    default: locale.default,
    disableInResponse: locale.disableInResponse,
    disableEditing: locale.disableEditing,
    allowEmptyRequired: locale.allowEmptyRequired,
  });

  console.log(` input`, input);
  const dbRes = await db
    .insert(contentLocale)
    .values({
      id: input.id,
      apiName: input.apiName,
      title: input.title,
      flag: input.flag,
      fallbackLocaleId: input.fallbackLocaleId,
      default: input.default,
      disableInResponse: input.disableInResponse,
      disableEditing: input.disableEditing,
      allowEmptyRequired: input.allowEmptyRequired,
    })
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

  console.log(` dbRes`, dbRes);

  return dbRes;
};
