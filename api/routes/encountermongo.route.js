import express from 'express';
import encountermongoCtrl from '../controllers/encountermongo.controller';
import appConstants from '../app.constants';

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.encountermongoController.routeMethods.getStatusRoute)
  .post(encountermongoCtrl.getEncounters);

export default router;
