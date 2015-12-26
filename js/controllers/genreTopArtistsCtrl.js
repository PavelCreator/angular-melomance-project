'use strict';

angular.module('genreTopArtistsCtrl', [])

  .controller('genreTopArtistsController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "$state", "redirectService", "$timeout", function (
    $rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, $state, redirectService, $timeout) {

    dataService.dataBackupGL();
    $scope.genre = $stateParams.genre;

    $scope.media = dataService.mediaArtist;
    $scope.mediaImg = {
      vk_img: "/images/vk_" + dataService.lang + ".png",
      yandex_img: "/images/yandex_" + dataService.lang + ".png"
    }

    parserLastFm.getAristsByGenre($scope.genre, $stateParams.limit)
      .then(function (response, status) {
        dataService.validationGood();
        var artistInfo = x2js.xml_str2json(response.data);
        if (angular.isDefined(artistInfo.lfm)) {
          $scope.artists = artistInfo.lfm.topartists.artist;
          $timeout(function () {
            $scope.contentIsReady = true;
          }, 500);
        }else{
          dataService.validationBad();
        }
       },
      function (response, status) {
        console.log('-getAristsByGenre\n' + status + '\n' + print_r(response.data));
        dataService.validationBad();
      })

    $scope.bestSongsForArtist = function (artistName) {
      redirectService.bestSongsForArtist(artistName)
    }
  }])