import { Handler } from 'express';

import createResponseData from '../utils/createResponseData';

const addContext: Handler = (req, res, next) => {
  res.createResponseData = createResponseData;

  next();
};

export default addContext;
