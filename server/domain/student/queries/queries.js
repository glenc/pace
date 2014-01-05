var util           = require('util');
var _              = require('underscore');
var db             = require('../../../db');
var Query          = require('../../../lib/domain-model').Query;
var SchoolCalendar = require('../../../lib/school-calendar');

var calendar = new SchoolCalendar(db);

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
              s.family_name = result.name;
              return s;
            });
          })
          .flatten()
          .value();
};

StudentQuery.prototype.execute = function(view, parameters, callback) {
  var p = _.extend(parameters, this._defaultParams);

  // handle grade
  var gradeFilter = null;
  if (p.grade) {
    gradeFilter = calendar.firstYearForGrade(p.grade);
    delete p.grade;
    view.select += ' graduatingClass';
  }

  var q = this.createQuery(view, _.clone(p));
  q.exec(function(err, results) {
    if (err) return callback(err);
    results = flattenStudents(results);

    if (gradeFilter) {
      results = _.filter(results, function(r) { return r.graduatingClass.firstYear == gradeFilter; });
    }

    if (_.isEmpty(p) == false) {
      results = _.where(results, p);
    }

    if (view.map) {
      results = results.map(view.map);
    }
    if (view.post) {
      results = view.post(results);
    }
    if (view.contentType) {
      return callback(null, function(res) {
        res.setHeader('content-type', view.contentType);
        res.send(200, results);
      });
    } else {
      callback(null, results);
    }
  });
};

StudentQuery.prototype.createQuery = function(view, parameters) {
  // add students. to the beginning of each parameter
  for (var prop in parameters) {
    var nm = "students." + prop;
    parameters[nm] = parameters[prop];
    delete parameters[prop];
  }

  // add students. to the beginning of each select item
  var select = view.select || '';
  select = _.map(select.split(' '),
                  function(s) {
                    if (s == 'family_name')
                      return 'name';
                    return 'students.' + s; }
                  ).join(' ');

  var q = this._model.find(parameters, select);
  q.populate('students.graduatingClass');

  return q;
};

module.exports = [
  new StudentQuery(''),
  new StudentQuery('grade6', { grade: 6 }),
  new StudentQuery('grade5', { grade: 5 }),
  new StudentQuery('grade4', { grade: 4 }),
  new StudentQuery('grade3', { grade: 3 }),
  new StudentQuery('grade2', { grade: 2 }),
  new StudentQuery('grade1', { grade: 1 })
];
