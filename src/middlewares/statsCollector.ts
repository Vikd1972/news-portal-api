import { Handler } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import config from '../config';
import logger from '../utils/logger';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = 'HH:mm:ss DD.MM.YYYY';

const statsCollector: Handler = (req, res, next) => {
  const startedAt = new Date();
  const start = Date.now();

  res.on('finish', () => {
    if (res.statusCode === 304) {
      // Cached response. No need to save this data
      return;
    }

    const requestData = {
      method: req.method,
      url: `${req.baseUrl}${req.path}`,
      responseStatus: res.statusCode,
      duration: `${Date.now() - start} ms`,
      startedAt: `${dayjs(startedAt).tz(config.logger.timezone).format(DATE_FORMAT)} (${config.logger.timezone})`,
      userId: req.user?.userId || null,
    };

    logger.info('Request:', JSON.stringify(requestData, null, 2));

    // Add stats storing if you need to
  });

  next();
};

export default statsCollector;
