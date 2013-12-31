var util            = require('util');
var crypto          = require('crypto');
var db              = require('../../../db');
var View            = require('../../../lib/domain-model').View;

function ContactView(name, select) {
  View.call(this, 'contact', name, select);
};

util.inherits(ContactView, View);

ContactView.prototype.map = function(obj) {
  obj = View.prototype.map(obj);
  if (obj.email) {
    var md5 = crypto.createHash('md5');
    md5.update(obj.email);
    obj.email_hash = md5.digest('hex');
  }
  return obj;
};

module.exports = [
  new ContactView('', '_id firstName lastName'),
  new ContactView('detail', '_id firstName lastName address phoneNumbers email type')
];
