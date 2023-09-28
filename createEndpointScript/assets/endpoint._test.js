/**
 * @param {{
 *    goUpString: string;
 *    fullEndpointPath: string;
 *    endpointMethod: string;
 * }} options
 * @returns {string}
 */
module.exports = ({ goUpString, fullEndpointPath, endpointMethod }) => {
  return `import HTTP_STATUS_CODES from 'http-status-codes';

import { getTestServer } from '../${goUpString}/__mocks__/express.test';

describe('${endpointMethod.toUpperCase()} ${fullEndpointPath}', () => {
  const server = getTestServer();

  it('Success', async () => {
    const response = await server.${endpointMethod.toLocaleLowerCase()}('${fullEndpointPath}').send();

    expect(response.body).toBe('OK');
    expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
  });
});
`;
};
