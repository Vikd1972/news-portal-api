/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { EndpointDataBuilder, ResponseDataType, sharedValidation } from '../../../services/endpoint';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  //
}

class RequestQuery {
  @dataBuilder.queryField({
    validation: yup.string().strict().oneOf(['true', 'false']),
    swagger: {
      required: false,
      schema: {
        type: 'string',
        enum: ['true', 'false'],
      },
    },
  })
  hardDelete?: 'true' | 'false';
}

class RequestParams {
  @dataBuilder.paramsField(sharedValidation.params.numberStringRequired)
  userId: string;
}

type ResponseData = ResponseDataType<string>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.NO_CONTENT,
  description: 'Success',
  schema: {
    example: null,
  },
}]);

export default dataBuilder.getDescription();
