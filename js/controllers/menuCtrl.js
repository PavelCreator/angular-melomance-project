'use strict';

angular.module('menuCtrl', ['ui.bootstrap', 'ui-rangeSlider'])

  .controller('menuController', ["$scope", "$rootScope", "dataService", "$state", "$translate", "$timeout", "growl",
    function ($scope, $rootScope, dataService, $state, $translate, $timeout, growl) {

      setTimeout(function () {
        dataService.setMenuParams();
      }, 500);

      $rootScope.$on('setMenuParams', function (event, data) {

        $scope.artist = data.artist.replace('%2F', '/');
        $scope.genre = data.genre;
        $scope.limit = data.limit;
        $scope.changeLanguage(data.lang, "start");
        $scope.switchLibrary(data.lib);

        $scope.media = {
          vk: "http://vk.com/audio?performer=1&q=" + data.artist.replace(" ", "%20"),
          yandex: "https://music.yandex.ru/search?text=" + data.artist.replace(" ", "%20") + "&type=tracks",
          youtube: "https://www.youtube.com/results?search_query=" + data.artist.replace(" ", "+"),
          wiki: "http://" + data.lang + ".wikipedia.org/wiki/" + data.artist.replace(" ", "_"),
          vk_img: "/images/vk_" + data.lang + ".png",
          yandex_img: "/images/yandex_" + data.lang + ".png"
        }
      });

      this.setLimit = function (limit) {
        $state.go($state.current.name, {
          artist: $scope.artist,
          limit: $scope.limit
        });
      }

      $scope.renewPicture = function (hard) {
        var event = function () {
          $state.go($state.current.name, {
            artist: $scope.artist,
            limit: $scope.limit,
            genre: $scope.genre
          }, {reload: true});
        };
        if (angular.isDefined(hard)) {
          event();
        } else {
          if ((
            ($scope.artist !== dataService.getArtist()) ||
            ($scope.limit !== dataService.getLimit()) ||
            ($scope.genre !== dataService.getGenre())) &&
            ($scope.artist !== "") &&
            ($scope.limit !== "") &&
            ($scope.genre !== "")
          ) {
            event();
          }
        }
      }

      //SWITCHERS

      $rootScope.$on('changeLanguage', function (event, data) {
        $scope.changeLanguage(data.lang);
      });

      $scope.changeLanguage = function (lang, start) {
        dataService.langBackup(lang);
        $scope.lang = lang;
        $translate.use(lang);
        if (!angular.isDefined(start)) {
          $scope.media.vk_img = "/images/vk_" + lang + ".png";
          $scope.media.yandex_img = "/images/yandex_" + lang + ".png";
          $scope.renewPicture('hard');
        }
      }
      $scope.switchLibrary = function (lib) {

        if (($state.current.name == 'libArtists') && (lib == 'lastfm')) {
          $state.go("topArtists", {});
          return false;
        }
        ;
        if (($state.current.name == 'libGenres') && (lib == 'lastfm')) {
          $state.go("topGenres", {});
          return false;
        }
        ;
        if (($state.current.name == 'topArtists') && (lib == 'library')) {
          $state.go("libArtists", {});
          return false;
        }
        ;
        if (($state.current.name == 'topGenres') && (lib == 'library')) {
          $state.go("libGenres", {});
          return false;
        }
        ;

        dataService.libBackup(lib);
        $scope.lib = lib;
      }

      //RANDOM
      $scope.randomArtist = function () {
        $state.go('bestSongs', {
          artist: dataService.random('artist'),
          limit: $scope.limit,
          genre: $scope.genre
        });
      }
      $scope.randomGenre = function () {
        $state.go('genreTopArtists', {
          artist: $scope.artist,
          limit: $scope.limit,
          genre: dataService.random('genre')
        });
      }

      $scope.delayMin = 50;
      $scope.delay = 100;


      /******************************************************************/
      /* ************************ HOW_TO_USE ************************** */
      /******************************************************************/

      $scope.howToUseOnPlay = false;
      var resetDemo = false;

      var ch = function () {
        if ($scope.howToUseOnPlay == false) {
          console.log("qazwsx");
          $(".popover").addClass('dni');
        }
      }
      var pp = function (selector, text, placement, time) {
        $timeout(function () {
          $(selector).popover({content: text, placement: placement});
          $(selector).popover('show');
          $timeout(function () {
            $(selector).popover('destroy');
          }, time)
        }, 200)
      }


      $scope.howToUse = function () {
        $scope.howToUseOnPlay = true;

        var lang = dataService.lang;
        var text = {};
        var keyEnterDelay = 200;
        $(".popover").removeClass('dn');

        chooseArtist();

        function chooseArtist() {
          switch (lang) {
            case 'en':
              text = {
                f0: 'You can stop the demo at any time',
                f01: 'And change the playback speed',
                f1: 'Enter the name of the artist or band',
                f2: 'Press "Enter" or',
                f3: 'click this button'
              };
              break;

            case 'ru':
              text = {
                f0: 'Вы можете остановить демо в любой момент',
                f01: 'И изменить скорость воспроизведения',
                f1: 'Введите имя исполнителя или группы',
                f2: 'Нажмите "Enter" или',
                f3: 'на эту кнопку'
              };
              break;
          }

          $timeout(function () {
            pp('#stop-demo', text.f0, "bottom", 2000 / $scope.delay / 0.009);
            $timeout(function () {
              pp('#demo-slider', text.f01, "bottom", 1500 / $scope.delay / 0.009);
              $timeout(function () {
                $("#artist-input").addClass('focused');
                $('#artist-input').popover({content: text.f1, placement: "bottom"});
                $('#artist-input').popover('show');
                $timeout(function () {
                  ch();
                  if (!$scope.howToUseOnPlay) return false;
                  $scope.artist = "";
                  $timeout(function () {
                    ch();
                    if (!$scope.howToUseOnPlay) return false;
                    $scope.artist = "P";
                    $timeout(function () {
                      ch();
                      if (!$scope.howToUseOnPlay) return false;
                      $scope.artist = "Pi";
                      $timeout(function () {
                        ch();
                        if (!$scope.howToUseOnPlay) return false;
                        $scope.artist = "Pin";
                        $timeout(function () {
                          ch();
                          if (!$scope.howToUseOnPlay) return false;
                          $scope.artist = "Pink";
                          $timeout(function () {
                            ch();
                            if (!$scope.howToUseOnPlay) return false;
                            $scope.artist = "Pink ";
                            $timeout(function () {
                              ch();
                              if (!$scope.howToUseOnPlay) return false;
                              $scope.artist = "Pink F";
                              $timeout(function () {
                                ch();
                                if (!$scope.howToUseOnPlay) return false;
                                $scope.artist = "Pink Fl";
                                $timeout(function () {
                                  ch();
                                  if (!$scope.howToUseOnPlay) return false;
                                  $scope.artist = "Pink Flo";
                                  $timeout(function () {
                                    ch();
                                    if (!$scope.howToUseOnPlay) return false;
                                    $scope.artist = "Pink Floy";
                                    $timeout(function () {
                                      ch();
                                      if (!$scope.howToUseOnPlay) return false;
                                      $scope.artist = "Pink Floyd";
                                      $('#artist-input').popover('destroy');
                                      $timeout(function () {
                                        ch();
                                        if (!$scope.howToUseOnPlay) return false;
                                        $('#artist-input').popover({content: text.f2, placement: "bottom"});
                                        $('#artist-input').popover('show');
                                        $timeout(function () {
                                          ch();
                                          if (!$scope.howToUseOnPlay) return false;
                                          $('#artist-input').popover('destroy');
                                          $('#artist-input-button').popover({content: text.f3, placement: "bottom"});
                                          $('#artist-input-button').popover('show');
                                          $timeout(function () {
                                            ch();
                                            if (!$scope.howToUseOnPlay) return false;
                                            $('#artist-input-button').addClass('btn-cool-hover');
                                            $timeout(function () {
                                              ch();
                                              if (!$scope.howToUseOnPlay) return false;
                                              $('#artist-input-button').addClass('btn-cool-active');
                                              $('#artist-input-button').popover('destroy');
                                              $timeout(function () {
                                                ch();
                                                if (!$scope.howToUseOnPlay) return false;
                                                $('#artist-input-button').removeClass('btn-cool-hover');
                                                $('#artist-input-button').removeClass('btn-cool-active');
                                                $("#artist-input").removeClass('focused');
                                                $state.go("bestSongs", {
                                                  artist: $scope.artist,
                                                  limit: $scope.limit
                                                });
                                                showBestSongs();
                                              }, 100 / $scope.delay / 0.009)
                                            }, 200 / $scope.delay / 0.009)
                                          }, 1200 / $scope.delay / 0.009)
                                        }, 1200 / $scope.delay / 0.009);
                                      }, keyEnterDelay);
                                    }, keyEnterDelay);
                                  }, keyEnterDelay);
                                }, keyEnterDelay);
                              }, keyEnterDelay);
                            }, keyEnterDelay);
                          }, keyEnterDelay);
                        }, keyEnterDelay);
                      }, keyEnterDelay);
                    }, keyEnterDelay);
                  }, keyEnterDelay);
                }, 500 / $scope.delay / 0.009);
              }, 2000 / $scope.delay / 0.009)
            }, 2500)
          }, 500 / $scope.delay / 0.009)
        }

        function showBestSongs() {
          switch (lang) {
            case 'en':
              text = {
                bs1: 'Before you are presented the most popular songs',
                bs2: 'Each of these songs, you can',
                bs3: 'listen online on "vk.com"',
                bs4: 'or on "Yandex.Music"',
                bs5: 'And also watch the clip to the song on Youtube',
                bs6: 'For convenience, it is possible to quickly copy the name of the song to the clipboard',
                bs7: 'Now we click here',
              };
              break;

            case 'ru':
              text = {
                bs1: 'И вот, перед вами самые популярные песни',
                bs2: 'Каждую из этих песен вы можете',
                bs3: 'послушать онлайн "Вконтакте"',
                bs4: 'или на "Яндекс.Музыка"',
                bs5: 'А также посмотреть клип к песне на Youtube',
                bs6: 'Для удобства есть возможность скопировать название песни в буфер обмена',
                bs7: 'Сейчас мы кликаем сюда'
              };
              break;
          }

          $timeout(function () {
            ch();
            if (!$scope.howToUseOnPlay) return false;
            pp('#best-songs-table', text.bs1, "top", 2500 / $scope.delay / 0.009);

            $timeout(function () {
              ch();
              if (!$scope.howToUseOnPlay) return false;
              pp('#best-songs-table tbody tr:first-child td:eq(1) a', text.bs2, "top", 1500 / $scope.delay / 0.009);
              $timeout(function () {
                ch();
                if (!$scope.howToUseOnPlay) return false;
                pp('#best-songs-table tbody tr:first-child td:eq(4) a:eq(0)', text.bs3, "top", 2000 / $scope.delay / 0.009);
                $("#best-songs-table tbody tr:first-child td:eq(4) a:eq(0) img").addClass('grayscale-hover');
                $timeout(function () {
                  ch();
                  if (!$scope.howToUseOnPlay) return false;
                  $("#best-songs-table tbody tr:first-child td:eq(4) a:eq(0) img").removeClass('grayscale-hover');
                  pp('#best-songs-table tbody tr:first-child td:eq(4) a:eq(1)', text.bs4, "top", 2000 / $scope.delay / 0.009);
                  $("#best-songs-table tbody tr:first-child td:eq(4) a:eq(1) img").addClass('grayscale-hover');
                  $timeout(function () {
                    ch();
                    if (!$scope.howToUseOnPlay) return false;
                    $("#best-songs-table tbody tr:first-child td:eq(4) a:eq(1) img").removeClass('grayscale-hover');
                    pp('#best-songs-table tbody tr:first-child td:eq(5) a', text.bs5, "top", 3000 / $scope.delay / 0.009)
                    $("#best-songs-table tbody tr:first-child td:eq(5) a img").addClass('grayscale-hover');
                    $timeout(function () {
                      ch();
                      if (!$scope.howToUseOnPlay) return false;
                      $("#best-songs-table tbody tr:first-child td:eq(5) a img").removeClass('grayscale-hover');
                      pp('#best-songs-table tbody tr:first-child td:eq(1) i', text.bs6, "top", 3600 / $scope.delay / 0.009);
                      $("#best-songs-table tbody tr:first-child td:eq(1) i").addClass('copy-icon-hover');
                      $timeout(function () {
                        ch();
                        if (!$scope.howToUseOnPlay) return false;
                        $("#best-songs-table tbody tr:first-child td:eq(1) i").removeClass('copy-icon-hover');
                        pp('#best-albums-button', text.bs7, "bottom", 1500 / $scope.delay / 0.009);
                        $timeout(function () {
                          ch();
                          if (!$scope.howToUseOnPlay) return false;
                          $("#best-albums-button").addClass('btn-primary-hover');
                          $timeout(function () {
                            ch();
                            if (!$scope.howToUseOnPlay) return false;
                            $("#best-albums-button").addClass('btn-primary-active');
                            $timeout(function () {
                              ch();
                              if (!$scope.howToUseOnPlay) return false;
                              $("#best-albums-button").removeClass('btn-primary-hover');
                              $("#best-albums-button").removeClass('btn-primary-active');
                              $state.go("bestAlbums", {
                                artist: $scope.artist,
                                limit: $scope.limit
                              });
                              showBestAlbums();
                            }, 100 / $scope.delay / 0.009);
                          }, 200 / $scope.delay / 0.009);
                        }, 1500 / $scope.delay / 0.009);
                      }, 3600 / $scope.delay / 0.009);
                    }, 3000 / $scope.delay / 0.009);
                  }, 2000 / $scope.delay / 0.009);
                }, 2000 / $scope.delay / 0.009);
              }, 1500 / $scope.delay / 0.009);
            }, 3000);
          }, 800 / $scope.delay / 0.009)
        }

        function showBestAlbums() {
          switch (lang) {
            case 'en':
              text = {
                ba1: 'Before you are the best Pink Floyd albums',
                ba2: 'Click on the album',
                ba3: 'you can see album information, its cover',
                ba4: 'it\'s tracklist',
                ba5: 'We can listen to the the whole album on Yandex.Music',
                ba6: 'and also to find similar artists by the album genre',
                ba7: 'Next is the more interesting!',
              };
              break;

            case 'ru':
              text = {
                ba1: 'Перед вами лучшие альбомы Pink Floyd',
                ba2: 'Кликнем на альбом',
                ba3: 'кроме информации о альбоме, его обложки',
                ba4: 'и треклиста ',
                ba5: 'мы можем послушать альбом целиком на Яндекс.Музыка',
                ba6: 'а также найти по стилю альбома похожих исполнителей',
                ba7: 'Дальше - интереснее!'
              };
              break;
          }

          $timeout(function () {
            ch();
            if (!$scope.howToUseOnPlay) return false;
            pp('#best-albums-table-head', text.ba1, "top", 2500 / $scope.delay / 0.009);
            $timeout(function () {
              ch();
              if (!$scope.howToUseOnPlay) return false;
              pp('.album_1 td:eq(2) a', text.ba2, "top", 1500 / $scope.delay / 0.009);
              $timeout(function () {
                ch();
                if (!$scope.howToUseOnPlay) return false;
                $(".album_1 td:eq(2) a").addClass('a-hover');
                $timeout(function () {
                  ch();
                  if (!$scope.howToUseOnPlay) return false;
                  $(".album_1 td:eq(2) a").removeClass('a-hover');
                  $rootScope.$broadcast('openTheWall');
                  $timeout(function () {
                    ch();
                    if (!$scope.howToUseOnPlay) return false;
                    $('html,body').animate({scrollTop: $(".album_1").offset().top}, "slow");
                    $timeout(function () {
                      ch();
                      if (!$scope.howToUseOnPlay) return false;
                      pp('.album_1+tr td h2 span', text.ba3, "right", 2500 / $scope.delay / 0.009);
                      $timeout(function () {
                        ch();
                        if (!$scope.howToUseOnPlay) return false;
                        $('html,body').animate({scrollTop: $(".album_1+tr td table").offset().top}, "slow");
                        $timeout(function () {
                          ch();
                          if (!$scope.howToUseOnPlay) return false;
                          pp('.album_1+tr td table caption span', text.ba4, "right", 2500 / $scope.delay / 0.009);
                          $timeout(function () {
                            ch();
                            if (!$scope.howToUseOnPlay) return false;
                            $('html,body').animate({scrollTop: $(".album_1").offset().top}, 1000);
                            $timeout(function () {
                              ch();
                              if (!$scope.howToUseOnPlay) return false;
                              pp('.album_1+tr td .media_in_menu', text.ba5, "right", 3000 / $scope.delay / 0.009);
                              $timeout(function () {
                                ch();
                                if (!$scope.howToUseOnPlay) return false;
                                $('html,body').animate({scrollTop: $(".document-wrapper").offset().top}, 1000);
                                $timeout(function () {
                                  ch();
                                  if (!$scope.howToUseOnPlay) return false;
                                  pp('#similar-artists', text.ba7, "bottom", 1500 / $scope.delay / 0.009);
                                  $timeout(function () {
                                    ch();
                                    if (!$scope.howToUseOnPlay) return false;
                                    $("#similar-artists").addClass('btn-primary-hover');
                                    $timeout(function () {
                                      ch();
                                      if (!$scope.howToUseOnPlay) return false;
                                      $("#similar-artists").addClass('btn-primary-active');
                                      $timeout(function () {
                                        ch();
                                        if (!$scope.howToUseOnPlay) return false;
                                        $("#similar-artists").removeClass('btn-primary-hover');
                                        $("#similar-artists").removeClass('btn-primary-active');
                                        $state.go("similarArtists", {
                                          artist: $scope.artist,
                                          limit: $scope.limit
                                        });
                                        showSimilarArtists();
                                      }, 100 / $scope.delay / 0.009);
                                    }, 200 / $scope.delay / 0.009);
                                  }, 1500 / $scope.delay / 0.009);
                                }, 1000 / $scope.delay / 0.009);
                              }, 3000 / $scope.delay / 0.009);
                            }, 1000 / $scope.delay / 0.009);
                          }, 2500 / $scope.delay / 0.009);
                        }, 500 / $scope.delay / 0.009);
                      }, 2500 / $scope.delay / 0.009);
                    }, 500 / $scope.delay / 0.009);
                  }, 2000 / $scope.delay / 0.009);
                }, 150 / $scope.delay / 0.009);
              }, 1500 / $scope.delay / 0.009);
            }, 2500 / $scope.delay / 0.009);
          }, 800 / $scope.delay / 0.009)
        }

        function showSimilarArtists() {
          switch (lang) {
            case 'en':
              text = {
                si1: 'Before you are presented similar artists to Pink Floyd',
                si2: 'they are located on the degree of similarity',
                si3: 'You can one-click to go to any of them',
                si4: 'Cool!',
                si5: 'but that\'s not all :)',
                si6: 'We have realized also search by genres',
                si7: 'I choose one of the genres,',
                si8: 'I see the top performers of this genre',
                si9: 'Let\'s choose these guys :)',
                si10: 'Want to read a biography?'
              };
              break;

            case 'ru':
              text = {
                si1: 'Перед вами похожие на Pink Floyd исполнители',
                si2: 'расположены по степени сходства',
                si3: 'Вы можете одним кликом перейти на любого из них',
                si4: 'Круто!',
                si5: 'но это далеко не всё :)',
                si6: 'У нас реализован также поиск по стилям',
                si7: 'Я выбираю один из стилей,',
                si8: 'И вижу топ исполнителей по этому стилю',
                si9: 'Давайте выберем этих ребят :)',
                si10: 'Хотите почитать биографию?'
              };
              break;
          }

          $timeout(function () {
            ch();
            if (!$scope.howToUseOnPlay) return false;
            pp('#similar-artists-table-head', text.si1, "top", 2500 / $scope.delay / 0.009);
            $timeout(function () {
              ch();
              if (!$scope.howToUseOnPlay) return false;
              pp('#similar-artists-table-content tr:eq(0) td:eq(3) span', text.si2, "top", 2500 / $scope.delay / 0.009);
              $timeout(function () {
                ch();
                if (!$scope.howToUseOnPlay) return false;
                pp('#similar-artists-table-content tr:eq(0) td:eq(2) a', text.si3, "top", 2500 / $scope.delay / 0.009);
                $timeout(function () {
                  ch();
                  if (!$scope.howToUseOnPlay) return false;
                  $("#similar-artists-table-content tr:eq(0) td:eq(2) a").addClass('a-hover');
                  $timeout(function () {
                    ch();
                    if (!$scope.howToUseOnPlay) return false;
                    $("#similar-artists-table-content tr:eq(0) td:eq(2) a").removeClass('a-hover');
                    $state.go("similarArtists", {
                      artist: $("#similar-artists-table-content tr:eq(0) td:eq(2) a").html(),
                      limit: $scope.limit
                    });
                    $timeout(function () {
                      ch();
                      if (!$scope.howToUseOnPlay) return false;
                      pp('#best-songs-button', text.si4, "bottom", 1500 / $scope.delay / 0.009);
                      $timeout(function () {
                        ch();
                        if (!$scope.howToUseOnPlay) return false;
                        pp('#similar-artists-by-genre', text.si5, "bottom", 2000 / $scope.delay / 0.009);
                        $timeout(function () {
                          ch();
                          if (!$scope.howToUseOnPlay) return false;
                          $("#similar-artists-by-genre").addClass('btn-primary-hover');
                          $timeout(function () {
                            ch();
                            if (!$scope.howToUseOnPlay) return false;
                            $("#similar-artists-by-genre").addClass('btn-primary-active');
                            $timeout(function () {
                              ch();
                              if (!$scope.howToUseOnPlay) return false;
                              $("#similar-artists-by-genre").removeClass('btn-primary-hover');
                              $("#similar-artists-by-genre").removeClass('btn-primary-active');
                              $state.go("similarArtistsByGenres", {
                                artist: $scope.artist,
                                limit: $scope.limit
                              });
                              $timeout(function () {
                                ch();
                                if (!$scope.howToUseOnPlay) return false;
                                pp('.genre-repeater button[name="classic rock"]', text.si7, "top", 1500 / $scope.delay / 0.009);
                                $timeout(function () {
                                  ch();
                                  if (!$scope.howToUseOnPlay) return false;
                                  $('.genre-repeater button[name="classic rock"]').addClass('btn-primary-hover');
                                  $timeout(function () {
                                    ch();
                                    if (!$scope.howToUseOnPlay) return false;
                                    $('.genre-repeater button[name="classic rock"]').addClass('btn-primary-active');
                                    $timeout(function () {
                                      ch();
                                      if (!$scope.howToUseOnPlay) return false;
                                      $('.genre-repeater button[name="classic rock"]').removeClass('btn-primary-hover');
                                      $('.genre-repeater button[name="classic rock"]').removeClass('btn-primary-active');
                                      $rootScope.$broadcast('openClassicRock');
                                      $timeout(function () {
                                        ch();
                                        if (!$scope.howToUseOnPlay) return false;
                                        pp('#similar-artists-by-genre-table-content', text.si8, "top", 3000 / $scope.delay / 0.009);
                                        $timeout(function () {
                                          ch();
                                          if (!$scope.howToUseOnPlay) return false;
                                          pp('#similar-artists-by-genre-table-content tr:eq(0) td:eq(2) a', text.si9, "right", 2500 / $scope.delay / 0.009);
                                          $timeout(function () {
                                            ch();
                                            if (!$scope.howToUseOnPlay) return false;
                                            $('#similar-artists-by-genre-table-content tr:eq(0) td:eq(2) a').addClass('a-hover');
                                            $timeout(function () {
                                              ch();
                                              if (!$scope.howToUseOnPlay) return false;
                                              $('#similar-artists-by-genre-table-content tr:eq(0) td:eq(2) a').removeClass('a-hover');
                                              $state.go("similarArtists", {
                                                artist: $('#similar-artists-by-genre-table-content tr:eq(0) td:eq(2) a').html(),
                                                limit: $scope.limit
                                              });
                                              $timeout(function () {
                                                ch();
                                                if (!$scope.howToUseOnPlay) return false;
                                                pp('#biorgaphy-last-fm', text.si10, "bottom", 2500 / $scope.delay / 0.009);
                                                $timeout(function () {
                                                  ch();
                                                  if (!$scope.howToUseOnPlay) return false;
                                                  $("#biorgaphy-last-fm").addClass('btn-primary-hover');
                                                  $timeout(function () {
                                                    ch();
                                                    if (!$scope.howToUseOnPlay) return false;
                                                    $("#biorgaphy-last-fm").addClass('btn-primary-active');
                                                    $timeout(function () {
                                                      ch();
                                                      if (!$scope.howToUseOnPlay) return false;
                                                      $("#biorgaphy-last-fm").removeClass('btn-primary-hover');
                                                      $("#biorgaphy-last-fm").removeClass('btn-primary-active');
                                                      $state.go("artistInfoLastFm", {
                                                        artist: $scope.artist
                                                      });
                                                      showBioTopLibMedia();
                                                    }, 100 / $scope.delay / 0.009);
                                                  }, 200 / $scope.delay / 0.009);
                                                }, 2500 / $scope.delay / 0.009);
                                              }, 2500 / $scope.delay / 0.009);
                                            }, 100 / $scope.delay / 0.009);
                                          }, 2500 / $scope.delay / 0.009);
                                        }, 3000 / $scope.delay / 0.009);
                                      }, 1500 / $scope.delay / 0.009);
                                    }, 100 / $scope.delay / 0.009);
                                  }, 200 / $scope.delay / 0.009);
                                }, 1500 / $scope.delay / 0.009);
                              }, 2300 / $scope.delay / 0.009);
                            }, 100 / $scope.delay / 0.009);
                          }, 200 / $scope.delay / 0.009);
                        }, 2000 / $scope.delay / 0.009);
                      }, 1500 / $scope.delay / 0.009);
                    }, 2500 / $scope.delay / 0.009);
                  }, 100 / $scope.delay / 0.009);
                }, 2500 / $scope.delay / 0.009);
              }, 2500 / $scope.delay / 0.009);
            }, 2500 / $scope.delay / 0.009);
          }, 800 / $scope.delay / 0.009)
        }

        function showBioTopLibMedia() {
          switch (lang) {
            case 'en':
              text = {
                bi1: 'Easy!',
                bi2: 'If you are not satisfied with Last.fm biography',
                bi3: 'there is an alternative - Wikipedia',
                bi4: 'Also I tell you about this block',
                bi5: 'This is songs and videos search around the artist,',
                bi6: 'and not one song',
                bi7: 'Want to hear the most popular artists in the world?',
                bi8: 'You are welcome!',
                bi9: 'But that is not all',
                bi10: 'This is artists library, who gathered by creator of the site for 8 years'
              };
              break;

            case 'ru':
              text = {
                bi1: 'Легко!',
                bi2: 'Если вас не устраивает биография с Last.fm',
                bi3: 'есть альтернатива - Википедия',
                bi4: 'Также расскажу про этот блок',
                bi5: 'Это - поиск песен и клипов по всему исполнителю',
                bi6: 'а не по одной песне',
                bi7: 'Хотите послушать самых популярных исполнителей мира?',
                bi8: 'Пожалуйта!',
                bi9: 'Но это ещё не всё',
                bi10: 'Это - библиотека исполнителей, собранная за 8 лет создателем сайта'
              };
              break;
          }

          $timeout(function () {
            ch();
            if (!$scope.howToUseOnPlay) return false;
            pp('.artist-info-header-lastfm span.pp', text.bi1, "right", 2000 / $scope.delay / 0.009);
            $timeout(function () {
              ch();
              if (!$scope.howToUseOnPlay) return false;
              pp('#biorgaphy-last-fm', text.bi2, "bottom", 3000 / $scope.delay / 0.009);
              $timeout(function () {
                ch();
                if (!$scope.howToUseOnPlay) return false;
                pp('#biorgaphy-wiki', text.bi3, "bottom", 2500 / $scope.delay / 0.009);
                $timeout(function () {
                  ch();
                  if (!$scope.howToUseOnPlay) return false;
                  pp('#media-in-menu', text.bi4, "bottom", 2500 / $scope.delay / 0.009);
                  $timeout(function () {
                    ch();
                    if (!$scope.howToUseOnPlay) return false;
                    pp('#media-in-menu', text.bi5, "bottom", 3000 / $scope.delay / 0.009);
                    $timeout(function () {
                      ch();
                      if (!$scope.howToUseOnPlay) return false;
                      pp('#media-in-menu', text.bi6, "bottom", 2000 / $scope.delay / 0.009);
                      $timeout(function () {
                        ch();
                        if (!$scope.howToUseOnPlay) return false;
                        pp('#top-artists-button', text.bi7, "bottom", 3300 / $scope.delay / 0.009);
                        $timeout(function () {
                          ch();
                          if (!$scope.howToUseOnPlay) return false;
                          $("#top-artists-button").addClass('btn-primary-hover');
                          $timeout(function () {
                            ch();
                            if (!$scope.howToUseOnPlay) return false;
                            $("#top-artists-button").addClass('btn-primary-active');
                            $timeout(function () {
                              ch();
                              if (!$scope.howToUseOnPlay) return false;
                              $("#top-artists-button").removeClass('btn-primary-hover');
                              $("#top-artists-button").removeClass('btn-primary-active');
                              $state.go("topArtists");
                              $timeout(function () {
                                ch();
                                if (!$scope.howToUseOnPlay) return false;
                                pp('h2 span', text.bi8, "right", 3000 / $scope.delay / 0.009);
                                $timeout(function () {
                                  ch();
                                  if (!$scope.howToUseOnPlay) return false;
                                  pp('#lib-artists-button', text.bi9, "bottom", 2500 / $scope.delay / 0.009);
                                  $timeout(function () {
                                    ch();
                                    if (!$scope.howToUseOnPlay) return false;
                                    $("#lib-artists-button").addClass('btn-primary-hover');
                                    $timeout(function () {
                                      ch();
                                      if (!$scope.howToUseOnPlay) return false;
                                      $("#lib-artists-button").addClass('btn-primary-active');
                                      $timeout(function () {
                                        ch();
                                        if (!$scope.howToUseOnPlay) return false;
                                        $("#lib-artists-button").removeClass('btn-primary-hover');
                                        $("#lib-artists-button").removeClass('btn-primary-active');
                                        $state.go("libArtists");
                                        $timeout(function () {
                                          ch();
                                          if (!$scope.howToUseOnPlay) return false;
                                          pp('h2 span', text.bi10, "right", 4000 / $scope.delay / 0.009);
                                          $timeout(function () {
                                            ch();
                                            if (!$scope.howToUseOnPlay) return false;
                                            showRandomAndGenres();
                                          }, 4500 / $scope.delay / 0.009);
                                        }, 4000 / $scope.delay / 0.009);
                                      }, 100 / $scope.delay / 0.009);
                                    }, 200 / $scope.delay / 0.009);
                                  }, 2500 / $scope.delay / 0.009);
                                }, 3000 / $scope.delay / 0.009);
                              }, 2000 / $scope.delay / 0.009);
                            }, 100 / $scope.delay / 0.009);
                          }, 200 / $scope.delay / 0.009);
                        }, 3300 / $scope.delay / 0.009);
                      }, 2000 / $scope.delay / 0.009);
                    }, 3200 / $scope.delay / 0.009);
                  }, 2700 / $scope.delay / 0.009);
                }, 2500 / $scope.delay / 0.009);
              }, 3000 / $scope.delay / 0.009);
            }, 2000 / $scope.delay / 0.009);
          }, 1500 / $scope.delay / 0.009)
        }

        function showRandomAndGenres() {
          switch (lang) {
            case 'en':
              text = {
                ge1: 'You can also select a random artist',
                ge2: 'The data for the list of "Random" switched here',
                ge3: 'top Last.fm',
                ge4: 'or library',
                ge5: 'Let\'s take a random genre',
                ge6: 'Now we are in the "Genre" mode',
                ge7: 'The genre can be found manually',
                ge8: 'or choose from top Last.fm',
                ge9: 'or library',
                ge10: 'To return to the artist, you can press this button',
                ge11: 'That\'s all, enjoy Melomance :)'
              };
              break;

            case 'ru':
              text = {
                ge1: 'Также можно выбрать случайного исполнителя',
                ge2: 'Данные для списка "Случайно" переключаются тут',
                ge3: 'топ Last.fm',
                ge4: 'или библиотека',
                ge5: 'Выберем случайный стиль',
                ge6: 'Сейчас мы в режиме стиля',
                ge7: 'Cтиль можно вбить вручную',
                ge8: 'Выбрать из топа Last.fm',
                ge9: 'или библиотеки',
                ge10: 'Вернуться в режим исполнителя можно нажав эту кнопку',
                ge11: 'На этом всё, приятного использования :)'
              };
              break;
          }

          pp('#random-artist-button', text.ge1, "bottom", 2500 / $scope.delay / 0.009);
          $timeout(function () {
            ch();
            if (!$scope.howToUseOnPlay) return false;
            $("#random-artist-button").addClass('btn-cool-hover');
            $timeout(function () {
              ch();
              if (!$scope.howToUseOnPlay) return false;
              $("#random-artist-button").addClass('btn-cool-active');
              $timeout(function () {
                ch();
                if (!$scope.howToUseOnPlay) return false;
                $("#random-artist-button").removeClass('btn-cool-hover');
                $("#random-artist-button").removeClass('btn-cool-active');
                $scope.randomArtist();
                $timeout(function () {
                  ch();
                  if (!$scope.howToUseOnPlay) return false;
                  pp('#switch-wrapper', text.ge2, "top", 3000 / $scope.delay / 0.009);
                  $timeout(function () {
                    ch();
                    if (!$scope.howToUseOnPlay) return false;
                    pp('#switch-lastfm', text.ge3, "bottom", 1500 / $scope.delay / 0.009);
                    $timeout(function () {
                      ch();
                      if (!$scope.howToUseOnPlay) return false;
                      pp('#switch-library', text.ge4, "bottom", 1500 / $scope.delay / 0.009);
                      $timeout(function () {
                        ch();
                        if (!$scope.howToUseOnPlay) return false;
                        pp('#random-genre-button', text.ge5, "bottom", 1800 / $scope.delay / 0.009);
                        $timeout(function () {
                          ch();
                          if (!$scope.howToUseOnPlay) return false;
                          $("#random-genre-button").addClass('btn-cool-hover');
                          $timeout(function () {
                            ch();
                            if (!$scope.howToUseOnPlay) return false;
                            $("#random-genre-button").addClass('btn-cool-active');
                            $timeout(function () {
                              ch();
                              if (!$scope.howToUseOnPlay) return false;
                              $("#random-genre-button").removeClass('btn-cool-active');
                              $("#random-genre-button").removeClass('btn-cool-active');
                              $scope.randomGenre();
                              $timeout(function () {
                                ch();
                                if (!$scope.howToUseOnPlay) return false;
                                pp('#genre-mode-button', text.ge6, "bottom", 1800 / $scope.delay / 0.009);
                                $timeout(function () {
                                  ch();
                                  if (!$scope.howToUseOnPlay) return false;
                                  $("#genre-input").addClass('focused');
                                  pp('#genre-input', text.ge7, "bottom", 3800 / $scope.delay / 0.009);
                                  $timeout(function () {
                                    ch();
                                    if (!$scope.howToUseOnPlay) return false;
                                    $scope.genre = "";
                                    $timeout(function () {
                                      ch();
                                      if (!$scope.howToUseOnPlay) return false;
                                      $scope.genre = "J";
                                      $timeout(function () {
                                        ch();
                                        if (!$scope.howToUseOnPlay) return false;
                                        $scope.genre = "Ja";
                                        $timeout(function () {
                                          ch();
                                          if (!$scope.howToUseOnPlay) return false;
                                          $scope.genre = "Jaz";
                                          $timeout(function () {
                                            ch();
                                            if (!$scope.howToUseOnPlay) return false;
                                            $scope.genre = "Jazz";
                                            $timeout(function () {
                                              ch();
                                              if (!$scope.howToUseOnPlay) return false;
                                              $("#genre-input-button").addClass('btn-cool-hover');
                                              $timeout(function () {
                                                ch();
                                                if (!$scope.howToUseOnPlay) return false;
                                                $("#genre-input-button").addClass('btn-cool-active');
                                                $timeout(function () {
                                                  ch();
                                                  if (!$scope.howToUseOnPlay) return false;
                                                  $("#genre-input").removeClass('focused');
                                                  $("#genre-input-button").removeClass('btn-cool-active');
                                                  $("#genre-input-button").removeClass('btn-cool-active');
                                                  $state.go("genreTopArtists", {
                                                    genre: $scope.genre,
                                                    limit: $scope.limit
                                                  });
                                                  $timeout(function () {
                                                    ch();
                                                    if (!$scope.howToUseOnPlay) return false;
                                                    pp('#top-genres-button', text.ge8, "bottom", 2000 / $scope.delay / 0.009);
                                                    $timeout(function () {
                                                      ch();
                                                      if (!$scope.howToUseOnPlay) return false;
                                                      $("#top-genres-button").addClass('btn-primary-hover');
                                                      $timeout(function () {
                                                        ch();
                                                        if (!$scope.howToUseOnPlay) return false;
                                                        $("#top-genres-button").addClass('btn-primary-active');
                                                        $timeout(function () {
                                                          ch();
                                                          if (!$scope.howToUseOnPlay) return false;
                                                          $("#top-genres-button").removeClass('btn-primary-hover');
                                                          $("#top-genres-button").removeClass('btn-primary-active');
                                                          $state.go("topGenres");
                                                          $timeout(function () {
                                                            ch();
                                                            if (!$scope.howToUseOnPlay) return false;
                                                            pp('#lib-genres-button', text.ge9, "bottom", 1500 / $scope.delay / 0.009);
                                                            $timeout(function () {
                                                              ch();
                                                              if (!$scope.howToUseOnPlay) return false;
                                                              $("#lib-genres-button").addClass('btn-primary-hover');
                                                              $timeout(function () {
                                                                ch();
                                                                if (!$scope.howToUseOnPlay) return false;
                                                                $("#lib-genres-button").addClass('btn-primary-active');
                                                                $timeout(function () {
                                                                  ch();
                                                                  if (!$scope.howToUseOnPlay) return false;
                                                                  $("#lib-genres-button").removeClass('btn-primary-hover');
                                                                  $("#lib-genres-button").removeClass('btn-primary-active');
                                                                  $state.go("libGenres");
                                                                  $timeout(function () {
                                                                    ch();
                                                                    if (!$scope.howToUseOnPlay) return false;
                                                                    pp('#artist-mode-button', text.ge10, "bottom", 3000 / $scope.delay / 0.009);
                                                                    $timeout(function () {
                                                                      ch();
                                                                      if (!$scope.howToUseOnPlay) return false;
                                                                      $("#artist-mode-button").addClass('btn-cool-hover');
                                                                      $timeout(function () {
                                                                        ch();
                                                                        if (!$scope.howToUseOnPlay) return false;
                                                                        $("#artist-mode-button").addClass('btn-cool-active');
                                                                        $timeout(function () {
                                                                          ch();
                                                                          if (!$scope.howToUseOnPlay) return false;
                                                                          $("#artist-mode-button").removeClass('btn-cool-hover');
                                                                          $("#artist-mode-button").removeClass('btn-cool-active');
                                                                          $state.go("bestSongs", {
                                                                            artist: $scope.artist,
                                                                            limit: $scope.limit
                                                                          });
                                                                          $timeout(function () {
                                                                            ch();
                                                                            if (!$scope.howToUseOnPlay) return false;
                                                                            pp('#artist-input', text.ge11, "bottom", 3500 / $scope.delay / 0.009);
                                                                            $timeout(function () {
                                                                              $scope.howToUseOnPlay = false;
                                                                            }, 3500 / $scope.delay / 0.009);
                                                                          }, 800 / $scope.delay / 0.009);
                                                                        }, 100 / $scope.delay / 0.009);
                                                                      }, 200 / $scope.delay / 0.009);
                                                                    }, 3000 / $scope.delay / 0.009);
                                                                  }, 800 / $scope.delay / 0.009);
                                                                }, 100 / $scope.delay / 0.009);
                                                              }, 200 / $scope.delay / 0.009);
                                                            }, 1500 / $scope.delay / 0.009);
                                                          }, 1500 / $scope.delay / 0.009);
                                                        }, 100 / $scope.delay / 0.009);
                                                      }, 200 / $scope.delay / 0.009);
                                                    }, 2000 / $scope.delay / 0.009);
                                                  }, 1500 / $scope.delay / 0.009);
                                                }, 100 / $scope.delay / 0.009);
                                              }, 200 / $scope.delay / 0.009);
                                            }, 500 / $scope.delay / 0.009);
                                          }, keyEnterDelay);
                                        }, keyEnterDelay);
                                      }, keyEnterDelay);
                                    }, keyEnterDelay);
                                  }, 2000 / $scope.delay / 0.009);
                                }, 1800 / $scope.delay / 0.009);
                              }, 1500 / $scope.delay / 0.009);
                            }, 100 / $scope.delay / 0.009);
                          }, 200 / $scope.delay / 0.009);
                        }, 1800 / $scope.delay / 0.009);
                      }, 1500 / $scope.delay / 0.009);
                    }, 1500 / $scope.delay / 0.009);
                  }, 3000 / $scope.delay / 0.009);
                }, 1500 / $scope.delay / 0.009);
              }, 100 / $scope.delay / 0.009);
            }, 200 / $scope.delay / 0.009);
          }, 2500 / $scope.delay / 0.009);
        }
      }

      $rootScope.$on('howToUse', function () {//прослушка события
        $scope.howToUse();
      });

      $(document).on("click", "#demo-blocker", function () {
        $("#stop-demo").removeClass("btn-default");
        $("#stop-demo").addClass("btn-danger");
        $timeout(function () {
          $("#stop-demo").removeClass("btn-danger");
          $("#stop-demo").addClass("btn-default");
          $timeout(function () {
            $("#stop-demo").removeClass("btn-default");
            $("#stop-demo").addClass("btn-danger");
            $timeout(function () {
              $("#stop-demo").removeClass("btn-danger");
              $("#stop-demo").addClass("btn-default");
            }, 200)
          }, 200)
        }, 200)
      });

    }])