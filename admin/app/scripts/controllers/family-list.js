'use strict';

angular.module('adminApp')
  .controller('FamilyListCtrl', function ($scope, QueryService, CommandService, PubSub, $modal) {

    // functions
    $scope.newFamily = function() {
      var modal = $modal.open({
        templateUrl: 'views/new-family-dialog.html',
        controller: 'NewFamilyDialogCtrl'
      });

      modal.result.then(function(familyData) {
        CommandService.submit('new-family', familyData)
          .then(function(data) {
            $scope.showView('active');
          });
      });
    };

    // load view
    $scope.refreshView = function() {
      var view = $scope.view == 'all' ? '' : $scope.view;
      QueryService.family.query(view, function(results) {
        $scope.families = results;
      });
    };

    $scope.view = 'active';
    $scope.refreshView();

  });
