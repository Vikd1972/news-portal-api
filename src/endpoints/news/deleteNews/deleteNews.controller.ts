import HTTP_STATUS_CODES from 'http-status-codes';

import { ControllerType } from './deleteNews.description';
import db from '../../../db';

const deleteNews: ControllerType = async (req, res) => {
  const isHardDelete = req.query.hardDelete === 'true';
  const newsId = +req.params.newsId;

  if (isHardDelete) {
    await db.news.hardDelete(newsId);
  } else {
    await db.news.softDelete(newsId);
  }

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData('News deleted'));
};

export default deleteNews;
