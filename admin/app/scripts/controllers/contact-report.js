'use strict';

angular.module('adminApp')
  .controller('ContactReportCtrl', function ($scope, $routeParams, QueryService) {
    var fixCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    if ($routeParams.status) {
      $scope.title = fixCase($routeParams.status) + ' Contacts';
    } else {
      $scope.title = 'All Contacts';
    }

    QueryService.contact.query($routeParams.status, 'detail', function(results) {
      $scope.contacts = results;
    });

    $scope.export = function() {

    };
  });
