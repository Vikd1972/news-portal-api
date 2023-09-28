import * as changeCase from 'change-case';
import _ from 'lodash';

import { RawEndpointData, EndpointDirType, EndpointData } from '../type';

const parseDirEndpoints = (folder: EndpointDirType, pathPrefix = ''): RawEndpointData[] => {
  const endpoints: RawEndpointData[] = [];

  Object.entries(folder).forEach(([key, value]) => {
    const folderName = changeCase.paramCase(key);
    const fullPrefix = `${pathPrefix}/${folderName}`;

    if (value.index) {
      endpoints.push({
        ...value.index.default as EndpointData,
        pathPrefix: _.get(value, 'index.default.pathPrefix') || pathPrefix,
        folderName,
      });
    } else {
      endpoints.push(...parseDirEndpoints(value, fullPrefix));
    }
  });

  return endpoints;
};

export default parseDirEndpoints;
