var db = require('../../../db');

var UpdateClassHandler = module.exports = (function() {
  var handler = function(payload, callback) {

    db.Class.findById(payload.class_id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new Error('Class was not found'));

      doc.name = payload.name;
      doc.firstYear = payload.firstYear;
      doc.graduationYear = payload.graduationYear;

      doc.save(function(err, doc) {
        if (err) return callback(err);
        return callback(null, { message: 'Class updated successfully' });
      });
    });
  };

  return {
    name: 'update-class',
    handler: handler
  };
})();
