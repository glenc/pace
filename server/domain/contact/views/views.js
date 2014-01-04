var util            = require('util');
var crypto          = require('crypto');
var _               = require('underscore');
var db              = require('../../../db');
var View            = require('../../../lib/domain-model').View;
var CsvView         = require('../../../lib/domain-model').CsvView;

function ContactView(name, select) {
  View.call(this, 'contact', name, select);
};

function ContactCsvView(name, select, columns) {
  CsvView.call(this, 'contact', name, select, columns);
};

util.inherits(ContactView, View);
util.inherits(ContactCsvView, CsvView);

ContactView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.email) {
    var md5 = crypto.createHash('md5');
    md5.update(obj.email);
    obj.email_hash = md5.digest('hex');
  }
  return obj;
};

function firstNumber(obj, type) {
  var num = _.find(obj.phoneNumbers, function(n) { return n.type == type; });
  if (num) return num.number;
  return '';
}

function formatAddress(obj) {
  var parts = [];
  if (obj.address) {
    if (obj.address.street1) parts.push(obj.address.street1);
    if (obj.address.street2) parts.push(obj.address.street2);
    if (obj.address.city) parts.push(obj.address.city);
    if (obj.address.state) parts.push(obj.address.state);
    if (obj.address.zip) parts.push(obj.address.zip);
  }
  return parts.join(' ');
}

var CsvColumns = {
  Id: function(obj) { return obj.id; },
  Family: function(obj) { return obj.family_name; },
  FirstName: function(obj) { return obj.firstName; },
  LastName: function(obj) { return obj.lastName; },
  Email: function(obj) { return obj.email; },
  HomePhone: function(obj) { return firstNumber(obj, 'Home'); },
  MobilePhone: function(obj) { return firstNumber(obj, 'Mobile'); },
  WorkPhone: function(obj) { return firstNumber(obj, 'Work'); },
  Address: formatAddress,
  Type: function(obj) { return obj.type; }
};

module.exports = [
  new ContactView('', '_id firstName lastName'),
  new ContactView('detail', '_id family_name firstName lastName address phoneNumbers email type'),
  new ContactCsvView('export', '_id family_name firstName lastName address phoneNumbers email type', CsvColumns)
];
