'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, QueryService, CommandService, PubSub, $modal) {
    PubSub.subscribe('command-submitted', function(data) { console.log(data); });
    PubSub.subscribe('command-received', function(data) { console.log(data); });
    PubSub.subscribe('command-resolved', function(data) { console.log(data); });

    // functions
    $scope.newFamily = function() {
      var modal = $modal.open({
        templateUrl: 'views/new-family-dialog.html',
        controller: 'NewFamilyDialogCtrl'
      });

      modal.result.then(function(familyData) {
        CommandService.submit('new-family', familyData).
          then(function(data) {
            $scope.showView('active');
          });
      });
    };

    // load view
    $scope.showView = function(view) {
      QueryService.family.query(view, function(results) {
        $scope.families = results;
      });
    };

    $scope.showView('active');

  });
