var _  = require('underscore');
var db = require('../../../db');

var NewStudentHandler = module.exports = (function() {
  var eventForStudent = function(data) {
    return {
      date: new Date(),
      description: 'Added new student ' + data.firstName + ' ' + data.lastName,
      type: 'Data'
    };
  };

  var handler = function(payload, callback) {
    db.Family.findById(payload.family_id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new Error('Family was not found'));

      var existing_ids = doc.students.map(function(s) { return s.id; });

      delete payload.student_id;
      delete payload.family_id;

      doc.students.push(payload);
      doc.events.push(eventForStudent(payload));
      doc.updatedAt = new Date();

      doc.save(function(err, doc) {
        if (err) return callback(err);

        // get id of newly added student
        var all_ids = doc.students.map(function(s) { return s.id; });
        var new_id = _.difference(all_ids, existing_ids)[0];

        return callback(null, { student_id: new_id, message: 'Student added successfully' });
      });
    });
  };

  return {
    name: 'new-student',
    handler: handler
  };
})();
