/**
 * @param {string} camelCaseEndpointName
 * @returns {string}
 */
module.exports = (camelCaseEndpointName) => {
  return `import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './${camelCaseEndpointName}.description';

const ${camelCaseEndpointName}: ControllerType = async (req, res) => {
  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData('Some payload'));
};

export default ${camelCaseEndpointName};
`;
};
