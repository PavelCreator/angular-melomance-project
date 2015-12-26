'use strict';

angular.module('cookieSvc', [])
  .service('cookieService', ["$rootScope", "$stateParams", "$cookies", function ($rootScope,$stateParams,$cookies) {
    var vm = this;

    vm.getLang = function(){
      return $cookies.get('lang');
    };
    vm.setLang = function(lang){
      $cookies.put('lang', lang);
    };

    vm.getLib = function () {
      return $cookies.get('lib');
    };
    vm.setLib = function (lib) {
      $cookies.put('lib', lib);
    };
    
  }]);