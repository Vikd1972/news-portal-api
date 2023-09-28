import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './createUser.description';
import userService from '../../../services/userService';

const createUser: ControllerType = async (req, res) => {
  const createdUser = await userService.createUser({
    ...req.body,
  });

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData(createdUser, { message: 'User created' }));
};

export default createUser;
