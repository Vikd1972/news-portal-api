import { createEndpoint } from '../../../services/endpoint';
import controller from './signIn.controller';
import description from './signIn.description';

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
    summary: 'Sign in to the system',
    description: 'You can use this request to sign in to the system',
  },
}));
