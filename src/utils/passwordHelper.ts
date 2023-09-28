import crypto from 'crypto';

import config from '../config';

const hashPassword = (purePassword: string): string => {
  const hashedPassword = crypto
    .createHmac(config.passwordHash.type, config.passwordHash.key)
    .update(purePassword)
    .digest('hex');

  return hashedPassword;
};

const comparePasswords = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

export default {
  hash: hashPassword,
  compare: comparePasswords,
};
