import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getUsersList.description';
import db from '../../../db';

const getUsersList: ControllerType = async (req, res) => {
  const [listResponse, meta] = await db.user.findAndCount({
    relations: { role: true },
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(listResponse, { meta }));
};

export default getUsersList;
