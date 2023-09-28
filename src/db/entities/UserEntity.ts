import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';
import UserRoleEntity from './UserRoleEntity';
import NewsEntity from './NewsEntity';

import { passwordHelper } from '../../utils';

@typeorm.Entity()
class UserEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  userId: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  lastActivity: Date;

  @typeorm.Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  email: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  firstName?: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  lastName?: string;

  @typeorm.Column({
    type: 'text',
    select: false,
    nullable: false,
  })
  password: string;

  @typeorm.BeforeInsert()
  hashPassword() {
    this.password = passwordHelper.hash(this.password);
  }

  @typeorm.BeforeInsert()
  @typeorm.BeforeUpdate()
  formatEmail() {
    this.email = this.email.toLowerCase().trim();
  }

  @typeorm.OneToMany(() => NewsEntity, (news) => news.user, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinColumn()
  news?: NewsEntity[];

  @typeorm.ManyToOne(() => UserRoleEntity, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinColumn()
  role?: UserRoleEntity;
}

export default UserEntity;
