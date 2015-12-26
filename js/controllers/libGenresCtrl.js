'use strict';

angular.module('libGenresCtrl', [])

  .controller('libGenresController', ["storageService", "$timeout", "$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams",
    "dataService", "$state", "redirectService", "$filter",
    function (storageService, $timeout, $rootScope, parserLastFm, $scope, $sce, $stateParams,
     dataService, $state, redirectService, $filter) {
      dataService.setLib('library');

      dataService.dataBackup('genre');
      $scope.genre = dataService.getGenre().replace('%2F', '/');

      var promiseObj = storageService.getStorage('/data/lib_genres.json');
      promiseObj.then(function (value) {
        $scope.genres = value;
        $timeout(function () {
          $scope.contentIsReady = true;
        }, 500);
      });
      $timeout(function () {
        $scope.contentIsReady = true;
      }, 500);

      $scope.genreTopArtists = function (genre, limit) {
        redirectService.genreTopArtists(genre, limit)
      }
    }])