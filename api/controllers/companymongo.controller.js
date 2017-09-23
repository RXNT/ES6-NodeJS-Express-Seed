const mongoose = require('mongoose');
const httpMessages = require('../helpers/http-messages');
const appConstants = require('../app.constants');
let models = require('../models/index'); // eslint-disable-line
const helper = require('../helpers/common.helper');
const companyMongoValidator = require('../validators/companymongo.validators');
const validateRequest = require('./utils/validation').validateRequest;
const mapToAliased = require('./utils/aliasing').mapMongoObjectListToAliases;

/**
 * Syntactic sugar for formatting error responses.
 * @param  {[type]} errorInfo     [description]
 * @param  {[type]} HTTP_ERR_CODE [description]
 * @param  {[type]} source        [description]
 * @param  {[type]} req           [description]
 * @param  {[type]} res           [description]
 * @return {[type]}               [description]
 */
function handleErrorResponse(errorInfo, HTTP_ERR_CODE, source, req, res) {
  httpMessages.sendJsonErr(req, res, helper.prepareErrorObject({
    primaryKey: '',
    message: errorInfo.message,
    stackTrace: errorInfo.stack,
    eventType: appConstants.eventType.applicationError,
    messageType: appConstants.messageType.error,
    ownerType: appConstants.encountermongoController.ownerType,
    source: `${appConstants.encountermongoController.ownerType}.${source}`,
  }, req), HTTP_ERR_CODE);
}

/**
 * ANY TIME req.body or req.query is accessed, an extract function should be used.
 This allows us to verify the extract function with a test, to ensure the prop
 names are correct.
 * @return {[type]} [description]
 */
function extractAllCompanyQueryObj() {
  const queryObj = {};
  return queryObj;
}


/**
 * Each call to mongoose.model should be wrapped in a function like this one.
 The mongooseInstance is dependency-injected, allowing us to write test cases.
 We can now stub the mongoose instance if we want to write a test.

 The response of these functions should be either an error object or
 the response as the client would expect to see it. This allows us to test the
 important parts of our API. e.g. that the response data doesn't change.
 * @param  {[type]}   mongooseInstance [description]
 * @param  {[type]}   queryObj         [description]
 * @param  {Function} callback         [description]
 * @return {[type]}                    [description]
 */
function queryAllCompanies(mongooseInstance, queryObj, callback) {
  mongooseInstance.model(appConstants.mongoCollections.companies).find(queryObj,
    (errorInfo, companies) => {
      if (errorInfo) {
        callback(errorInfo);
      } else {
        mapToAliased(companies, (mappingErr, mappedCompanies) => {
          if (mappingErr) callback(mappingErr);
          else {
            const data = {
              ValidationStatus: appConstants.validationStatus.success,
              Companies: mappedCompanies,
            };

            callback(null, data);
          }
        });
      }
    });
}

/**
 * Get all companies
 * @param {object} req - service request
 * @param {object} res - service response
 * @param {method} next - middleware method
 */
const getAllCompanies = (req, res) => {
  validateRequest(companyMongoValidator, 'validateGetCompanies', req, res, () => {
    const queryObj = extractAllCompanyQueryObj(req.body);
    queryAllCompanies(mongoose, queryObj, (err, data) => {
      if (err) {
        handleErrorResponse(err, 404, 'getCompanies', req, res);
      } else {
        httpMessages.sendJson(req, res, data);
      }
    });
  });
};

module.exports = {
  getAllCompanies,
  testExports: {
    extractAllCompanyQueryObj,
    queryAllCompanies,
  },
};
