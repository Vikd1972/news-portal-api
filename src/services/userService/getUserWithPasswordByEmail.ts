import db from '../../db';
import { createError, ResponseErrorTypeENUM } from '../errorHelper';

const getUserWithPasswordByEmail = async (email: string) => {
  const user = await db.user
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();

  if (!user) {
    throw createError({
      message: 'User not found',
      type: ResponseErrorTypeENUM.notFound,
    });
  }

  return user;
};

export default getUserWithPasswordByEmail;
