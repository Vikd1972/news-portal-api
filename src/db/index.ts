import UserEntity from './entities/UserEntity';
import UserRoleEntity from './entities/UserRoleEntity';
import NewsEntity from './entities/NewsEntity';
import TopicEntity from './entities/TopicEntity';

import BaseRepository from './utils/BaseRepository';

export { default as dataSource } from './utils/dataSource';
export { default as connectToDb } from './utils/connectToDb';
export { FindAndCountMetaType } from './utils/BaseRepository';

// Entities reexport START
export { default as UserEntity } from './entities/UserEntity';
export { default as NewsEntity } from './entities/NewsEntity';
export { default as TopicEntity } from './entities/TopicEntity';
export { default as UserRoleEntity, UserRolesENUM } from './entities/UserRoleEntity';
// Entities reexport END

export default {
  user: new BaseRepository(UserEntity),
  news: new BaseRepository(NewsEntity),
  topic: new BaseRepository(TopicEntity),
  userRole: new BaseRepository(UserRoleEntity),
};
