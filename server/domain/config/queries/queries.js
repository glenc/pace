var _  = require('underscore');
var errors  = require('restify-cqrs').errors;
var db      = require('../../../db');

function query(name, defaultParams) {
  return {
    name: name,
    model: 'config',
    execute: function(view, parameters, callback) {
      var p = _.extend(parameters, defaultParams);
      var select = view.select || '';
      db.Config.find(p, select, function(err, results) {
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
    model: 'config',
    execute: function(view, parameters, callback) {
      var select = view.select || '';
      db.Config.findOne({ key: parameters.id }, function(err, doc) {
        if (err) return callback(err);
        if (!doc) return callback(new errors.NotFoundError());
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
