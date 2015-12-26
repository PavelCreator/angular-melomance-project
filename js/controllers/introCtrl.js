'use strict';

angular.module('introCtrl', [])

  .controller('introController', ["$rootScope", "parserLastFm", "$scope", "$sce", "$stateParams", "dataService", "$timeout", "$state",
    function ($rootScope, parserLastFm, $scope, $sce, $stateParams, dataService, $timeout, $state) {

      $rootScope.intro = true;
      if ($state.current.controller == 'introController'){
        $timeout(function () {
          $rootScope.introShow = true;
        }, 1000)
      }

      $timeout(function () {
        $scope.lang = dataService.lang;
      }, 1000)

      $scope.toSite = function () {
        $rootScope.introShow = false;
        $timeout(function () {
          $rootScope.intro = false;
          $state.go("bestSongs", {
            artist: dataService.artist,
            limit: dataService.limit
          });
        }, 500)
      }

      $scope.startDemo = function () {
        $rootScope.introShow = false;
        $timeout(function () {
          $rootScope.intro = false;
          $state.go("bestSongs", {
            artist: dataService.artist,
            limit: dataService.limit
          });
          $timeout(function () {
            $rootScope.$broadcast('howToUse');
          }, 1500)
        }, 500)
      }

      $scope.changeLanguage = function(language){
        $scope.lang = language;
        $rootScope.$broadcast('changeLanguage', {
          lang: language
        });
      }

    }])