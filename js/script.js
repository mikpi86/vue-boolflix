/* 
Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
⦁	Titolo
⦁	Titolo Originale
⦁	Lingua
⦁	Voto
*/

var app = new Vue({

  el: '#root',

  data: {

    movies: [],

    searchedMovie: ''

  }, // chiusura data

  mounted(){

  }, // chisure mounted

  methods: {

    search() {

      axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=cdeff8ac68baa670d6a0c8c1991bbb39&query=' + this.searchedMovie)
        .then((result) => {

          // stampa array di film in base a ricerca
          console.log(result.data.results);

          this.movies.push(result.data.results);
          // stampa ricerca effettuata
          console.log(this.searchedMovie);
          // ripulisco la searchbar
          this.searchedMovie = '';
          
        });

    }

  } // chiusura methods
  
});

// per la console di Vue
Vue.config.devtools = true;