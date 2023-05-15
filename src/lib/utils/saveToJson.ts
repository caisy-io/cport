import fs from "fs";

export async function saveToJson(
  data: any,
  provider: string,
  identifier: string, // can be either spaceId or projectId
  contentType: string,
  outputPath: string,
  fileNameFn: (item: any) => string, // function to generate file name
  dataFn: (item: any) => any, // function to extract data to save
): Promise<void> {

  const dataItems = Array.isArray(data) ? data : data.items; // handle different data structures

  dataItems.forEach((item: any) => {
    const fileName = `${fileNameFn(item)}.json`;
    const folderPath = `${outputPath}/${provider}/${identifier}/${contentType}`;

    const filePath = `${folderPath}/${fileName}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(dataFn(item), null, 2));
    console.log(`✅ ${filePath}`);
  });
}
