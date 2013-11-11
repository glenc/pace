'use strict';

angular.module('adminApp')
  .directive('eventIcon', function () {
    return {
      scope: {
        event: '=',
        className: '@'
      },
      template: '<i class="fa {{className}} {{icon}}"></i>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var map = {
          'Data': 'fa-pencil-square-o',
          'Status': 'fa-info-circle'
        };
        scope.icon = map[scope.event.type];
      }
    };
  });
