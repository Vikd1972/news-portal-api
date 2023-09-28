import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';
import NewsEntity from './NewsEntity';

@typeorm.Entity()
class TopicEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  topicId: number;

  @typeorm.Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  topic: string;

  @typeorm.ManyToMany(() => NewsEntity, (news) => news.topics, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  news?: NewsEntity[];
}

export default TopicEntity;
