import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';
import UserEntity from './UserEntity';

export enum UserRolesENUM {
  admin = 'Admin',
  user = 'User',
}

@typeorm.Entity()
class UserRoleEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  userRoleId: number;

  @typeorm.Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  role: UserRolesENUM;

  @typeorm.OneToMany(() => UserEntity, (user) => user.role)
  users?: UserEntity[];
}

export default UserRoleEntity;
