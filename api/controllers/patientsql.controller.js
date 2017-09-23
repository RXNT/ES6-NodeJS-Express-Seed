const httpMessages = require('../helpers/http-messages');
const patientsDal = require('../dal/patients.dal');
const patientsValidator = require('../validators/patientsql.validators');
const helper = require('../helpers/common.helper');
const appConstants = require('../app.constants');

/**
 * Get patient information
 * @param {object} req - service request
 * @param {object} res - service response
 * @param {method} next - middleware method
 */
const getPatient = (req, res) => {
  patientsValidator.validateGetPatient(req.body, (err, validationMsg) => {
    if (err) {
      httpMessages.sendJson(req, res, helper.prepareErrorObject(err, req));
    } else if (validationMsg !== null && validationMsg !== undefined && validationMsg.length > 0) {
      httpMessages.sendJson(req, res, {
        ValidationStatus: appConstants.validationStatus.failed,
        ValidationMessages: validationMsg,
      });
    } else {
      patientsDal.getPatient(req).then((results) => {
        let patientInfo = null;
        const PATIENT_INFO_DATATABLE_INDEX = 0;
        if (results.recordsets[0].length > 0) {
          patientInfo = results.recordsets[PATIENT_INFO_DATATABLE_INDEX][0];
        }
        const data = {
          ValidationStatus: appConstants.validationStatus.success,
          Patient: patientInfo,
        };
        httpMessages.sendJson(req, res, data);
      }, (errInfo) => {
        httpMessages.sendJson(req, res, helper.prepareErrorObject({
          primaryKey: req.body.patientId,
          message: errInfo.message,
          stackTrace: errInfo.stack,
          eventType: appConstants.eventType.applicationError,
          messageType: appConstants.messageType.error,
          ownerType: appConstants.patientsqlController.ownerType,
          source: `${appConstants.patientsqlController.ownerType}.getPatient`,
        }, req));
      });
    }
  });
};

module.exports = {
  getPatient,
};
