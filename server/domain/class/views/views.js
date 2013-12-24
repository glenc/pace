var db        = require('../../../db');
var moment    = require('moment');
var _         = require('underscore');

var calendar = {};
var minGrade = 0;
var maxGrade = 0;

function view(name, select, map, post) {
  db.Config.findOne({ key: 'school-calendar' }, function(err, doc) {
    calendar = loadCalendar(doc.value);
  });

  db.Config.findOne({key: 'min-grade'}, function(err, doc) {
    minGrade = doc.value;
  });

  db.Config.findOne({key: 'max-grade'}, function(err, doc) {
    maxGrade = doc.value;
  });

  return {
    name: name,
    model: 'class',
    select: select,
    map: map,
    post: post
  };
};

function loadCalendar(raw) {
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

function toObjectAndIdMap(f) {
  f = f.toObject();
  return idmap(f);
}

function idmap(f) {
  var id = f._id;
  delete f._id;
  f.id = id;
  return f;
};

function transform(c) {
  c = toObjectAndIdMap(c);
  c.grade = gradeLevel(c.firstYear);
  c.status = status(c);
  return c;
};

function gradeLevel(firstYear) {
  var yr = calendar[firstYear];
  var cy = {};
  for (var key in calendar) {
    if (calendar[key].isCurrent) {
      cy = calendar[key];
    }
  }

  var first = yr.startDate;
  var current = cy.startDate;
  return current.years() - first.years() + 1;
};

function status(c) {
  if (c.grade > maxGrade)
    return 'Graduated';

  if (c.grade < minGrade)
    return 'Inactive';

  return 'Active'
}

module.exports = [
  view('', 'id name firstYear graduationYear', transform)
];
