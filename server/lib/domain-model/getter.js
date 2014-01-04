var errors = require('restify-cqrs').errors;

function Getter(modelName, model, populate) {
  this.name = 'get';
  this.model = modelName;
  this._model = model;
  this._populate = populate;
};

Getter.prototype.execute = function(view, parameters, callback) {
  var select = view.select || '';
  var query = this.createQuery(parameters);
  if (this._populate) {
    query = query.populate(this._populate);
  }

  query.exec(function(err, doc) {
    if (err) return callback(err);
    if (!doc) return callback(new errors.NotFoundError());
    if (view.map) {
      doc = view.map(doc);
    }
    if (view.post) {
      doc = view.post(doc);
    }
    if (view.contentType) {
      console.log('hi');
      return callback(null, function(res) {
        res.setHeader('content-type', view.contentType);
        res.send(200, doc);
      });
    } else {
      callback(null, doc);
    }
  });
};

Getter.prototype.createQuery = function(parameters) {
  return this._model.findById(parameters.id);
};

module.exports = Getter;
