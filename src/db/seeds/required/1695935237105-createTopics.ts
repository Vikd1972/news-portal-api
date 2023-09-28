import db from '../../index';
import asyncForEach from '../../../utils/asyncForEach';

const topics = [
  {
    topic: 'Sport',
  },
  {
    topic: 'Policy',
  },
  {
    topic: 'World',
  },
  {
    topic: 'Science',
  },
];

const createTopics = async () => {
  await asyncForEach(
    topics,
    async (item) => {
      await db.topic.create({
        topic: item.topic,
      });
    },
  );
};

export default createTopics;
