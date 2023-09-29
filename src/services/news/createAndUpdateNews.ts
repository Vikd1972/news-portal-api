import db, { NewsEntity, UserEntity } from '../../db';

type PropsType = {
  data: {
    title?: string;
    content?: string;
    dateOfPublication?: Date;
    topics?: number[];
  }
  user: UserEntity;
  newsId?: number;
}
const createAndUpdateNews = async (props: PropsType) => {
  let news = new NewsEntity();

  if (props.newsId) {
    news = await db.news.findByPk(props.newsId);
  }

  const topicsIds = props.data.topics || [0];
  const topics = await db.topic
    .createQueryBuilder('topic')
    .where('topic.topicId IN (:...topicsIds)', { topicsIds })
    .getMany();

  const newNews: NewsEntity = {
    ...news,
    title: props.data.title && props.data.title,
    content: props.data.content && props.data.content,
    dateOfPublication: props.data.dateOfPublication && new Date(props.data.dateOfPublication),
    topics: props.data.topics && topics,
    user: props.user,
  };

  let currentNews: NewsEntity;

  if (props.newsId) {
    await db.news.update(props.newsId, newNews);
    currentNews = await db.news.findByPk(props.newsId);
  } else {
    currentNews = await db.news.create(newNews);
  }

  return currentNews;
};

export default createAndUpdateNews;
