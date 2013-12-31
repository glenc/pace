var util            = require('util');
var crypto          = require('crypto');
var _               = require('underscore');
var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');
var View            = require('../../../lib/domain-model').View;

var calendar = new SchoolCalendar(db);

function FamilyView(name, select) {
  View.call(this, 'family', name, select);
};

util.inherits(FamilyView, View);

FamilyView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.contacts) obj.contacts = obj.contacts.map(transformContact);
  if (obj.students) obj.students = obj.students.map(transformStudent);
  return obj;
};

function transformContact(contact) {
  if (contact.email) {
    var md5 = crypto.createHash('md5');
    md5.update(contact.email);
    contact.email_hash = md5.digest('hex');
  }
  return contact;
}

function transformStudent(student) {
  if (student.graduatingClass) {
    student.grade = calendar.gradeLevel(student.graduatingClass);
    student.graduatingClass = student.graduatingClass.id;
  }
  return student;
}

module.exports = [
  new FamilyView('', '_id name status'),
  new FamilyView('detail', '_id name status contacts students logs events'),
  new FamilyView('names', '_id name status contacts.firstName contacts.lastName students.firstName students.lastName students.graduatingClass')
];
