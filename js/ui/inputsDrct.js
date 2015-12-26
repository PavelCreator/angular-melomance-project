'use strict';

angular.module('inputsDrct', [])

  .directive('enterEvent', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.enterEvent);
          });

          event.preventDefault();
        }
      });
    }
  })
  .directive('intNumInput', function () {
    return {
      scope: {
        phoneValue: '='
      },
      restrict: 'A',
      link: function (scope, element) {
        element.bind("change keyup input click", function (e) {
          if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
          }
        });
      }
    }
  });