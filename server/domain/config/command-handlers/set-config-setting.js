var db = require('../../../db');

var SetConfigSettingHandler = module.exports = (function() {
  var create = function(payload, callback) {
    var config = {
      key: payload.key,
      value: payload.value,
      logs: [
        { date: new Date(), message: 'Added setting' }
      ]
    };
    db.Config.create(config, function(err, doc) {
      console.log(err);
      if (err) return callback(err);
      return callback(null, { key: config.key, message: 'Successfully added config setting' });
    });
  };

  var update = function(doc, payload, callback) {
    var log = { date: new Date(), message: 'Updated setting' };
    doc.update({
      $set: { value: payload.value },
      $push: { logs: log }
    }, function(err, num) {
      if (err) return callback(err);
      if (num <= 0) {
        return callback(new Error('No records were updated'));
      }
      callback(null, { key: doc.key, message: 'Successfully updated config setting' });
    });
  };

  var handler = function(payload, callback) {
    db.Config.findOne({key: payload.key}, function(err, doc) {
      if (doc) {
        update(doc, payload, callback);
      } else {
        create(payload, callback);
      };
    });
  };

  return {
    name: 'set-config-setting',
    handler: handler
  };
})();
