import errorHandler from './errorHandler';
import cors from './cors';
import addContext from './addContext';
import statsCollector from './statsCollector';
import createValidationMiddleware from './createValidationMiddleware';
import isAuth from './isAuth';
import checkRole from './checkRole';

export default {
  errorHandler,
  cors,
  addContext,
  statsCollector,
  createValidationMiddleware,
  isAuth,
  checkRole,
};
