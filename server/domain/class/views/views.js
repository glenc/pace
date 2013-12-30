var util            = require('util');
var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');
var View            = require('../../../lib/domain-model').View;

var calendar = new SchoolCalendar(db);

function ClassView(name, select) {
  View.call(this, 'class', name, select);
};

util.inherits(ClassView, View);

ClassView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.firstYear) obj.grade = calendar.gradeLevel(obj);
  if (obj.firstYear && obj.graduationYear) obj.status = calendar.classStatus(obj);
  return obj;
};

module.exports = [
  new ClassView('', '_id name firstYear graduationYear')
];
