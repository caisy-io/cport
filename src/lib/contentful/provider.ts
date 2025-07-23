import { Provider } from "../common/types";
import contentfulExport from "contentful-export";
import { ContentfulExport, ContentfulExportContentType } from "./types";
import { writeContentTypes } from "./content-type/writeContentTypes";
import { writeContentEntries, writeContentLocales } from "./content-entry/writeContentEntries";
import { adjustContentfulContentEntryFields } from "./../common/writer/content-entry";
import { writeAssets } from "./asset-files/asset";
import { writeTags } from "./tag/writeTags";

export type ContentfulProviderOptions = {
  token: string;
  deliveryToken: string;
  previewToken: string;
  spaceId: string;
  defaultLocale?: string;
};

function deepEqual(
  obj1: unknown,
  obj2: unknown,
  excludeKeys = new Set(["createdAt", "updatedAt", "revision"]),
  seen = new Set(),
): boolean {
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

  const keys1 = Object.keys(obj1 as Record<string, unknown>).filter(key => !excludeKeys.has(key));
  const keys2 = Object.keys(obj2 as Record<string, unknown>).filter(key => !excludeKeys.has(key));

  if (keys1.length !== keys2.length) {
    return false;
  }

  const record1 = obj1 as Record<string, unknown>;
  const record2 = obj2 as Record<string, unknown>;

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (typeof record1[key] === "object" && typeof record2[key] === "object") {
      if (!deepEqual(record1[key], record2[key], excludeKeys, seen)) {
        return false;
      }
    } else if (record1[key] !== record2[key]) {
      return false;
    }
  }

  return true;
}

function filterUniqueEntries(publishedEntries: any[], previewEntries: any[]): any[] {
  const publishedMap = new Map(publishedEntries.map(entry => [entry.sys.id, entry.fields]));

  return previewEntries.filter(previewEntry => {
    const publishedFields = publishedMap.get(previewEntry.sys.id);
    return !publishedFields || !deepEqual(publishedFields, previewEntry.fields);
  });
}

export const createContentfulProvider = ({
  deliveryToken,
  spaceId,
  previewToken,
  token,
  defaultLocale = "en-US",
}: ContentfulProviderOptions): Provider => {
  const getDeliveryClient = async () => {
    const { createClient } = await import("contentful");
    return createClient({
      space: spaceId,
      accessToken: deliveryToken,
      environment: "master",
    });
  };

  const getPreviewClient = async () => {
    const { createClient } = await import("contentful");
    return createClient({
      space: spaceId,
      accessToken: previewToken,
      host: "preview.contentful.com",
    });
  };

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
        // assets: true,
        // contentTypes: true,
        // locales: true,
        // environment: "master",
      };
      const exportRes = (await contentfulExport(options)) as ContentfulExport;
      await writeTags(exportRes.tags);
      await writeContentTypes(exportRes.contentTypes as ContentfulExportContentType[]);
      await writeContentLocales(exportRes.locales as unknown as any[]);
      await writeAssets(exportRes.assets, defaultLocale);
      let publishedEntries = [];
      let previewEntries = [];
      const allPublishedEntries = [];
      const allUniquePreviewEntries = [];
      for (const locale of exportRes.locales) {
        try {
          const deliveryClient = await getDeliveryClient();
          publishedEntries = [];
          let skip = 0;
          const limit = 1000; // Max limit for Contentful
          let hasMore = true;

          while (hasMore) {
            const response = await deliveryClient.getEntries({
              locale: locale.code,
              limit: limit,
              skip: skip,
            });
            publishedEntries.push(...response.items);
            skip += limit;
            hasMore = response.items.length === limit; // Continue if we got full page
          }

          allPublishedEntries.push(...publishedEntries);
          console.log("Fetched published entries:", publishedEntries.length);
        } catch (error) {
          console.error("Error fetching published entries:", error);
        }

        // Fetch preview entries
        try {
          const previewClient = await getPreviewClient();
          previewEntries = [];
          let skip = 0;
          const limit = 1000; // Max limit for Contentful
          let hasMore = true;

          while (hasMore) {
            const response = await previewClient.getEntries({
              locale: locale.code,
              limit: limit,
              skip: skip,
            });
            previewEntries.push(...response.items);
            skip += limit;
            hasMore = response.items.length === limit; // Continue if we got full page
          }

          console.log("Fetched preview entries:", previewEntries.length);
        } catch (error) {
          console.error("Error fetching preview entries:", error);
        }
        const uniquePreviewEntries = filterUniqueEntries(publishedEntries, previewEntries);
        allUniquePreviewEntries.push(...uniquePreviewEntries);
        console.log(`Unique preview entries:`, uniquePreviewEntries.length);
      }

      await writeContentEntries(allPublishedEntries as unknown as any[], 0, exportRes.contentTypes, defaultLocale);
      await writeContentEntries(allUniquePreviewEntries as unknown as any[], 1, exportRes.contentTypes, defaultLocale);
      await adjustContentfulContentEntryFields();
    },
    checkCredentials: async (): Promise<boolean> => {
      return true; // You might want to validate by making a test API call
    },
  };
};
