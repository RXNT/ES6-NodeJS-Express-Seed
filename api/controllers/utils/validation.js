const httpMessages = require('../../helpers/http-messages');
const helper = require('../../helpers/common.helper');
const validationStatus = require('../../app.constants').validationStatus;

/**
 * Wrapper for a common check.
 * @param  {[type]}  validationMsg [description]
 * @return {Boolean}               [description]
 */
function isInvalidRequest(validationMsg) {
  return (validationMsg !== null && validationMsg !== undefined && validationMsg.length > 0);
}

/**
 * ONLY RETURNS TO CALLER IF REQUEST IS VALID.
 * OTHERWISE, RETURNS DIRECTLY TO API CONSUMER WITH HTTP RESPONSE
 * @param  {[type]}   validatorInstance  [description]
 * @param  {[type]}   validationFunction [description]
 * @param  {[type]}   req                [description]
 * @param  {[type]}   res                [description]
 * @param  {Function} callback           [description]
 * @return {[type]}                      [description]
 */
function validateRequest(validatorInstance, validationFunction, req, res, callback) {
  validatorInstance[validationFunction](req.body, (err, validationMsg) => {
    if (err) {
      httpMessages.sendJson(req, res, helper.prepareErrorObject(err, req));
    } else if (isInvalidRequest(validationMsg)) {
      httpMessages.sendJson(req, res, {
        ValidationStatus: validationStatus.failed,
        ValidationMessages: validationMsg,
      });
    } else {
      callback();
    }
  });
}

module.exports = {
  validateRequest,
  isInvalidRequest,
};
