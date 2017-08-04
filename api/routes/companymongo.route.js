import express from 'express';
import companymongoCtrl from '../controllers/companymongo.controller';
import appConstants from '../app.constants';

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.companymongoController.routeMethods.getStatusRoute)
  .post(companymongoCtrl.getAllCompanies);

export default router;
