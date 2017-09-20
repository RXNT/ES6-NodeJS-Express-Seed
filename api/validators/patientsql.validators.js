let BaseJoi = require('joi');
let Extension = require('joi-date-extensions');
let validateHelper = require('./validate.helper');
let appConstants = require('../app.constants');

const Joi = BaseJoi.extend(Extension);

const getPatientSchema = {
  companyId: Joi.number().required(),
  patientId: Joi.number().required(),
};

/**
 * Validates get patient request
 * @param {object} request - service request
 * @param {method} callback - call back method
 */
const validateGetPatient = (request, callback) => {
  try {
    validateHelper.validateRequest(request, getPatientSchema, (err, data) => {
      callback(err, data);
    });
  } catch (err) {
    callback({
      message: err.message,
      stackTrace: err.stack,
      eventType: appConstants.eventType.applicationError,
      messageType: appConstants.messageType.error,
      ownerType: appConstants.ownerTypes.validators.patientSqlValidator,
      source: `${appConstants.ownerTypes.validators.patientSqlValidator}.validateGetPatient`,
    }, null);
  }
};

module.exports = {
  validateGetPatient,
};
