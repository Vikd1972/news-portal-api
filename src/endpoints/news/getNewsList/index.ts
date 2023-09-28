import { createEndpoint } from '../../../services/endpoint';
import controller from './getNewsList.controller';
import description from './getNewsList.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
  ],
  method: 'get',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'News',
    summary: 'Get a list of news',
    description: 'Get a list of news',
  },
}));
