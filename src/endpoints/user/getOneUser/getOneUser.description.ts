/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { UserEntity } from '../../../db';
import { EndpointDataBuilder, ResponseDataType, swaggerDataExamples, sharedValidation } from '../../../services/endpoint';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  //
}

class RequestQuery {
  @dataBuilder.queryField({
    validation: yup.string().oneOf(['true', 'false']),
    swagger: {
      required: false,
      schema: {
        type: 'string',
        enum: ['true', 'false'],
      },
    },
  })
  withDeleted?: 'true' | 'false';
}

class RequestParams {
  @dataBuilder.paramsField(sharedValidation.params.numberStringRequired)
  userId: string;
}

type ResponseData = ResponseDataType<UserEntity>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
      meta: {},
      data: swaggerDataExamples.user,
    },
  },
}]);

export default dataBuilder.getDescription();
