var _  = require('underscore');
var db = require('../../../db');
var Getter = require('../../../lib/domain-model').Getter;

function query(name, defaultParams) {
  return {
    name: name,
    model: 'family',
    execute: function(view, parameters, callback) {
      var p = _.extend(parameters, defaultParams);
      var select = view.select || '';

      var q = db.Family.find(p, select);
      if (select.indexOf('students') != -1 || select == '') {
        q = q.populate('students.graduatingClass');
      }

      q.exec(function(err, results) {
        if (err) return callback(err);
        if (view.map) {
          results = results.map(view.map);
        }
        if (view.post) {
          results = view.post(results);
        }
        callback(null, results);
      });
    }
  };
};

module.exports = [
  new query('', {}),
  new query('active',   { status: 'Active' }),
  new query('waitlist', { status: 'Waitlist' }),
  new query('new',      { status: 'New' }),
  new query('alumni',   { status: 'Alumni' }),
  new query('exited',   { status: 'Exited' }),
  new Getter('family', db.Family, 'students.graduatingClass')
];
