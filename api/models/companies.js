import mongoose from 'mongoose';
import appConstants from '../app.constants';

const fieldsAliasPlugin = require('mongoose-aliasfield');

const companiesSchema = new mongoose.Schema({
  name: { type: String, alias: 'Name' },
  createdDate: { type: Date, alias: 'CreatedDate' },
  createdBy: { type: Number, alias: 'CreatedBy' },
  active: { type: Boolean, alias: 'Active' },
});

companiesSchema.plugin(fieldsAliasPlugin);
mongoose.model(appConstants.mongoCollections.companies, companiesSchema);
