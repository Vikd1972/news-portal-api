/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import util from 'util';

import config from '../config';

const logColors = {
  info: '\x1b[36m%s\x1b[0m',
  warn: '\x1b[33m%s\x1b[0m',
  error: '\x1b[31m%s\x1b[0m',
};

type LogArguments = unknown[]

const saveLog = async (type: 'log' | 'warn' | 'error', args: LogArguments): Promise<void> => {
  const storedFilesLimit = config.logger[`${type}LogsStoredFilesLimit`];
  if (!storedFilesLimit) {
    return;
  }

  const folderPath = path.normalize(`${__dirname}/../../logs/${type}`);
  await fs.promises.mkdir(folderPath, { recursive: true });

  const constfilePath = `${folderPath}/${dayjs().format('YYYY-MM-DD')}`;

  const logRecord = args.slice(2).map((i) => JSON.stringify(i, null, 2).replace(/^"|"$/g, '')).join(' ');

  await fs.promises.appendFile(constfilePath, `[${dayjs().format('YYYY-MM-DD hh:mm:ss:SSS')}] ${logRecord}\n================================================\n`);

  const folderContent = await fs.promises.readdir(folderPath);
  folderContent.splice(storedFilesLimit * -1, storedFilesLimit);
  folderContent.forEach((fileName) => {
    fs.promises.unlink(`${folderPath}/${fileName}`);
  });
};

const storingConsole = {
  log: (...args: LogArguments) => {
    console.log(...args);
    saveLog('log', args);
  },
  warn: (...args: LogArguments) => {
    console.warn(...args);
    saveLog('warn', args);
  },
  error: (...args: LogArguments) => {
    console.error(...args);
    saveLog('error', args);
  },
};

const logger = {
  info: (...args: LogArguments) => {
    if (!config.logger.showInfoLogs) { return; }

    storingConsole.log(logColors.info, '   INFO: ', ...args);
  },
  subInfo: (...args: LogArguments) => {
    if (!config.logger.showInfoLogs) { return; }

    storingConsole.log(logColors.info, '      || ', ...args);
  },
  infoForce: (...args: LogArguments) => {
    storingConsole.log(logColors.info, '   INFO: ', ...args);
  },
  subInfoForce: (...args: LogArguments) => {
    storingConsole.log(logColors.info, '      || ', ...args);
  },
  warn: (...args: LogArguments) => {
    if (!config.logger.showWarningLogs) { return; }

    storingConsole.warn(logColors.warn, '   WARN: ', ...args);
  },
  subWarn: (...args: LogArguments) => {
    if (!config.logger.showWarningLogs) { return; }

    storingConsole.warn(logColors.warn, '      || ', ...args);
  },
  error: (...args: LogArguments) => {
    if (!config.logger.showErrorLogs) { return; }

    storingConsole.error(logColors.error, '  ERROR: ', ...args);
  },
  subError: (...args: LogArguments) => {
    if (!config.logger.showErrorLogs) { return; }

    storingConsole.error(logColors.error, '      || ', ...args);
  },
  gap: (size = 1) => {
    console.log(...new Array(size).fill('\n'));
  },
  /** Dev only */
  deepLog: (name = 'DeepLog', obj: unknown = {}) => {
    console.log(name, util.inspect(obj, { showHidden: false, depth: null, colors: true }));
  },
};

export default logger;
