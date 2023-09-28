import HTTP_STATUS_CODES from 'http-status-codes';

import createAndUpdateBook from '../../../services/news/createAndUpdateNews';
import { ControllerType } from './updateNews.description';

const updateNews: ControllerType = async (req, res) => {
  const data = req.body;
  const user = req.user;
  const newsId = +req.params.newsId;

  const news = await createAndUpdateBook({
    data,
    user,
    newsId,
  });

  res.status(HTTP_STATUS_CODES.OK).json(res.createResponseData(news));
};

export default updateNews;
