'use strict';

angular.module('adminApp')
  .controller('FamilyDetailCtrl', function ($scope, $routeParams, $modal, QueryService, CommandService) {

    var refreshView = function() {
      QueryService.family.get($routeParams.id, 'detail', function(family) {
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
          $scope.deleteContact(contact);
        } else {
          result.family_id = $scope.family.id;
          result.contact_id = result.id;
          CommandService.submit('update-contact', result)
            .then(function(data) {
              refreshView();
            });
        }
      })
    };

    $scope.deleteContact = function(contact) {
      var cmd = { family_id: $scope.family.id, contact_id: contact.id };
      CommandService.submit('delete-contact', cmd)
        .then(function(data) {
          refreshView();
        });
    }

    refreshView();
  });
