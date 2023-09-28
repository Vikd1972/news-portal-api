import { ErrorRequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { CustomError, ResponseErrorTypeENUM, ErrorDataType, ERROR_STATUS_CODES_BY_TYPE } from '../services/errorHelper';
import { logger } from '../utils';
import config from '../config';

dayjs.extend(utc);
dayjs.extend(timezone);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { customData } = err;
    return res.status(customData.statusCode).json(customData);
  }

  if (
    err.statusCode === HTTP_STATUS_CODES.BAD_REQUEST &&
    err.type === 'entity.parse.failed' &&
    err.name === 'SyntaxError'
  ) {
    const statusCode = ERROR_STATUS_CODES_BY_TYPE[ResponseErrorTypeENUM.validation];

    // body-parser error
    return res.status(statusCode).json({
      statusCode,
      message: 'Invalid request body',
      type: ResponseErrorTypeENUM.validation,
      data: null,
    } as ErrorDataType);
  }

  const errorTimeString = dayjs().tz(config.logger.timezone).format('HH:mm:ss DD.MM.YYYY');
  const requestString = `${req.method} ${req.baseUrl}${req.path}`;

  logger.error('Message ----> ', err.message);
  logger.subError(`Request ----> ${requestString};`);
  logger.subError(`Timestamp --> ${errorTimeString} (${config.logger.timezone});`);
  logger.subError('FULL error ----> ', err);

  const statusCode = ERROR_STATUS_CODES_BY_TYPE[ResponseErrorTypeENUM.internal];

  res
    .status(statusCode)
    .json({
      message: config.server.internalErrorMessage,
      type: ResponseErrorTypeENUM.internal,
      statusCode,
      data: null,
    } as ErrorDataType);
};

export default errorHandler;
