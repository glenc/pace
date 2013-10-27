'use strict';

angular.module('adminApp',
  ['ngRoute', 'ngResource'])

  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/families', {
        templateUrl: 'views/family-list.html',
        controller: 'FamilyListCtrl'
      })
      .otherwise({
        redirectTo: '/families'
      });
  });
