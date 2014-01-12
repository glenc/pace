'use strict';

angular.module('adminApp')
  .controller('FamilyReportCtrl', function ($scope, QueryService) {
    $scope.query = {
      status: 'Active'
    };

    $scope.refreshView = function() {
      var p = {};
      if ($scope.query.status != 'all') {
        p.status = $scope.query.status;
      }
      QueryService.family.query('', 'names', p, function(results) {
        $scope.families = results;
      });
    };

    $scope.refreshView();

    $scope.export = function() {
      window.open(QueryService.family.urlFor('', 'export', {status:$routeParams.status}));
    };
  });
