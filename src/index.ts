import { program } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import * as cliProgress from "cli-progress";

import { getBlueprints, getDocuments } from "./lib/caisy/getData";
import { exportData } from "./lib/caisy/uploadData";

async function main(): Promise<void> {
  console.log(figlet.textSync("CPORT"));

  program
    .version("0.0.1")
    .option("-i, --import <import>", "import data from Caisy")
    .option("-e, --export <export>", "export data to Caisy")
    .option("-o, --outputPath <outputPath>", "output data storage location")
    .option("-I, --inputPath <inputPath>", "input data storage location")
    .option("-t, --token <token>", "access token")
    .option("-p, --projectId <projectId>", "project id")
    .parse(process.argv);

  const options = program.opts();

  if (!process.argv.slice(2).length) {
    // program.outputHelp();
    console.log("No arguments");
  }

  const questions = [
    {
      type: "list",
      name: "action",
      message: "Do you want to import or export data?",
      choices: ["import", "export"],
      when: () => !options.import || !options.export,
    },
    {
      type: "input",
      name: "token",
      message: "Please enter your access token:",
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
      message: "Please enter your project id:",
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
      message: "Please enter the output data storage location (default: ./output):",
      default: "./output",
      when: () => !options.outputPath,
    },
    {
      type: "input",
      name: "inputPath",
      message: "Please enter the input data storage location (default: ./input):",
      default: "./output",
      when: (answers) => !options.inputPath && !answers.outputPath && !options.outputPath,
    },
  ];

  const inquirer = require("inquirer");

  const answers = await inquirer.prompt(questions);

  const action = options.import || options.export || answers.action;
  const accessToken = options.token || answers.token;
  const projectId = options.projectId || answers.projectId;
  const outputPath = options.outputPath || answers.outputPath || "./output" ;
  const importPath = options.importPath || answers.importPath || "./output";

  const progressBar = new cliProgress.SingleBar(
    {
      format: "Progress |" + chalk.cyan("{bar}") + "| {percentage}% || {value}/{total} Steps",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );

  if (action === "import") {
    progressBar.start(2, 0);

    await getBlueprints(accessToken, projectId, outputPath);
    progressBar.update(1);

    await getDocuments(accessToken, projectId, outputPath);
    progressBar.update(2);

    progressBar.stop();
  } else if (action === "export") {
    progressBar.start(2, 0);
    console.log("Exporting data...");
    console.log("Import path:", importPath);
    await exportData(accessToken, projectId, importPath);
    progressBar.update(1);
    progressBar.stop();

  }
}

main();
