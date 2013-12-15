'use strict';

angular.module('adminApp')
  .directive('phoneNumber', function () {
    return {
      scope: {
        number: '='
      },
      template: '<span class="phone-number"><abbr title="{{number.type}}">{{number.type|truncate:1|lowercase}}</abbr> {{number.number|tel}}</span>',
      restrict: 'E'
    };
  });
