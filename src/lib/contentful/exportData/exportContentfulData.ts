import { saveToJson, saveToJsonAdvanced } from "./saveToJson";
const contentful = require("contentful");

// const contentfulSpace = "oz1hbkbww7w9";
// const contentfulAccessToken = "rTjM_XS3QTLXJpIBjtIMXm2LenP6rTwK6fJVh_KtRNs";

export async function exportContentfulData(
  provider: string,
  accessToken: string,
  spaceId: string,
  outputPath: string
): Promise<void> {
  try {
    const client = contentful.createClient({
      space: spaceId,
      accessToken: accessToken,
    });
    const contentModel = await client.getContentTypes();

    await saveToJson(contentModel, provider, spaceId, "content-model", outputPath);
  } catch (error) {
    console.error("❌ Error reading contentful entries:", error);
  }
}

export async function exportContentfulContentData(
  provider: string,
  accessToken: string,
  spaceId: string,
  outputPath: string
): Promise<void> {
  try {
    // for locales -> client.getLocales()
    // for assets -> client.getAssets()
    // for tags -> client.getTags()
    const client = contentful.createClient({
      space: spaceId,
      accessToken: accessToken,
    });
    const content = await client.getEntries();

    await saveToJsonAdvanced(content, provider, spaceId, "content", outputPath);
  } catch (error) {
    console.error("❌ Error reading contentful entries:", error);
  }
}

// importContentfulData("Contentful", contentfulAccessToken, contentfulSpace, "./output");
