import mongoose from 'mongoose';
import config from '../../config';
import appConstants from '../app.constants';

mongoose.connect(`mongodb://${config.mongoConnectionString.hostName}:${config.mongoConnectionString.port}/${config.mongoConnectionString.database}`,
  { useMongoClient: true });

const mongoConn = mongoose.connection;

mongoose.connection.on('error', () => {
  throw new Error(`${appConstants.applicationMessages.dbConnectivityFailed}: ${config.db}`);
});

module.exports = mongoConn;
