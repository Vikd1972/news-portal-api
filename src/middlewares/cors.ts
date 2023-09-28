import { Handler } from 'express';
import cors from 'cors';

import config from '../config';

const corsMiddlewareWrapper: Handler = (req, res, next) => {
  if (config.server.isCorsEnabled) {
    return next();
  }

  const corsMiddleware = cors({
    origin: [config.urls.clientUrl],
  });

  corsMiddleware(req, res, next);
};

export default corsMiddlewareWrapper;
