import path from 'path';

import { UserEntity } from '../db';

const sleep = (duration: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, duration);
  });
};

const safeJsonParse = <ValueType>(
  string: string,
  defaultValue: ValueType = null,
): ValueType | null => {
  try {
    const parsed = JSON.parse(string);

    return parsed;
  } catch {
    return defaultValue;
  }
};

const getUserFullName = (user: UserEntity): string => {
  if (!user.firstName && !user.lastName) {
    return null;
  }

  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
};

const getFileExtention = (filename: string) => {
  return path.extname(filename).replace('.', '');
};

export default {
  sleep,
  safeJsonParse,
  getUserFullName,
  getFileExtention,
};
