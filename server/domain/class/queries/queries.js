var _       = require('underscore');
var db      = require('../../../db');
var Getter  = require('../../../lib/domain-model').Getter;

function query(name, defaultParams) {
  return {
    name: name,
    model: 'class',
    execute: function(view, parameters, callback) {
      var p = _.extend(parameters, defaultParams);
      var select = view.select || '';
      db.Class.find(p, select, function(err, results) {
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
  new Getter('class', db.Class)
];
