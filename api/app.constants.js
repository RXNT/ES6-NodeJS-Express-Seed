//  base service route
const apiServiceRoute = '/seedapiservices';

const companymongoController = {
  ownerType: 'api.controllers.companymongo.controller',
  routeName: '/companies',
  routeMethods: {
    getStatusRoute: '/getAllCompanies',
  },
};

const patientsqlController = {
  ownerType: 'api.controllers.patientsql.controller',
  routeName: '/patients',
  routeMethods: {
    getPatientRoute: '/getPatient',
  },
};

const validationStatus = {
  success: 'Success',
  failed: 'Failed',
};

const messageType = {
  error: 'Error',
  information: 'Information',
  alert: 'Alert',
  authenticationAlert: 'AuthenticationAlert',
  heartBeat: 'HeartBeat',
  applicationEvent: 'ApplicationEvent',
  clientAccessReset: 'ClientAccessReset',
};

const eventType = {
  applicationError: 'ApplicationError',
  applicationInformation: 'ApplicationInformation',
  applicationLogin: 'ApplicationLogin',
};

const mongoCollections = {
  companies: 'companies',
};

const applicationMessages = {
  internalServerError: 'Internal Server Error occurred. Please contact RxNT support',
  accessForbidden: 'Access is forbidden',
  resourceNotFound: 'Resource not found',
  methodNotSupported: 'Method not supported',
  dbConnectivityFailed: 'Unable to connect to database',
};

const ownerTypes = {
  validators: {
    validatorHelper: 'api.validators.validate.helper',
    patientSqlValidator: 'api.validators.patientsql.validators',
    companyMongoValidator: 'api.validators.companymongo.validators',
  },
};

module.exports = {
  apiServiceRoute,
  companymongoController,
  patientsqlController,
  validationStatus,
  messageType,
  eventType,
  mongoCollections,
  applicationMessages,
  ownerTypes,
};
