var _ = require('underscore');

function view(name, select, map, post) {
  return {
    name: name,
    model: 'config',
    select: select,
    map: map,
    post: post
  };
};

function idmap(f) {
  var obj = f.toObject();
  delete obj._id;
  return obj;
};

module.exports = [
  view('', 'key value', idmap)
];
