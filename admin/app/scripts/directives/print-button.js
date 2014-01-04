'use strict';

angular.module('adminApp')
  .directive('printButton', function () {
    return {
      template: '<button type="button" class="btn btn-sm"><i class="fa fa-print"></i> Print</button>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.click(function() {
          window.print();
        });
      }
    };
  });
