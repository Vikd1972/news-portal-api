import db from '../../index';
import { UserRolesENUM } from '../../entities/UserRoleEntity';
import asyncForEach from '../../../utils/asyncForEach';

const roles = [
  {
    role: UserRolesENUM.admin,
  },
  {
    role: UserRolesENUM.user,
  },
];

const createRoles = async () => {
  await asyncForEach(
    roles,
    async (item) => {
      await db.userRole.create({
        role: item.role,
      });
    },
  );
};

export default createRoles;
