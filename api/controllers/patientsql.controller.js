import httpMessages from '../helpers/http-messages';
import patientsDal from '../dal/patients.dal';
import patientsValidator from '../validators/patientsql.validators';
import helper from '../helpers/common.helper';
import appConstants from '../app.constants';

exports.getPatient = (req, res, next) => {  // eslint-disable-line
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
        if (results.recordsets[0].length > 0) {
          patientInfo = results.recordsets[0][0];
        }

        const data = {
          ValidationStatus: appConstants.validationStatus.success,
          Patient: patientInfo,
        };
        httpMessages.sendJson(req, res, data);
      }, (errInfo) => { // eslint-disable-line
        httpMessages.sendJson(req, res, helper.prepareErrorObject({
          primaryKey: req.body.patientId,
          message: errInfo.message,
          stackTrace: errInfo.stack,
          eventType: appConstants.eventType.applicationError,
          messageType: appConstants.messageType.error,
          ownerType: appConstants.patientsqlController.ownerType,
          source: `${appConstants.patientsqlController.ownerType}.getPatient`,
        }, req));

        const data = {
          ValidationStatus: appConstants.validationStatus.failed,
          ValidationMessage: [appConstants.applicationMessages.internalServerError],
        };
        httpMessages.sendJson(req, res, data);
      });
    }
  });
};
