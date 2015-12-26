'use strict';

angular.module('imagePreloaderDrct', [])

  .directive('preloader', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        
        if (attrs.src == undefined) {
          //On Fail
          element.hide();
          element.addClass('spinner-show');
          element.parent().addClass('srcFailShow');
        } else {
          //On Load
          element.on('load', function () {
            element.removeClass('spinner-hide');
            element.addClass('spinner-show');
          });
          //When image is loaded
          scope.$watch('ngSrc', function () {
            element.removeClass('spinner-show');
            element.addClass('spinner-hide');
          });
        }
      }
    };
  });