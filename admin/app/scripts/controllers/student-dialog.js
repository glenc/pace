'use strict';

angular.module('adminApp')
  .controller('StudentDialogCtrl', function ($scope, $modalInstance, student) {

    $scope.student = student;

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
