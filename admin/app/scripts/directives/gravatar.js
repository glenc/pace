'use strict';

angular.module('adminApp')
  .directive('gravatar', function () {
    return {
      scope: {
        hash: '@',
        size: '@'
      },
      template: '<img ng-src="//www.gravatar.com/avatar/{{hash}}?d=mm&s={{size}}">',
      restrict: 'E',
      replace: true
    };
  });
