'use strict';

angular.module('adminApp')
  .controller('ReportsCtrl', function ($scope) {
    $scope.reportGroups = [
      {
        name: 'Family Reports',
        color: 'blue',
        reports: [
          { name: 'Active Families', url: 'reports/family-report/active' },
          { name: 'Waitlist Families', url: 'reports/family-report/waitlist' },
          { name: 'New Families', url: 'reports/family-report/new' },
          { name: 'All Families', url: 'reports/family-report' },
          { name: 'Alumni Families', url: 'reports/family-report/alumni' },
          { name: 'Exited Families', url: 'reports/family-report/exited' }
        ]
      },
      {
        name: 'Contact Reports',
        color: 'red',
        reports: [
          { name: 'Active Contacts', url: 'reports/contact-report/active' },
          { name: 'Waitlist Contacts', url: 'reports/contact-report/waitlist' },
          { name: 'New Contacts', url: 'reports/contact-report/new' },
          { name: 'All Contacts', url: 'reports/contact-report' }
        ]
      },
      {
        name: 'Student Reports',
        color: 'purple',
        reports: [
          { name: 'All Students', url: 'reports/student-report' },
          { name: '1st Grade', url: 'reports/student-report/grade1' },
          { name: '2nd Grade', url: 'reports/student-report/grade2' },
          { name: '3rd Grade', url: 'reports/student-report/grade3' },
          { name: '4th Grade', url: 'reports/student-report/grade4' },
          { name: '5th Grade', url: 'reports/student-report/grade5' },
          { name: '6th Grade', url: 'reports/student-report/grade6' }
        ]
      }
    ]
  });
