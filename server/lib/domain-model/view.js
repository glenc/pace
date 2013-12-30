function View(model, name, select) {
  this.model = model;
  this.name = name;
  this.select = select;
};

View.prototype.map = function(obj) {
  obj = obj.toObject();
  obj = View.prototype.fixIds(obj);
  return obj;
};

View.prototype.fixIds = function(obj) {
  for (prop in obj) {
    if (prop == '_id') {
      var id = obj._id;
      delete obj._id;
      obj.id = id;
      continue;
    }

    if (typeof obj[prop] === 'object') {
      obj[prop] = View.prototype.fixIds(obj[prop]);
    }
  }

  return obj;
};

module.exports = View;
