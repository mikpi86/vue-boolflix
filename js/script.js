/* 
Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
⦁	Titolo
⦁	Titolo Originale
⦁	Lingua
⦁	Voto
*/

/*
Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
*/

/* 
Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
*/

var app = new Vue({

  el: '#root',

  data: {

    movies: [],

    series: [],

    searchedMovie: ''

  }, // chiusura data

  mounted(){

  }, // chisure mounted

  methods: {

    search(){

      // chiamata film
      axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=cdeff8ac68baa670d6a0c8c1991bbb39&query=' + this.searchedMovie)
        .then((result) => {

          // copio ricerca in movies
          this.movies = result.data.results;
          console.log(this.movies);
          // stampa ricerca effettuata
          console.log(this.searchedMovie);
          // ripulisco la searchbar
          this.searchedMovie = '';

          this.movies.forEach(movie => {
            
            // trasformo i voti in interi da 1 a 5
            movie.vote_average = parseInt((movie.vote_average / 2).toFixed());

            // assegno una bandiera alla lingua
            if (movie.original_language == 'en') {
              movie.original_language = 'gb';
            } else if (movie.original_language == 'ja') {
              movie.original_language = 'jp';
            }
          });  
        }); // chiusura chiamata film

      // chiamata serie tv
      axios
        .get('https://api.themoviedb.org/3/search/tv?api_key=cdeff8ac68baa670d6a0c8c1991bbb39&query=' + this.searchedMovie)
        .then((result) => {

          // copio ricerca in series
          this.series = result.data.results;
          console.log(this.series);
          // stampa ricerca effettuata
          console.log(this.searchedMovie);
          // ripulisco la searchbar
          this.searchedMovie = '';

          this.series.forEach(serie => {

            // trasformo i voti in interi da 1 a 5
            serie.vote_average = parseInt((serie.vote_average / 2).toFixed());

            // assegno una bandiera alla lingua
            if (serie.original_language == 'en') {
              serie.original_language = 'gb';
            } else if (serie.original_language == 'ja') {
              serie.original_language = 'jp';
            }
          });
        }); // chiusura chiamata serie tv

    }, // chiusura search

  } // chiusura methods
  
});

// per la console di Vue
Vue.config.devtools = true;
