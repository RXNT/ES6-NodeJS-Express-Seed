
const companyModel = {
  name: { type: String, alias: 'Name' },
  createdDate: { type: Date, alias: 'CreatedDate' },
  createdBy: { type: Number, alias: 'CreatedBy' },
  active: { type: Boolean, alias: 'Active' },
};

module.exports = companyModel;
