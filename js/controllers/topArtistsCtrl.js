'use strict';

angular.module('topArtistsCtrl', [])

  .controller('topArtistsController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams",
    "dataService", "redirectService", "$timeout", "$filter", function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService,
                                                                       redirectService, $timeout, $filter) {
      dataService.setLib('lastfm');

      dataService.dataBackup('artist');
      $scope.artist = dataService.getArtist().replace('%2F', '/');

      $scope.media = dataService.mediaArtist;
      $scope.mediaImg = {
        vk_img: "/images/vk_" + dataService.lang + ".png",
        yandex_img: "/images/yandex_" + dataService.lang + ".png"
      }

      parserLastFm.getTopArtists()
        .then(function (response, status) {
          dataService.validationGood();
          var artists = x2js.xml_str2json(response.data);
          if (angular.isDefined(artists.lfm)) {
            $scope.artists = artists.lfm.artists.artist;

            angular.forEach($scope.artists, function (artist) {
              artist.listeners = parseFloat(artist.listeners);
              artist.playcount = parseFloat(artist.playcount);
            });
            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
              $scope.artists = orderBy($scope.artists, predicate, reverse);
            };
            $scope.order('listeners',"!reverse");

            $timeout(function () {
              $scope.contentIsReady = true;
            }, 500);

          } else {
            dataService.validationBad();
          }
        },
        function (response, status) {
          console.log('-getAristsByGenre\n' + status + '\n' + print_r(response.data));
          dataService.validationBad();
        })

      $scope.genreTopArtists = function (genre, limit) {
        redirectService.genreTopArtists(genre, limit)
      }
    }])