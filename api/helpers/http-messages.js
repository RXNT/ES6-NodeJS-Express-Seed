import appLogger from './app-logger';
import appConstants from '../app.constants';

/**
 * Send 200 Response to Client
 * @param {object} req - service request
 * @param {object} resp - service response
 * @param {method} err - call back method
 */
const send200 = (req, resp, data) => { // eslint-disable-line no-unused-vars
  resp.writeHead(200, {
    'Content-Type': 'application/json',
  });
  resp.end();
};

/**
 * Send 200 Response with data to Client
 * @param {object} req - service request
 * @param {object} resp - service response
 * @param {method} err - call back method
 */
const sendJson = (req, resp, data) => { // eslint-disable-line no-unused-vars
  resp.writeHead(200, {
    'Content-Type': 'application/json',
  });
  if (data) resp.write(JSON.stringify(data));
  resp.end();
};

/**
 * Send 500 Response to Client
 * @param {object} req - service request
 * @param {object} res - service response
 * @param {method} err - call back method
 */
const show500 = (req, res, err) => {
  appLogger.LOG.error(err);
  res.writeHead(500, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify({
    ValidationStatus: appConstants.validationStatus.failed,
    ValidationMessages: [appConstants.applicationMessages.internalServerError],
  }));
  res.end();
};

/**
 * Send 403 Response to Client
 * @param {object} req - service request
 * @param {object} resp - service response
 */
const show403 = (req, resp) => {
  resp.writeHead(403, appConstants.applicationMessages.accessForbidden, {
    'Content-Type': 'application/json',
  });
  resp.write(JSON.stringify({
    ValidationStatus: appConstants.validationStatus.failed,
    ValidationMessages: [appConstants.applicationMessages.accessForbidden],
  }));
  resp.end();
};

/**
 * Send 404 Response to Client
 * @param {object} req - service request
 * @param {object} resp - service response
 */
const show404 = (req, resp) => {
  resp.writeHead(404, appConstants.applicationMessages.resourceNotFound, {
    'Content-Type': 'application/json',
  });
  resp.write(JSON.stringify({
    ValidationStatus: appConstants.validationStatus.failed,
    ValidationMessages: [appConstants.applicationMessages.resourceNotFound],
  }));
  resp.end();
};

/**
 * Send 405 Response to Client
 * @param {object} req - service request
 * @param {object} resp - service response
 */
const show405 = (req, resp) => {
  resp.writeHead(405, appConstants.applicationMessages.methodNotSupported, {
    'Content-Type': 'application/json',
  });
  resp.write(JSON.stringify({
    ValidationStatus: appConstants.validationStatus.failed,
    ValidationMessages: [appConstants.applicationMessages.methodNotSupported],
  }));
  resp.end();
};

export default {
  send200,
  sendJson,
  show500,
  show403,
  show404,
  show405,
};
