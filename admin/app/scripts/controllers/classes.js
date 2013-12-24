'use strict';

angular.module('adminApp')
  .controller('ClassesCtrl', function ($scope, $modal, QueryService, CommandService) {

    $scope.newClass = function() {
      var modal = $modal.open({
        templateUrl: 'views/class-dialog.html',
        controller: 'ClassDialogCtrl',
        resolve: {
          cls: function() { return { }; }
        }
      });

      modal.result.then(function(result) {
        CommandService.submit('new-class', result)
          .then(function(data) {
            refreshView();
          });
      });
    };

    $scope.editClass = function(cls) {
      var modal = $modal.open({
        templateUrl: 'views/class-dialog.html',
        controller: 'ClassDialogCtrl',
        resolve: {
          cls: function() { return angular.copy(cls); }
        }
      });

      modal.result.then(function(result) {
        if (result === 'delete') {
          $scope.deleteClass(cls);
        } else {
          CommandService.submit('update-class', result)
            .then(function(data) {
              refreshView();
            });
        }
      })
    };

    $scope.deleteClass = function(cls) {
      var cmd = { class_id: cls.id };
      CommandService.submit('delete-class', cmd)
        .then(function(data) {
          refreshView();
        });
    };

    var refreshView = function() {
      QueryService.cls.query('', function(results) {
        $scope.classes = results;
      });
    };

    refreshView();
  });
