import { createEndpoint } from '../../../services/endpoint';
import controller from './me.controller';
import description from './me.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [middlewares.isAuth],
  method: 'get',
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
