import config from '../../config';
import appConstants from '../app.constants';
import appLogger from './app-logger';
import emailHelper from './email';

/**
 * Get current UTC date and time
 */
const getCurrentUTCISODateTime = () => {
  const options = { hour12: false };
  const localDate = new Date().toLocaleString('en-US', options);
  if (localDate.indexOf(',') >= 0) {
    const currentDtTm = localDate.split(',');
    const date = currentDtTm[0].split('/');
    const time = currentDtTm[1].split(':');
    return new Date(Date.UTC(date[2], date[0] - 1, date[1], time[0], time[1], time[2]));
  } else {  // eslint-disable-line
    const currentDtTm = localDate.replace(/[^ -~?]/g, '').split(' ');
    const date = currentDtTm[0].split('/');
    const time = currentDtTm[1].split(':');
    return new Date(Date.UTC(parseInt(date[2], 10), parseInt(date[0], 10) - 1,
      parseInt(date[1], 10), parseInt(time[0], 10), parseInt(time[1], 10), parseInt(time[2], 10)));
  }
};

/**
 * Prepares error object
 * @param {object} err - Error object
 * @param {object} req - Service request
 */
const prepareErrorObject = (err, req) => {
  const errObject = {};
  if (err.stackTrace !== null && err.stackTrace !== undefined && err.stackTrace !== '') {
    if (req !== null && req !== undefined) {
      errObject.application = `${config.application}`;
      errObject.hostedIP = `${config.host}:${config.port}`;

      errObject.message = err.message;
      errObject.stackTrace = err.stackTrace;
      errObject.primaryKey = err.primaryKey;
      errObject.eventType = err.eventType;
      errObject.messageType = err.messageType;
      errObject.ownerType = err.ownerType;
      errObject.source = err.source;

      errObject.doctorCompanyId = req.body.companyId;
      errObject.loggedInUserId = req.body.loggedInUserId;
      errObject.signature = req.body.signature;
      errObject.token = req.body.token;
      errObject.consumerIP = (req.connection !== undefined && req.connection !== null ? req.connection.remoteAddress : '');
      errObject.device = req.body.device;
      errObject.browser = req.body.browser;
    }

    if (errObject.eventType === appConstants.eventType.applicationError) {
      let messageType = '';
      let ownerType = '';
      if (errObject.messageType !== undefined && errObject.messageType !== null) {
        messageType = errObject.messageType;
      }
      if (errObject.ownerType !== undefined && errObject.ownerType !== null) {
        ownerType = errObject.ownerType;
      }
      const subject = `[${messageType}] ${ownerType} Message From ${errObject.Application}`;
      emailHelper.sendEmail(config.errorToEmail, subject, JSON.stringify(errObject));
      appLogger.LOG.error(JSON.stringify(errObject));
    } else {
      appLogger.LOG.info(JSON.stringify(errObject));
    }
  }

  let response = {};
  if (err.stackTrace !== null && err.stackTrace !== undefined && err.stackTrace !== '') {
    response = {
      ValidationStatus: appConstants.validationStatus.failed,
      ValidationMessages: [appConstants.applicationMessages.internalServerError],
    };
  } else if (err.actualErr) {
    response = {
      ValidationStatus: appConstants.validationStatus.failed,
      ValidationMessages: [err.message],
    };
  }

  return response;
};

export default {
  getCurrentUTCISODateTime,
  prepareErrorObject,
};
