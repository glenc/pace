'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, QueryService, $modal) {

    // functions
    $scope.newFamily = function() {
      var modal = $modal.open({
        templateUrl: 'views/new-family-dialog.html',
        controller: 'NewFamilyDialogCtrl'
      });
      console.log('here');

      modal.result.then(function(family) {
        console.log('dude');
        console.log(family);
      });
    };

    // load view
    QueryService.family.query('active', function(results) {
      $scope.families = results;
    });

  });
