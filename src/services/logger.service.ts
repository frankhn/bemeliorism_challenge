import appRoot from 'app-root-path';
import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: `${appRoot}/logs/error.log`,
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.prettyPrint(),
    ),
  }),
  new winston.transports.File({
    filename: `${appRoot}/logs/info.log`,
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.prettyPrint(),
    ),
  }),
  new winston.transports.File({ filename: `${appRoot}/logs/all.log` }),
];

export const logger = winston.createLogger({
  levels,
  format,
  transports,
});

export default logger;
