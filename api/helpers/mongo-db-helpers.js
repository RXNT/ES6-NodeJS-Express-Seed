const mongoose = require('mongoose');
const config = require('../../config');
const appConstants = require('../app.constants');

mongoose.connect(`mongodb://${config.mongoConnectionString.hostName}:${config.mongoConnectionString.port}/${config.mongoConnectionString.database}`,
  { useMongoClient: true });

const mongoConn = mongoose.connection;

mongoose.connection.on('error', () => {
  throw new Error(`${appConstants.applicationMessages.dbConnectivityFailed}: ${config.db}`);
});

module.exports = {
  mongoConn,
};
