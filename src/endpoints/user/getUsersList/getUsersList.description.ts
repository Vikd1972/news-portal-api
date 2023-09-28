/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import { UserEntity, FindAndCountMetaType } from '../../../db';
import { EndpointDataBuilder, ResponseDataType, swaggerDataExamples } from '../../../services/endpoint';

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

type ResponseData = ResponseDataType<UserEntity[], FindAndCountMetaType>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
      meta: swaggerDataExamples.getListMeta,
      data: [swaggerDataExamples.user],
    },
  },
}]);

export default dataBuilder.getDescription();
