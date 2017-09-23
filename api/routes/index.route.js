const express = require('express');
const appConstants = require('../app.constants');
const companymongoRoutes = require('./companymongo.route');
const patientsqlRoutes = require('./patientsql.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use(appConstants.companymongoController.routeName, companymongoRoutes);
router.use(appConstants.patientsqlController.routeName, patientsqlRoutes);

module.exports = router;
