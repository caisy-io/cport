import fs from "fs";

export async function saveToJson(
  data: any,
  projectId: string,
  contentType: string,
  outputPath: string
): Promise<void> {
  data.forEach((element: any, index: number) => {
    const title: string = element.node.title.replace(/[^a-zA-Z0-9]/g, "_");
    const projectPath = `${outputPath}/${projectId}/${contentType}`;
    const filePath = `${projectPath}/${title}.json`;

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(element.node, null, 2));
  });
}
