/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { EndpointDataBuilder, sharedValidation, ResponseDataType, swaggerDataExamples } from '../../../services/endpoint';
import { NewsEntity } from '../../../db';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: true,
      type: 'string',
      example: 'Cookbook',
      nullable: true,
    },
  })
  title?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: true,
      type: 'string',
      example: 'book about tasty and healthy food',
      nullable: false,
    },
  })
  content?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: '1975-01-01',
      nullable: true,
    },
  })
  dateOfPublication?: Date;

  @dataBuilder.bodyField({
    validation: yup.array().of(yup.number().required().positive()).strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'Doe',
      nullable: true,
    },
  })
  topics?: number[];
}

class RequestQuery {
  //
}

class RequestParams {
  @dataBuilder.paramsField(sharedValidation.params.numberStringRequired)
  newsId: string;
}

type ResponseData = ResponseDataType<NewsEntity>

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
