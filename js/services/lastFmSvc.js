'use strict';

angular.module('lastFmSvc', [])
  .service('parserLastFm', ["$http", "$translate", function ($http,$translate) {
    this.getTopTracksByArtist = function (artist, limit) {
      return $http({
        method: 'POST',
        url: '/api/getTopTracksByArtist.php',
        data: {
          "artist": artist,
          "limit": limit
        }
      })
    };
    this.getSimilarArtists = function (artist, limit) {
      return $http({
        method: 'POST',
        url: '/api/getSimilarArtists.php',
        data: {
          "artist": artist,
          "limit": limit
        }
      })
    };
    this.getArtistInfo = function (artist) {
      return $http({
        method: 'POST',
        url: '/api/getArtistInfo.php',
        data: {
          "artist": artist,
          "lang": $translate.use()
        }
      })
    };
    this.getBestAlbums = function (artist, limit) {
      return $http({
        method: 'POST',
        url: '/api/getBestAlbums.php',
        data: {
          "artist": artist,
          "limit": limit
        }
      })
    };
    this.getAristsByGenre = function (genre, limit) {
      return $http({
        method: 'POST',
        url: '/api/getArtistByGenre.php',
        data: {
          "tag": genre,
          "limit": limit
        }
      })
    };
    this.getAlbumInfo = function (artist, album) {
      return $http({
        method: 'POST',
        url: '/api/getAlbumInfo.php',
        data: {
          "artist": artist,
          "album": album,
          "lang": $translate.use()
        }
      })
    };
    this.getTopGenres = function () {
      return $http({
        method: 'POST',
        url: '/api/getTopGenres.php'
      })
    };
    this.getTopArtists = function () {
      return $http({
        method: 'POST',
        url: '/api/getTopArtists.php'
      })
    };
    this.getTopTracks = function () {
      return $http({
        method: 'POST',
        url: '/api/getTopTracks.php'
      })
    };
    this.searchTracks = function (track, limit) {
      return $http({
        method: 'POST',
        url: '/api/searchTrack.php',
        data: {
          "track": track,
          "limit": limit
        }
      })
    };



  }]);