import { createEndpoint } from '../../../services/endpoint';
import controller from './createNews.controller';
import description from './createNews.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
  ],
  method: 'post',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'News',
    summary: 'Create news',
    description: 'Creating a news.',
  },
}));
