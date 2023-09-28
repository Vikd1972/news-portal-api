import { createEndpoint } from '../../../services/endpoint';
import controller from './signUp.controller';
import description from './signUp.description';

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
    summary: 'Sign up user in the system',
    description: 'Create user in the system. Returning created user and tokens pair',
  },
}));
