/* eslint-disable */
const fs = require('fs');
const path = require('path');
const changeCase = require('change-case');

const assets = {
  createIndex: require('./assets/endpoint.index'),
  createDescription: require('./assets/endpoint.description'),
  createController: require('./assets/endpoint.controller'),
  createTest: require('./assets/endpoint._test'),
};

const endpointMethod = process.argv[3] || 'get';

const endpointPath = process.argv[2] || `new-endpoint-${Date.now()}`
const splittedPathList = endpointPath.split('/').map((i) => i.trim()).filter((i) => i !== '/');
const camelCasePathList = splittedPathList.map((i) => changeCase.camelCase(i));
const camelCaseEndpointName = camelCasePathList[camelCasePathList.length - 1];

let BASE_PATH = path.normalize(`${__dirname}/../src/endpoints/${camelCasePathList.join('/')}`);

const folderDepth = camelCasePathList.length;
const goUpString = new Array(folderDepth).fill('..').join('/');

fs.mkdirSync(BASE_PATH, { recursive: true });

fs.writeFileSync(`${BASE_PATH}/index.ts`, assets.createIndex({ camelCaseEndpointName, endpointMethod, goUpString }));

fs.writeFileSync(`${BASE_PATH}/${camelCaseEndpointName}.description.ts`, assets.createDescription(goUpString));

fs.writeFileSync(`${BASE_PATH}/${camelCaseEndpointName}.controller.ts`, assets.createController(camelCaseEndpointName));

// const fullEndpointPath = `/api/${splittedPathList.map((i) => changeCase.paramCase(i)).join('/')}`;
// fs.writeFileSync(`${BASE_PATH}/${camelCaseEndpointName}.test.ts`, assets.createTest({ endpointMethod, fullEndpointPath, goUpString }));
