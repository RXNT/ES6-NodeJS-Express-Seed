const mongoose = require('mongoose');
const appConstants = require('../app.constants');
const companyModel = require('./modelObjects/companyModel');

const companiesSchema = new mongoose.Schema(companyModel);

mongoose.model(appConstants.mongoCollections.companies, companiesSchema);
