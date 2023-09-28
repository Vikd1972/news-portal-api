import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './deleteUser.controller';
import description from './deleteUser.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
    middlewares.checkRole([UserRolesENUM.admin]),
  ],
  method: 'delete',
  isActive: true,
  path: '/:userId',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'User',
    summary: 'Delete one user by his ID',
    description: 'Delete user by userId.',
  },
}));
