'use strict';

angular.module('adminApp')
  .controller('StudentDialogCtrl', function ($scope, $modalInstance, student, QueryService) {

    $scope.student = student;

    QueryService.cls.query('', function(results) {
      $scope.classes = _.sortBy(results, function(r) { return r.name });
    });

    $scope.isNew = function() {
      if ("id" in student) {
        return false;
      }
      return true;
    }

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function(action) {
      if (action) {
        $modalInstance.close(action);
        return;
      }

      var payload = angular.copy($scope.student);
      $modalInstance.close(payload);
    }
  });
