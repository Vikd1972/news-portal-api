/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { ResponseDataType, EndpointDataBuilder, swaggerDataExamples, validationErrorMessages } from '../../../services/endpoint';
import { UserEntity } from '../../../db';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField({
    validation: yup.string().required(validationErrorMessages.USER_EMAIL_REQUIRED),
    swagger: {
      isRequired: true,
      description: 'User\'s email',
      type: 'string',
      nullable: false,
      example: 'valid@email.com',
    },
  })
  email: string;

  @dataBuilder.bodyField({
    validation: yup.string().required(validationErrorMessages.USER_EMAIL_REQUIRED),
    swagger: {
      isRequired: true,
      type: 'string',
      description: 'User\'s password',
      nullable: false,
    },
  })
  password: string;
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = ResponseDataType<{
  tokens: {
    authorization: string;
    refresh: string;
  };
  user: UserEntity;
}>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([
  {
    statusCode: HTTP_STATUS_CODES.OK,
    description: 'Success',
    schema: {
      example: {
        message: 'Success',
        meta: {},
        data: {
          tokens: swaggerDataExamples.tokens,
          user: swaggerDataExamples.user,
        },
      },
    },
  },
  {
    statusCode: HTTP_STATUS_CODES.NOT_FOUND,
    description: 'User not found',
    schema: {
      example: {
        message: 'Invalid request',
        type: 'notFound',
        data: null,
      },
    },
  },
  {
    statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
    description: 'Wrong password',
    schema: {
      example: {
        message: 'Wrong password',
        type: 'authorization',
        data: null,
      },
    },
  },
]);

export default dataBuilder.getDescription();
