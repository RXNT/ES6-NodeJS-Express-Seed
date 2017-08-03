import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import validateHelper from './validate.helper';
import appConstants from '../app.constants';

const Joi = BaseJoi.extend(Extension);

const getPatientSchema = {
  companyId: Joi.number().required(),
  patientId: Joi.number().required(),
};

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

export default {
  validateGetPatient,
};
