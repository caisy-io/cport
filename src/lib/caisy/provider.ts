import { IProvider } from "../common/types";

export type CaisyProviderOptions = {
  token: string;
  projectId: string;
};

export const createCaisyProvider = ({ token, projectId }: CaisyProviderOptions): IProvider => {
  return {
    name: "caisy",
    import: async (options: any): Promise<void> => {
      console.log("Importing data from Caisy...");
    },
    export: async (options: any): Promise<void> => {
      console.log("Exporting data from Caisy...");
    },
  };
};
