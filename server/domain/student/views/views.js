var util            = require('util');
var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');
var View            = require('../../../lib/domain-model').View;
var CsvView         = require('../../../lib/domain-model').CsvView;

var calendar = new SchoolCalendar(db);

function StudentView(name, select) {
  View.call(this, 'student', name, select);
};

function StudentCsvView(name, select, columns) {
  CsvView.call(this, 'student', name, select, columns);
}

util.inherits(StudentView, View);
util.inherits(StudentCsvView, CsvView);

StudentView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.graduatingClass) {
    obj.grade = calendar.gradeLevel(obj.graduatingClass);
    obj.graduatingClass = obj.graduatingClass.id;
  }
  return obj;
};

StudentCsvView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.graduatingClass) {
    obj.grade = calendar.gradeLevel(obj.graduatingClass);
  }
  return obj;
}

var CsvColumns = {
  Id: function(obj) { return obj.id; },
  Family: function(obj) { return obj.family_name; },
  FirstName: function(obj) { return obj.firstName; },
  LastName: function(obj) { return obj.lastName; },
  Grade: function(obj) { return obj.grade; },
  GraduatingClass: function(obj) { return obj.graduatingClass.name; },
  Gender: function(obj) { return obj.gender; }
};

module.exports = [
  new StudentView('', '_id firstName lastName'),
  new StudentView('detail', '_id firstName lastName graduatingClass gender family_name'),
  new StudentCsvView('export', '_id firstName lastName graduatingClass gender family_name', CsvColumns)
];
