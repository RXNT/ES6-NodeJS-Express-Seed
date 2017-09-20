const mongoose = require('mongoose');
const appConstants = require('../app.constants');

const companiesSchema = new mongoose.Schema({
  name: { type: String, alias: 'Name' },
  createdDate: { type: Date, alias: 'CreatedDate' },
  createdBy: { type: Number, alias: 'CreatedBy' },
  active: { type: Boolean, alias: 'Active' },
});

mongoose.model(appConstants.mongoCollections.companies, companiesSchema);
