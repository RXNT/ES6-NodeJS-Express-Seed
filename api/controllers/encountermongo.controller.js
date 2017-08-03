import mongoose from 'mongoose';
import async from 'async';
import httpMessages from '../helpers/http-messages';
import appConstants from '../app.constants';
import models from '../models/index'; // eslint-disable-line
import helper from '../helpers/common.helper';
import encounterMongoValidator from '../validators/encountermongo.validators';

const getEncounters = (req, res, next) => { // eslint-disable-line
  encounterMongoValidator.validateGetEncounters(req.body, (err, validationMsg) => {
    if (err) {
      httpMessages.sendJson(req, res, helper.prepareErrorObject(err, req));
    } else if (validationMsg !== null && validationMsg !== undefined && validationMsg.length > 0) {
      httpMessages.sendJson(req, res, {
        ValidationStatus: appConstants.validationStatus.failed,
        ValidationMessages: validationMsg,
      });
    } else {
      //  retrieve all encounters from Monogo
      mongoose.model(appConstants.mongoCollections.encounters).find({}, (errorInfo, encounters) => {
        if (errorInfo) {
          httpMessages.sendJson(req, res, helper.prepareErrorObject({
            primaryKey: '',
            message: errorInfo.message,
            stackTrace: errorInfo.stack,
            eventType: appConstants.eventType.applicationError,
            messageType: appConstants.messageType.error,
            ownerType: appConstants.encountermongoController.ownerType,
            source: `${appConstants.encountermongoController.ownerType}.getEncounters`,
          }, req));
        } else {
          async.map(encounters, (fileType, callback) => {
            callback(null, fileType.toAliasedFieldsObject());
          }, (errInfo, results) => {
            const data = {
              ValidationStatus: appConstants.validationStatus.success,
              Encounters: results,
            };
            httpMessages.sendJson(req, res, data);
          });
        }
      });
    }
  });
};

export default {
  getEncounters,
};
