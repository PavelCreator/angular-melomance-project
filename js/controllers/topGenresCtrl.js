'use strict';

angular.module('topGenresCtrl', [])

  .controller('topGenresController', ["$timeout", "$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams",
    "dataService", "$state", "redirectService", "$filter", function ($timeout, $rootScope, parserLastFm, $scope, $sce, $stateParams, dataService,
                                                          $state, redirectService, $filter) {
      dataService.setLib('lastfm');

      dataService.dataBackup('genre');
      $scope.genre = dataService.getGenre().replace('%2F', '/');

      parserLastFm.getTopGenres()
        .then(function (response, status) {
          dataService.validationGood();
          var genres = x2js.xml_str2json(response.data);
          if (angular.isDefined(genres.lfm)) {
            $scope.genres = genres.lfm.tags.tag;

            angular.forEach($scope.genres, function (genre) {
              genre.reach = parseFloat(genre.reach);
              genre.taggings = parseFloat(genre.taggings);
            });
            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
              $scope.genres = orderBy($scope.genres, predicate, reverse);
            };
            $scope.order('reach',"!reverse");

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