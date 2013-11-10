var _ = require('underscore');

function view(name, select, map, post) {
  return {
    name: name,
    model: 'family',
    select: select,
    map: map,
    post: post
  };
};

function idmap(f) {
  var obj = f.toObject();
  var id = f._id;
  delete obj._id;
  obj.id = id;
  return obj;
};

module.exports = [
  view('', 'id name status', idmap),
  view('detail', 'id name contacts', idmap),
  view('contacts', 'contacts',
    function(f) {
      return f.contacts.map(function(c) {
        var obj = idmap(c);
        obj.family_id = f.id;
        return obj;
      });
    },
    function(all) {
      return _.flatten(all);
    })
];
