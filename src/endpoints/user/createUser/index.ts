import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './createUser.controller';
import description from './createUser.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
    middlewares.checkRole([UserRolesENUM.admin]),
  ],
  method: 'post',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'User',
    summary: 'Create new user',
    description: 'Creating a new user.',
  },
}));
