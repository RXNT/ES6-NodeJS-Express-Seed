import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import expressWinston from 'express-winston';

import config from '../config';
import routes from './routes/index.route';
import appLogger from './helpers/app-logger';
import appConstants from './app.constants';
import appMiddleware from './middleware/index.middleware';

const app = express();

const winstonInstance = appLogger.LOG;

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

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

export default {
  app,
};
