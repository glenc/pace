var util            = require('util');
var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');
var View            = require('../../../lib/domain-model').View;

var calendar = new SchoolCalendar(db);

function StudentView(name, select) {
  View.call(this, 'student', name, select);
};

util.inherits(StudentView, View);

StudentView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.graduatingClass) {
    obj.grade = calendar.gradeLevel(obj.graduatingClass);
    obj.graduatingClass = obj.graduatingClass.id;
  }
  return obj;
};

module.exports = [
  new StudentView('', '_id firstName lastName'),
  new StudentView('detail', '_id firstName lastName graduatingClass gender')
];
