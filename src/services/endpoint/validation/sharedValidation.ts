/* eslint-disable max-len */
import * as yup from 'yup';

import validationErrorMessages from './validationErrorMessages';
import { BodyItemDescriptionType, SwaggerBodyItem, ParamsItemDescriptionType, SwaggerPagameterItem } from '../EndpointDataBuilder';
import { ShapeItemType } from '../../../middlewares/createValidationMiddleware';

const bodyHelper = {
  makeValidationRequired: (validation: ShapeItemType, message?: string): ShapeItemType => {
    return validation.required(message);
  },
  makeItemRequired: (description: SwaggerBodyItem): SwaggerBodyItem => ({
    ...description,
    isRequired: true,
  }),
  makeItemDescriptionRequired: (description: BodyItemDescriptionType, message?: string): BodyItemDescriptionType => ({
    validation: bodyHelper.makeValidationRequired(description.validation, message),
    swagger: bodyHelper.makeItemRequired(description.swagger),
  }),
};

const paramsHelper = {
  makeValidationRequired: (validation: ShapeItemType, message?: string): ShapeItemType => {
    return validation.required(message);
  },
  makeItemRequired: (description: SwaggerPagameterItem): SwaggerPagameterItem => ({
    ...description,
    required: true,
  }),
  makeItemDescriptionRequired: (description: ParamsItemDescriptionType, message?: string): ParamsItemDescriptionType => ({
    validation: paramsHelper.makeValidationRequired(description.validation, message),
    swagger: paramsHelper.makeItemRequired(description.swagger),
  }),
};

// Accept next special symbols: ~`!@#$%^&*()-_=+{}[]|\:;"'<>,./?№
const specialSymbols = '~`!@#$%\\^&*()\\-_=+{}[\\]\\\\|;:\'"<>,.\\/?№';
const passwordRegExp = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${specialSymbols}])[A-Za-z\\d${specialSymbols}]{8,50}$`);
const userPassword: BodyItemDescriptionType = {
  validation: yup.string().matches(passwordRegExp, { message: validationErrorMessages.USER_PASSWORD_INVALID }),
  swagger: {
    isRequired: false,
    type: 'string',
    description: 'Password must contain at least 8 symbols with one lowercase letter, one uppercase letter, one number and one special sybmol',
    nullable: false,
  },
};

const userEmail: BodyItemDescriptionType = {
  validation: yup.string().email(validationErrorMessages.USER_EMAIL_INVALID),
  swagger: {
    isRequired: false,
    description: 'User\'s email',
    type: 'string',
    nullable: false,
    example: 'valid@email.com',
  },
};

const numberString: ParamsItemDescriptionType = {
  validation: yup.string().matches(/^[0-9]+$/, { message: 'Should be a string with a number' }),
  swagger: {
    required: true,
    schema: {
      type: 'number',
    },
  },
};

export default {
  body: {
    userPassword,
    userPasswordRequired: bodyHelper.makeItemDescriptionRequired(userPassword, validationErrorMessages.USER_PASSWORD_REQUIRED),
    userEmail,
    userEmailRequired: bodyHelper.makeItemDescriptionRequired(userEmail, validationErrorMessages.USER_EMAIL_REQUIRED),
  },
  params: {
    numberString,
    numberStringRequired: paramsHelper.makeItemDescriptionRequired(numberString),
  },
};
