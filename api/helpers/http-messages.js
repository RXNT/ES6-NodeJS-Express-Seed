import appLogger from './app-logger';
import appConstants from '../app.constants';

// http 200
const send200 = (req, resp, data)  =>{ // eslint-disable-line
  resp.writeHead(200, {
    'Content-Type': 'application/json',
  });
  resp.end();
};

// send json response
const sendJson = (req, resp, data) => { // eslint-disable-line
  resp.writeHead(200, {
    'Content-Type': 'application/json',
  });
  if (data) resp.write(JSON.stringify(data));
  resp.end();
};

// http 500
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

// http 403
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

// http 404
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

// http 405
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
