<template>
  <div class="container">
    <h1>This is an about page</h1>
      {{ windowWidth }}
      <button v-on:click="greet">Greet1</button>
    <button v-on:click="greet2">Greet</button>
    <br><br>
    <div id="capture">
    <div class="display_flex"> 
    <div v-for="(item) in img_url" :key="item.id">

        <img :src="`${item}`" :width=imagewidth()>
      </div>
      
    </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import html2canvas from 'html2canvas';

// Webコンソールから取得したコンフィグをペースト
const firebaseConfig = {
  apiKey: "AIzaSyCN1lMePLo2olQKCeTLMFtb6Xc6UCU4WLY",
  authDomain: "books-card-maker.firebaseapp.com",
  databaseURL: "https://books-card-maker.firebaseio.com",
  projectId: "books-card-maker",
  storageBucket: "books-card-maker.appspot.com",
  messagingSenderId: "971397498868",
  appId: "1:971397498868:web:f8263917eb4b425530dba1",
  measurementId: "G-8TZFK9QM25"
};
firebase.initializeApp(firebaseConfig)

export default {
  data () {
    return {
      windowWidth: window.innerWidth,
      img_url: []
    }
  },
  methods: {
    getWindowSize: function() {
      this.windowWidth = window.innerWidth
    },
    imagewidth: function(){
      if (this.windowWidth > 800){
        return 158
      }
      return this.windowWidth / 5.25
    },
    greet: function(){
     html2canvas(document.querySelector("#capture"), {allowTaint: true}).then(canvas => {
      document.querySelector("#capture").appendChild(canvas)
    });
    },
    greet2: function(){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=とある`)
       .then(response => {
        console.log(response.status); // => 200
        return response.json().then(data => {
            // JSONパースされたオブジェクトが渡される
            console.log(data); // => {...}
            for (let index = 0; index < 10; index++) {
              const element = data.items[index];
              this.img_url.push(element.volumeInfo.imageLinks.thumbnail) 
            }
        })
        })
    },
  },
   mounted() {
    window.addEventListener('resize', this.getWindowSize);
  },
}

</script>

<style>
.display_flex{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.img{
  width: 100px;
}
</style>