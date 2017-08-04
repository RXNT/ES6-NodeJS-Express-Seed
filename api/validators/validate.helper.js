import Joi from 'joi';
import _ from 'lodash';
import appConstants from '../app.constants';

/**
 * Validates services request
 * @param {object} request - service request
 * @param {object} requestSchema - request schema
 * @param {method} callback - call back method
 */
const validateRequest = (request, requestSchema, callback) => {
  try {
    const err = Joi.validate(request, requestSchema, { abortEarly: false, allowUnknown: true });
    if (err.error !== null && err.error.details !== null && err.error.details.length > 0) {
      const validationMessages = _.map(err.error.details).map(validationMsg =>
        validationMsg.message);
      callback(null, validationMessages);
    } else {
      callback(null, null);
    }
  } catch (err) {
    callback({
      message: err.message,
      stackTrace: err.stack,
      eventType: appConstants.eventType.applicationError,
      messageType: appConstants.messageType.error,
      ownerType: appConstants.ownerTypes.validators.validatorHelper,
      source: `${appConstants.ownerTypes.validators.validatorHelper}.validateRequest`,
    }, null);
  }
};

export default {
  validateRequest,
};
