import https from 'https';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import expressWinston from 'express-winston';
import mongoose from 'mongoose';

import mongoConn from './api/helpers/mongo-db-helpers';  // eslint-disable-line
import config from './config';
import routes from './api/routes/index.route';
import sslConfig from './api/helpers/ssl-config';
import appLogger from './api/helpers/app-logger';
import appConstants from './api/app.constants';
import appMiddleware from './api/middleware/index.middleware';

const app = express();
let server;
const winstonInstance = appLogger.LOG;

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.set('x-powered-by', false);
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());
app.use(helmet.noCache());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//  middleware to configure cors
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (config.crossOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, RequestInfo, token, userid');
  next();
});

//  middleware for logger
app.use(expressWinston.errorLogger({
  winstonInstance,
}));

//  Apply middlewares
appMiddleware(app);

// mount all routes on /api path
app.use(appConstants.apiServiceRoute, routes);

/**
 * This method starts api service
 */
const bootServer = () => {
  if (config.secureCommunication) {
    const ops = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
      passphrase: sslConfig.secretPharse,
    };
    server = https.createServer(ops, app).listen(config.port, () => {
      console.log(`server started on port ${config.port} (${config.env})`); // eslint-disable-line
    });
  } else {
    // listen on port config.port
    server = http.createServer(app).listen(config.port, () => {
      console.log(`server started on port ${config.port} (${config.env})`); // eslint-disable-line
    });
  }
};

/**
 * This method stops api server
 */
const shutdown = () => {
  server.close();
};

const port = config.port;

//  node js application main module
if (!module.parent) {
  bootServer();
}

module.exports = {
  bootServer,
  shutdown,
  port,
};
