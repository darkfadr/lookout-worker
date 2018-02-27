import winston, { Logger } from 'winston';
require('winston-daily-rotate-file');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug'
    }),
    new (winston.transports.DailyRotateFile)({
      filename: `${__dirname}/logs/log`,
      datePattern: '.yyyy-MM-dd',
      prepend: true,
      level: 'debug'
    }),
  ]
});

logger.stream = {
  write: (message, encoding) => logger.verbose(message)
};

export default logger;
