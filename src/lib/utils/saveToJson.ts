import fs from "fs";

export async function saveToJson(
  data: any,
  projectId: string,
  contentType: string,
  outputPath: string
): Promise<void> {
  data.forEach((element: any, index: number) => {
    const nameOrTitle = element.node.name || element.node.title;
    const title: string = nameOrTitle.replace(/[^a-zA-Z0-9]/g, "_");
    const projectPath = `${outputPath}/${projectId}/${contentType}`;
    //Todo name instead of title
    const filePath = `${projectPath}/${title}.json`;

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(element.node, null, 2));
  });
}
