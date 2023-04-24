import { program } from "commander";

program
  .version("0.0.1")
  .option("-i, --import", "import data from Caisy")
  .option("-e, --export", "export data to Caisy")
  .option("-m, --migrate", "migrate data from Contentful to Caisy")
  .option("-o, --outputPath <outputPath>", "output data storage location")
  .option("-I, --importPath <inputPath>", "input data storage location")
  .option("-t, --token <token>", "access token")
  .option("-p, --projectId <projectId>", "project id")
  .parse(process.argv);

const options = program.opts();

export default options;
