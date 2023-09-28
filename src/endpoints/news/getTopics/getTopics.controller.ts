import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getTopics.description';
import db from '../../../db';

const getTopics: ControllerType = async (req, res) => {
  const [listResponse, meta] = await db.topic.findAndCount();

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(listResponse, { meta }));
};

export default getTopics;
