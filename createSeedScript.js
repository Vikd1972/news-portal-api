/* eslint-disable */
const fs = require('fs');
const changeCase = require('change-case');

const seedName = changeCase.camelCase(process.argv[2] || 'new seed');
const isDev = ['dev', 'development'].includes(process.argv[3]);
const seedFullName = `${Date.now()}-${seedName}.ts`;

const BASE_PATH = `${__dirname}/src/db/seeds/${isDev ? 'development' : 'required'}`;

fs.mkdirSync(BASE_PATH, { recursive: true });

fs.writeFileSync(`${BASE_PATH}/${seedFullName}`, `import db from '../../index';

const ${seedName} = async () => {
  //
};

export default ${seedName};
`);
