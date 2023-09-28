import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';

import UserEntity from './UserEntity';
import TopicEntity from './TopicEntity';

@typeorm.Entity()
class NewsEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
 newsId: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: false,
  })
  dateOfPublication: Date;

  @typeorm.Column({
    type: 'text',
    nullable: false,
  })
  title?: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @typeorm.ManyToMany(() => TopicEntity, (topic) => topic.news, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinTable()
  topics?: TopicEntity[];

  @typeorm.ManyToOne(() => UserEntity, (user) => user.news, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinColumn()
  user?: UserEntity;
}

export default NewsEntity;
