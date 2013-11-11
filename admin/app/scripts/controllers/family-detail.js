'use strict';

angular.module('adminApp')
  .controller('FamilyDetailCtrl', function ($scope, $routeParams, $modal, QueryService, CommandService) {

    var refreshView = function() {
      QueryService.family.get($routeParams.id, function(family) {
        $scope.family = family;
      });
    }

    $scope.newContact = function() {
      var modal = $modal.open({
        templateUrl: 'views/contact-dialog.html',
        controller: 'ContactDialogCtrl'
      });

      modal.result.then(function(contactData) {
        contactData.family_id = $scope.family.id;
        CommandService.submit('new-contact', contactData)
          .then(function(data) {
            refreshView();
          });
      });
    };

    refreshView();
  });
