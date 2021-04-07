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

var app = new Vue({

  el: '#root',

  data: {

    movies: [],

    searchedMovie: ''

  }, // chiusura data

  mounted(){

  }, // chisure mounted

  methods: {

    search(){

      axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=cdeff8ac68baa670d6a0c8c1991bbb39&query=' + this.searchedMovie)
        .then((result) => {

          // stampa array di film in base a ricerca
          console.log(result.data.results);
          // copio ricerca in movies
          this.movies = result.data.results;
          console.log(this.movies);
          // stampa ricerca effettuata
          console.log(this.searchedMovie);
          // ripulisco la searchbar
          this.searchedMovie = '';

          // trasformo i voti in interi da 1 a 5
          this.movies.forEach(movie => {
            movie.vote_average = (movie.vote_average / 2).toFixed();
            console.log(movie.vote_average);
          });
          
        });

    }

  } // chiusura methods
  
});

// per la console di Vue
Vue.config.devtools = true;