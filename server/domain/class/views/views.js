var db              = require('../../../db');
var SchoolCalendar  = require('../../../lib/school-calendar');

var calendar = new SchoolCalendar(db);

function view(name, select, map, post) {
  return {
    name: name,
    model: 'class',
    select: select,
    map: map,
    post: post
  };
};

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
  c.grade = calendar.gradeLevel(c);
  c.status = calendar.classStatus(c);
  return c;
};

module.exports = [
  view('', 'id name firstYear graduationYear', transform)
];
