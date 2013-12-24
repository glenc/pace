'use strict';

angular.module('adminApp')
  .controller('ClassDialogCtrl', function ($scope, $modalInstance, cls, QueryService) {
    $scope.cls = cls;

    QueryService.config.get('school-calendar', '', function(result) {
      $scope.years = Object.keys(result.value);
    });

    $scope.isNew = function() {
      if ("id" in cls) {
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

      var payload = angular.copy($scope.cls);
      $modalInstance.close(payload);
    }
  });
