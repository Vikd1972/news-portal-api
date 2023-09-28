/**
 * This script executes before "npm install"
 * Lock the version of Node running based on the one set in the package.json
 */
const packageJson = require('./package.json');
const requiredNodeVersion = packageJson.engines.node;

const runningNodeVersion = process.version;


// check that the required version of Node is running

if (!runningNodeVersion.split('.')[0].includes(requiredNodeVersion)) {
  console.error(`
  You are not running the required version of Node, please use version ${requiredNodeVersion}.
`);

  // kill the process if the required node version is not the one running
  process.exit(1);
}
