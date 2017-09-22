
const async = require('async');

/**
 * NOTE: all objects in the returned list now have both the actual
 * property AND the aliased property.
 * @param  {[type]}   list [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
function mapMongoObjectListToAliases(list, cb) {
  async.map(list, (fileType, callback) => {
    callback(null, fileType.toObject({ virtuals: true }));
  }, cb);
}

module.exports = {
  mapMongoObjectListToAliases,
};
