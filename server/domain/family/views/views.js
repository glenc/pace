var util            = require('util');
var crypto          = require('crypto');
var _               = require('underscore');
var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');
var View            = require('../../../lib/domain-model').View;
var CsvView         = require('../../../lib/domain-model').CsvView;

var calendar = new SchoolCalendar(db);

function FamilyView(name, select) {
  View.call(this, 'family', name, select);
};

function FamilyCsvView(name, select, columns) {
  CsvView.call(this, 'family', name, select, columns);
};

util.inherits(FamilyView, View);
util.inherits(FamilyCsvView, CsvView);

FamilyView.prototype.map = FamilyCsvView.prototype.map = function(obj) {
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

var CsvColumns = {
  Id: function(obj) { return obj.id; },
  Name: function(obj) { return obj.name; },
  Status: function(obj) { return obj.status; }
};

module.exports = [
  new FamilyView('', '_id name status'),
  new FamilyView('detail', '_id name status contacts students logs events'),
  new FamilyView('names', '_id name status contacts.firstName contacts.lastName students.firstName students.lastName students.graduatingClass'),
  new FamilyCsvView('export', '_id name status contacts.firstName contacts.lastName students.firstName students.lastName students.graduatingClass', CsvColumns)
];
