import middlewares from '../../middlewares';
import { controllerWrapper } from '../errorHelper';
import { EndpointData } from './type';

type EndpointCreationCallbackType = (options: {
  middlewares: typeof middlewares;
}) => EndpointData;

const createEndpoint = (callback: EndpointCreationCallbackType): EndpointData => {
  const endpoint = callback({
    middlewares,
  });
  return {
    ...endpoint,
    controller: controllerWrapper(endpoint.controller),
  };
};

export default createEndpoint;
