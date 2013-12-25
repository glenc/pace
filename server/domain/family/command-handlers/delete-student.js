var _  = require('underscore');
var db = require('../../../db');

var DeleteStudentHandler = module.exports = (function() {
  var eventForDelete = function(data) {
    return {
      date: new Date(),
      description: 'Deleted student ' + data.firstName + ' ' + data.lastName,
      type: 'Data'
    };
  };

  var handler = function(payload, callback) {
    db.Family.findById(payload.family_id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new Error('Family was not found'));

      var idx = -1;
      for (var i=0; i<= doc.students.length; i++) {
        if (doc.students[i].id == payload.student_id) {
          idx = i;
          break;
        }
      }

      if (idx < 0) return callback(new Error('Student was not found'));

      var c = doc.students.splice(idx, 1);

      doc.events.push(eventForDelete(c[0]));
      doc.updatedAt = new Date();

      doc.save(function(err, doc) {
        if (err) return callback(err);
        return callback(null, { message: 'Student removed successfully' });
      });
    });
  };

  return {
    name: 'delete-student',
    handler: handler
  };
})();
