'use strict';

angular.module('adminApp')
  .controller('ContactDialogCtrl', function ($scope, $modalInstance) {

    $scope.contact = {};
    $scope.newNumber = { type: 'Mobile', number: '' };

    $scope.addNumber = function() {
      if (!$scope.contact.phoneNumbers) {
        $scope.contact.phoneNumbers = [];
      }
      $scope.contact.phoneNumbers.push({
        type: $scope.newNumber.type,
        number: $scope.newNumber.number
      });
      $scope.newNumber.type = 'Mobile';
      $scope.newNumber.number = '';
    };

    $scope.removeNumber = function(number) {
      var idx = $scope.contact.phoneNumbers.indexOf(number);
      if (idx > -1)
        $scope.contact.phoneNumbers.splice(idx, 1);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function() {
      var payload = angular.copy($scope.contact);
      if ($scope.newNumber.number != '') {
        payload.phoneNumbers.push($scope.newNumber);
      }
      $modalInstance.close(payload);
    }
  });
