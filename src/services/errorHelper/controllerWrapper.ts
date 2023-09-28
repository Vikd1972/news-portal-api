import { RequestHandler } from 'express';

export const controllerWrapper = <P, R, B, Q>(
  controller: RequestHandler<P, R, B, Q>,
): RequestHandler<P, R, B, Q> => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default controllerWrapper;
