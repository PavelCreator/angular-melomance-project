'use strict';

angular.module('appTranslations', [])
  .config(["$translateProvider", function ($translateProvider) {
    $translateProvider.useLoader('customLoader', {});
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  }])
  .factory('customLoader', ["$http", "$q", function ($http, $q) {
    return function (options) {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: '/translations/' + options.key + '.json'
      })
        .then(function (response) {
        deferred.resolve(response.data);
      },function () {
        deferred.reject(options.key);
      });

      return deferred.promise;
    }
  }])