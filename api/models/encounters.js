import mongoose from 'mongoose';
import appConstants from '../app.constants';

const fieldsAliasPlugin = require('mongoose-aliasfield');

const encountersSchema = new mongoose.Schema({
  createdDate: { type: Date, alias: 'CreatedDate' },
  createdBy: { type: String, alias: 'CreatedBy' },
  signed: { type: Boolean, alias: 'Signed' },
  formData: { type: Object, alias: 'FormData' },
  schemaID: { type: String, alias: 'SchemaID' },
});

encountersSchema.plugin(fieldsAliasPlugin);
mongoose.model(appConstants.mongoCollections.encounters, encountersSchema);
