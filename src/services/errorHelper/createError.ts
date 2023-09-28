import { ResponseErrorTypeENUM, ValidationErrorItemType } from './type';
import CustomError from './CustomError';

const createError = <D>(options: {
  message: string;
  type: ResponseErrorTypeENUM;
  data?: D;
}) => {
  return new CustomError({
    message: options.message,
    type: options.type,
    data: options.data || null,
  });
};

export const createValidationResponseError = (errors: ValidationErrorItemType[]) => {
  return createError({
    message: 'Invalid request',
    type: ResponseErrorTypeENUM.validation,
    data: errors,
  });
};

export default createError;
