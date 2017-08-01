import express from 'express';
import patientsqlCtrl from '../controllers/patientsql.controller';
import appConstants from '../app.constants';

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.patientsqlController.routeMethods.getPatientRoute)
  .post(patientsqlCtrl.getPatient);

export default router;
