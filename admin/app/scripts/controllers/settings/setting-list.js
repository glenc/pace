'use strict';

angular.module('adminApp')
  .controller('SettingListCtrl', function ($scope, $modal, QueryService, CommandService) {
    var refreshView = function() {
      QueryService.config.query('', function(results) {
        $scope.configs = results;
      });
    };

    var configForStorage = function(config) {
      if (config.value.length > 0 && config.value[0] == '{') {
        config.value = angular.fromJson(config.value);
      }
      return config;
    };

    var configForEdit = function(config) {
      if (angular.isObject(config.value)) {
        config.value = angular.toJson(config.value, true);
      }
      return config;
    };

    $scope.newConfig = function() {
      var modal = $modal.open({
        templateUrl: 'views/settings/setting-dialog.html',
        controller: 'SettingDialogCtrl',
        resolve: {
          config: function() { return { new: true }; }
        }
      });

      modal.result.then(function(result) {
        result = configForStorage(result);
        CommandService.submit('set-config-setting', result)
          .then(function(data) {
            refreshView();
          });
      });
    };

    $scope.editConfig = function(config) {
      var modal = $modal.open({
        templateUrl: 'views/settings/setting-dialog.html',
        controller: 'SettingDialogCtrl',
        resolve: {
          config: function() { return configForEdit(angular.copy(config)); }
        }
      });

      modal.result.then(function(result) {
        if (result === 'delete') {
          $scope.deleteConfig(config);
        } else {
          result = configForStorage(result);
          CommandService.submit('set-config-setting', result)
            .then(function(data) {
              refreshView();
            });
        }
      })
    };

    $scope.deleteConfig = function(config) {
      var cmd = { key: config.key };
      CommandService.submit('delete-config-setting', cmd)
        .then(function(data) {
          refreshView();
        });
    };

    refreshView();
  });
