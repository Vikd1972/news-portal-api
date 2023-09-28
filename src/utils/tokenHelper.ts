import jwt from 'jsonwebtoken';

import config from '../config';
import { ResponseErrorTypeENUM, createError } from '../services/errorHelper';

type TokenPayloadtype = { id: number }

const asyncSign = <P extends object>(
  payload: P,
  secret: string,
  options: jwt.SignOptions,
): Promise<string> => {
  return new Promise((res, rej) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return rej(handleTokenVerificationError(err));
      }
      res(token);
    });
  });
};

const createAuthToken = async (id: number): Promise<string> => {
  const token = await asyncSign(
    { id },
    config.token.secret,
    { expiresIn: config.token.authExpiration },
  );

  return token;
};

const createRefreshToken = async (id: number): Promise<string> => {
  const token = await asyncSign(
    { id },
    config.token.secret,
    { expiresIn: config.token.refreshExpiration },
  );

  // Add logic for the token storing

  return token;
};

const createTokensPair = async (id: number): Promise<{
  authorization: string;
  refresh: string;
}> => {
  const authToken = await createAuthToken(id);
  const refreshToken = await createRefreshToken(id);

  return {
    authorization: authToken,
    refresh: refreshToken,
  };
};

const asyncVerify = <T>(token: string, secret: string): Promise<T> => {
  return new Promise((res, rej) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return rej(handleTokenVerificationError(err));
      }
      res(decoded as T);
    });
  });
};

const verifyAuthToken = (token: string): Promise<TokenPayloadtype> => {
  return asyncVerify(token, config.token.secret);
};

const verifyRefreshToken = async (token: string): Promise<TokenPayloadtype> => {
  const decoded = await asyncVerify<TokenPayloadtype>(token, config.token.secret);

  // Add logic for the token checking

  return decoded;
};

const handleTokenVerificationError = (err: Error): Error => {
  if (err.name === 'JsonWebTokenError') {
    return createError({
      message: 'Invalid token',
      type: ResponseErrorTypeENUM.authorization,
    });
  }

  if (err.message === 'jwt expired') {
    return createError({
      message: 'Expired token',
      type: ResponseErrorTypeENUM.authorization,
    });
  }

  return err;
};

export default {
  createAuthToken,
  createRefreshToken,
  createTokensPair,
  verifyAuthToken,
  verifyRefreshToken,
  handleTokenVerificationError,
};
