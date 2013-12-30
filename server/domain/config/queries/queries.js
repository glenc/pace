var util    = require('util');
var _       = require('underscore');
var errors  = require('restify-cqrs').errors;
var db      = require('../../../db');
var Getter  = require('../../../lib/domain-model').Getter;

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

function ConfigGetter() {
  Getter.call(this, 'config', db.Config);
};

util.inherits(ConfigGetter, Getter);

ConfigGetter.prototype.createQuery = function(parameters) {
  return this._model.findOne({key: parameters.id});
};

module.exports = [
  new query('', {}),
  new ConfigGetter()
];
