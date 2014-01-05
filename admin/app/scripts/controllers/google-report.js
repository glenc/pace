'use strict';

angular.module('adminApp')
  .controller('GoogleReportCtrl', function ($scope, $routeParams, QueryService) {
    var fixCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    $scope.title = $routeParams.clsName;

    QueryService.contact.query('active', 'emails', { cls: $routeParams.cls }, function(results) {
      $scope.contacts = results;
    });

    $scope.export = function() {
      window.open(QueryService.contact.urlFor('active', 'emails_export', { cls: $routeParams.cls }));
    };
  });
