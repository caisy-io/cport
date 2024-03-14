import options from "./cli/cli";
import questions from "./cli/questions";
import figlet from "figlet";
import chalk from "chalk";
import progressBar from "./cli/progressBar";

import { exportCaisyBlueprints, exportCaisyDocuments, importCaisyData } from "./lib/caisy";
import { exportContentfulData, exportContentfulContentData, exportContentfulLocaleData } from "./lib/contentful/";
import { createRandomTypeInPrismic } from "./lib/prismic";
import { runMigrations } from "./lib/common/migrate";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { createCaisyProvider } from "./lib/caisy/provider";
import { sql } from "drizzle-orm";
import { db } from "./lib/common/db";

async function run(): Promise<void> {
  await runMigrations();
  console.log(figlet.textSync("CPORT"));

  if (!process.argv.slice(2).length) {
    console.log("No arguments");
  }

  const inquirer = require("inquirer");

  const answers = await inquirer.prompt(questions);

  const action = (options?.import && "import") || (options?.export && "export") || answers.action;
  const accessToken = options.token || answers.token;
  const outputPath = options.outputPath || answers.outputPath || "./output";
  const importPath = options.importPath || answers.importPath || "./input";

  const onProgress = ({ step, value }: { step: string; value: number }) => {
    console.info(`Progress: ${step} - ${value}%`);
  };
  const onError = ({ error, step, meta }: { error: Error; step: string; meta: any }) => {
    console.error(`Error: ${step} - ${error.message}`, JSON.stringify(meta, null, 2), error);
  };

  if (options.config || options.migrate) {
    if (options.source === "caisy") {
      const provider = createCaisyProvider({
        token: options.caisy.token,
        projectId: options.caisy.projectId,
        endpoint: options.caisy.endpoint,
      });

      if (!(await provider.checkCredentials())) {
        console.log(chalk.red("Invalid credentials for Caisy"));
        return;
      }
      await provider.export({ onError, onProgress });
    }
  }

  // if (action === "export" && provider === "caisy") {
  //   console.log(chalk.green("Exporting data from Caisy..."));

  //   if (dataType === "All") {
  //     console.log("Exporting all data from Caisy...");

  //     progressBar.start(2, 0);

  //     await exportCaisyBlueprints(provider, accessToken, projectId, outputPath);
  //     progressBar.update(1);

  //     await exportCaisyDocuments(provider, accessToken, projectId, outputPath);
  //     progressBar.update(2);
  //   }
  //   if (dataType === "Blueprints") {
  //     console.log("Exporting blueprints from Caisy...");

  //     progressBar.start(1, 0);
  //     await exportCaisyBlueprints(provider, accessToken, projectId, outputPath);
  //     progressBar.update(1);
  //   }
  //   if (dataType === "Documents") {
  //     console.log("Importing documents from Caisy...");

  //     progressBar.start(1, 0);
  //     await exportCaisyDocuments(provider, accessToken, projectId, outputPath);
  //     progressBar.update(1);
  //   }
  //   progressBar.stop();
  // } else if (action === "export" && provider === "contentful") {
  //   console.log(chalk.green("Exporting data from Contentful..."));

  //   if (dataType === "All") {
  //     console.log("Exporting all data from Contentful...");
  //     progressBar.start(3, 0);

  //     await exportContentfulData(provider, accessToken, spaceId, outputPath);
  //     progressBar.update(1);
  //     await exportContentfulContentData(provider, accessToken, spaceId, outputPath);
  //     progressBar.update(2);
  //     await exportContentfulLocaleData(provider, accessToken, spaceId, outputPath);
  //     progressBar.update(3);
  //   }
  //   if (dataType === "Content-Model") {
  //     console.log("Exporting content-model from Contentful...");
  //     progressBar.start(1, 0);
  //     await exportContentfulData(provider, accessToken, spaceId, outputPath);
  //     progressBar.update(1);
  //   }
  //   progressBar.stop();
  // } else if (action === "import") {
  //   console.log(chalk.green("importing data to Caisy..."));

  //   progressBar.start(1, 0);

  //   await importCaisyData(accessToken, projectId, userId, importPath);
  //   progressBar.update(1);

  //   progressBar.stop();
  // } else if (action === "migrate") {
  // }

  return null;
}

// const run2 = async () => {
//   await runMigrations();
//   // const totalRuns = 10001;
//   // const delay = 1; // milliseconds

//   // for (let i = 1; i <= totalRuns; i++) {
//   //     await new Promise(resolve => setTimeout(resolve, delay));
//   //     await Promise.all([createRandomTypeInPrismic(), createRandomTypeInPrismic(), createRandomTypeInPrismic()])
//   //     console.log(`Run count: ${i}/${totalRuns}`);
//   // }
// };
run();
