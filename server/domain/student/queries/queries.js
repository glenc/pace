var util    = require('util');
var _       = require('underscore');
var db      = require('../../../db');
var Getter  = require('../../../lib/domain-model').Getter;
var Query   = require('../../../lib/domain-model').Query;

function StudentQuery(name, defaultParams) {
  Query.call(this, 'student', db.Family, name, defaultParams);
};

util.inherits(StudentQuery, Query);

function flattenStudents(results) {
  return _.chain(results)
          .map(function(result) { return result.toObject(); })
          .map(function(result) {
            return _.map(result.students, function(s) {
              s.family_id = result._id;
              return s;
            });
          })
          .flatten()
          .value();
}

StudentQuery.prototype.execute = function(view, parameters, callback) {
  var q = this.createQuery(view, parameters);

  q.exec(function(err, results) {
    if (err) return callback(err);
    results = flattenStudents(results);

    if (view.map) {
      results = results.map(view.map);
    }
    if (view.post) {
      results = view.post(results);
    }
    callback(null, results);
  });
};

StudentQuery.prototype.createQuery = function(view, parameters) {
  // add students. to the beginning of each parameter
  for (prop in parameters) {
    var nm = "students." + prop;
    parameters[nm] = parameters[prop];
    delete parameters[prop];
  }

  // add students. to the beginning of each select item
  var select = view.select || '';
  select = _.map(select.split(' '), function(s) { return 'students.' + s; }).join(' ');

  var p = _.extend(parameters, this._defaultParams);

  var q = this._model.find(p, select);
  q.populate('students.graduatingClass');

  return q;
};

module.exports = [
  new StudentQuery('')
];
