import { Provider, ProviderProcess } from "../common/types";
import { exportCaisyTags } from "./tag/export";
import { exportCaisyLocales } from "./locale/export";
import { importCaisyTags } from "./tag/import";
import { importCaisyBlueprints } from "./content-type/import";
import { initSdk } from "@caisy/sdk";
import { exportCaisyContentTypes } from "./content-type/export";
import { exportCaisyContentEntries } from "./content-entry/export";
import { exportCaisyAssets } from "./asset-files/asset";
import { importCaisyDocuments } from "./content-entry/import";

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
      await Promise.all([
        importCaisyTags({ sdk, projectId, onError, onProgress }),
        importCaisyBlueprints({ sdk, projectId, onError, onProgress }),
      ]);
      await importCaisyDocuments({ sdk, projectId, onError, onProgress });
      console.log("Successfully imported all data.");
    },
    export: async ({ onError, onProgress }): Promise<void> => {
      console.log("Exporting data from Caisy...");
      // export tags
      await Promise.all([
        exportCaisyTags({ sdk, projectId, onError, onProgress }),
        exportCaisyLocales({ sdk, projectId, onError, onProgress }),
      ]);
      const blueprintVariantsMap = await exportCaisyContentTypes({ sdk, projectId, onError, onProgress });

      await exportCaisyContentEntries({
        sdk,
        projectId,
        onError,
        onProgress,
        blueprintDetailsMap: blueprintVariantsMap,
      });

      await exportCaisyAssets({
        sdk,
        projectId,
        onError,
        onProgress,
      });
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
