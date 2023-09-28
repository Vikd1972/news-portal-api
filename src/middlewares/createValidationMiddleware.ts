import * as yup from 'yup';
import _ from 'lodash';
import HTTP_STATUS_CODES from 'http-status-codes';

import { MiddlewareType } from './type';
import { createValidationResponseError, ValidationErrorItemType, ResponseErrorTypeENUM } from '../services/errorHelper';

export type ShapeItemType =
  yup.BooleanSchema |
  yup.StringSchema |
  yup.NumberSchema |
  yup.DateSchema |
  yup.ObjectSchema<any> | // eslint-disable-line @typescript-eslint/no-explicit-any
  yup.ArraySchema<any> | // eslint-disable-line @typescript-eslint/no-explicit-any
  yup.BaseSchema

export type ShapeObjectType = {
  [key: string]: ShapeItemType;
}

type ShapeType = {
  body?: ShapeObjectType,
  params?: ShapeObjectType,
  query?: ShapeObjectType,
};

const createValidationMiddleware = (shape: ShapeType): MiddlewareType => {
  const validation: MiddlewareType = async (req, res, next) => {
    try {
      const validationResults: ValidationErrorItemType[][] = await Promise.all(
        Object.keys(shape).map((requestKey) => {
          return yup
            .object()
            .shape(shape[requestKey])
            .noUnknown(true, 'Unexpected field')
            .strict()
            .validate(req[requestKey], { abortEarly: false })
            .then(() => ([]))
            .catch((err) => {
              const errorName = _.get(err, 'name');
              if (errorName !== 'ValidationError') {
                throw err;
              }

              return err.inner.map((item) => ({
                path: requestKey,
                key: item.type !== 'noUnknown' ? item.path : item.params.unknown,
                message: item.message,
                type: item.type,
              }));
            });
        }),
      );

      const errorsList: ValidationErrorItemType[] = validationResults.flat();

      if (errorsList.length) {
        throw createValidationResponseError(errorsList);
      }

      next();
    } catch (err) {
      next(err);
    }
  };

  validation.swaggerErrors = [{
    description: 'Validation error',
    schema: {
      example: {
        message: 'Invalid request',
        type: ResponseErrorTypeENUM.validation,
        data: [{
          path: 'body',
          key: 'email',
          message: 'Email is required',
          type: 'required',
        }],
      },
    },
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
  }];

  return validation;
};

export default createValidationMiddleware;
