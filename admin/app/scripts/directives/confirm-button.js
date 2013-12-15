'use strict';

angular.module('adminApp')
  .directive('confirmButton', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        text: '@',
        className: '@',
        action: '&'
      },
      controller: function ($scope, $element, $attrs) {
        var content = $attrs.body ? '<p>' + $attrs.body + '</p>' : '';
        var popoverOpts = {
          title: $attrs.title || 'Are you sure?',
          placement: 'top',
          html: true,
          content: content +
            '<div class="centered"><button href="" class="btn btn-primary btn-minier" data-result="yes"><i class="fa fa-check"></i> Yes</button>' +
            '<button href="" class="btn btn-minier" data-result="no"><i class="fa fa-ban"></i> No</button></div>'
        };

        $element.popover(popoverOpts)
          .parent()
          .delegate('button', 'click', function (e) {
            e.preventDefault();
            var el = $(e.currentTarget);
            var result = el.data('result');
            $element.popover('hide');
            if (result === 'yes') {
              $scope.$apply($scope.action);
            }
          });
      },
      template: '<a href="" class="btn {{className}}">{{text}}</a>'
    };
  });
