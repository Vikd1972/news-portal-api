import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './signUp.description';
import { tokenHelper } from '../../../utils';
import userService from '../../../services/userService';

const signUp: ControllerType = async (req, res) => {
  const user = await userService.createUser(req.body);

  const tokens = await tokenHelper.createTokensPair(user.userId);

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData({
    tokens,
    user,
  }));
};

export default signUp;
