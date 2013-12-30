var util    = require('util');
var _       = require('underscore');
var db      = require('../../../db');
var Getter  = require('../../../lib/domain-model').Getter;
var Query   = require('../../../lib/domain-model').Query;

function FamilyQuery(name, defaultParams) {
  Query.call(this, 'family', db.Family, name, defaultParams);
};

util.inherits(FamilyQuery, Query);

FamilyQuery.prototype.createQuery = function(view, parameters) {
  var p = _.extend(parameters, this._defaultParams);
  var select = view.select || '';

  var q = this._model.find(p, select);
  if (select.indexOf('students') != -1 || select == '') {
    q = q.populate('students.graduatingClass');
  }

  return q;
};

module.exports = [
  new FamilyQuery(''),
  new FamilyQuery('active',   { status: 'Active' }),
  new FamilyQuery('waitlist', { status: 'Waitlist' }),
  new FamilyQuery('new',      { status: 'New' }),
  new FamilyQuery('alumni',   { status: 'Alumni' }),
  new FamilyQuery('exited',   { status: 'Exited' }),
  new Getter('family', db.Family, 'students.graduatingClass')
];
