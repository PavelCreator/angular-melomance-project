'use strict';

angular.module('artistInfoCtrl', [])

  .controller('artistInfoController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "$timeout", function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, $timeout) {

    dataService.dataBackupA();

    $scope.limit = dataService.getLimit();
    $scope.artist = {
      'name':$stateParams.artist.replace('%2F', '/'),
      'info':'',
      'image':''
    }

    parserLastFm.getArtistInfo($stateParams.artist)
      .then(function (response, status) {
        dataService.validationGood();
        var artistInfo = x2js.xml_str2json(response.data);

        if (artistInfo.lfm) {
          var bio = '';
          if (artistInfo.lfm.artist.bio.content['__text']) {
            var arr = artistInfo.lfm.artist.bio.content['__text'];
            arr.forEach(function (item, i) {
              bio += item;
            });
          } else {
            bio = artistInfo.lfm.artist.bio.content;
          }

          $scope.artist.info = $sce.trustAsHtml(bio);
          $scope.artist.tags = artistInfo.lfm.artist.tags.tag;
          $scope.artist.image = artistInfo.lfm.artist.image[3]['__text'];
          $timeout(function () {
            $scope.contentIsReady = true;
          }, 500);
        }else{
          dataService.validationBad();
        }
      },
      function (response, status) {
        console.log('-getArtistInfo\n' + status + '\n' + print_r(response.data));
        dataService.validationBad();
      })

  }])