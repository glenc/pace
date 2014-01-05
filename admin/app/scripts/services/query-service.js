'use strict';

angular.module('adminApp')
  .service('QueryService', function QueryService($resource) {
    var base = 'http://localhost\\:8080';
    var host = 'http://localhost';
    var port = 8080;

    var urls = {
      family: '/families',
      config: '/configs',
      cls: '/classes',
      student: '/students',
      contact: '/contacts'
    };

    var create = function(model) {
      var resource = $resource(host + '\\:' + port + urls[model] + '/:query/:id');
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

      var urlFor = function(name, view, parameters) {
        var url = host + ':' + port + urls[model];
        if (name) {
          url += '/' + name;
        }

        var p = parameters || {};
        p.view = view;

        if (p.id) {
          url += '/' + p.id;
          delete p.id;
        }

        if (!_.isEmpty(p)) {
          url += '?';
          url += $.param(p);
        }

        return url;
      };

      return {
        query: query,
        get: get,
        urlFor: urlFor
      };
    };

    return {
      family: create('family'),
      config: create('config'),
      cls: create('cls'),
      student: create('student'),
      contact: create('contact')
    };

  });
