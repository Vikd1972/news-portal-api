/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { EndpointDataBuilder, sharedValidation, ResponseDataType, swaggerDataExamples } from '../../../services/endpoint';
import { UserEntity } from '../../../db';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField(sharedValidation.body.userEmail)
  email: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'John',
      nullable: true,
    },
  })
  firstName?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'Doe',
      nullable: true,
    },
  })
  lastName?: string;

  @dataBuilder.bodyField(sharedValidation.body.userPassword)
  password: string;
}

class RequestQuery {
  //
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
