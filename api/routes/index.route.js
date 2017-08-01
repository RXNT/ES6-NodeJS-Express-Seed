import express from 'express';
import appConstants from '../app.constants';
import companymongoRoutes from './companymongo.route';
import patientsqlRoutes from './patientsql.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount utilities routes at /getSourceMappingColumns
router.use(appConstants.companymongoController.routeName, companymongoRoutes);
router.use(appConstants.patientsqlController.routeName, patientsqlRoutes);

export default router;
