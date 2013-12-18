var crypto = require('crypto');
var _      = require('underscore');



function view(name, select, map, post) {
  return {
    name: name,
    model: 'family',
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

function transformContact(contact) {
  contact = idmap(contact);
  if (contact.email) {
    var md5 = crypto.createHash('md5');
    md5.update(contact.email);
    contact.email_hash = md5.digest('hex');
  }
  return contact;
}

module.exports = [
  view('', 'id name status', toObjectAndIdMap),
  view('detail', 'id name contacts',
    function(f) {
      f = toObjectAndIdMap(f);
      f.contacts = f.contacts.map(transformContact);
      return f;
    })
];
