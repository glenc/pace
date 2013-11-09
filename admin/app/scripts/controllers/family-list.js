'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, QueryService, PubSub, $modal) {
    PubSub.subscribe('command-submitted', function(data) { console.log(data); });
    PubSub.subscribe('command-received', function(data) { console.log(data); });
    PubSub.subscribe('command-resolved', function(data) { console.log(data); });

    // functions
    $scope.newFamily = function() {
      var modal = $modal.open({
        templateUrl: 'views/new-family-dialog.html',
        controller: 'NewFamilyDialogCtrl'
      });

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
