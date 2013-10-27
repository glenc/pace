'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, QueryService) {
    QueryService.family.query('active', function(results) {
      $scope.families = results;
    });
  });
