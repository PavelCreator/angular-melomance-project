'use strict';

angular.module('searchTracksCtrl', [])

  .controller('searchTracksController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams",
    "dataService", "redirectService", "$timeout", "$filter", function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService,
                                                                       redirectService, $timeout, $filter) {

      dataService.dataBackup('track');
      $scope.track = dataService.getTrack().replace('%2F', '/');
      console.log("$scope.track = ");console.log($scope.track);

      $scope.media = dataService.mediaSongs;
      $scope.mediaImg = {
        vk_img: "/images/vk_" + dataService.lang + ".png",
        yandex_img: "/images/yandex_" + dataService.lang + ".png"
      }

      parserLastFm.searchTracks($scope.track, dataService.getLimit())
        .then(function (response, status) {
          dataService.validationGood();
          var tracks = x2js.xml_str2json(response.data);
          console.log("tracks = ");console.log(tracks);
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
          console.log('-searchTracks\n' + status + '\n' + print_r(response.data));
          dataService.validationBad();
        })

      $scope.bestSongsForArtist = function (artistName) {
        redirectService.bestSongsForArtist(artistName)
      }
    }])