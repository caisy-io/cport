import { Provider } from "../common/types";
import contentfulExport from "contentful-export";
import { ContentfulExport } from "./types";
import { writeContentTypes } from "./content-type/writeContentTypes";
import { writeContentEntries, writeContentLocales } from "./content-entry/writeContentEntries";
import { ContentType, Entry, Locale, createClient } from "contentful";
import { adjustContentfulContentEntryFields } from "./../common/writer/content-entry";
import { writeAssets } from "./asset-files/asset";

export type ContentfulProviderOptions = {
  token: string;
  deliveryToken: string;
  previewToken: string;
  spaceId: string;
};

function deepEqual(obj1, obj2, excludeKeys = new Set(["createdAt", "updatedAt", "revision"]), seen = new Set()) {
  if (seen.has(obj1) || seen.has(obj2)) {
    return true;
  }
  seen.add(obj1);
  seen.add(obj2);

  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1).filter((key) => !excludeKeys.has(key));
  const keys2 = Object.keys(obj2).filter((key) => !excludeKeys.has(key));

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!deepEqual(obj1[key], obj2[key], excludeKeys, seen)) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function filterUniqueEntries(publishedEntries, previewEntries) {
  const publishedMap = new Map(publishedEntries.map((entry) => [entry.sys.id, entry.fields]));

  return previewEntries.filter((previewEntry) => {
    const publishedFields = publishedMap.get(previewEntry.sys.id);
    return !publishedFields || !deepEqual(publishedFields, previewEntry.fields);
  });
}

export const createContentfulProvider = ({
  deliveryToken,
  spaceId,
  previewToken,
  token,
}: ContentfulProviderOptions): Provider => {
  const deliveryClient = createClient({
    space: spaceId,
    accessToken: deliveryToken,
    environment: "master",
  });

  const previewClient = createClient({
    space: spaceId,
    accessToken: previewToken,
    host: "preview.contentful.com",
  });

  return {
    name: "contentful",
    import: async ({ onError, onProgress }): Promise<void> => {
      console.log("Importing data from Contentful...");
    },
    export: async ({ onError, onProgress }): Promise<void> => {
      console.log("Exporting data from Contentful...");
      // Process and save entries
      const options = {
        spaceId: spaceId,
        managementToken: token,
      };
      const exportRes = (await contentfulExport(options)) as ContentfulExport;
      await writeContentTypes(exportRes.contentTypes as unknown as ContentType[]);
      await writeContentLocales(exportRes.locales as unknown as Locale[]);
      await writeAssets(exportRes.assets);
      let publishedEntries = [];
      let previewEntries = [];
      let allPublishedEntries = [];
      let allUniquePreviewEntries = [];
      for (const locale of exportRes.locales) {
        try {
          const response = await deliveryClient.getEntries({ locale: locale.code });
          publishedEntries = response.items;
          allPublishedEntries.push(...publishedEntries);
          console.log("Fetched published entries:", publishedEntries.length);
        } catch (error) {
          console.error("Error fetching published entries:", error);
        }

        // Fetch preview entries
        try {
          const response = await previewClient.getEntries({ locale: locale.code });
          previewEntries = response.items;
          console.log("Fetched preview entries:", previewEntries.length);
        } catch (error) {
          console.error("Error fetching preview entries:", error);
        }
        const uniquePreviewEntries = filterUniqueEntries(publishedEntries, previewEntries);
        allUniquePreviewEntries.push(...uniquePreviewEntries);
        console.log(`Unique preview entries:`, uniquePreviewEntries.length);
      }

      await writeContentEntries(allPublishedEntries as unknown as Entry[], 0);
      await writeContentEntries(allUniquePreviewEntries as unknown as Entry[], 1);
      await adjustContentfulContentEntryFields();
    },
    checkCredentials: async (): Promise<boolean> => {
      try {
        return true; // You might want to validate by making a test API call
      } catch (e) {
        console.error(`Check credentials failed`, e);
        return false;
      }
    },
  };
};
