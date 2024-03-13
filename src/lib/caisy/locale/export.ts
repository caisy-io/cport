import { DocumentFieldLocaleResponse } from "@caisy/sdk";
import { CaisyRunOptions } from "../provider";
import { writeContentLocale } from "../../common/writer/content-entry";
import { InferInsertModel } from "drizzle-orm";
import { contentLocale } from "../../common/schema";

export const exportCaisyLocales = async ({ sdk, projectId }: CaisyRunOptions): Promise<void> => {
  const allLocalesResult = await sdk.GetAllDocumentFieldLocale({
    input: {
      projectId,
    },
  });

  await Promise.all(
    allLocalesResult.GetAllDocumentFieldLocale.documentFieldLocales.map(async (locale) => {
      await writeContentLocale(normalizeCaisyLocale(locale));
    }),
  );
};

export const normalizeCaisyLocale = (locale: DocumentFieldLocaleResponse) => {
  return locale as InferInsertModel<typeof contentLocale>;
};
