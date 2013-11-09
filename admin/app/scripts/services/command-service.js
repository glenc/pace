'use strict';

angular.module('adminApp')
  .factory('CommandService', function CommandService($http, $timeout, $q, PubSub) {
    var base = 'http://localhost:8080/commands/';
    var queue = {};
    var polling = false;

    var submit = function(command, payload, callback) {
      PubSub.publish('command-submitted', { command: command, payload: payload });
      $http.post(base + command, payload).

        success(function(data, status) {
          queue[data.id] = callback;
          PubSub.publish('command-received', { command: command, payload: payload, response: data });
          if (!polling) {
            polling = true;
            $timeout(poll, 300);
          }
        }).

        error(function(data, status) {
          PubSub.publish('command-error', { command: command, payload: payload, error: data });
          if (callback) {
            callback(data);
          };
        });
    };

    var poll = function() {
      var requests = [];

      _.each(queue, function(callback, id) {
        var deferred = $q.defer();
        requests.push(deferred.promise);

        $http.get(base + id).
          success(function(data, status) {
            if (data.completedAt) {
              if (callback) {
                callback(null, data);
              };
              PubSub.publish('command-resolved', data);
              delete queue[id];
            }
            deferred.resolve();
          });
      });

      $q.all(requests).then(function() {
        if (_.keys(queue).length > 0) {
          $timeout(poll, 300);
        } else {
          polling = false;
        }
      });
    };

    return {
      submit: submit
    };
  });
