import { initSdk } from "@caisy/sdk";
import { CaisyProviderOptions } from "../provider";

export const runTagExport = async (options: CaisyProviderOptions): Promise<void> => {
  const sdk = initSdk({ token: options.token });

  const allLocalesResult = await sdk.GetAllDocumentFieldLocale({
    input: {
      projectId: options.projectId,
    },
  });

  await Promise.allSettled(
    allLocalesResult.GetAllDocumentFieldLocale.documentFieldLocales.map(async (locale) => {
      const normalizedLocale = normalizeLocale(locale);
      await writeLocale(normalizedLocale);
    }),
  );
};
