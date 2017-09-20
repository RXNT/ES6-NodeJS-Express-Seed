let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let compress = require('compression');
let methodOverride = require('method-override');
let cors = require('cors');
let helmet = require('helmet');
let expressWinston = require('express-winston');

let config = require('../config');
let routes = require('./routes/index.route');
let appLogger = require('./helpers/app-logger');
let appConstants = require('./app.constants');
let appMiddleware = require('./middleware/index.middleware');

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

module.exports = {
  app,
};
