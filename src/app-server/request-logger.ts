import morgan, {StreamOptions} from 'morgan';
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

const dailyHttpOptions = {
  filename: `${LOG_FOLDER_PATH}/access%DATE%.log`,
  datePattern: LOGGER_FILE_DATE_PATTERN,
  zippedArchive: true,
  level: LOGGER_LEVELS.HTTP,
  maxSize: LOGGER_MAXSIZE,
  maxFiles: LOGGER_MAXFILES,
};

const transports = [new winston.transports.DailyRotateFile(dailyHttpOptions)];

const httpLoggerOptions: winston.LoggerOptions = {
  level: getLevel(),
  format,
  transports,
  exitOnError: false,
};

const Logger: winston.Logger = winston.createLogger(httpLoggerOptions);

if (getEnv('nodeEnv') === 'development') {
  Logger.add(new winston.transports.Console());
}

const stream: StreamOptions = {
  write: message => Logger.http(message),
};

export const requestLogger = morgan('combined', {stream});
export default requestLogger;
