import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './updateUser.controller';
import description from './updateUser.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
    middlewares.checkRole([UserRolesENUM.admin]),
  ],
  method: 'patch',
  isActive: true,
  path: '/:userId',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'User',
    summary: 'Update user',
    description: 'Update user.',
  },
}));
