var _       = require('underscore');
var db      = require('../../../db');
var Getter  = require('../../../lib/domain-model').Getter;
var Query   = require('../../../lib/domain-model').Query;

module.exports = [
  new Query('class', db.Class),
  new Getter('class', db.Class)
];
