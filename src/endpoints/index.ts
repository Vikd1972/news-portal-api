import express from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';

import config from '../config';
import { createSwaggerObject } from '../services/swagger';

import { getAllEndpoints } from '../services/endpoint';
import { createError, ResponseErrorTypeENUM } from '../services/errorHelper';

const endpoints = getAllEndpoints(__dirname);

const SWAGGER_ENDPOINT = `${config.server.endpointsPrefix}/swagger`;

const router = express.Router();

if (config.isSwaggerEnabled) {
  router.use(SWAGGER_ENDPOINT, swaggerUi.serve);
  router.get(SWAGGER_ENDPOINT, swaggerUi.setup(createSwaggerObject(endpoints)));
}

router.get('/', (req, res) => {
  res.redirect(config.server.endpointsPrefix);
});

router.get(`${config.server.endpointsPrefix}/ping`, (req, res) => {
  res.json('pong');
});

endpoints.forEach((endpoint) => {
  router[endpoint.method](
    endpoint.fullPath,
    endpoint.middlewares,
    endpoint.controller,
  );
});

router.use('*', (req, res) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json(createError({
    message: 'Endpoint not found',
    type: ResponseErrorTypeENUM.notFound,
  }));
});

export default router;
