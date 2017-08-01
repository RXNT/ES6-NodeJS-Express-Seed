//  base service route
exports.apiServiceRoute = '/seedapiservices';

exports.companymongoController = {
  ownerType: 'api.controllers.companymongo.controller',
  routeName: '/utilities',
  routeMethods: {
    getStatusRoute: '/getAllUploadFilesStatuses',
  },
};

exports.patientsqlController = {
  ownerType: 'api.controllers.patientsql.controller',
  routeName: '/patients',
  routeMethods: {
    getPatientRoute: '/getPatient',
  },
};

exports.validationStatus = {
  success: 'Success',
  failed: 'Failed',
};

exports.messageType = {
  error: 'Error',
  information: 'Information',
  alert: 'Alert',
  authenticationAlert: 'AuthenticationAlert',
  heartBeat: 'HeartBeat',
  applicationEvent: 'ApplicationEvent',
  clientAccessReset: 'ClientAccessReset',
};

exports.eventType = {
  applicationError: 'ApplicationError',
  applicationInformation: 'ApplicationInformation',
  applicationLogin: 'ApplicationLogin',
};

exports.mongoCollections = {
  companies: 'companies',
};

exports.applicationMessages = {
  internalServerError: 'Internal Server Error occurred. Please contact RxNT support',
  accessForbidden: 'Access is forbidden',
  resourceNotFound: 'Resource not found',
  methodNotSupported: 'Method not supported',
  dbConnectivityFailed: 'Unable to connect to database',
};

exports.ownerTypes = {
  validators: {
    validatorHelper: 'api.validators.validate.helper',
    patientSqlValidator: 'api.validators.patientsql.validators',
    companyMongoValidator: 'api.validators.companymongo.validators',
  },
};
