let mocha = require('mocha');
let expect = require('chai').expect;
let appConstants = require('../api/app.constants');
let companyController = require('../api/controllers/companymongo.controller');
//const companyModel = require('../api/models/modelObjects/companyModel');

describe('Company Controller', function() {
  describe('#extractAllCompanyQueryObj', function() {
    it('should create the correct query string to send to mongoose.', function(){
      //In this case we're just verifying that we send an empty query string to mongoose.
      const sampleReqBody = { companyID: 'testID' };
      const extractedQueryObj = companyController.testExports.extractAllCompanyQueryObj(sampleReqBody);
      expect(extractedQueryObj).to.deep.equal({});

      //In more complicated scenarios, it's common we need to manipulate the req.body,
      //req.params, and/or req.query before making a query against mongoose. In these
      //cases, we can verify the validity of these query objects using tests. Just do the
      //manipulation in the extractXYZ function and write test(s) to confirm the input/output.
    });

    /*
    it('only uses query parameters available in the company model', function(){
      //e.g. if your API accepts a POST parameter for name, we want to
      make sure 'name' still appears in the mongo model.
      expect(companyModel).to.have.property('name');
    }); */

  });

  describe('#queryAllCompanies', function() {
    it('should return the expected output object format on success.', function(done){
      const aliasableObject = {
        toObject: () => {
          return 'dummyItem';
        }
      };
      let stubMongoInstance = {
        model: (sourceDB) => {
          let findStub = {
            find: (inpObj, cb) => {
              cb(null, [ aliasableObject ]);
            }
          };

          return findStub;
        }
      };

      const expectedResponse = {
        ValidationStatus: appConstants.validationStatus.success,
        Companies: [ 'dummyItem' ]
      };

      companyController.testExports.queryAllCompanies(stubMongoInstance, {}, function(err, data){
        if(err) console.log(JSON.stringify(err, null, '\t'));
        else {
          expect(data).to.deep.equal(expectedResponse);
          done();
        }
      });
    });
  });
});
