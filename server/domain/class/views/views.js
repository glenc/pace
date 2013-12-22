
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

module.exports = [
  view('', 'id name firstYear graduationYear', toObjectAndIdMap)
];
