'use strict';

angular.module('adminApp')
  .directive('statusLabel', function () {
    return {
      scope: {
        status: '@'
      },
      template: '<span class="label" ng-class="{ \'label-primary\': status == \'New\', \'label-success\': status == \'Active\', \'label-warning\': status == \'Waitlist\', \'label-info\': status == \'Alumni\' || status == \'Graduated\', \'label-default\': status == \'Exited\' || status == \'Future\' }">{{status | lowercase}}</span>',
      restrict: 'E'
    };
  });
