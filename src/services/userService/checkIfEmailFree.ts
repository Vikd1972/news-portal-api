import * as typeorm from 'typeorm';
import db from '../../db';
import UserEntity from '../../db/entities/UserEntity';
import { createValidationResponseError } from '../errorHelper';

const checkIfEmailFree = async (email: string, userId?: number): Promise<void> => {
  const where: typeorm.FindOptionsWhere<UserEntity> = { email };

  if (userId) {
    where.userId = typeorm.Not(userId);
  }

  const userWithTheSameEmail = await db.user.findOne({ where }, false);

  if (userWithTheSameEmail) {
    throw createValidationResponseError([{
      key: 'email',
      path: 'body',
      message: 'Email should be unique',
      type: 'unique',
    }]);
  }
};

export default checkIfEmailFree;
