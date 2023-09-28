import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './me.description';

const me: ControllerType = async (req, res) => {
  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData({ user: req.user }));
};

export default me;
