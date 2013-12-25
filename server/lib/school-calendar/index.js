var moment = require('moment');
var _      = require('underscore');

var loadCalendar = function(raw) {
  var mapYear = function(original) {
    var start = moment(original.startDate).startOf('day');
    var end = moment(original.endDate).endOf('day');
    var now = moment();
    return {
      startDate: start,
      endDate: end,
      isCurrent: start <= now && end >= now
    };
  };
  return _.chain(raw)
          .pairs()
          .reduce(function(obj, pair) {
            obj[pair[0]] = mapYear(pair[1]);
            return obj;
          }, {})
          .value();
}

var SchoolCalendar = function(db) {
  var self = this;
  db.Config.findOne({ key: 'school-calendar' }, function(err, doc) {
    self.calendar = loadCalendar(doc.value);
  });

  db.Config.findOne({key: 'min-grade'}, function(err, doc) {
    self.minGrade = doc.value;
  });

  db.Config.findOne({key: 'max-grade'}, function(err, doc) {
    self.maxGrade = doc.value;
  });
};

SchoolCalendar.prototype.classStatus = function(cls) {
  var grade = this.gradeLevel(cls);
  if (grade > this.maxGrade)
    return 'Graduated';

  if (grade < this.minGrade)
    return 'Future';

  return 'Active';
};

SchoolCalendar.prototype.gradeLevel = function(cls) {
  var yr = this.calendar[cls.firstYear];
  var cy = {};
  for (var key in this.calendar) {
    if (this.calendar[key].isCurrent) {
      cy = this.calendar[key];
    }
  }

  var first = yr.startDate;
  var current = cy.startDate;
  return current.years() - first.years() + 1;
};

module.exports = SchoolCalendar;
