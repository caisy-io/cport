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
    when: () => !options.projectId,
    validate: (input: string) => {
      if (!input) {
        return "Project id is required";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "outputPath",
    message: "📂 Please enter the output data storage location (default: ./output):",
    default: "./output",
    when: (answers: any) => answers.action === "import" && !options.outputPath,
  },
  {
    type: "input",
    name: "importPath",
    message: "📥 Please enter the input data storage location (default: ./input):",
    default: "./input",
    when: (answers: any) => answers.action === "export" && !options.importPath,
  },
];

export default questions;
