import { assetUrls } from "../../common/writer/content-entry";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { db } from "../../common/db";
import { assetFile } from "../../common/schema";
import { AssetFile } from "../../common/types/content-entry";

const RELATIVE_TARGET_DIR = "../../../../cport_assets/contentful";
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

const downloadImage = async (url: string, assetId: string, attempt = 1) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = path.basename(url);

    const targetDir = path.resolve(__dirname, RELATIVE_TARGET_DIR + `/${assetId}`);
    const filePath = path.join(targetDir, originalName);

    await fs.mkdir(targetDir, { recursive: true });

    await fs.writeFile(filePath, buffer);
    const localPath = extractPathAfterMarker(filePath);
    await insertCportAsset({ id: assetId, originalUrl: url, localPath: localPath });
  } catch (error) {
    console.error(`Failed to download image from ${url}: ${error}`);
    if (attempt < MAX_RETRY_ATTEMPTS) {
      console.log(`Retrying... Attempt ${attempt + 1} of ${MAX_RETRY_ATTEMPTS}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      await downloadImage(url, assetId, attempt + 1);
    } else {
      console.error(`Failed to download image after ${MAX_RETRY_ATTEMPTS} attempts`);
      throw error;
    }
  }
  return;
};

function extractPathAfterMarker(fullPath: string): string {
  const marker = "cport_assets";
  const parts = fullPath.split(marker);
  if (parts.length > 1) {
    return marker + parts[1];
  } else {
    return fullPath;
  }
}

const insertCportAsset = async (assetFileInput: AssetFile) => {
  try {
    if (!assetFileInput.id) {
      throw new Error("Asset ID is required");
    }
    return await db
      .insert(assetFile)
      .values({
        id: assetFileInput.id,
        original_url: assetFileInput.originalUrl || null,
        local_path: assetFileInput.localPath || null,
      })
      .returning({
        id: assetFile.id,
        original_url: assetFile.original_url,
        local_path: assetFile.local_path,
      })
      .onConflictDoNothing()
      .execute();
  } catch (err) {
    console.log(` insertCportAsset err`, err);
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};

export const writeAssets = async (assets: any[], defaultLocale?: string) => {
  for (const asset of assets) {
    const assetUrl = await getAssetUrl(asset, defaultLocale);
    // console.log(` assetUrl`, assetUrl);
    if (assetUrl) {
      await downloadImage(assetUrl, asset.sys.id);
    } else {
      console.log(`Skipping asset ${asset.sys.id} - no valid URL found`);
    }
  }
};

async function getAssetUrl(asset: any, defaultLocale = "en-US"): Promise<string | null> {
  // console.log(` asset.fields.file`, asset?.fields?.file, defaultLocale);
  if (asset && asset.fields && asset.fields.file && asset.fields.file[defaultLocale]) {
    const fileUrl = asset.fields.file[defaultLocale].url;
    return `https:${fileUrl}`;
  }
  return null;
}
