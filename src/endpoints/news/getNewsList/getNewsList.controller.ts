import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './getNewsList.description';
import db from '../../../db';

const getNewsList: ControllerType = async (req, res) => {
  const startDate = new Date();

  const news = await db.news
    .createQueryBuilder('news')
    .leftJoinAndSelect('news.user', 'user')
    .leftJoinAndSelect('news.topics', 'topics')
    .where('news.dateOfPublication <= :startDate', { startDate })
    .orderBy('news.dateOfPublication', 'DESC')
    .getMany();

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(news));
};

export default getNewsList;
