import winston, { Logger } from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: 'debug'})
  ]
});

logger.stream = {
  write: (message, encoding) => logger.verbose(message)
};

export default logger;
