import HTTP_STATUS_CODES from 'http-status-codes';
import * as typeorm from 'typeorm';
import _ from 'lodash';

import { ControllerType } from './updateUser.description';
import db, { UserEntity } from '../../../db';
import userService from '../../../services/userService';

const updateUser: ControllerType = async (req, res) => {
  const userId = +req.params.userId;

  if (req.body.email) {
    await userService.checkIfEmailFree(req.body.email, userId);
  }

  const dataForUpdate: typeorm.DeepPartial<UserEntity> = _.omit(req.body, ['role']);

  await db.user.update(userId, dataForUpdate);

  const updatedUser = await db.user.findByPk(userId, {
    relations: {
      role: true,
    },
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(updatedUser));
};

export default updateUser;
