import { DocumentFieldLocaleResponse } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { contentLocaleSchema } from "../../common/zod/content-entry";
import { z } from "zod";
import { writeContentLocale } from "../../common/writer/content-entry";

export const exportCaisyLocales = async ({ sdk, projectId }: CaisyRunOptions): Promise<void> => {
  const allLocalesResult = await sdk.GetAllDocumentFieldLocale({
    input: {
      projectId,
    },
  });

  console.log(` allLocalesResult`, allLocalesResult);

  await Promise.all(
    allLocalesResult.GetAllDocumentFieldLocale.documentFieldLocales.map(async (locale) => {
      console.log(` locale`, locale);
      const res = await writeContentLocale(normalizeCaisyLocale(locale));
      console.log(` res`, res);
    }),
  );
};

export const normalizeCaisyLocale = (locale: DocumentFieldLocaleResponse): z.infer<typeof contentLocaleSchema> => {
  return locale;
};
