var db = require('../../../db');

var DeleteConfigSettingHandler = module.exports = (function() {
  var handler = function(payload, callback) {
    db.Config.remove({key: payload.key}, function(err, num) {
      if (err) return callback(err);
      if (num <= 0) {
        return callback(new Error('No items removed'));
      }
      return callback(null, { key: payload.key, message: 'Successfully deleted configuration setting' });
    })
  };

  return {
    name: 'delete-config-setting',
    handler: handler
  };
})();
