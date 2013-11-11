'use strict';

angular.module('adminApp')
  .controller('ContactDialogCtrl', function ($scope, $modalInstance) {

    $scope.contact = {};

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function() {
      var payload = {
        firstName: $scope.contact.firstName,
        lastName: $scope.contact.lastName,
        type: 'Parent'
      };
      $modalInstance.close(payload);
    }
  });
