import HTTP_STATUS_CODES from 'http-status-codes';

export enum ResponseErrorTypeENUM {
  validation = 'validation',
  authorization = 'authorization',
  internal = 'internal',
  notFound = 'notFound',
  access = 'access',
  badRequest = 'badRequest',
}

export const ERROR_STATUS_CODES_BY_TYPE = {
  [ResponseErrorTypeENUM.validation]: HTTP_STATUS_CODES.BAD_REQUEST,
  [ResponseErrorTypeENUM.authorization]: HTTP_STATUS_CODES.UNAUTHORIZED,
  [ResponseErrorTypeENUM.internal]: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
  [ResponseErrorTypeENUM.notFound]: HTTP_STATUS_CODES.NOT_FOUND,
  [ResponseErrorTypeENUM.access]: HTTP_STATUS_CODES.FORBIDDEN,
  [ResponseErrorTypeENUM.badRequest]: HTTP_STATUS_CODES.BAD_REQUEST,
};

export type ValidationErrorItemType = {
  path: string;
  key: string;
  message: string;
  type: string;
}

export type ErrorDataType<D = null> = {
  type: ResponseErrorTypeENUM;
  statusCode: number;
  data: D;
  message: string;
}
