var _  = require('underscore');
var db = require('../../../db');

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

function get() {
  return {
    name: 'get',
    model: 'class',
    execute: function(view, parameters, callback) {
      var select = view.select || '';
      db.Class.findById(parameters.id, function(err, doc) {
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
  new get()
];
