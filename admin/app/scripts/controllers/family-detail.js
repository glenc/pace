'use strict';

angular.module('adminApp')
  .controller('FamilyDetailCtrl', function ($scope, $routeParams, QueryService) {
    QueryService.family.get($routeParams.id, function(family) {
      $scope.family = family;
    });
  });
