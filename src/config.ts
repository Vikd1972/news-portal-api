import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import _ from 'lodash';

// Do NOT change this! Server always must be in the UTC timezone
process.env.TZ = 'UTC';

type ParsedEnvType = { [key: string]: string; };

const parsedEnvFile = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const localConfig: ParsedEnvType = parsedEnvFile || {};

const defaultConfig = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed as ParsedEnvType;

const joinedConfig: ParsedEnvType = _.defaultsDeep({ ...localConfig }, defaultConfig);

export const envTypes = {
  dev: 'development',
  test: 'test',
  stage: 'staging',
  prod: 'production',
};

const envType = process.env.NODE_ENV || joinedConfig.NODE_ENV;
export const isDev = envType === envTypes.dev;
export const isTest = envType === envTypes.test;

const logWarn = (...args: unknown[]) => {
  if (isTest) {
    return;
  }

  console.warn('\x1b[33m%s\x1b[0m', '   WARN: ', ...args);
};

if (!parsedEnvFile) {
  logWarn('You don\'t have a .env file.');
} else if (Object.keys(localConfig).length < Object.keys(defaultConfig).length) {
  const localConfigFieldsCont = Object.keys(localConfig).length;
  const defaultConfigFieldsCont = Object.keys(defaultConfig).length;
  const missedFields = defaultConfigFieldsCont - localConfigFieldsCont;

  logWarn(`You have ${missedFields} missed fields in the .env file.`);
}

const transformStringToBool = (str: string): boolean => str === 'true';

const config = {
  server: {
    port: +joinedConfig.SERVER_PORT,
    bodySizeLimit: joinedConfig.SERVER_BODY_SIZE_LIMIT,
    isCorsEnabled: transformStringToBool(joinedConfig.SERVER_IS_CORS_ENABLED),
    isClusterModeEnabled: transformStringToBool(joinedConfig.SERVER_IS_CLUSTER_MODE_ENABLED),
    clusterForksLimit: +joinedConfig.SERVER_CLUSTER_FORKS_LIMIT,
    endpointsPrefix: joinedConfig.SERVER_ENDPOINTS_PREFIX,
    internalErrorMessage: joinedConfig.SERVER_INTERNAL_ERROR_MESSAGE,
    publicFolderName: joinedConfig.SERVER_PUBLIC_FOLDER_NAME,
    isCronJobsActive: joinedConfig.SERVER_IS_CRON_JOBS_ACTIVE,
  },
  envType,
  logger: {
    timezone: joinedConfig.LOGGER_TIMEZONE,
    showInfoLogs: transformStringToBool(joinedConfig.LOGGER_SHOW_INFO_LOGS),
    storeInfoLogs: transformStringToBool(joinedConfig.LOGGER_STORE_INFO_LOGS),
    infoLogsStoredFilesLimit: +joinedConfig.LOGGER_INFO_LOGS_STORED_FILES_LIMIT,
    showWarningLogs: transformStringToBool(joinedConfig.LOGGER_SHOW_WARNING_LOGS),
    storeWarningLogs: transformStringToBool(joinedConfig.LOGGER_STORE_WARNING_LOGS),
    warningLogsStoredFilesLimit: +joinedConfig.LOGGER_WARNING_LOGS_STORED_FILES_LIMIT,
    showErrorLogs: transformStringToBool(joinedConfig.LOGGER_SHOW_ERROR_LOGS),
    storeErrorLogs: transformStringToBool(joinedConfig.LOGGER_STORE_ERROR_LOGS),
    errorLogsStoredFilesLimit: +joinedConfig.LOGGER_ERROR_LOGS_STORED_FILES_LIMIT,
  },
  urls: {
    current: joinedConfig.CURRENT_URL,
    clientUrl: joinedConfig.CLIENT_URL,
  },
  db: {
    host: joinedConfig.DB_HOST,
    port: +joinedConfig.DB_PORT,
    user: joinedConfig.DB_USER,
    password: joinedConfig.DB_PASSWORD,
    database: joinedConfig.DB_NAME,
    dialect: joinedConfig.DB_DIALECT,
  },
  passwordHash: {
    type: joinedConfig.PASSWORD_HASH_TYPE,
    key: joinedConfig.PASSWORD_HASH_KEY,
  },
  token: {
    secret: joinedConfig.TOKEN_SECRET,
    authExpiration: joinedConfig.TOKEN_AUTH_EXPIRATION,
    refreshExpiration: joinedConfig.TOKEN_REFRESH_EXPIRATION,
    tokenResetPasswordExpiration: joinedConfig.TOKEN_RESET_PASSWORD_EXPIRATION,
  },
  isSwaggerEnabled: transformStringToBool(joinedConfig.IS_SWAGGER_ENABLED),
  localPath: joinedConfig.LOCAL_PATH,
  pathToBooks: joinedConfig.PATH_TO_BOOKS,
};

export default config;
