import winston from 'winston';
import 'winston-daily-rotate-file';
import getEnv from '../config/envs';
import {
  LOGGER_FILE_DATE_PATTERN,
  LOGGER_LEVELS,
  LOGGER_MAXFILES,
  LOGGER_MAXSIZE,
  LOG_FOLDER_PATH,
} from '../config/loggerConfig';

const {combine, timestamp, label, json} = winston.format;

const format = combine(label({label: 'none'}), timestamp(), json());

function getLevel() {
  if (getEnv('nodeEnv') === 'development') {
    return LOGGER_LEVELS.DEBUG;
  } else {
    return LOGGER_LEVELS.WARN;
  }
}

const dailyFileOptions = {
  error: {
    filename: `${LOG_FOLDER_PATH}/error%DATE%.log}`,
    datePattern: LOGGER_FILE_DATE_PATTERN,
    zippedArchive: true,
    json: true,
    level: LOGGER_LEVELS.ERROR,
    maxSize: LOGGER_MAXSIZE,
    maxFiles: LOGGER_MAXFILES,
  },
  info: {
    filename: `${LOG_FOLDER_PATH}/combined%DATE%.log`,
    datePattern: LOGGER_FILE_DATE_PATTERN,
    zippedArchive: true,
    json: true,
    level: LOGGER_LEVELS.INFO,
    maxSize: LOGGER_MAXSIZE,
    maxFiles: LOGGER_MAXFILES,
  },
  exception: {
    filename: `${LOG_FOLDER_PATH}/exceptions%DATE%.log`,
    datePattern: LOGGER_FILE_DATE_PATTERN,
    zippedArchive: true,
    json: true,
    maxSize: LOGGER_MAXSIZE,
    maxFiles: LOGGER_MAXFILES,
  },
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  winston.format.colorize({message: true}),
  winston.format.errors({stack: true}),
  winston.format.metadata(),
  winston.format.simple()
);

const consoleOptions = {
  handleExceptions: true,
  format: consoleFormat,
};

const transports = [
  new winston.transports.DailyRotateFile(dailyFileOptions.error),
  new winston.transports.DailyRotateFile(dailyFileOptions.info),
];

const exceptionHandlers = [
  new winston.transports.DailyRotateFile(dailyFileOptions.exception),
];

const loggerOptions: winston.LoggerOptions = {
  level: getLevel(),
  format,
  transports,
  exceptionHandlers,
  exitOnError: false,
};

const Logger = winston.createLogger(loggerOptions);

if (getEnv('nodeEnv') === 'development') {
  Logger.add(new winston.transports.Console(consoleOptions));
}

export const logger = Logger;
export default logger;
