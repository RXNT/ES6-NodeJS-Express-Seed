import winston from 'winston';
import config from '../../config';
import helper from './common.helper';

function customFileFormatter(options) {
  // Return string will be passed to logger.
  const nextLine = '\n\t';
  return `[ ${options.timestamp()} ] [ ${options.level.toUpperCase()} ]  ${(undefined !== options.message ? options.message : '')} +
     ${(options.meta && Object.keys(options.meta).length ? nextLine + JSON.stringify(options.meta) : '')}`;
}

const LOG = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      timestamp() {
        return helper.getCurrentUTCISODateTime().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      },
      filename: config.logFileName,
      level: 'debug',
      json: false,
      formatter: customFileFormatter,
    }),
  ],
});

export default {
  LOG,
};
