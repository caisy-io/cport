import * as cliProgress from "cli-progress";
import chalk from "chalk";
import { SingleBarOptions } from "./types";

type ProgressBarStyle = typeof cliProgress.Presets.shades_classic;

const progressBarOptions: SingleBarOptions = {
  format: "Progress |" + chalk.cyan("{bar}") + "| {percentage}% || {value}/{total} Steps",
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
  hideCursor: true,
};

const progressBar = new cliProgress.SingleBar(
  progressBarOptions,
  cliProgress.Presets.shades_classic as ProgressBarStyle
);

export default progressBar;
