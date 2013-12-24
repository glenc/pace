var _  = require('underscore');
var db = require('../../../db');

var DeleteClassHandler = module.exports = (function() {
  var handler = function(payload, callback) {
    db.Class.findById(payload.class_id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new Error('Class was not found'));
      doc.remove(function(err, doc) {
        if (err) return callback(err);
        return callback(null, { message: 'Class removed successfully' });
      });
    });
  };

  return {
    name: 'delete-class',
    handler: handler
  };
})();
