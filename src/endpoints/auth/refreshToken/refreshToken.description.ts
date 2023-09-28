/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { EndpointDataBuilder, ResponseDataType, swaggerDataExamples } from '../../../services/endpoint';
import isAuth from '../../../middlewares/isAuth';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField({
    validation: yup.string().required(),
    swagger: {
      type: 'string',
      isRequired: true,
    },
  })
  token: string;
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = ResponseDataType<{
  //
}>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([...isAuth.swaggerErrors, {
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
      meta: {},
      data: {
        tokens: swaggerDataExamples.tokens,
      },
    },
  },
}]);

export default dataBuilder.getDescription();
