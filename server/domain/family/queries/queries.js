var _  = require('underscore');
var db = require('../../../db');

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

function get() {
  return {
    name: 'get',
    model: 'family',
    execute: function(view, parameters, callback) {
      var select = view.select || '';
      db.Family.findById(parameters.id)
               .populate('students.graduatingClass')
               .exec(function(err, doc) {
                 if (err) return callback(err);
                 if (view.map) {
                   doc = view.map(doc);
                 }
                 callback(null, doc);
               });
    }
  }
}

module.exports = [
  new query('', {}),
  new query('active',   { status: 'Active' }),
  new query('waitlist', { status: 'Waitlist' }),
  new query('new',      { status: 'New' }),
  new query('alumni',   { status: 'Alumni' }),
  new query('exited',   { status: 'Exited' }),
  new get()
];
