/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import { ResponseDataType, EndpointDataBuilder, swaggerDataExamples } from '../../../services/endpoint';
import { UserEntity } from '../../../db';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  //
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = ResponseDataType<{
  user: UserEntity;
}>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
      meta: {},
      data: { user: swaggerDataExamples.user },
    },
  },
}]);

export default dataBuilder.getDescription();
