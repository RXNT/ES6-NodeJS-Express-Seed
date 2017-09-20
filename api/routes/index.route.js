let express = require('express');
let appConstants = require('../app.constants');
let companymongoRoutes = require('./companymongo.route');
let patientsqlRoutes = require('./patientsql.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use(appConstants.companymongoController.routeName, companymongoRoutes);
router.use(appConstants.patientsqlController.routeName, patientsqlRoutes);

module.exports = router;
