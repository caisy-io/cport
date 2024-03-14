import { Provider, ProviderProcess } from "../common/types";
import { exportCaisyTags } from "./tag/export";
import { exportCaisyLocales } from "./locale/export";
import { initSdk } from "@caisy/sdk";
import { db } from "../common/db";
import { contentLocale } from "../common/schema";
import { exportCaisyContentTypes } from "./content-type/export";

export type CaisyProviderOptions = {
  token: string;
  projectId: string;
  endpoint?: string;
};

export type CaisyRunOptions = {
  sdk: ReturnType<typeof initSdk>;
  projectId: string;
} & ProviderProcess;

export const createCaisyProvider = ({ token, endpoint, projectId }: CaisyProviderOptions): Provider => {
  console.log(` { token, endpoint }`, { token, endpoint });
  const sdk = initSdk({ token, endpoint });

  return {
    name: "caisy",
    import: async ({ onError, onProgress }): Promise<void> => {
      console.log("Importing data from Caisy...");
    },
    export: async ({ onError, onProgress }): Promise<void> => {
      console.log("Exporting data from Caisy...");
      // export tags
      await Promise.all([
        exportCaisyTags({ sdk, projectId, onError, onProgress }),
        exportCaisyLocales({ sdk, projectId, onError, onProgress }),
      ]);
      await Promise.all([exportCaisyContentTypes({ sdk, projectId, onError, onProgress })]);

      // await db
      //   .select()
      //   .from(contentLocale)
      //   .then(function (rows) {
      //     console.log(` rows`, rows);
      //   });
    },
    checkCredentials: async (): Promise<boolean> => {
      try {
        const project = await sdk.GetProjectByID({ input: { projectId } });
        return !!project?.GetProjectByID?.project?.projectId;
      } catch (e) {
        console.error(` caisy checkCredentials e`, e);
        return false;
      }
    },
  };
};
