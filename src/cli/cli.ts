import { program } from "commander";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { ProviderName } from "../lib/common/types";
import { CaisyProviderOptions } from "../lib/caisy/provider";

program
  .version("0.0.1")
  .option("-i, --import", "import data")
  .option("-e, --export", "export data")
  .option("-m, --migrate", "migrate data directly from one provider to another")
  .option("-o, --outputPath <outputPath>", "output data storage location")
  .option("-I, --importPath <inputPath>", "input data storage location")
  .option("-t, --token <token>", "access token")
  .option("-P, --source <provider>", "source provider")
  .option("-P, --target <provider>", "source provider")
  .option("-c, --config <configFile>", "path to the configuration file")
  .option(
    "-s, --set <set>",
    "set individual configuration values",
    (value, previous) => {
      previous.push(value);
      return previous;
    },
    [],
  );

program.parse(process.argv);

export type OptionsShared = {
  import?: boolean;
  export?: boolean;
  migrate?: boolean;
  outputPath?: string;
  importPath?: string;
  token?: string;
  source?: ProviderName;
  target?: ProviderName;
  config?: string;
  caisy?: CaisyProviderOptions;
  contentful?: {
    space_id?: string;
    token?: string;
  };
};
export type OptionsInput = OptionsShared & {
  set?: string[];
};

function snakeToCamel(key) {
  return key.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
}

function convertObjectToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertObjectToCamelCase);
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[snakeToCamel(key)] = convertObjectToCamelCase(obj[key]);
    });
    return newObj;
  }
  return obj;
}

const options = (program.opts() || {}) as OptionsInput;

// Load the configuration file if provided
let config = {};
if (options.config) {
  const configPath = path.resolve(options.config);
  const configContent = fs.readFileSync(configPath, "utf8");
  const loadedConfig = yaml.load(configContent);
  config = convertObjectToCamelCase(loadedConfig);
}

// Merge the --set values with the configuration
if (options.set) {
  options.set.forEach((setParam) => {
    const [key, value] = setParam.split("=");
    const keys = key.split(".");
    let obj = config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
  });
}

console.log(` config`, config);
// Merge the command-line options with the configuration
const mergedOptions: OptionsShared = { ...config, ...options };

// Use the merged options for further processing
console.log("Options:", mergedOptions);
// Add your CLI logic here

export default mergedOptions;
