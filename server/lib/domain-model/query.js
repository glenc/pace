var _ = require('underscore');

function Query(modelName, model, name, defaultParams) {
  this.name = name || '';
  this.model = modelName;
  this._model = model;
  this._defaultParams = defaultParams || {};
};

Query.prototype.execute = function(view, parameters, callback) {
  var q = this.createQuery(view, parameters);

  q.exec(function(err, results) {
    if (err) return callback(err);
    if (view.map) {
      results = results.map(view.map);
    }
    if (view.post) {
      results = view.post(results);
    }
    callback(null, results);
  });
};

Query.prototype.createQuery = function(view, parameters) {
  var p = _.extend(parameters, this._defaultParams);
  var select = view.select || '';
  return this._model.find(p, select);
};

module.exports = Query;
