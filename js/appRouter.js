'use strict';

angular.module('appRouter', [])

  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    var artistsArr = [
      'Muse', 'Frank Sinatra', 'Arctic Monkeys', 'Radiohead', 'David Guetta',
      'Daft Punk', 'Jamiroquai', 'Queen', 'Metallica', 'Pink Floyd',
      'Led Zeppelin', 'Madonna', 'Ludovico Einaudi', 'Rob Costlow', 'Beatles',
      'Black Sabbath', 'Bon Jovi', 'Depeche Mode', 'In Flames', 'Iron Maiden',
      'Johnny Cash', 'Kiss', 'Korn', 'Nickelback', 'Nirvana',
      'The Offspring', 'Rammstein', 'Scooter', 'Scorpions', 'The Prodigy',
      'Skrillex', 'Bob Marley', 'The 69 eyes', 'The Sisters Of Mercy',
      'Within Temptation', 'Lana Del Rey', 'Rihanna', 'Linkin Park', 'Eluveitie'
    ]

/*    $urlRouterProvider.otherwise("/bestSongs/" + artistsArr[Math.floor(Math.random() * artistsArr.length)] + "/10");*/
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('intro', {
        url: "/",
        controller: 'introController',
      })
      .state('bestSongs', {
        url: "/bestSongs/{artist}/{limit}",
        templateUrl: "partials/bestSongs.html",
        controller: 'bestSongsController',
      })
      .state('bestAlbums', {
        url: "/bestAlbums/{artist}/{limit}",
        templateUrl: "partials/bestAlbums.html",
        controller: 'bestAlbumsController'
      })
      .state('similarArtists', {
        url: "/similarArtists/{artist}/{limit}",
        templateUrl: "partials/similarArtists.html",
        controller: 'similarArtistsController'
      })
      .state('similarArtistsByGenres', {
        url: "/similarArtistsByGenres/{artist}/{limit}",
        templateUrl: "partials/similarArtistsByGenres.html",
        controller: 'similarArtistsByGenresController'
      })
      .state('artistInfoLastFm', {
        url: "/artistInfoLastFm/{artist}",
        templateUrl: "partials/artistInfo.html",
        controller: 'artistInfoController'
      })
      .state('genreTopArtists', {
        url: "/genreTopArtists/{genre}/{limit}",
        templateUrl: "partials/genreTopArtists.html",
        controller: 'genreTopArtistsController'
      })
      .state('topGenres', {
        url: "/topGenres",
        templateUrl: "partials/topGenres.html",
        controller: 'topGenresController'
      })
      .state('topArtists', {
        url: "/topArtists",
        templateUrl: "partials/topArtists.html",
        controller: 'topArtistsController'
      })
      .state('topTracks', {
        url: "/topTracks",
        templateUrl: "partials/topTracks.html",
        controller: 'topTracksController'
      })
      .state('libGenres', {
        url: "/libGenres",
        templateUrl: "partials/libGenres.html",
        controller: 'libGenresController'
      })
      .state('libArtists', {
        url: "/libArtists",
        templateUrl: "partials/libArtists.html",
        controller: 'libArtistsController'
      })
  }]);