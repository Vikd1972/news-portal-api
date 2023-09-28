import { UserRolesENUM } from '../db';
import { createError, ResponseErrorTypeENUM } from '../services/errorHelper';
import { MiddlewareType } from './type';

const checkRole = (roleList: UserRolesENUM[]) => {
  const checkUserRole: MiddlewareType = async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return next(createError({
          message: 'User not found',
          type: ResponseErrorTypeENUM.notFound,
        }));
      }

      const isAccessIsAllowed = roleList.includes(user.role.role);

      if (!isAccessIsAllowed) {
        return next(createError({
          message: 'Access to operation denied',
          type: ResponseErrorTypeENUM.authorization,
        }));
      }

      next();
    } catch (err) {
      next(err);
    }
  };

  return checkUserRole;
};

export default checkRole;
