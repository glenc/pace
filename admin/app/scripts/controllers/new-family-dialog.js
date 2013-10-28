'use strict';

angular.module('adminApp')
  .controller('NewFamilyDialogCtrl', function ($scope, $modalInstance, $timeout, QueryService) {
    // family name validation
    $scope.validation = {
      validating: false,
      hasValidated: false,
      showResults: function() {
        return !$scope.validation.validating &&
               $scope.validation.hasValidated
      }
    };
    $scope.family = {
      name: '',
      status: 'New'
    };
    var timeout
    $scope.validateName = function() {
      if (timeout) $timeout.cancel(timeout);
      $scope.validation.validating = true;

      if ($scope.family.name == '') {
        $scope.validation.error = 'Please enter a name';
        $scope.validation.validating = false;

      } else {
        timeout = $timeout(function() {
          $scope.validation.hasValidated = true;
          QueryService.family.query('', '', { name: $scope.family.name }, function(results) {
            $scope.validation.error = results.length == 0 ? null : 'Name already exists';
            $scope.validation.validating = false;
          });
        }, 500);

      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function() {
      $modalInstance.close('ok');
    };
  });
