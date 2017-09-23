const express = require('express');
const patientsqlCtrl = require('../controllers/patientsql.controller');
const appConstants = require('../app.constants');

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.patientsqlController.routeMethods.getPatientRoute)
  .post(patientsqlCtrl.getPatient);

module.exports = router;
