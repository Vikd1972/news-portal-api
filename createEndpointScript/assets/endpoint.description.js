/**
 * @param {string} goUpString
 * @returns {string}
 */
module.exports = (goUpString) => {
  return `/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
// import * as yup from 'yup';

import { ResponseDataType, EndpointDataBuilder } from '../${goUpString}/services/endpoint';

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

type ResponseData = ResponseDataType<string>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
      meta: {},
      data: 'Some payload',
    },
  },
}]);

export default dataBuilder.getDescription();
`;
};
