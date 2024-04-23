import { Provider, ProviderProcess } from "../common/types";
import contentfulExport from "contentful-export";
import fs from "fs";
import { ContentfulExport } from "./types";
import { writeContentTypes } from "./content-type/writeContentTypes";
import { ContentType } from "contentful";

export type ContentfulProviderOptions = {
  token: string;
  spaceId: string;
};

export type ContentfulRunOptions = {
  spaceId: string;
} & ProviderProcess;

export const createContentfulProvider = ({ token, spaceId }: ContentfulProviderOptions): Provider => {
  console.log(` { token, spaceId }`, { token, spaceId });

  return {
    name: "contentful",
    import: async ({ onError, onProgress }): Promise<void> => {
      console.log("Importing data from Contentful...");
    },
    export: async ({ onError, onProgress }): Promise<void> => {
      console.log("Exporting data from Contentful...");
      const options = {
        spaceId: spaceId,
        managementToken: token,
      };
      const fileContent = fs.readFileSync("contentful-export.json");
      const content = JSON.parse(fileContent.toString());

      const exportRes = content ? content : ((await contentfulExport(options)) as ContentfulExport);

      await writeContentTypes(exportRes.contentTypes as unknown as ContentType[]);

      fs.writeFileSync("contentful-export.json", JSON.stringify(exportRes, null, 2));
      // export tags
      // await Promise.all([
      //   exportContentfulTags({ sdk, projectId, onError, onProgress }),
      //   exportContentfulLocales({ sdk, projectId, onError, onProgress }),
      // ]);
      // await Promise.all([exportContentfulContentTypes({ sdk, projectId, onError, onProgress })]);

      // await db
      //   .select()
      //   .from(contentLocale)
      //   .then(function (rows) {
      //     console.log(` rows`, rows);
      //   });
    },
    checkCredentials: async (): Promise<boolean> => {
      try {
        return true;
      } catch (e) {
        console.error(` caisy checkCredentials e`, e);
        return false;
      }
    },
  };
};
