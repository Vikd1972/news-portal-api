import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './signIn.description';
import { tokenHelper } from '../../../utils';
import userService from '../../../services/userService';

const signIn: ControllerType = async (req, res) => {
  const user = await userService.getUserWithPasswordByEmail(req.body.email);

  userService.validatePassword(req.body.password, user.password);

  delete user.password;

  const tokens = await tokenHelper.createTokensPair(user.userId);

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData({
    tokens,
    user,
  }));
};

export default signIn;
