/**
 * This script will merge the common swcrc file with the package swcrc file.
 */
const path = require('path');
const fs = require('fs-extra');
const deepmerge = require('deepmerge');
const { program } = require('commander');

program
  .option('-c, --config <string>', 'Path to swcrc file', '.swcrc')
  .action(async options => {
    const { config } = options;

    const APP_ROOT = path.join(__dirname, '../');

    // get common swcrc file, if one exists
    const commonSwcRcPath = path.join(APP_ROOT, '.swcrc.common');
    const commonSwcRc = fs.existsSync(commonSwcRcPath)
      ? fs.readJSONSync(commonSwcRcPath)
      : {};

    // get project swcrc file, if one exists
    const packageSwcRc = fs.existsSync(config) ? fs.readJSONSync(config) : {};
    const merged = deepmerge(commonSwcRc, packageSwcRc);
    fs.writeJSONSync(config, merged, { spaces: 2 });
  });

program.parse(process.argv);
