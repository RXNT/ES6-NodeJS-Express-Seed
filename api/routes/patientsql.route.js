let express = require('express');
let patientsqlCtrl = require('../controllers/patientsql.controller');
let appConstants = require('../app.constants');

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.patientsqlController.routeMethods.getPatientRoute)
  .post(patientsqlCtrl.getPatient);

module.exports = router;
