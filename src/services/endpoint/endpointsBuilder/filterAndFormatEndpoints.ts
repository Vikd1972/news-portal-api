import { RawEndpointData, ExtendedEndpointData } from '../type';
import config, { isTest } from '../../../config';

const filterAndFormatEndpoints = (rawEndpoints: RawEndpointData[]): ExtendedEndpointData[] => {
  return rawEndpoints
    .filter((endpoint) => (endpoint.isActive || isTest))
    .map((endpoint) => {
      const fullPath = [
        config.server.endpointsPrefix,
        endpoint.basePath,
        endpoint.pathPrefix,
        endpoint.useFolderNameInPath ? endpoint.folderName : '',
        endpoint.path,
      ].join('/');

      const cleanFullPath = fullPath.replace(/\/{2,}/g, '/').replace(/\/$/, '');

      return {
        ...endpoint,
        fullPath: cleanFullPath,
      };
    });
};

export default filterAndFormatEndpoints;
