import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './refreshToken.description';
import { tokenHelper } from '../../../utils';
import userService from '../../../services/userService';

const refreshToken: ControllerType = async (req, res) => {
  const { id } = await tokenHelper.verifyRefreshToken(req.body.token);

  const user = await userService.getUserFromToken(id);

  const tokens = await tokenHelper.createTokensPair(user.userId);

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData({ tokens }));
};

export default refreshToken;
