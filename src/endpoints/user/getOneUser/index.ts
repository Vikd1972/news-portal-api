import { UserRolesENUM } from '../../../db';
import { createEndpoint } from '../../../services/endpoint';
import controller from './getOneUser.controller';
import description from './getOneUser.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
    middlewares.checkRole([UserRolesENUM.admin]),
  ],
  method: 'get',
  isActive: true,
  path: '/:userId',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'User',
    summary: 'Get one user by his ID',
    description: 'Get user by userId.',
  },
}));
