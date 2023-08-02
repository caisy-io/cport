import options from "./cli/cli";
import questions from "./cli/questions";
import figlet from "figlet";
import chalk from "chalk";
import progressBar from "./cli/progressBar";

import { exportCaisyBlueprints, exportCaisyDocuments, importCaisyData } from "./lib/caisy";
import { exportContentfulData, exportContentfulContentData } from "./lib/contentful/";

async function run(): Promise<void> {
  console.log(figlet.textSync("CPORT"));

  if (!process.argv.slice(2).length) {
    console.log("No arguments");
  }

  const inquirer = require("inquirer");

  const answers = await inquirer.prompt(questions);

  const action = (options.import && "import") || (options.export && "export") || answers.action;
  const provider = options.provider || answers.provider;
  const dataType = options.dataType || answers.dataType;
  const accessToken = options.token || answers.token;
  const projectId = options.projectId || answers.projectId;
  const userId = options.userId || answers.userId;
  const spaceId = options.spaceId || answers.spaceId;
  const outputPath = options.outputPath || answers.outputPath || "./output";
  const importPath = options.importPath || answers.importPath || "./input";

  if (action === "export" && provider === "caisy") {
    console.log(chalk.green("Exporting data from Caisy..."));

    if (dataType === "All") {
      console.log("Exporting all data from Caisy...");

      progressBar.start(2, 0);

      await exportCaisyBlueprints(provider, accessToken, projectId, outputPath);
      progressBar.update(1);

      await exportCaisyDocuments(provider, accessToken, projectId, outputPath);
      progressBar.update(2);
    }
    if (dataType === "Blueprints") {
      console.log("Exporting blueprints from Caisy...");

      progressBar.start(1, 0);
      await exportCaisyBlueprints(provider, accessToken, projectId, outputPath);
      progressBar.update(1);
    }
    if (dataType === "Documents") {
      console.log("Importing documents from Caisy...");

      progressBar.start(1, 0);
      await exportCaisyDocuments(provider, accessToken, projectId, outputPath);
      progressBar.update(1);
    }
    progressBar.stop();
  } else if (action === "export" && provider === "contentful") {
    console.log(chalk.green("Exporting data from Contentful..."));

    if (dataType === "All") {
      console.log("Exporting all data from Contentful...");
      progressBar.start(2, 0);

      await exportContentfulData(provider, accessToken, spaceId, outputPath);
      progressBar.update(1);
      await exportContentfulContentData(provider, accessToken, spaceId, outputPath);
      progressBar.update(2);
    }
    if (dataType === "Content-Model") {
      console.log("Exporting content-model from Contentful...");
      progressBar.start(1, 0);
      await exportContentfulData(provider, accessToken, spaceId, outputPath);
      progressBar.update(1);
    }
    progressBar.stop();
  } else if (action === "import") {
    console.log(chalk.green("importing data to Caisy..."));

    progressBar.start(1, 0);

    await importCaisyData(accessToken, projectId, userId, importPath);
    progressBar.update(1);

    progressBar.stop();
  } else if (action === "migrate") {
    console.log("Hi Mom!");
  }

  return null;
}

run();
