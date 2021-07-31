var app = new Vue({

  el: '#root',

  data: {

    searched: '',

    results: [],

  }, // chiusura data

  mounted(){

  }, // chisure mounted

  methods: {

    search(){

      const self = this;

      self.results = [];

      // chiamata film
      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'cdeff8ac68baa670d6a0c8c1991bbb39',
            query: self.searched,
            language: 'it-IT'
          }
        })
        .then((response) => {

          const resultsFilm = response.data.results;

          self.results = self.results.concat(resultsFilm);

          // assegno una bandiera alla lingua
          self.results.forEach(result => {
            if (result.original_language == 'en') {
              result.original_language = 'gb';
            } else if (result.original_language == 'ja') {
              result.original_language = 'jp';
            }            
          });

          // ripulisco la searchbar
          this.searched = '';

        }); // chiusura chiamata film

      // chiamata serie tv
      axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: 'cdeff8ac68baa670d6a0c8c1991bbb39',
            query: self.searched,
            language: 'it-IT'
          }
        })
        .then((response) => {

          const resultsSerie = response.data.results;

          self.results = self.results.concat(resultsSerie);

          // assegno una bandiera alla lingua
          self.results.forEach(result => {
            if (result.original_language == 'en') {
              result.original_language = 'gb';
            } else if (result.original_language == 'ja') {
              result.original_language = 'jp';
            }
          });

          // ripulisco la searchbar
          this.searched = '';

        }); // chiusura chiamata serie

    }, // chiusura search

    getVote(vote) {
      return parseInt(vote / 2);
    }

  } // chiusura methods
  
});

// per la console di Vue
Vue.config.devtools = true;
