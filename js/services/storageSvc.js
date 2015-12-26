'use strict';

angular.module('storageSvc', [])
  .service('storageService', ["$q", "$http", function ($q, $http) {
    var vm = this;

    vm.getStorage = function (jsonUrl) {
      var deferred = $q.defer();
      $http.get(jsonUrl)
        .then(function (response, status) {
          deferred.resolve(response.data.names)
        },
        function (response, status) {
          console.log('-demoArtistsLibrary\n' + status + '\n' + print_r(response.data));
          deferred.reject(response, status);
        });
      return deferred.promise;
    };

  }]);