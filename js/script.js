/* 

*/

var app = new Vue({

  el: '#root',

  data: {

  }, // chiusura data

  mounted(){
 
    axios
      .get('https://api.themoviedb.org/3/movie/550?api_key=cdeff8ac68baa670d6a0c8c1991bbb39')
      .then((result) => {

        // stampa di result
        console.log(result);

        // prova di stampa del titolo
        console.log(result.data.original_title);

      });

  }, // chisure mounted

  methods: {

  } // chiusura methods
  
});

// per la console di Vue
Vue.config.devtools = true;