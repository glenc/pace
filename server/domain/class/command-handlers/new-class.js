var db = require('../../../db');

var NewClassHandler = module.exports = (function() {
  var handler = function(payload, callback) {
    var data = {
      name: payload.name,
      firstYear: payload.firstYear,
      graduationYear: payload.graduationYear
    };

    db.Class.create(data, function(err, doc) {
      if (err) return callback(err);
      return callback(null, { class_id: doc.id, message: 'Class created successfully' });
    });

  };

  return {
    name: 'new-class',
    handler: handler
  };
})();
