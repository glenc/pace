'use strict';

angular.module('adminApp')
  .controller('ContactReportCtrl', function ($scope, QueryService) {
    $scope.query = {
      status: 'Active'
    };

    $scope.refreshView = function() {
      var p = {};
      if ($scope.query.status != 'all') {
        p.status = $scope.query.status;
      }
      QueryService.contact.query('', 'detail', p, function(results) {
        $scope.contacts = results;
      });
    };

    $scope.refreshView();

    $scope.export = function() {
      window.open(QueryService.contact.urlFor($routeParams.status, 'export'));
    };
  });
