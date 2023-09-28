import { Application } from 'express';

import { logger } from '../../utils';

const handleServerError = (err: Application) => {
  logger.error('Error starting the server: ', err);
};

export default handleServerError;
