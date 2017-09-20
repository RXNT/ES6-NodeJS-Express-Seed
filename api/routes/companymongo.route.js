let express = require('express');
let companymongoCtrl = require('../controllers/companymongo.controller');
let appConstants = require('../app.constants');

const router = express.Router(); // eslint-disable-line new-cap

router.route(appConstants.companymongoController.routeMethods.getStatusRoute)
  .post(companymongoCtrl.getAllCompanies);

module.exports = router;
