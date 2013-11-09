'use strict';


angular.module('adminApp')
  .factory('PubSub', function PubSub() {

    var cache, publish, subscribe, unsubscribe;
    cache = {};

    subscribe = function (topic, callback) {
      if (!cache[topic]) {
        cache[topic] = [];
      }
      cache[topic].push(callback);
      return [topic, callback];
    };

    unsubscribe = function (topic, callback) {
      var callbackCount;
      if (cache[topic]) {
        callbackCount = cache[topic].length;
        while (callbackCount--) {
          if (cache[topic][callbackCount] === callback) {
            cache[topic].splice(callbackCount, 1);
          }
        }
      }
      return null;
    };

    publish = function (topic) {
      var callbackCount, event, res;
      event = cache[topic];
      if (event && event.length > 0) {
        callbackCount = event.length;
        while (callbackCount--) {
          if (event[callbackCount]) {
            res = event[callbackCount].apply({}, Array.prototype.slice.call(arguments, 1));
          }
        }
        publish(topic + "_done");
        return res;
      }
    };

    return {
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      publish: publish
    };

  });
