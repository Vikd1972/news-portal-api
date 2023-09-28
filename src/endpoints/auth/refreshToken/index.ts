import { createEndpoint } from '../../../services/endpoint';
import controller from './refreshToken.controller';
import description from './refreshToken.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [middlewares.createValidationMiddleware(description.validation)],
  method: 'post',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: true,
  description,
  swagger: {
    endpointGroup: 'Authorization',
    summary: 'Get user from the authorization token',
    description: 'Validate authorization token and get a user object',
  },
}));
