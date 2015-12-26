'use strict';

angular.module('similarArtistsByGenresCtrl', [])

  .controller('similarArtistsByGenresController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "redirectService", "$timeout", function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, redirectService, $timeout) {

    dataService.dataBackupAL();
    $scope.artist = $stateParams.artist.replace('%2F', '/');

    $scope.media = dataService.mediaArtist;
    $scope.mediaImg = {
      vk_img: "/images/vk_" + dataService.lang + ".png",
      yandex_img: "/images/yandex_" + dataService.lang + ".png"
    }

    parserLastFm.getArtistInfo($stateParams.artist, dataService.lang)
      .then(function (response, status) {
        dataService.validationGood();
        var artistInfo = x2js.xml_str2json(response.data);
        if (angular.isDefined(artistInfo.lfm)) {
          $scope.tags = artistInfo.lfm.artist.tags.tag;
          $scope.getAristsByGenre($scope.tags[0]['name']);
          $timeout(function () {
            $scope.genresIsReady = true;
          }, 500);
        } else {
          dataService.validationBad();
        }
      },
      function (response, status) {
        console.log('-getArtistInfo\n' + status + '\n' + print_r(response.data));
        dataService.validationBad();
      })

    $scope.getAristsByGenre = function (genre) {
      delete $scope.contentIsReady;
      parserLastFm.getAristsByGenre(genre, $stateParams.limit)
        .then(function (response, status) {
          dataService.validationGood();
          var artistInfo = x2js.xml_str2json(response.data);
          if (angular.isDefined(artistInfo.lfm)) {
            $scope.artists = artistInfo.lfm.topartists.artist;
            $scope.selectedGenre = genre;

            $('.genre-repeater button').removeClass('active');
            $('.genre-repeater button[name="' + genre + '"]').addClass('active');

            $timeout(function () {
              $scope.showGenres = true;
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
    }

    $scope.bestSongsForArtist = function (artistName) {
      redirectService.bestSongsForArtist(artistName)
    }

    $rootScope.$on('openClassicRock', function () {
      $scope.getAristsByGenre('classic rock');
    });

  }])