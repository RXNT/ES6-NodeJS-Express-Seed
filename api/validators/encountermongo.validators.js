import BaseJoi from 'joi';
import Extension from 'joi-date-extensions';
import validateHelper from './validate.helper';
import appConstants from '../app.constants';

const Joi = BaseJoi.extend(Extension);

const getEncountersSchema = {
  encounterId: Joi.number().required(),
};

const validateGetEncounters = (request, callback) => {
  try {
    validateHelper.validateRequest(request, getEncountersSchema, (err, data) => {
      callback(err, data);
    });
  } catch (err) {
    callback({
      message: err.message,
      stackTrace: err.stack,
      eventType: appConstants.eventType.applicationError,
      messageType: appConstants.messageType.error,
      ownerType: appConstants.ownerTypes.validators.encounterMongoValidator,
      source: `${appConstants.ownerTypes.validators.encounterMongoValidator}.validateGetEncounters`,
    }, null);
  }
};

export default {
  validateGetEncounters,
};
