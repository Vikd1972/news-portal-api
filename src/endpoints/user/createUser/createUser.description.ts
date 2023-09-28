/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { UserEntity } from '../../../db';
import { EndpointDataBuilder, ResponseDataType, sharedValidation, swaggerDataExamples } from '../../../services/endpoint';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField(sharedValidation.body.userEmailRequired)
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

  @dataBuilder.bodyField(sharedValidation.body.userPasswordRequired)
  password: string;
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = ResponseDataType<UserEntity>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.CREATED,
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
