/******************************js/services/dataSvc.js******************************/
vm.counter = 0;

vm.counter++;
return vm.genreArr[vm.counter];
/******************************end_js/services/dataSvc.js******************************/



/******************************js/controllers/topGenresCtrl.js******************************/
    $scope.genresArr = [];
    var arr = [];

    function remove(data) {
      for (var i = 0; i < data.length; i++)
        for (var j = i + 1; j < data.length; j++)
          if (data[i] == data[j])
            data.splice(j, 1);
      return data;
    }

    for (var i = 0; i <= dataService.artistsArr.length; i++){
    for (var i = 0; i <= 5; i++){

      var artist = dataService.artistsArr[i];
        parserLastFm.getArtistInfo(dataService.artistsArr[i], dataService.lang)
          .then(function (response, status) {
            var artistInfo = x2js.xml_str2json(response.data);
            if (angular.isDefined(artistInfo.lfm)) {
              for (var j = 0; j <= artistInfo.lfm.artist.tags.tag.length; j++) {
                arr = arr.concat(artistInfo.lfm.artist.tags.tag[j].name);
                console.log(arr);
                remove(arr);
                $scope.genresArr = arr;
              }
            }
          });
    }
/******************************end_js/controllers/topGenresCtrl.js******************************/

/******************************js/services/storageSvc.js******************************/
    vm.demoArtistsLibrary = [
      '2Cellos',
      'Accept',
      'Adele',
      'Airbourne',
      'Akute',
      'Alai Oli',
      'Alezee',
      'Alim Zairov',
      'Alizbar',
      'Amatory',
      'Anathema',
      'Andy McKee',
      'Apocalyptica',
      'Arch Enemy',
      'Arctic Monkeys',
      'Bill Douglas',
      'Billy\'s Band',
      'Black Sabbath',
      'Blind Guardian',
      'Blood Stain Child',
      'Bloodhound Gang',
      'Bob Marley',
      'Bobby McFerrin',
      'Bon Jovi',
      'Boogie Belgique',
      'Bow Ever Down',
      'Brainstorm',
      'Brazzaville',
      'Bruno Bavota',
      'Burzum',
      'Callenish Circle',
      'Carcass',
      'Catharsis',
      'Chet Atkins',
      'Children of Bodom',
      'Chuck Berry',
      'Cinderella',
      'CKY',
      'Clan of Xymox',
      'Clannad',
      'Closterkeller',
      'Coldplay',
      'Coolio',
      'Cradle of Filth',
      'Crazy Juliet',
      'Crematory',
      'Crossfaith',
      'Cruachan',
      'Cyber Snake',
      'Daft Punk',
      'Daminika',
      'Dan Gibson\'s Solitudes',
      'Danny Wright',
      'Darkseed',
      'Dave Greening',
      'David Guetta',
      'David Lanz',
      'Dead Battery',
      'Death',
      'Deathstars',
      'Declan Flynn',
      'Depeche Mode',
      'Devil-May-Care',
      'Dimmu Borgir',
      'Distemper',
      'Disturbed',
      'Dope Stars Inc',
      'Dvar',
      'E.S.T',
      'Elton John',
      'Eluveitie',
      'Entwine',
      'Evanescence',
      'Evgeny Grinko',
      'Fatboy Slim',
      'Flesh Field',
      'Fleur',
      'Forgive-Me-Not',
      'Fox Amoore',
      'Frank Sinatra',
      'Future World Music',
      'Gandalf',
      'Ghoultown',
      'Giovanni Allevi',
      'Gorillaz',
      'Gorky Park',
      'Graveworm',
      'Green Day',
      'Greg Edmonson',
      'Gregorian',
      'Guano Apes',
      'Guns \'n\' Roses',
      'Haggard',
      'Hans Zimmer',
      'HIM',
      'Hugar',
      'Iced Earth',
      'Ikon',
      'Illidiance',
      'Ilya Beshevli',
      'Immortal',
      'In Flames',
      'Inferno',
      'Inkubus Sukkubus',
      'Iron Maiden',
      'Jacoo',
      'Jamie Dunlap',
      'Jamiroquai',
      'Jesper Kyd',
      'Jesse Cook',
      'Johnny Cash',
      'Judas Priest',
      'Kalmah',
      'Karunesh',
      'Kenio Fuke',
      'Kenny Wayne Shepherd',
      'Kevin Kern',
      'Kingdom Come',
      'Kiss',
      'Korn',
      'Korpiklaani',
      'Kreator',
      'KYPCK',
      'L.A. Guns',
      'Lacrimosa',
      'Lana Del Rey',
      'Lauge',
      'Led Zeppelin',
      'Libera',
      'Limp Bizkit',
      'Linkin Park',
      'London After Midnight',
      'Loreena McKennitt',
      'Louna',
      'Ludovico Einaudi',
      'Lumen',
      'Machinae Supremacy',
      'Madonna',
      'Manowar',
      'Mantus',
      'Marilyn Manson',
      'Masaaki Kishibe',
      'Max Raabe',
      'Megadeth',
      'Metallica',
      'MeYou',
      'Michele McLaughlin',
      'Misha Mishenko',
      'Moby',
      'Morbid Angel',
      'Morgenstern',
      'Muse',
      'Nickelback',
      'Nightwish',
      'Nirvana',
      'Noize MC',
      'NONSONS',
      'Offspring',
      'Oliver Shanti',
      'Omar Akram',
      'Otto A Totland',
      'Otto Dix',
      'Oystein Sevag',
      'Pantera',
      'Papa Roach',
      'Pendulum',
      'Peter Murphy',
      'Philippe Charron',
      'Pink Floyd',
      'Placebo',
      'Plazma',
      'Poets of the fall',
      'Pr, Mex',
      'Purple Fog Side',
      'Queen',
      'Radiohead',
      'Rage',
      'Rammstein',
      'Randy Montana',
      'Rob Costlow',
      'Rob Zombie',
      'Roberto Cacciapaglia',
      'Rodrigo y Gabriela',
      'Roman Rain',
      'Satarial',
      'Saturnus',
      'Scooter',
      'Scorpions',
      'Scotch',
      'Secret Garden',
      'Sentenced',
      'Septem Voices',
      'Septicflesh',
      'Sex Pistols',
      'Silent Partner',
      'Sivyj Yar',
      'Skeletal Family',
      'Skrillex',
      'Slash',
      'Slipknot',
      'Snap',
      'Spider Lilies',
      'Stanislav Artemyev',
      'Stone Sour',
      'Stuart Jones',
      'Sunsay',
      'System Of A Down',
      'Te Deum',
      'The 69 eyes',
      'The Blackout poems',
      'The Cardigans',
      'The Cranberries',
      'The Cruxshadows',
      'The Cure',
      'The Misfits',
      'the NIGHTCHILD',
      'the owl',
      'The Prodigy',
      'The Sisters Of Mercy',
      'Theatres Des Vampires',
      'Thomas Bergersen',
      'Trevor Something',
      'Twisted Sister',
      'Type O Negative',
      'Umbra Et Imago',
      'Unreal',
      'Van Canto',
      'Vicente Amigo',
      'Virgin Black',
      'Wardruna',
      'Whitetree',
      'Within Temptation',
      'XIII.Stoleti',
      'Yiruma',
      'Zdob Si Zdub',
      'Агата Кристи',
      'Аквариум',
      'Алена Виницкая',
      'Алиса',
      'Арда',
      'Ария',
      'Аркона',
      'Артерия',
      'Баста',
      'Би-2',
      'Братья Карамазовы',
      'Бумбокс',
      'Валентин Стрыкало',
      'Вася Обломов',
      'Вольная стая',
      'Воскресенье',
      'Гевал',
      'Глеб СамойлоFF & The MatriXX',
      'Гражданская оборона',
      'Григорий Лепс',
      'Дай Дарогу',
      'ДДТ',
      'Децл',
      'Дом Ветров',
      'Звери',
      'Иван Смирнов',
      'Иванов Александр',
      'Камаедзiца',
      'Карандаш',
      'Кино',
      'Кожаный олень',
      'Коллекция Дней',
      'Коматоzz',
      'Король и Шут',
      'Корсика',
      'КПД',
      'Красная плесень',
      'Красные Звезды',
      'Кукрыниксы',
      'Ландыши',
      'Легион',
      'Ленинград',
      'Лепреконсы',
      'Линда',
      'Лихолесье',
      'Любэ',
      'Ляпис Трубецкой',
      'Макс Корж',
      'Мастер',
      'Машина Времени',
      'Мельница',
      'Мертвые дельфины',
      'Многоточие',
      'Монгол Шуудан',
      'Наив',
      'Найк Борзов',
      'Наутилус Помпилус',
      'Невидь',
      'Нервы',
      'Новая модель',
      'Ноль',
      'Обiйми дощу',
      'Океан Ельзи',
      'Ольви',
      'Оркестр Че',
      'Пелагея',
      'Пикник',
      'Пилот',
      'Плач Еремии',
      'Приключения электроников',
      'Пурген',
      'Пятница',
      'Сварга',
      'Сектор Газа',
      'Сердце дурака',
      'Серебрянная свадьба',
      'Серые ангелы',
      'Серьга',
      'Скрябiн',
      'Слот',
      'Смысловые галюцинации',
      'Сплин',
      'Тiк',
      'Танцы минус',
      'Тараканы',
      'Тату',
      'Театр теней',
      'Телевизор',
      'Технология',
      'Тимур Муцураев',
      'Тостер',
      'Трофим',
      'Умбиликус',
      'Уставшее сердце',
      'Флiт',
      'Флип',
      'Харизма',
      'Чайф',
      'Чиж & Ко',
      'Элизиум',
      'Эпидемия'
    ];
    vm.demoGenreLibrary = [
      '70s',
      '80s',
      '90s',
      'a cappella',
      'acid jazz',
      'acoustic',
      'acoustic guitar',
      'alternative',
      'alternative metal',
      'alternative rock',
      'ambient',
      'ambient black metal',
      'anarcho punk',
      'aria family',
      'art',
      'art rock',
      'atmospheric',
      'atmospheric black metal',
      'atmospheric death metal',
      'australian',
      'Avant-Garde',
      'bard',
      'Belarusian',
      'belarusian rock',
      'belarussian',
      'big beat',
      'black metal',
      'blues',
      'blues rock',
      'Bossa Nova',
      'breakcore',
      'british',
      'britpop',
      'Brutal Death Metal',
      'cabaret',
      'Californian Punk',
      'Canadian',
      'cardiowave',
      'cello',
      'celtic',
      'Celtic Folk Metal',
      'celtic metal',
      'chanson',
      'chechen',
      'chill',
      'chillout',
      'chillstep',
      'choir',
      'choral',
      'classic',
      'classic rock',
      'Classical',
      'club',
      'comedy',
      'composer',
      'contemporary classical',
      'country',
      'covers',
      'creative commons',
      'croatian',
      'cyber black metal',
      'Cyber Metal',
      'Czech',
      'czech black metal',
      'dance',
      'dancehall',
      'dark',
      'dark ambient',
      'dark electro',
      'dark folk',
      'darkwave',
      'Death Doom Metal',
      'death metal',
      'death-doom metal',
      'deathrock',
      'decadence',
      'dnb',
      'Doom',
      'doom metal',
      'downtempo',
      'Drum and bass',
      'dub',
      'dubstep',
      'dutch',
      'easy listening',
      'ebm',
      'Ekb',
      'electro',
      'electro metal',
      'electro-industrial',
      'electronic',
      'electronica',
      'electropop',
      'electro-swing',
      'emo',
      'emocore',
      'epic',
      'epic metal',
      'ethereal',
      'ethnic',
      'eurodance',
      'experimental',
      'fantasy',
      'fantasy metal',
      'Feel',
      'Female fronted metal',
      'female vocalists',
      'fetish',
      'fingerstyle',
      'finnish',
      'Firefly',
      'Flamenco',
      'folk',
      'folk ambient',
      'folk metal',
      'folk rock',
      'folk-rock',
      'fun',
      'funk',
      'funky-groove',
      'funny',
      'Fusion',
      'futurepop',
      'Game Music',
      'game soundtrack',
      'genius',
      'german',
      'Glam Metal',
      'glam rock',
      'goregrind',
      'goth',
      'goth rock',
      'gothabilly',
      'Gothic',
      'gothic electro',
      'Gothic Metal',
      'Gothic Rock',
      'Greek',
      'gregorian',
      'grindcore',
      'groove metal',
      'Grunge',
      'guitar',
      'guitar virtuoso',
      'hair metal',
      'happy hardcore',
      'hard rock',
      'hardcore',
      'hardcore punk',
      'harp',
      'heavy metal',
      'hip hop',
      'Hip-Hop',
      'horror punk',
      'House',
      'humour',
      'indie',
      'indie pop',
      'indie rock',
      'industrial',
      'industrial metal',
      'industrial rock',
      'instrumental',
      'intelligent',
      'irish',
      'italian',
      'jamendo',
      'japanese',
      'jazz',
      'J-Metal',
      'Korean',
      'latin',
      'latvian',
      'LightWave',
      'Lo-Fi',
      'lounge',
      'Love',
      'Love Metal',
      'male vocalists',
      'medieval',
      'meditative',
      'melancholic',
      'melodic',
      'melodic black metal',
      'Melodic Death Metal',
      'melodic metal',
      'Melodic Power Metal',
      'melodic punk',
      'metal',
      'metalcore',
      'Middle Eastern',
      'minimalist',
      'modern classical',
      'modern country',
      'modern jazz',
      'Moldovan',
      'montana',
      'Mystic rock',
      'Nature',
      'NDH',
      'neo classical',
      'neoclassic',
      'neoclassical',
      'neofolk',
      'nerdcore',
      'Neue Deutsche Haerte',
      'new age',
      'new retro wave',
      'new wave',
      'nocturnal',
      'noise',
      'norwegian',
      'Norwegian Black Metal',
      'nsbm',
      'Nu Metal',
      'Nu-metal',
      'NWOBHM',
      'old school',
      'old school death metal',
      'oldies',
      'orchestral',
      'Pagan',
      'pagan black',
      'pagan folk',
      'pagan folk metal',
      'pagan metal',
      'pagan rock',
      'parody',
      'peaceful',
      'Phylosophic RAP',
      'piano',
      'polish',
      'pop',
      'pop punk',
      'pop rock',
      'Pop-punk',
      'Pop-Rock',
      'post black metal',
      'post-punk',
      'post-rock',
      'Power metal',
      'powernoise',
      'progressive death metal',
      'Progressive metal',
      'Progressive rock',
      'psychedelic',
      'Psychedelic Rock',
      'psychobilly',
      'punk',
      'punk rock',
      'Punk-Rock',
      'raggae',
      'rap',
      'rapcore',
      'Red Dirt',
      'reggae',
      'relax',
      'relaxing',
      'Retro',
      'rnb',
      'rock',
      'Rock and Roll',
      'rock n roll',
      'rockabilly',
      'rock-n-roll',
      'romantic',
      'roots reggae',
      'russian',
      'russian alternative',
      'Russian Black Metal',
      'russian chanson',
      'Russian Folk',
      'russian hip-hop',
      'russian metal',
      'Russian Pop',
      'russian punk',
      'russian rap',
      'russian reggae',
      'russian rock',
      'screamo',
      'seen live',
      'shaman',
      'sid metal',
      'singer-songwriter',
      'ska',
      'ska punk',
      'ska-punk',
      'slavonic pagan metal',
      'Sleep',
      'Sludge',
      'soft',
      'softrock',
      'soul',
      'Soundtrack',
      'space',
      'spanish',
      'spanish guitar',
      'speed metal',
      'swedish',
      'swing',
      'Symphonic Black Metal',
      'symphonic death metal',
      'symphonic metal',
      'Symphonic Rock',
      'synth goth',
      'synth pop',
      'synthpop',
      'Synth-Rock',
      'synthwave',
      'Technical Death Metal',
      'techno',
      'Texas Blues',
      'thrash metal',
      'Trailer Music',
      'trance',
      'Two Steps From Hell',
      'Ukrainian',
      'ukrainian punk-rock',
      'ukrainian rock',
      'vampires',
      'Vampiric Metal',
      'video game music',
      'viking metal',
      'vocal',
      'vocal jazz',
      'West Coast Rap',
      'western',
      'world',
      'worldbeat'
    ];
    vm.lastfmArtistsLibarary = [
      'Adele',
      'Justin Bieber',
      'Coldplay',
      'Drake',
      'The Weeknd',
      'Ellie Goulding',
      'Lana Del Rey',
      'Grimes',
      'Arctic Monkeys',
      'Radiohead',
      'Ed Sheeran',
      'Muse',
      'Major Lazer',
      'Rihanna',
      'Ariana Grande',
      'Calvin Harris',
      'Sia',
      'Red Hot Chili Peppers',
      'Florence + the Machine',
      'One Direction',
      'Disclosure',
      'Pink Floyd',
      'Queen',
      'Foo Fighters',
      'Selena Gomez',
      'Kanye West',
      'David Bowie',
      'Imagine Dragons',
      'Linkin Park',
      'Maroon 5',
      'Daft Punk',
      'Nirvana',
      'Avicii',
      'Tame Impala',
      'Metallica',
      'Beyonc?',
      'Sam Smith',
      'The Rolling Stones',
      'Eminem',
      'Demi Lovato',
      'Fall Out Boy',
      'David Guetta',
      'Led Zeppelin',
      'The Beatles',
      'The Killers',
      'alt-J',
      'Kendrick Lamar',
      'Michael Jackson',
      'Hozier',
      'The Cure',
      'Katy Perry',
      'Lady Gaga',
      'Gorillaz',
      'CHVRCHES',
      'The Black Keys',
      'Taylor Swift',
      'Green Day',
      'The xx',
      'Madonna',
      'System of a Down',
      'Arcade Fire',
      'U2',
      'Bob Dylan',
      '[unknown]',
      'Oasis',
      'Mumford & Sons',
      'Foals',
      'Bring Me the Horizon',
      'The Smiths',
      'Kygo',
      'The Strokes',
      'Sufjan Stevens',
      'Depeche Mode',
      'Robin Schulz',
      'The Neighbourhood',
      'Beach House',
      'Pearl Jam',
      'Years & Years',
      'Queens of the Stone Age',
      'Lorde',
      'Iron Maiden',
      'Halsey',
      'AC/DC',
      'Of Monsters and Men',
      'The National',
      'Britney Spears',
      'Kings of Leon',
      'Guns N\' Roses',
      'Bon Iver',
      'Weezer',
      'Paramore',
      'The White Stripes',
      'Shawn Mendes',
      'blink-182',
      'Fleetwood Mac',
      'Blur',
      'Placebo',
      'Slipknot',
      'The Doors',
      'Rammstein',
      'Black Sabbath',
      'Nicki Minaj',
      'Tove Lo',
      'Macklemore & Ryan Lewis',
      'Beck',
      'Amy Winehouse',
      'OneRepublic',
      'The Smashing Pumpkins',
      'Carly Rae Jepsen',
      'Little Mix',
      'Panic! at the Disco',
      'Marilyn Manson',
      'The Offspring',
      'John Mayer',
      'R.E.M.',
      'Rudimental',
      'Marina & the Diamonds',
      'M83',
      'Massive Attack',
      'Jamie xx',
      'Death Cab for Cutie',
      'Johnny Cash',
      'The Kooks',
      'Jason Der?lo',
      'Foster the People',
      'Jay-Z',
      'Moby',
      'Omi',
      'A$AP Rocky',
      'Fetty Wap',
      'Franz Ferdinand',
      'Justin Timberlake',
      'Disturbed',
      'Modest Mouse',
      'New Order',
      'Nine Inch Nails',
      'Vance Joy',
      'Korn',
      'Rise Against',
      'Bruce Springsteen',
      'Lost Frequencies',
      'MGMT',
      'Vampire Weekend',
      'Bastille',
      'Pixies',
      'The Prodigy',
      'Aerosmith',
      'James Bay',
      'My Chemical Romance',
      'Twenty One Pilots'
    ];
    vm.lastfmGenresLibrary = [
      'rock',
      'electronic',
      'seen live',
      'alternative',
      'indie',
      'pop',
      'female vocalists',
      'metal',
      'classic rock',
      'alternative rock',
      'jazz',
      'ambient',
      'experimental',
      'folk',
      'indie rock',
      'punk',
      'hard rock',
      'instrumental',
      'Hip-Hop',
      'singer-songwriter',
      'dance',
      'black metal',
      '80s',
      'Progressive rock',
      'british',
      'death metal',
      'hardcore',
      'heavy metal',
      'soul',
      'chillout',
      'electronica',
      'Classical',
      'industrial',
      'blues',
      'Soundtrack',
      'punk rock',
      'rap',
      'thrash metal',
      'acoustic',
      'psychedelic',
      '90s',
      'metalcore',
      'japanese',
      'post-rock',
      'piano',
      'german',
      'Progressive metal',
      'funk',
      'new wave',
      'trance'
    ];
/******************************end_js/services/storageSvc.js******************************/




      .state('searchTracks', {
        url: "/searchTracks/{track}/{limit}",
        templateUrl: "partials/searchTracks.html",
        controller: 'searchTracksController'
      });


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
      vm.trackArr = [
        'Zombie','Otherside','Lose Yourself','Come Along',
      ];

      vm.random = function (param) {
        switch (param) {
          case 'artist':
            return vm.artistsArr[Math.floor(Math.random() * vm.artistsArr.length)];
            break;

          case 'genre':
            return vm.genreArr[Math.floor(Math.random() * vm.genreArr.length)];
            break;

          case 'track':
            return vm.trackArr[Math.floor(Math.random() * vm.trackArr.length)];
            break;
        }
      }

      vm.limit = 10;
      vm.artist = vm.random('artist');
      vm.genre = vm.random('genre');
      vm.track = vm.random('track');
      vm.lang = 'ru';
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
      vm.getTrack = function () {
        return vm.track;
      };
      vm.setTrack = function (track) {
        vm.track = track;
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

          <div class="intro unit" ng-show='intro == true' ng-controller="menuController">
      <p class="line1"><strong>Мы рады приветствовать тебя на страницах <a ui-sref="bestSongs({artist: artist, limit: limit})"><img src="/images/logo.png" alt="Melomance" class="logo_melomance2"></a></strong></p>
      <p class="line2">Это - очень <strong>мощный инструмент</strong>, позволяющий находить много <u>новой классной музыки!</u></p>

      <p class="header">Введи <button type="button" ui-sref="bestSongs({artist: artist, limit: limit})" class="btn btn-primary">исполнителя</button> и ты сможешь:</p>
      <ul>
        <li>Найти <a ui-sref="similarArtists({artist: artist, limit: limit})"><strong>похожих</strong> на него</a> исполнителей</li>
        <li>Узнать его <a ui-sref="bestSongs({artist: artist, limit: limit})">самые <strong>крутые песни</strong></a></li>
        <li>... <strong>послушать</strong> их <a href="{{media.vk}}" target='_blank' rel='nofollow'><img src="/images/vk_long_ru.png" class="intro-img" alt="Вконтатке"/></a> или на <a href="{{media.yandex}}" target='_blank' rel='nofollow'><img src="/images/yandex_long_ru.png" class="intro-img yandex" alt="Яндекс.Музыка"/></a></li>
        <li>... <strong>посмотреть клипы</strong> на <a href="{{media.youtube}}" target='_blank' rel='nofollow'><img src="/images/youtube_big.png" class="intro-img yandex" alt="Youtube"/></a></li>
        <li>Узнать <a ui-sref="similarArtistsByGenres({artist: artist, limit: limit})"><strong>в каких стилях</strong></a> он играет и получить рекомендации по стилям</li>
        <li>Увидеть его <a ui-sref="bestAlbums({artist: artist, limit: limit})"><strong>лучшие альбомы</strong></a> и послушать их <strong>целиком</strong> на <img src="/images/yandex_long_ru.png" class="intro-img yandex" alt="Яндекс.Музыка"/></li>
        <li>Прочитать <strong>биографию</strong> на <a href="{{media.wiki}}" target='_blank' rel='nofollow'><img src="/images/wiki.png" class="intro-img yandex" alt="Wikipedia"></a> или <a ui-sref="artistInfoLastFm({artist: artist})"><img src="/images/lastfm.png" class="intro-img lastfm" alt="Last.fm"></a></li>
      </ul>

      <p class="header">Введя <button type="button" ui-sref="genreTopArtists({genre: genre, limit: limit})" class="btn btn-primary">музыкальный стиль</button> ты увидишь <a ui-sref="genreTopArtists({genre: genre, limit: limit})"><strong>лучших исполнителей</strong></a> и сразу сможешь <strong>перейти</strong> на любого из них</p>

      <p class="header">Если ничего <strong>не хочется вводить</strong></p>
      <ul>
        <li>... воспользуйся <strong>случайным выбором</strong> <a href="" ng-click="randomArtist()">исполнителя</a> или <a href="" ng-click="randomGenre()">стиля</a></li>
        <li>... <strong>выбери исполнителя</strong> из <a ui-sref="topArtists">топа <img src="/images/lastfm.png" class="intro-img lastfm" alt="Last.fm"></a> или <a ui-sref="libArtists">нашей библиотеки</a></li>
        <li>... <strong>выбери стиль</strong> из <a ui-sref="topGenres">топа <img src="/images/lastfm.png" class="intro-img lastfm" alt="Last.fm"></a> или <a ui-sref="libGenres">нашей библиотеки</a></li>
      </ul>

      <p class="header header-center">Мы используем данные <strong>самой мощной</strong> музыкальной сети <img src="/images/lastfm.png" class="intro-img lastfm" alt="Last.fm">, которые формируются пользователями на протяжении уже многих лет</p>

      <p class="pre-go">Ну что, готов?</p>
      <p class="go"><a ui-sref="bestSongs({artist: artist, limit: limit})">Поехали!</a></p>
    </div>