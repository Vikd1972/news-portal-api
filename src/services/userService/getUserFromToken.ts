import db, { UserEntity } from '../../db';
import { ResponseErrorTypeENUM, createError } from '../errorHelper';

const getUserFromToken = async (userId: number): Promise<UserEntity> => {
  const user = await db.user.findByPk(userId, {
    relations: {
      role: true,
    },
  }, false);

  if (!user) {
    throw createError({
      message: 'User not found',
      type: ResponseErrorTypeENUM.authorization,
    });
  }

  return user;
};

export default getUserFromToken;
