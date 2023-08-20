import options from "./cli";
import { Question } from "./types";

const questions: Question[] = [
  {
    type: "list",
    name: "action",
    message: "🔄 Do you want to import or export data?",
    choices: ["import", "export", "migrate"],
    when: () => !options.import && !options.export,
  },
  {
    type: "list",
    name: "provider",
    message: "🔍 Which provider do you want to export from?",
    choices: ["caisy", "contentful", "strapi"],
    when: (answers: any) => answers.action === "export" && !options.provider,
  },
  {
    type: "list",
    name: "dataType",
    message: "📦 Which data type do you want to export?",
    choices: ["Blueprints", "Documents", "All"],
    when: (answers: any) => answers.provider === "caisy" && !options.dataType,
  },
  {
    type: "list",
    name: "dataType",
    message: "📦 Which data type do you want to export?",
    choices: ["Content-Model", "All"],
    when: (answers: any) => answers.provider === "contentful" && !options.dataType,
  },
  {
    type: "input",
    name: "token",
    message: "🔑 Please enter your access token:",
    when: () => !options.token,
    validate: (input: string) => {
      if (!input) {
        return "Access token is required";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "projectId",
    message: "🆔 Please enter your project id:",
    when: (answers: any) => !options.projectId && (answers.provider === "caisy" || answers.action === "import"),
    validate: (input: string) => {
      if (!input) {
        return "Project id is required";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "userId",
    message: "🆔 Please enter your user id:",
    when: (answers: any) =>
      answers.action === "import" && !options.userId,
    validate: (input: string) => {
      if (!input) {
        return "User id is required";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "spaceId",
    message: "🆔 Please enter your space id:",
    when: (answers: any) => !options.spaceId && answers.provider === "contentful",
    validate: (input: string) => {
      if (!input) {
        return "Space id is required";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "outputPath",
    message: "📂 Please enter the output data storage location (default: ./output):",
    default: "./output",
    when: (answers: any) => answers.action === "export" && !options.outputPath,
  },
  {
    type: "input",
    name: "importPath",
    message: "📥 Please enter the input data storage location (default: ./input):",
    default: "./input",
    when: (answers: any) => answers.action === "import" && !options.importPath,
  },
];

export default questions;
