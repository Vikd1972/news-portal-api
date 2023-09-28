import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getOneUser.description';
import db from '../../../db';

const getOne: ControllerType = async (req, res) => {
  const withDeleted = req.query.withDeleted === 'true';

  const user = await db.user.findByPk(+req.params.userId, {
    withDeleted,
    relations: {
      role: true,
    },
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(user));
};

export default getOne;
