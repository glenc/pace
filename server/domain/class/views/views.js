var util            = require('util');
var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');
var View            = require('../../../lib/domain-model').View;
var CsvView         = require('../../../lib/domain-model').CsvView;

var calendar = new SchoolCalendar(db);

function ClassView(name, select) {
  View.call(this, 'class', name, select);
};

function ClassCsvView(name, select, columns) {
  CsvView.call(this, 'class', name, select, columns);
}

util.inherits(ClassView, View);
util.inherits(ClassCsvView, CsvView);

ClassView.prototype.map = ClassCsvView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.firstYear) obj.grade = calendar.gradeLevel(obj);
  if (obj.firstYear && obj.graduationYear) obj.status = calendar.classStatus(obj);
  return obj;
};

var CsvColumns = {
  Id: function(obj) { return obj.id; },
  Name: function(obj) { return obj.name; },
  Grade: function(obj) { return obj.grade; },
  Status: function(obj) { return obj.status; },
  FirstYear: function(obj) { return obj.firstYear; },
  GraduationYear: function(obj) { return obj.graduationYear; }
};

module.exports = [
  new ClassView('', '_id name firstYear graduationYear'),
  new ClassCsvView('export', '_id name firstYear graduationYear', CsvColumns)
];
