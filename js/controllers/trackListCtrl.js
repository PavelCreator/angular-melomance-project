'use strict';

angular.module('bestSongsCtrl', [])

  .controller('bestSongsController', ["growl", "$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "$timeout",
    function (growl, $rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, $timeout) {

    dataService.dataBackupAL();
    $scope.artist = $stateParams.artist.replace('%2F', '/');

    $scope.media = dataService.mediaSongs;
    $scope.mediaImg = {
      vk_img: "/images/vk_" + dataService.lang + ".png",
      yandex_img: "/images/yandex_" + dataService.lang + ".png"
    }

    $scope.copyToClipboard = function(text){
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          growl.success('SONG_CLIPBOARD',{ttl: 3000,disableCloseButton: true});
        } catch (err) {
          growl.error('ERROR',{ttl: 3000,disableCloseButton: true});
        }
        document.body.removeChild(textArea);
    }

    parserLastFm.getTopTracksByArtist($stateParams.artist, $stateParams.limit)
      .then(function (response, status) {
        dataService.validationGood();
        var tracks = x2js.xml_str2json(response.data);
        if (angular.isDefined(tracks.lfm)) {
          $scope.tracks = tracks.lfm.toptracks.track;
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
      });

  }])