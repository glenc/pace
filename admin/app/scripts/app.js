'use strict';

angular.module('adminApp',
  ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.mask'])

  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/families', {
        templateUrl: 'views/family-list.html',
        controller: 'FamilyListCtrl'
      })
      .when('/families/:id', {
        templateUrl: 'views/family-detail.html',
        controller: 'FamilyDetailCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/classes', {
        templateUrl: 'views/classes.html',
        controller: 'ClassesCtrl'
      })
      .otherwise({
        redirectTo: '/families'
      });
  });
