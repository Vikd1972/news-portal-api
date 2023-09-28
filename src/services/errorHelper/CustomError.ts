import { ResponseErrorTypeENUM, ERROR_STATUS_CODES_BY_TYPE, ErrorDataType } from './type';

class CustomError<D> extends Error {
  customData: ErrorDataType<D>;

  constructor(options: {
    message: string;
    type: ResponseErrorTypeENUM;
    data: D;
  }) {
    super('Custom error');
    this.customData = {
      type: options.type,
      statusCode: ERROR_STATUS_CODES_BY_TYPE[options.type],
      data: options.data,
      message: options.message,
    };
  }
}

export default CustomError;
