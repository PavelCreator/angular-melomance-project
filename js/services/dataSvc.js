'use strict';

angular.module('dataSvc', [])
  .service('dataService', ["$http", "storageService", "$rootScope", "$stateParams", "cookieService", "$translate",
    function ($http, storageService, $rootScope, $stateParams, cookieService, $translate) {
      var vm = this;

      vm.getLibArtists = function () {
        return $http.get('/data/lib_artists.json');
      }

      vm.artistsArr = [
        'Muse', 'Frank Sinatra', 'Arctic Monkeys', 'Radiohead', 'David Guetta',
        'Daft Punk', 'Jamiroquai', 'Queen', 'Metallica', 'Pink Floyd',
        'Led Zeppelin', 'Madonna', 'Ludovico Einaudi', 'Rob Costlow', 'Beatles',
        'Black Sabbath', 'Bon Jovi', 'Depeche Mode', 'In Flames', 'Iron Maiden',
        'Johnny Cash', 'Kiss', 'Korn', 'Nickelback', 'Nirvana',
        'The Offspring', 'Rammstein', 'Scooter', 'Scorpions', 'The Prodigy',
        'Skrillex', 'Bob Marley', 'The 69 eyes', 'The Sisters Of Mercy',
        'Within Temptation', 'Lana Del Rey', 'Rihanna', 'Linkin Park', 'Eluveitie'
      ];
      vm.genreArr = [
        'rock', 'electronic', 'seen live', 'alternative', 'indie',
        'pop', 'female vocalists', 'metal', 'classic rock', 'alternative rock',
        'jazz', 'ambient', 'experimental', 'folk', 'indie rock',
        'punk', 'hard rock', 'instrumental', 'Hip-Hop', 'singer-songwriter',
        'dance', 'black metal', '80s', 'Progressive rock', 'british',
        'death metal', 'hardcore', 'heavy metal', 'soul', 'chillout',
        'electronica', 'Classical', 'industrial', 'blues', 'Soundtrack',
        'punk rock', 'rap', 'thrash metal', 'acoustic', 'psychedelic',
        '90s', 'metalcore', 'japanese', 'post-rock', 'piano',
        'german', 'Progressive metal', 'funk', 'new wave', 'trance',

      ];

      vm.random = function (param) {
        switch (param) {
          case 'artist':
            return vm.artistsArr[Math.floor(Math.random() * vm.artistsArr.length)];
            break;

          case 'genre':
            return vm.genreArr[Math.floor(Math.random() * vm.genreArr.length)];
            break;
        }
      }

      var lng = navigator.language || navigator.userLanguage;
      if (lng.indexOf('ru') != -1) {
        vm.lang = "ru";
      } else {
        vm.lang = "en";
      }

      vm.limit = 10;
      vm.artist = vm.random('artist');
      vm.genre = vm.random('genre');
      vm.lib = 'lastfm';

      vm.validationGood = function (artistName) {

        delete $rootScope.artistNotFound;
      };
      vm.validationBad = function () {

        $rootScope.artistNotFound = true;
      };

      //State BackUp
      vm.limitBackup = function () {
        if (!$stateParams.limit) {
          $stateParams.limit = vm.getLimit();
          $rootScope.limit = vm.getLimit();
        }
        else {
          $rootScope.limit = $stateParams.limit;
          vm.setLimit($stateParams.limit);
        }
      };
      vm.artistBackup = function () {
        if (!$stateParams.artist) {
          $stateParams.artist = vm.getArtist();
        }
        else {
          vm.setArtist($stateParams.artist);
        }
      };
      vm.genreBackup = function () {
        if (!$stateParams.genre) {
          $stateParams.genre = vm.getGenre();
        }
        else {
          vm.setGenre($stateParams.genre);
        }
      };
      vm.langBackup = function (lang) {
        vm.setLang(lang);
      }

      vm.libBackup = function (lib) {
        vm.setLib(lib);
      }

      vm.setMenuParams = function () {
        $rootScope.$broadcast('setMenuParams', {
          artist: vm.getArtist(),
          genre: vm.getGenre(),
          limit: vm.getLimit(),
          lang: vm.getLang(),
          lib: vm.getLib()
        });
      }

      vm.paramsBackupAndSet = function () {
        $rootScope.intro = false;
        $rootScope.introShow = false;
        vm.limitBackup();
        vm.artistBackup();
        vm.genreBackup();
        vm.setMenuParams();
      }
      vm.dataBackup = function (mode) {
        $rootScope.unBlockLimit = false;
        $rootScope.unBlockInputs = true;
        $rootScope.showArtist = false;
        $rootScope.showGenre = false;
        $rootScope.mode = mode;
        vm.getLang();
        vm.paramsBackupAndSet();
      }

      vm.dataBackupAL = function () {
        $rootScope.unBlockLimit = true;
        $rootScope.unBlockInputs = true;
        $rootScope.showArtist = true;
        $rootScope.showGenre = false;
        $rootScope.mode = "artist";
        vm.getLang();
        vm.paramsBackupAndSet();
      }
      vm.dataBackupGL = function () {
        $rootScope.unBlockLimit = true;
        $rootScope.unBlockInputs = true;
        $rootScope.mode = "genre";
        vm.getLang();
        vm.paramsBackupAndSet();
      }
      vm.dataBackupA = function () {
        $rootScope.unBlockLimit = false;
        $rootScope.unBlockInputs = true;
        $rootScope.mode = "artist";
        vm.paramsBackupAndSet();
      }

      vm.getLimit = function () {
        return vm.limit;
      };
      vm.setLimit = function (limit) {
        vm.limit = limit;
      };
      vm.getArtist = function () {
        return vm.artist;
      };
      vm.setArtist = function (artist) {
        vm.artist = artist;
      };
      vm.getGenre = function () {
        return vm.genre;
      };
      vm.setGenre = function (genre) {
        vm.genre = genre;
      };
      vm.getLang = function () {
        var cookieLang = cookieService.getLang();
        if (cookieLang) {
          vm.lang = cookieLang;
          $translate.use(cookieLang);
          return cookieLang;
        } else {
          return vm.lang;
        }
      };
      vm.setLang = function (lang) {
        if (vm.lang !== lang) {
          cookieService.setLang(lang);
          vm.lang = lang;
        }
      };

      vm.setLib = function (lib) {
        if (vm.lib !== lib) {
          cookieService.setLib(lib);
          vm.lib = lib;
          switch (lib) {
            case 'lastfm':
              var promiseObj = storageService.getStorage('/data/top_artists.json');
              promiseObj.then(function (value) {
                vm.artistsArr = [];
                for (var i in value) {
                  vm.artistsArr[i] = value[i]['name'];
                }
              });
              var promiseObj = storageService.getStorage('/data/top_genres.json');
              promiseObj.then(function (value) {
                vm.genreArr = []
                for (var i in value) {
                  vm.genreArr[i] = value[i]['name'];
                }
              });
              break;

            case 'library':
              var promiseObj = storageService.getStorage('/data/lib_artists.json');
              promiseObj.then(function (value) {
                vm.artistsArr = [];
                for (var i in value) {
                  vm.artistsArr[i] = value[i]['name'];
                }
              });
              var promiseObj = storageService.getStorage('/data/lib_genres.json');
              promiseObj.then(function (value) {
                vm.genreArr = []
                for (var i in value) {
                  vm.genreArr[i] = value[i]['name'];
                }
              });
              break;
          }
        }
      };

      vm.getLib = function () {
        var cookieLib = cookieService.getLib();
        var currentLib;
        if (cookieLib) {
          vm.lib = cookieLib;
          currentLib = cookieLib;
        } else {
          currentLib = vm.lib;
        }
        vm.setLib(currentLib);
        return currentLib;
      };

      vm.mediaSongs = {
        vk: function (artist, track) {
          return 'http://vk.com/audio?q=' + artist.replace(' ', '%20') + '%20%E2%80%93%20' + track.replace(' ', '%20');
        },
        yandex: function (artist, track) {
          return 'https://music.yandex.ua/search?text=' + artist.replace(' ', '%20') + '%20%E2%80%93%20' + track.replace(' ', '%20') + "&type=tracks";
        },
        youtube: function (artist, track) {
          return 'https://www.youtube.com/results?search_query=' + artist.replace(' ', '+') + '+-+' + track.replace(' ', '+');
        }
      };
      vm.mediaArtist = {
        vk: function (artist) {
          return "http://vk.com/audio?performer=1&q=" + artist.replace(" ", "%20");
        },
        yandex: function (artist) {
          return "https://music.yandex.ru/search?text=" + artist.replace(" ", "%20") + "&type=tracks";
        },
        youtube: function (artist) {
          return "https://www.youtube.com/results?search_query=" + artist.replace(" ", "+");
        },
        wiki: function (artist) {
          return "http://" + vm.lang + ".wikipedia.org/wiki/" + artist.replace(" ", "_");
        }
      }

    }]);