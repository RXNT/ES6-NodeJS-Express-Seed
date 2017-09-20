const express = require('express');
const companymongoCtrl = require('../controllers/companymongo.controller');
const appConstants = require('../app.constants');

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.companymongoController.routeMethods.getStatusRoute)
  .post(companymongoCtrl.getAllCompanies);

module.exports = router;
