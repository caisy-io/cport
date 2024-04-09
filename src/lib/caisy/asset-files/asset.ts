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
const MAX_RETRY_ATTEMPTS = 3; // Maximum number of retry attempts
const RETRY_DELAY = 1000; // Delay between retries in milliseconds

function cleanFilename(url: string): string {
  // Remove query parameters, if any
  let path = url.split("?")[0];

  // Split the path into segments
  let segments = path.split("/");

  // Extract the last segment as the filename
  let filename = segments.pop();

  // Check if the filename is preceded by a UUID, considering the second last segment now
  // UUIDs are 36 characters long, including hyphens
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(segments[segments.length - 1])) {
    // If the preceding segment is a UUID, we've already popped the filename
    // So, we don't need to adjust the filename variable
  } else {
    // If there's no UUID directly before the filename, check if the filename itself contains UUID
    if (uuidRegex.test(filename.substring(0, 36))) {
      // If the filename starts with UUID, strip the UUID from the filename
      filename = filename.substring(36);
    }
  }

  return filename || "";
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
    console.log("filePath", filePath);

    await fs.mkdir(targetDir, { recursive: true });

    await fs.writeFile(filePath, buffer);
    console.log(`Image saved as ${clearName}`);
    await insertCportAsset({ id: uuid, originalUrl: url, localPath: filePath });
  } catch (error) {
    console.error(`Failed to download image from ${url}: ${error}`);
    if (attempt < MAX_RETRY_ATTEMPTS) {
      console.log(`Retrying... Attempt ${attempt + 1} of ${MAX_RETRY_ATTEMPTS}`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      await downloadImage(url, attempt + 1);
    } else {
      console.error(`Failed to download image after ${MAX_RETRY_ATTEMPTS} attempts`);
      // Handle the final failure case here, e.g., by logging, throwing an error, etc.
      throw error;
    }
  }
};

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
  const downloadPromises = Array.from(assetUrls).map(async (url) => {
    const modifiedUrl = `${url}?original`;
    try {
      await downloadImage(modifiedUrl);
    } catch (error) {
      console.error(`Failed to download image from ${url}:`, error);
    }
  });
  await Promise.all(downloadPromises);
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
