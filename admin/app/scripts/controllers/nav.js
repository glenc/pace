'use strict';

angular.module('adminApp')
  .controller('NavCtrl', function ($scope, $rootScope, $location) {
    $rootScope.$on('$locationChangeSuccess', function(evt, newUrl, oldUrl) {
      setModule(newUrl);
    });

    var setModule = function(fullUrl) {
      $scope.module = fullUrl.match(/#\/([^\/]+)/)[1];
    };

    setModule($location.absUrl());
  });
