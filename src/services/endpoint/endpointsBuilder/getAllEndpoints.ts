import { ExtendedEndpointData } from '../type';
import getRawEndpointsDirs from './getRawEndpointsDirs';
import parseDirEndpoints from './parseDirEndpoints';
import filterAndFormatEndpoints from './filterAndFormatEndpoints';
import sortAndValidateEndpoints from './sortAndValidateEndpoints';

const getAllEndpoints = (folderPath: string): ExtendedEndpointData[] => {
  const endpointsDirs = getRawEndpointsDirs(folderPath);
  const rawEndpoints = parseDirEndpoints(endpointsDirs);
  const formattedEndpoints = filterAndFormatEndpoints(rawEndpoints);
  const sortedEndpoints = sortAndValidateEndpoints(formattedEndpoints);

  return sortedEndpoints;
};

export default getAllEndpoints;
