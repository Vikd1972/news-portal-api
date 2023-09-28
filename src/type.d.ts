import { UserEntity } from './db';
import createResponseData from './utils/createResponseData';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }

    interface Response {
      createResponseData: typeof createResponseData;
    }
  }
}
