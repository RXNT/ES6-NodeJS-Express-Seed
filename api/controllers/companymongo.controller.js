const mongoose = require('mongoose');
const async = require('async');
const httpMessages = require('../helpers/http-messages');
const appConstants = require('../app.constants');
let models = require('../models/index'); // eslint-disable-line
const helper = require('../helpers/common.helper');
const compnayMongoValidator = require('../validators/companymongo.validators');

/**
 * Get all companies
 * @param {object} req - service request
 * @param {object} res - service response
 * @param {method} next - middleware method
 */
const getAllCompanies = (req, res) => {
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
            // NOTE: the returned object now has both the actual property AND the aliased property.
            callback(null, fileType.toObject({ virtuals: true }));
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

module.exports = {
  getAllCompanies,
};
