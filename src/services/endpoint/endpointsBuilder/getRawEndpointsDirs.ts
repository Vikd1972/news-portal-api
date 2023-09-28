import requireDirectory from 'require-directory';

import { EndpointDirType } from '../type';
import { helpers } from '../../../utils';

const getRawEndpointsDirs = (folderPath: string): EndpointDirType => {
  requireDirectory.defaults.extensions = [helpers.getFileExtention(__filename)];

  const folderContent = requireDirectory<unknown, EndpointDirType>(
    module,
    folderPath,
    {
      exclude: (path) => {
        if (path === `${folderPath}/index.ts`) {
          return true;
        }

        return /\.test\./.test(path);
      },
    },
  ) as EndpointDirType;

  return folderContent;
};

export default getRawEndpointsDirs;
