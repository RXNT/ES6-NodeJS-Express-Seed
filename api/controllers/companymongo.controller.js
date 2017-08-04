import mongoose from 'mongoose';
import async from 'async';
import httpMessages from '../helpers/http-messages';
import appConstants from '../app.constants';
import models from '../models/index'; // eslint-disable-line
import helper from '../helpers/common.helper';
import compnayMongoValidator from '../validators/companymongo.validators';

/**
 * Get all companies
 * @param {object} req - service request
 * @param {object} res - service response
 * @param {method} next - middleware method
 */
const getAllCompanies = (req, res, next) => { // eslint-disable-line no-unused-vars
  compnayMongoValidator.validateGetCompanies(req.body, (err, validationMsg) => {
    if (err) {
      httpMessages.sendJson(req, res, helper.prepareErrorObject(err, req));
    } else if (validationMsg !== null && validationMsg !== undefined && validationMsg.length > 0) {
      httpMessages.sendJson(req, res, {
        ValidationStatus: appConstants.validationStatus.failed,
        ValidationMessages: validationMsg,
      });
    } else {
      //  retrieve all companies from Monogo
      mongoose.model(appConstants.mongoCollections.companies).find({}, (errorInfo, companies) => {
        if (errorInfo) {
          httpMessages.sendJson(req, res, helper.prepareErrorObject({
            primaryKey: '',
            message: errorInfo.message,
            stackTrace: errorInfo.stack,
            eventType: appConstants.eventType.applicationError,
            messageType: appConstants.messageType.error,
            ownerType: appConstants.companymongoController.ownerType,
            source: `${appConstants.companymongoController.ownerType}.getCompanies`,
          }, req));
        } else {
          async.map(companies, (fileType, callback) => {
            callback(null, fileType.toAliasedFieldsObject());
          }, (errInfo, results) => {
            const data = {
              ValidationStatus: appConstants.validationStatus.success,
              Companies: results,
            };
            httpMessages.sendJson(req, res, data);
          });
        }
      });
    }
  });
};

export default {
  getAllCompanies,
};
