import options from "./cli/cli";
import figlet from "figlet";
import chalk from "chalk";

import { runMigrations } from "./lib/common/migrate";
import { createCaisyProvider } from "./lib/caisy/provider";
import { createContentfulProvider } from "./lib/contentful/provider";

async function run(): Promise<void> {
  await runMigrations();
  console.log(figlet.textSync("CPORT"));

  if (!process.argv.slice(2).length) {
    console.log("No arguments");
  }

  const inquirer = require("inquirer");

  const onProgress = ({ step, value }: { step: string; value: number }) => {
    console.info(`Progress: ${step} - ${value}%`);
  };
  const onError = ({ error, step, meta }: { error: Error; step: string; meta: any }) => {
    console.error(`Error: ${step} - ${error.message}`, JSON.stringify(meta, null, 2), error);
  };

  if (options.config || options.migrate) {
    // EXPORT
    if (options.source === "caisy" && options.caisy) {
      const provider = createCaisyProvider({
        token: options.caisy.token,
        projectId: options.caisy.projectId,
        endpoint: options.caisy.endpoint || undefined,
      });

      if (!(await provider.checkCredentials())) {
        console.log(chalk.red("Invalid credentials for Caisy"));
        return;
      }
      await provider.export({ onError, onProgress });
    }
    if (options.source === "contentful" && options.contentful) {
      const provider = createContentfulProvider({
        token: `${options.contentful.token}`,
        deliveryToken: `${options.contentful.deliveryToken}`,
        previewToken: `${options.contentful.previewToken}`,
        spaceId: `${options.contentful.spaceId}`,
        defaultLocale: options.contentful.defaultLocale ? `${options.contentful.defaultLocale}` : "en-US",
      });

      if (!(await provider.checkCredentials())) {
        console.log(chalk.red("Invalid credentials for Contentful"));
        return;
      }
      await provider.export({ onError, onProgress });
    }

    // IMPORT
    if (options.target === "caisy" && options.caisy) {
      const provider = createCaisyProvider({
        token: options.caisy.token,
        projectId: options.caisy.projectId,
        endpoint: options.caisy.endpoint || undefined,
      });

      if (!(await provider.checkCredentials())) {
        console.log(chalk.red("Invalid credentials for Caisy"));
        return;
      }
      await provider.import({ onError, onProgress });
    }
    if (options.target === "contentful" && options.contentful) {
      const provider = createContentfulProvider({
        token: `${options.contentful.token}`,
        deliveryToken: `${options.contentful.deliveryToken}`,
        previewToken: `${options.contentful.previewToken}`,
        spaceId: `${options.contentful.spaceId}`,
        defaultLocale: options.contentful.defaultLocale ? `${options.contentful.defaultLocale}` : "en-US",
      });

      if (!(await provider.checkCredentials())) {
        console.log(chalk.red("Invalid credentials for Contentful"));
        return;
      }
      await provider.import({ onError, onProgress });
    }
  }
}

run();
