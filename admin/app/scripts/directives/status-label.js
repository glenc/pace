'use strict';

angular.module('adminApp')
  .directive('statusLabel', function () {
    return {
      scope: {
        family: '='
      },
      template: '<span class="label" ng-class="{ \'label-primary\': family.status == \'New\', \'label-success\': family.status == \'Active\', \'label-warning\': family.status == \'Waitlist\', \'label-info\': family.status == \'Alumni\', \'label-default\': family.status == \'Exited\' }">{{family.status | lowercase}}</span>',
      restrict: 'E'
    };
  });
