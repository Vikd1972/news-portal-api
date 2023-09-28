import { createEndpoint } from '../../../services/endpoint';
import controller from './deleteNews.controller';
import description from './deleteNews.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
  ],
  method: 'delete',
  isActive: true,
  path: '/:newsId',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'News',
    summary: 'Delete one news by his ID',
    description: 'Delete news by newsId.',
  },
}));
