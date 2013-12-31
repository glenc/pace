var util           = require('util');
var _              = require('underscore');
var db             = require('../../../db');
var Query          = require('../../../lib/domain-model').Query;

function ContactQuery(name, defaultParams) {
  Query.call(this, 'contact', db.Family, name, defaultParams);
};

util.inherits(ContactQuery, Query);

function flattenContacts(results) {
  return _.chain(results)
          .map(function(result) { return result.toObject(); })
          .map(function(result) {
            return _.map(result.contacts, function(c) {
              c.family_id = result._id;
              c.family_name = result.name;
              return c;
            });
          })
          .flatten()
          .value();
};

ContactQuery.prototype.execute = function(view, parameters, callback) {
  var p = _.extend(parameters, this._defaultParams);

  var q = this.createQuery(view, _.clone(p));

  // strip off status if in parameters so it doesn't
  // get used in later filters
  delete p.status;

  q.exec(function(err, results) {
    if (err) return callback(err);
    results = flattenContacts(results);

    if (_.isEmpty(p) == false) {
      results = _.where(results, p);
    }

    if (view.map) {
      results = results.map(view.map);
    }
    if (view.post) {
      results = view.post(results);
    }
    callback(null, results);
  });
};

ContactQuery.prototype.createQuery = function(view, parameters) {
  // add contacts. to the beginning of each parameter
  for (var prop in parameters) {
    if (prop == 'status') continue;

    var nm = "contacts." + prop;
    parameters[nm] = parameters[prop];
    delete parameters[prop];
  }

  // add contacts. to the beginning of each select item
  var select = view.select || '';
  select = _.map(select.split(' '), function(s) { return 'contacts.' + s; }).join(' ');

  var q = this._model.find(parameters, select);
  return q;
};

module.exports = [
  new ContactQuery(''),
  new ContactQuery('active',   { status: 'Active' }),
  new ContactQuery('waitlist', { status: 'Waitlist' }),
  new ContactQuery('new',      { status: 'New' }),
  new ContactQuery('alumni',   { status: 'Alumni' }),
  new ContactQuery('exited',   { status: 'Exited' }),
];
