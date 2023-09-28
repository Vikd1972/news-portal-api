import { Handler } from 'express';

import { SwaggerResponseType } from '../services/swagger';

export type MiddlewareType = Handler & {
  swaggerErrors?: SwaggerResponseType[];
}
