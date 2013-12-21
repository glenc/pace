var _  = require('underscore');
var db = require('../../../db');

var UpdateStudentHandler = module.exports = (function() {
  var eventForStudent = function(data) {
    return {
      date: new Date(),
      description: 'Updated information for student ' + data.firstName + ' ' + data.lastName,
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

      var c = doc.students[i];
      Object.keys(payload).forEach(function(prop) {
        if (prop != 'student_id' && prop != 'family_id') {
          c[prop] = payload[prop];
        }
      });

      doc.events.push(eventForStudent(c));
      doc.updatedAt = new Date();

      doc.save(function(err, doc) {
        if (err) return callback(err);
        return callback(null, { message: 'Student updated successfully' });
      });
    });
  };

  return {
    name: 'update-student',
    handler: handler
  };
})();
