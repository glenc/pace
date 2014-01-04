'use strict';

angular.module('adminApp')
  .controller('StudentReportCtrl', function ($scope, $routeParams, QueryService) {
    var grade = $routeParams.grade;
    if (grade) {
      var num = grade[grade.length-1];
      $scope.title = 'Grade ' + num;
    } else {
      $scope.title = 'All Students';
    }

    QueryService.student.query($routeParams.grade, 'detail', function(results) {
      $scope.students = results;
    });

    $scope.export = function() {

    };
  });
