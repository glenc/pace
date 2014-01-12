'use strict';

angular.module('adminApp')
  .controller('ReportsCtrl', function ($scope, QueryService) {
    $scope.reportGroups = [
      {
        name: 'Family Reports',
        color: 'blue',
        reports: [
          { name: 'Families by Status', url: 'reports/family-report' },
          { name: 'Active Families by Grade', url: 'reports/family-report' },
          { name: 'Contacts by Status', url: 'reports/contact-report' },
          { name: 'Active Contacts by Grade', url: 'reports/contact-report' }
        ]
      },
      {
        name: 'Student Reports',
        color: 'purple',
        reports: [
          { name: 'Class Roster', url: 'reports/student-report' }
        ]
      }
    ];

    QueryService.cls.query('', function(results) {
      var rpt = {
        name: 'Google Group Lists',
        color: 'green',
        reports: _.map(results, function(r) { return { name: r.name, url: 'reports/google-report/' + r.id + '?clsName=' + r.name }})
      };

      $scope.reportGroups.push(rpt);
    });
  });
