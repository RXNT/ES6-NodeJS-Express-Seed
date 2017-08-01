import appLogger from './app-logger';
import appConstants from '../app.constants';

// http 200
exports.send200 = (req, resp, data)  =>{ // eslint-disable-line
  resp.writeHead(200, {
    'Content-Type': 'application/json',
  });
  resp.end();
};

// send json response
exports.sendJson = (req, resp, data) => { // eslint-disable-line
  resp.writeHead(200, {
    'Content-Type': 'application/json',
  });
  if (data) resp.write(JSON.stringify(data));
  resp.end();
};

// http 500
exports.show500 = (req, res, err) => {
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
exports.show403 = (req, resp) => {
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
exports.show404 = (req, resp) => {
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
exports.show405 = (req, resp) => {
  resp.writeHead(405, appConstants.applicationMessages.methodNotSupported, {
    'Content-Type': 'application/json',
  });
  resp.write(JSON.stringify({
    ValidationStatus: appConstants.validationStatus.failed,
    ValidationMessages: [appConstants.applicationMessages.methodNotSupported],
  }));
  resp.end();
};
