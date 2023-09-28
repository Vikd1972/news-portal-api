import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './deleteUser.description';
import db from '../../../db';

const deleteUser: ControllerType = async (req, res) => {
  const isHardDelete = req.query.hardDelete === 'true';
  const userId = +req.params.userId;

  if (isHardDelete) {
    await db.user.hardDelete(userId);
  } else {
    await db.user.softDelete(userId);
  }

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData('User deleted'));
};

export default deleteUser;
