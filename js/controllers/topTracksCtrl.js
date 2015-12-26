'use strict';

angular.module('topTracksCtrl', [])

  .controller('topTracksController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams",
    "dataService", "redirectService", "$timeout", "$filter", function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService,
                                                                       redirectService, $timeout, $filter) {

      dataService.dataBackup('track');
      $scope.artist = dataService.getArtist().replace('%2F', '/');

      $scope.media = dataService.mediaSongs;
      $scope.mediaImg = {
        vk_img: "/images/vk_" + dataService.lang + ".png",
        yandex_img: "/images/yandex_" + dataService.lang + ".png"
      }

      parserLastFm.getTopTracks()
        .then(function (response, status) {
          dataService.validationGood();
          var tracks = x2js.xml_str2json(response.data);
          if (angular.isDefined(tracks.lfm)) {
            $scope.tracks = tracks.lfm.tracks.track;

            console.log("$scope.tracks = ");console.log($scope.tracks);

            angular.forEach($scope.tracks, function (track) {
              track.listeners = parseFloat(track.listeners);
              track.playcount = parseFloat(track.playcount);
            });
            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
              $scope.tracks = orderBy($scope.tracks, predicate, reverse);
            };
            $scope.order('playcount',"!reverse");

            $timeout(function () {
              $scope.contentIsReady = true;
            }, 500);

          } else {
            dataService.validationBad();
          }
        },
        function (response, status) {
          console.log('-getTopTracks\n' + status + '\n' + print_r(response.data));
          dataService.validationBad();
        })

      $scope.bestSongsForArtist = function (artistName) {
        redirectService.bestSongsForArtist(artistName)
      }
    }])