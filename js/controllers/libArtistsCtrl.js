'use strict';

angular.module('libArtistsCtrl', [])

  .controller('libArtistsController', ["storageService", "$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams",
    "dataService", "redirectService", "$timeout", "$filter", function (storageService, $rootScope, parserLastFm, $scope, $sce, $stateParams, dataService,
                                                                       redirectService, $timeout, $filter) {
      dataService.setLib('library');

      dataService.dataBackup('artist');
      $scope.artist = dataService.getArtist().replace('%2F', '/');

      $scope.media = dataService.mediaArtist;

      var promiseObj = storageService.getStorage('/data/lib_artists.json');
      promiseObj.then(function (value) {
        $scope.artists = value;
        $timeout(function () {
          $scope.contentIsReady = true;
        }, 500);
      });

      $scope.genreTopArtists = function (genre, limit) {
        redirectService.genreTopArtists(genre, limit)
      }
    }])