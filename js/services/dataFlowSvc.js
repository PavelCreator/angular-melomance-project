'use strict';

angular.module('dataFlowSvc', [])
  .service('dataFlowService', ["parserLastFm", "$stateParams", "dataService", "$q", function (parserLastFm, $stateParams, dataService, $q) {
    var vm = this;
    vm.bestSongs = function (artist,limit) {
      var deferred = $q.defer();
      parserLastFm.getTopTracksByArtist(artist, limit)
        .then(function (response, status) {
          dataService.validationGood();
          var tracks = x2js.xml_str2json(response.data);
          var trackInJson = tracks.lfm.toptracks.track;
          deferred.resolve(trackInJson)
        },
        function (response, status) {
          console.log('-getTopTracks\n' + status + '\n' + print_r(response.data));
          dataService.validationBad();
          deferred.reject(response, status);
        });
      return deferred.promise;
    }
  }]);