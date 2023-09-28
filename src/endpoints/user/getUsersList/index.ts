import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './getUsersList.controller';
import description from './getUsersList.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
    middlewares.checkRole([UserRolesENUM.admin]),
  ],
  method: 'get',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'User',
    summary: 'Get a list of users',
    description: 'Get a list of users.',
  },
}));
