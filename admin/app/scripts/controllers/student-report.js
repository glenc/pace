'use strict';

angular.module('adminApp')
  .controller('StudentReportCtrl', function ($scope, QueryService) {
    $scope.query = {
      grade: 'all'
    };

    $scope.refreshView = function() {
      var p = {};
      if ($scope.query.grade != 'all') {
        p.grade = $scope.query.grade;
      }
      QueryService.student.query('', 'detail', p, function(results) {
        $scope.students = results;
      });
    };

    $scope.refreshView();

    $scope.export = function() {
      window.open(QueryService.student.urlFor($routeParams.grade, 'export'));
    };
  });
