import options from "./cli/cli";
import questions from "./cli/questions";
import figlet from "figlet";
import chalk from "chalk";
import progressBar from "./cli/progressBar";

import { importCaisyBlueprints, importCaisyDocuments, exportCaisyData } from "./lib/caisy";

async function run(): Promise<void> {
  console.log(figlet.textSync("CPORT"));

  if (!process.argv.slice(2).length) {
    console.log("No arguments");
  }

  const inquirer = require("inquirer");

  const answers = await inquirer.prompt(questions);

  const action = options.import || options.export || answers.action;
  const accessToken = options.token || answers.token;
  const projectId = options.projectId || answers.projectId;
  const outputPath = options.outputPath || answers.outputPath || "./output";
  const importPath = options.importPath || answers.importPath || "./input";

  if (action === "import") {
    progressBar.start(2, 0);

    await importCaisyBlueprints(accessToken, projectId, outputPath);
    progressBar.update(1);

    await importCaisyDocuments(accessToken, projectId, outputPath);
    progressBar.update(2);

    progressBar.stop();
  } else if (action === "export") {
    // progressBar.start(1, 0);

    await exportCaisyData(accessToken, projectId, importPath);
    // await testExportData();
    // progressBar.update(1);

    // progressBar.stop();
  }

  return null;
}

run();
