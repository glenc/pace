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
        controller: 'ContactDialogCtrl',
        resolve: {
          contact: function() { return {}; }
        }
      });

      modal.result.then(function(result) {
        result.family_id = $scope.family.id;
        CommandService.submit('new-contact', result)
          .then(function(data) {
            refreshView();
          });
      });
    };

    $scope.editContact = function(contact) {
      var modal = $modal.open({
        templateUrl: 'views/contact-dialog.html',
        controller: 'ContactDialogCtrl',
        resolve: {
          contact: function() { return angular.copy(contact); }
        }
      });

      modal.result.then(function(result) {
        if (result === 'delete') {
          console.log('cannot delete yet');
        } else {
          result.family_id = $scope.family.id;
          result.contact_id = result._id;
          CommandService.submit('update-contact', result)
            .then(function(data) {
              refreshView();
            });
        }
      })
    };

    refreshView();
  });
