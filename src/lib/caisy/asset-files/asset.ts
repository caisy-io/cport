import { assetUrls } from "../../common/writer/content-entry";
import { CaisyRunOptions } from "../provider";
import fetch from "node-fetch";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const RELATIVE_TARGET_DIR = "../../../../cport_assets";

function cleanFilename(filename: string): string {
  const withoutUuid = filename.substring(36);

  const cleanName = withoutUuid.replace(/\?original$/, "");

  return cleanName;
}

const downloadImage = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
  const buffer = await response.buffer();

  const uuid = uuidv4();
  const originalName = path.basename(url);
  const clearName = cleanFilename(originalName);
  console.log("clearName", clearName);
  const newName = `${uuid}${clearName}`;
  const targetDir = path.resolve(__dirname, RELATIVE_TARGET_DIR);
  const filePath = path.join(targetDir, newName);
  console.log("filePath", filePath);

  await fs.mkdir(targetDir, { recursive: true });

  await fs.writeFile(filePath, buffer);
  console.log(`Image saved as ${newName}`);
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
