import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './getTopics.controller';
import description from './getTopics.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
  ],
  method: 'get',
  isActive: true,
  path: '/genres',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'News',
    summary: 'Get a list of topics',
    description: 'Get a list of topics',
  },
}));
