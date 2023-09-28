/**
 * @param {{
 *    goUpString: string;
 *    camelCaseEndpointName: string;
 *    endpointMethod: string;
 * }} options
 * @returns {string}
 */
module.exports = ({ goUpString, camelCaseEndpointName, endpointMethod }) => {
  return `import { createEndpoint } from '../${goUpString}/services/endpoint';
import controller from './${camelCaseEndpointName}.controller';
import description from './${camelCaseEndpointName}.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [middlewares.isAuth],
  method: '${endpointMethod}',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: true,
  description,
  swagger: {
    endpointGroup: 'Endpoint Group',
    summary: 'Short description of the endpoint',
    description: 'Full description of the endpoint',
  },
}));
`;
};
