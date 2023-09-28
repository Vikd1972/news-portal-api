import { DataSource } from 'typeorm';
import path from 'path';

import CustomNamingStrategy from './CustomNamingStrategy';
import config from '../../config';

const dataSource = new DataSource({
  type: config.db.dialect as 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  subscribers: [],
  entities: [path.normalize(`${__dirname}/../entities/**/*.{ts,js}`)],
  migrations: [path.normalize(`${__dirname}/../migrations/*.{ts,js}`)],
  namingStrategy: new CustomNamingStrategy(),
});

export default dataSource;
