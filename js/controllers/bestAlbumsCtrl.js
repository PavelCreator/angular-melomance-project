'use strict';
var saveAlbumName;
angular.module('bestAlbumsCtrl', [])

  .controller('bestAlbumsController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "$timeout", "$filter",
    function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, $timeout, $filter) {

      dataService.dataBackupAL();
      var AlbumAccordion = 0;

      $scope.artist = $stateParams.artist.replace('%2F', '/');

      $rootScope.$on('openTheWall', function () {
        $scope.getAlbumInfo('The Wall', '2', 'demo');
      });

      $scope.getAlbumInfo = function (albumName, index, demo) {
        if (albumName !== saveAlbumName) {

          AlbumAccordion = 0;

          parserLastFm.getAlbumInfo($stateParams.artist, albumName)
            .then(function (response, status) {
              dataService.validationGood();
              var album = x2js.xml_str2json(response.data);

              if (album.lfm) {
                $scope.albumDetails = album.lfm.album;
                if (album.lfm.album.wiki) {
                  var wiki = '';
                  if (album.lfm.album.wiki.content['__text']) {
                    var arr = album.lfm.album.wiki.content['__text'];
                    arr.forEach(function (item, i) {
                      wiki += item;
                    });
                  } else {
                    wiki = album.lfm.album.wiki.content;
                  }
                  $scope.albumDetails.wiki = $sce.trustAsHtml(wiki);
                }

                $scope.albumNotFoundShow = false;
                $scope.albumDetailShow = album.lfm.album.name;

                saveAlbumName = albumName;

                if (demo != 'demo') {
                  setTimeout(function () {
                    $('html,body').animate({scrollTop: $(".album_" + index).offset().top}, "slow");
                  }, 1500);
                }

              } else {
                $scope.albumDetailShow = false;
                $scope.albumNotFoundShow = albumName;
              }
            },
            function (response, status) {
              console.log('-getTopAlbums\n' + status + '\n' + print_r(response.data));
              $scope.albumDetailShow = false;
              $scope.albumNotFoundShow = albumName;
            });
        } else {
          AlbumAccordion++;
          console.log("AlbumAccordion = ");
          console.log(AlbumAccordion);
          if (AlbumAccordion == 1) {
            $scope.albumDetailShow = '';
          } else {
            $scope.albumDetailShow = saveAlbumName;
            AlbumAccordion = 0;
          }
        }
      }

      parserLastFm.getBestAlbums($stateParams.artist, $stateParams.limit)
        .then(function (response, status) {
          dataService.validationGood();
          var tracks = x2js.xml_str2json(response.data);


          if (angular.isDefined(tracks.lfm)) {
            $scope.albums = tracks.lfm.topalbums.album;

            angular.forEach($scope.albums, function (album) {
              album.playcount = parseFloat(album.playcount);
            });
            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
              $scope.albums = orderBy($scope.albums, predicate, reverse);
            };
            $scope.order('playcount', "!reverse");

            $timeout(function () {
              $scope.contentIsReady = true;
              $scope.media = {
                yandex: function (artist, album) {
                  if (!angular.isDefined(album)) {
                    album = '';
                  }
                  return 'https://music.yandex.ua/search?text=' + $scope.artist.replace(' ', '%20') + '%20%E2%80%93%20' + album.replace(' ', '%20') + "&type=albums";
                },
                yandex_img: "/images/yandex_" + dataService.lang + ".png"
              }
            }, 500);
          } else {
            dataService.validationBad();
          }
        },
        function (response, status) {
          console.log('-getTopAlbums\n' + status + '\n' + print_r(response.data));
          dataService.validationBad();
        });

    }])