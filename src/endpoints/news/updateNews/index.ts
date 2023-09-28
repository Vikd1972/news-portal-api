import { createEndpoint } from '../../../services/endpoint';
import controller from './updateNews.controller';
import description from './updateNews.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
    middlewares.isAuth,
  ],
  method: 'patch',
  isActive: true,
  path: '/:newsId',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'News',
    summary: 'Update news',
    description: 'Update news.',
  },
}));
