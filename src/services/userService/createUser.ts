import * as typeorm from 'typeorm';

import db, { UserEntity, UserRolesENUM } from '../../db';
import checkIfEmailFree from './checkIfEmailFree';

const createUser = async (data: typeorm.DeepPartial<UserEntity>): Promise<UserEntity> => {
  await checkIfEmailFree(data.email);

  const newUserData = { ...data };
  newUserData.role = await db.userRole.findOne({
    where: {
      role: UserRolesENUM.user,
    },
  });

  const newUser = await db.user.create({
    ...newUserData,
    role: { ...newUserData.role },
  });

  delete newUser.password;

  return newUser;
};

export default createUser;
