import db from '../db';
import tokenUtils from '../utils/tokenHelper';
import { createError, ResponseErrorTypeENUM, ERROR_STATUS_CODES_BY_TYPE } from '../services/errorHelper';
import userService from '../services/userService';
import { MiddlewareType } from './type';

const isAuth: MiddlewareType = async (req, res, next) => {
  try {
    const token = (req.headers.authorization as string || '').replace(/^Bearer /, '');

    if (!token) {
      return next(createError({
        message: 'Missed token',
        type: ResponseErrorTypeENUM.authorization,
      }));
    }

    const { id } = await tokenUtils.verifyAuthToken(token);

    const user = await userService.getUserFromToken(id);

    req.user = user;

    await db.user.update(user.userId, {
      lastActivity: new Date(),
      updatedAt: () => '"updated_at"',
    });

    next();
  } catch (err) {
    next(err);
  }
};

isAuth.swaggerErrors = [
  {
    statusCode: ERROR_STATUS_CODES_BY_TYPE[ResponseErrorTypeENUM.authorization],
    description: 'Authorization error',
    schema: {
      properties: {
        message: {
          type: 'string',
          enum: ['Missed token', 'User not found', 'Invalid token', 'Expired token'],
        },
        type: {
          type: 'string',
          enum: [ResponseErrorTypeENUM.authorization],
        },
        data: {
          type: 'object',
          nullable: true,
        },
      },
      example: {
        message: 'Missed token',
        type: ResponseErrorTypeENUM.authorization,
        data: null,
      },
    },
  },
  {
    statusCode: ERROR_STATUS_CODES_BY_TYPE[ResponseErrorTypeENUM.access],
    description: 'Access error',
    schema: {
      properties: {
        message: {
          type: 'string',
          enum: ['Suspended user'],
        },
        type: {
          type: 'string',
          enum: [ResponseErrorTypeENUM.access],
        },
        data: {
          type: 'object',
          nullable: true,
        },
      },
      example: {
        message: 'Suspended user',
        type: ResponseErrorTypeENUM.access,
        data: null,
      },
    },
  },
];

export default isAuth;
