'use strict';

angular.module('similarArtistsCtrl', [])

  .controller('similarArtistsController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "$state", "redirectService", "$timeout", function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, $state, redirectService, $timeout) {

    $scope.contentIsReady = false;
    dataService.dataBackupAL();
    $scope.artist = $stateParams.artist.replace('%2F', '/');

    $scope.media = dataService.mediaArtist;
    $scope.mediaImg = {
      vk_img: "/images/vk_" + dataService.lang + ".png",
      yandex_img: "/images/yandex_" + dataService.lang + ".png"
    }

    parserLastFm.getSimilarArtists($stateParams.artist, $stateParams.limit)
      .then(function (response, status) {
        dataService.validationGood();
        var similarArtists = x2js.xml_str2json(response.data);
        if (angular.isDefined(similarArtists.lfm)) {
          $scope.similarArtists = similarArtists.lfm.similarartists.artist;
          $timeout(function () {
            $scope.contentIsReady = true;
          }, 1000);
        } else {
          dataService.validationBad();
        }
      },
      function (response, status) {
        console.log('-getSimilarArtists\n' + status + '\n' + print_r(response.data));
        dataService.validationBad();
      })

    $scope.bestSongsForArtist = function (artistName) {
      redirectService.bestSongsForArtist(artistName)
    }
  }])