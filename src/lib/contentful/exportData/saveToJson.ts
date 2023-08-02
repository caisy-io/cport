import fs from "fs";
import stringify from 'json-stringify-safe';
export async function saveToJson(
  data: any,
  provider: string,
  spaceId: string,
  contentType: string,
  outputPath: string
): Promise<void> {
  try {
    data.items.forEach((item: any) => {
      const fileName = `${item.sys.id}.json`;
      const filePath = `${outputPath}/${provider}/${spaceId}/${contentType}/${fileName}`;
      const fileData = JSON.stringify(item, null, 2);

      if (!fs.existsSync(`${provider}/${outputPath}/${spaceId}/${contentType}`)) {
        fs.mkdirSync(`${outputPath}/${provider}/${spaceId}/${contentType}`, { recursive: true });
      }
      fs.writeFileSync(filePath, fileData);
    });
  } catch (error) {
    console.error("An error occurred while saving to JSON:", error);
    throw error;
  }
}

export async function saveToJsonAdvanced(
  data: any,
  provider: string,
  spaceId: string,
  contentType: string,
  outputPath: string
): Promise<void> {
  try {
    data.items.forEach((item: any) => {
      const fileName = `${item.sys.id}.json`;
      const filePath = `${outputPath}/${provider}/${spaceId}/${contentType}/${fileName}`;
      const fileData = stringify(item, null, 2);

      if (!fs.existsSync(`${provider}/${outputPath}/${spaceId}/${contentType}`)) {
        fs.mkdirSync(`${outputPath}/${provider}/${spaceId}/${contentType}`, { recursive: true });
      }
      fs.writeFileSync(filePath, fileData);
    });
  } catch (error) {
    console.error("An error occurred while saving to JSON:", error);
    throw error;
  }
}
