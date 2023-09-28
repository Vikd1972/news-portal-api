import HTTP_STATUS_CODES from 'http-status-codes';

import createAndUpdateNews from '../../../services/news/createAndUpdateNews';
import { ControllerType } from './createNews.description';

const createNews: ControllerType = async (req, res) => {
  const data = req.body;
  const user = req.user;

  const news = await createAndUpdateNews({ data, user });

  res.status(HTTP_STATUS_CODES.CREATED).json(res.createResponseData(news, { message: 'News created' }));
};

export default createNews;
