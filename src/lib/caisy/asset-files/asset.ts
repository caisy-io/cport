import { assetUrls } from "../../common/writer/content-entry";
import { CaisyRunOptions } from "../provider";
import fetch from "node-fetch";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { db } from "../../common/db";
import { assetFile } from "../../common/schema";
import { AssetFile } from "../../common/types/content-entry";

const RELATIVE_TARGET_DIR = "../../../../cport_assets";
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;
const MAX_CONCURRENT_DOWNLOADS = 100;

function cleanFilename(url: string): string {
  let path = url.split("?")[0];

  let segments = path.split("/");

  let filename = segments.pop();

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(segments[segments.length - 1])) {
  } else {
    if (uuidRegex.test(filename.substring(0, 36))) {
      filename = filename.substring(36);
    }
  }

  return filename || "";
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const downloadImage = async (url: string, attempt = 1) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const buffer = await response.buffer();

    const uuid = uuidv4();
    const originalName = path.basename(url);
    const clearName = cleanFilename(originalName);

    const targetDir = path.resolve(__dirname, RELATIVE_TARGET_DIR + `/${uuid}`);
    const filePath = path.join(targetDir, clearName);

    await fs.mkdir(targetDir, { recursive: true });

    await fs.writeFile(filePath, buffer);
    const localPath = extractPathAfterMarker(filePath);
    await insertCportAsset({ id: uuid, originalUrl: url, localPath: localPath });
  } catch (error) {
    console.error(`Failed to download image from ${url}: ${error}`);
    if (attempt < MAX_RETRY_ATTEMPTS) {
      console.log(`Retrying... Attempt ${attempt + 1} of ${MAX_RETRY_ATTEMPTS}`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      await downloadImage(url, attempt + 1);
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
    return await db
      .insert(assetFile)
      .values({
        id: assetFileInput.id,
        original_url: assetFileInput.originalUrl,
        local_path: assetFileInput.localPath,
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
    throw new Error(err);
  }
};

export const assetFiles = async ({
  sdk,
  projectId,
  after,
  onProgress,
  onError,
}: CaisyRunOptions & { after: string | null }) => {
  const urls = Array.from(assetUrls).map((url) => `${url}?original`);

  const urlChunks = chunkArray(urls, MAX_CONCURRENT_DOWNLOADS);

  // Process each chunk sequentially
  for (const chunk of urlChunks) {
    await Promise.all(chunk.map((url) => downloadImage(url))).catch((error) => {
      console.error(`An error occurred during image downloads in a chunk:`, error);
    });
  }
};

export const exportCaisyAssets = async ({ sdk, projectId, onError, onProgress }: CaisyRunOptions): Promise<void> => {
  await assetFiles({
    sdk,
    projectId,
    onError,
    onProgress,
    after: null,
  });
};
