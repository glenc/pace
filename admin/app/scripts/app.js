'use strict';

angular.module('adminApp',
  ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.mask'])

  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/families', {
        templateUrl: 'views/families/family-list.html',
        controller: 'FamilyListCtrl'
      })
      .when('/families/:id', {
        templateUrl: 'views/families/family-detail.html',
        controller: 'FamilyDetailCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings/setting-list.html',
        controller: 'SettingListCtrl'
      })
      .when('/classes', {
        templateUrl: 'views/classes/class-list.html',
        controller: 'ClassListCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports/report-list.html',
        controller: 'ReportListCtrl'
      })
      .when('/reports/contact-report/:status?', {
        templateUrl: 'views/reports/contact-report.html',
        controller: 'ContactReportCtrl'
      })
      .when('/reports/student-report/:grade?', {
        templateUrl: 'views/reports/student-report.html',
        controller: 'StudentReportCtrl'
      })
      .when('/reports/family-report', {
        templateUrl: 'views/reports/family-report.html',
        controller: 'FamilyReportCtrl'
      })
      .when('/reports/google-report/:cls?', {
        templateUrl: 'views/reports/google-report.html',
        controller: 'GoogleReportCtrl'
      })
      .otherwise({
        redirectTo: '/families'
      });
  });
