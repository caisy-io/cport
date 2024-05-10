import { Provider, ProviderProcess } from "../common/types";
import contentfulExport from "contentful-export";
import { ContentfulExport } from "./types";
import { writeContentTypes } from "./content-type/writeContentTypes";
import { writeContentEntries, writeContentLocales } from "./content-entry/writeContentEntries";
import { ContentType, Entry, Locale, createClient } from "contentful";
import fs from "fs";

export type ContentfulProviderOptions = {
  token: string;
  deliveryToken: string;
  previewToken: string;
  spaceId: string;
};

export type ContentfulRunOptions = {
  spaceId: string;
} & ProviderProcess;

function filterUniqueEntries(publishedEntries: Entry[], previewEntries: Entry[]): Entry[] {
  const publishedIds = new Set(publishedEntries.map((entry) => entry.sys.id));
  return previewEntries.filter((entry) => !publishedIds.has(entry.sys.id));
}

export const createContentfulProvider = ({ token, spaceId, previewToken }: ContentfulProviderOptions): Provider => {
  console.log(` { token, spaceId}`, { token, spaceId });
  const client = createClient({
    space: spaceId,
    accessToken: previewToken,
    host: "preview.contentful.com",
  });

  // Example usage
  // let draftEntries = client.getEntries()
  //   .then((entries) => console.log(entries))
  //   .catch((error) => console.error(error));
  let allEntries = [];
  client.getEntries().then((response) => {
    allEntries = response.items;
  });
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

      const exportRes = (await contentfulExport(options)) as ContentfulExport;
      await writeContentTypes(exportRes.contentTypes as unknown as ContentType[]);
      await writeContentLocales(exportRes.locales as unknown as Locale[]);
      await writeContentEntries(exportRes.entries as unknown as Entry[], 0);
      const uniquePreviewEntries = filterUniqueEntries(
        exportRes.entries as unknown as Entry[],
        allEntries as unknown as Entry[],
      );
      console.log(` uniquePreviewEntries`, uniquePreviewEntries);
      await writeContentEntries(uniquePreviewEntries as unknown as Entry[], 1);

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
