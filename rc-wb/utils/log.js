const chalk = require("chalk");
const logSymbols = require('log-symbols');

const error = (text) => {
  console.error(logSymbols.error, chalk.red.bold(text));
};

const warn = (text) => {
  console.warn(logSymbols.warning, chalk.yellow(text));
};

const info = (text) => {
  console.info(logSymbols.info, chalk.white(text));
};

const success = (text) => {
  console.log(logSymbols.success, chalk.green(text));
};


module.exports = { error, warn, info, success };