'use strict';

angular.module('adminApp')
  .service('QueryService', function QueryService($resource) {
    var base = 'http://localhost\\:8080';

    var urls = {
      family: '/families',
      config: '/configs',
      cls: '/classes'
    };

    var create = function(model) {
      var resource = $resource(base + urls[model] + '/:query/:id');
      var query = function(name, view, parameters, callback) {
        callback = arguments[arguments.length-1];
        parameters = arguments.length > 3 ? parameters : {};
        view = arguments.length > 2 ? view : null;
        name = arguments.length > 1 ? name : null;

        if (view) { parameters.view = view; }

        if (name == 'get') {
          return resource.get(parameters, callback);
        }

        if (name) { parameters.query = name; }
        return resource.query(parameters, callback);
      };

      var get = function(id, view, callback) {
        query('get', view, { id: id }, callback);
      };

      return {
        query: query,
        get: get
      };
    };

    return {
      family: create('family'),
      config: create('config'),
      cls: create('cls')
    };

  });
