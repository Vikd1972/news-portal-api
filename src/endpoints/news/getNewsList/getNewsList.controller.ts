import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getNewsList.description';
import db from '../../../db';

const getNewsList: ControllerType = async (req, res) => {
  const [listResponse, meta] = await db.news.findAndCount({
    relations: {
      user: true,
      topics: true,
    },
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(listResponse, { meta }));
};

export default getNewsList;
