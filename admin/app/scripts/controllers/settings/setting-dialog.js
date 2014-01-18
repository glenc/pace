'use strict';

angular.module('adminApp')
  .controller('SettingDialogCtrl', function ($scope, $modalInstance, config) {

    $scope.config = config;

    $scope.isNew = function() {
      if ("new" in config) {
        return true;
      }
      return false;
    }

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function(action) {
      if (action) {
        $modalInstance.close(action);
        return;
      }

      var payload = angular.copy($scope.config);
      $modalInstance.close(payload);
    }
  });
