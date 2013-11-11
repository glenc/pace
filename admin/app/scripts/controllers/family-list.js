'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, $location, QueryService, CommandService, PubSub, $modal) {
    $scope.view = {
      filter: 'active'
    };

    // functions
    $scope.newFamily = function() {
      var modal = $modal.open({
        templateUrl: 'views/new-family-dialog.html',
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
      var view = $scope.view.filter == 'all' ? '' : $scope.view.filter;
      QueryService.family.query(view, function(results) {
        $scope.families = results;
      });
    };

    $scope.refreshView();

  });
