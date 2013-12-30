var util    = require('util');
var db      = require('../../../db');
var Getter  = require('../../../lib/domain-model').Getter;
var Query   = require('../../../lib/domain-model').Query;

function ConfigGetter() {
  Getter.call(this, 'config', db.Config);
};

util.inherits(ConfigGetter, Getter);

ConfigGetter.prototype.createQuery = function(parameters) {
  return this._model.findOne({key: parameters.id});
};

module.exports = [
  new Query('config', db.Config),
  new ConfigGetter()
];
