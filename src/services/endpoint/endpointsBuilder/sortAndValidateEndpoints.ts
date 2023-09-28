import _ from 'lodash';

import { ExtendedEndpointData } from '../type';
import { logger } from '../../../utils';

/**
* @param endpoints List of active endpoints
* @returns Sorted endpoints list based on the path parameters
* to avoid endpoints that could not be reached
*/
const sortAndValidateEndpoints = (endpoints: ExtendedEndpointData[]): ExtendedEndpointData[] => {
  const grouppedArr = _.groupBy(endpoints, 'method');

  Object.entries(grouppedArr).forEach(([key, value]) => {
    grouppedArr[key] = value.sort((a, b) => {
      const splittedA = a.fullPath.split('/');
      const splittedB = b.fullPath.split('/');

      if (splittedA.length !== splittedB.length) {
        return splittedA.length - splittedB.length;
      }

      const formatEndpointPath = (str: string): string => str.replace(/:[^/]+/g, ':parameter');
      const aFormattedPath = formatEndpointPath(a.fullPath);
      const bFormattedPath = formatEndpointPath(b.fullPath);

      if (aFormattedPath === bFormattedPath) {
        const getEndpointDescription = (e: ExtendedEndpointData): string => `${e.fullPath} - "${e.method.toUpperCase()} ${e.fullPath}"`;

        logger.error('!!! Endpoints\' paths duplication !!!');
        logger.error(getEndpointDescription(a));
        logger.error('AND');
        logger.error(getEndpointDescription(b));
        logger.error('!!! Make sure that each endpoint has a unique path !!!');
        process.exit(1);
      }

      const getEndpointParamsPower = (splittedEndpointPath: string[]): number => {
        return splittedEndpointPath.reverse().reduce((acc, i, index) => {
          if (i[0] === ':') {
            return acc + 10 ** (index + 1);
          }

          return acc;
        }, 0);
      };

      const aParamsPower = getEndpointParamsPower(splittedA);
      const bParamsPower = getEndpointParamsPower(splittedB);

      return aParamsPower - bParamsPower;
    });
  });

  const flatEndpoints = Object.values(grouppedArr).reduce((acc, nestedList) => {
    acc.push(...nestedList);
    return acc;
  }, []);

  return flatEndpoints;
};

export default sortAndValidateEndpoints;
