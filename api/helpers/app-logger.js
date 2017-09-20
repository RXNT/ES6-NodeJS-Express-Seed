let winston = require('winston');
let config = require('../../config');
let helper = require('./common.helper');

/**
 * Prepares custom file formatter
 * @param {object} options - Logger options
 */
function customFileFormatter(options) {
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

module.exports = {
  LOG,
};
