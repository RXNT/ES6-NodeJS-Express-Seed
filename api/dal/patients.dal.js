let sql = require('mssql');
let config = require('../../config');

/**
 * Get patient information
 * @param {object} req - service request
 */
const getPatient = (req) => {
  const getPromise = new Promise((resolve, reject) => {
    new sql.ConnectionPool(config.sqlConnectionString).connect().then((pool) => {
      pool.request()
        .input('PatientId', sql.Int, req.body.patientId)
        .input('CompanyId', sql.Int, req.body.companyId)
        .execute('[mst].[usp_GetPatient]', (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    }, (err) => {
      reject(err);
    });
  });

  return getPromise;
};

module.exports = {
  getPatient,
};
