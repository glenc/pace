'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, $location, QueryService, CommandService, PubSub, $modal) {
    $scope.query = {
      status: 'Active'
    };

    // functions
    $scope.newFamily = function() {
      var modal = $modal.open({
        templateUrl: 'views/families/new-family-dialog.html',
        controller: 'NewFamilyDialogCtrl'
      });

      modal.result.then(function(familyData) {
        CommandService.submit('new-family', familyData)
          .then(function(data) {
            $location.path('/families/' + data.result.family_id);
          });
      });
    };

    // load view
    $scope.refreshView = function() {
      var p = {};
      if ($scope.query.status != 'all') {
        p.status = $scope.query.status;
      }
      QueryService.family.query('', '', p, function(results) {
        $scope.families = results;
      });
    };

    $scope.refreshView();

  });
