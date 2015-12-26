'use strict';

angular.module('redirectSvc', [])
  .service('redirectService', ["$state", "$rootScope", "$stateParams", "dataService", function ($state, $rootScope, $stateParams, dataService) {
    this.bestSongsForArtist = function (artistName) {
      $rootScope.$broadcast('setMenuParams', {
        artist: artistName,
        limit: $stateParams.limit,
        genre: dataService.getGenre(),
        lang: dataService.getLang()
      });
    },
    this.genreTopArtists = function (genre, limit) {
      $state.go("genreTopArtists", {
        genre: genre,
        limit: limit
      });
      $rootScope.$broadcast('setMenuParams', {
        genre: genre,
        limit: limit
      });
    }
  }]);