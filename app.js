'use strict';

// Declare app level module which depends on views, and components
angular.module('appMelomance', [
  'appSources',
  'appTranslations',
  'appRouter',
  'appDirectives',
  'appFilters',
  'appServices',
  'appControllers'
]);

var minHeight = $(window).height() + 10;
$('.main-wrapper').css('min-height', minHeight);