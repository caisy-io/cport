import { program } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { getBlueprints, getDocuments } from "./lib/caisy";
import * as cliProgress from "cli-progress";

async function main(): Promise<void> {
  console.log(figlet.textSync("CPORT"));

  program
    .version("0.0.1")
    .option("-t, --token <token>", "access token")
    .option("-p, --projectId <projectId>", "project id")
    .option("-o, --output <output>", "output data storage location")
    .parse(process.argv);

  const options = program.opts();

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }

  if (options.token) {
    if (!options.token) {
      console.error(chalk.red("Please provide an access token"));
      process.exit(1);
    }
    if (!options.projectId) {
      console.error(chalk.red("Please provide a project id"));
      process.exit(1);
    }

    const accessToken = options.token;
    const projectId = options.projectId;
    const outputPath = options.output || "./output";

    const progressBar = new cliProgress.SingleBar(
      {
        format: "Progress |" + chalk.cyan("{bar}") + "| {percentage}% || {value}/{total} Steps",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
      },
      cliProgress.Presets.shades_classic
    );

    progressBar.start(2, 0);

    await getBlueprints(accessToken, projectId, outputPath);
    progressBar.update(1); // Update the progress bar after getBlueprints

    await getDocuments(accessToken, projectId, outputPath);
    progressBar.update(2); // Update the progress bar after getDocuments

    // Stop the progress bar
    progressBar.stop();
  }
}

main();
