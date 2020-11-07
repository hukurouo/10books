<template>
  <div class="container">
    <button v-on:click="login()">login</button> 
    <button v-on:click="signOut()">logout</button>
    {{ login_name }} <br><br>
    <button v-on:click="AddStore()">store</button>
    <button v-on:click="Update()">upd</button>  

    <FinishedCards :datas="book_card_data"
      :isedit="true"
      @deleteBook="deleteBook"/>

    <br><br>
    <div v-if=zero_result>
      結果が見つかりませんでした
    </div>

    <input v-model="search_word" placeholder="edit me">
    <button v-on:click="search">search</button>
    <br><br>

    <BookList :datas="search_results"
      :isedit="true"
      @addBook="addBook"/>

  </div>
</template>

<script>
import firebase from 'firebase'
import FinishedCards from '@/components/FinishedCards.vue'
import BookList from '@/components/BookList.vue'

export default {
  components: {
    FinishedCards,
    BookList
  },
  data () {
    return {
      search_word: "",
      book_card_data: [],
      search_results: [],
      zero_result: false,
      login_name : "",
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
         var userinfo = firebase.auth().currentUser.displayName;
         this.login_name = userinfo
       }
    })
  },
  methods: {
    login: function () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(() => {
        this.checkAcount()
      }).catch(function(error) {
        console.log(error)
      })
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.checkAcount()
      }).catch(function(error) {
        console.log(error)
      });
    },
    checkAcount: function () {
      if (firebase.auth().currentUser == null){
        this.login_name = ""
        return
        }
      var user = firebase.auth().currentUser.displayName;
      this.login_name = user
    },
    AddStore: function () {
      var db = firebase.firestore()
      console.log(this.book_card_data)
      db.collection("cards").add({
          name: this.login_name,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        for (let index = 0; index < this.book_card_data.length; index++) {
          db.collection("cards").doc(docRef.id).collection('datas').add(this.book_card_data[index])
        }
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      })
    },
    Update: function () {
      var db = firebase.firestore()
      var Ref = db.collection("cards").doc("ATUmcey7kTwYsU92BRgq")
      return Ref.update({
          name: "hoot"
      })
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },
    addBook: function (params) {
      this.book_card_data.push({image: params.image,
                                title: params.title,
                                authors: params.authors,
                                })
    },
    deleteBook: function (params) {
      this.book_card_data = this.book_card_data.filter(data => data.image != params.image)
    },
    search: function(){
      this.search_results = []
      var dig = require('object-dig')
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.search_word}`)
       .then(response => {
        console.log(response.status); // => 200
        return response.json().then(data => {
            // JSONパースされたオブジェクトが渡される
            console.log(data); // => {...}
            this.zero_result = false
            if (data.totalItems == 0) {
              this.zero_result = true
              return
            }
            for (let index = 0; index < 10; index++) {
              const element = data.items[index];
              this.search_results.push({ 
                i: index,
                image: dig(element, "volumeInfo", "imageLinks", "thumbnail") || "https://firebasestorage.googleapis.com/v0/b/books-card-maker.appspot.com/o/unnamed%20(1).png?alt=media&token=0d07027b-72b5-4489-82b2-84ad6d784abc",
                title: dig(element, "volumeInfo", "title") || "",
                authors: dig(element, "volumeInfo", "authors") || "",
              }) 
            }
        })
        })
    },
  },
}

</script>

<style>
.display_flex{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.book_detail{
  padding-left: 10px;
  text-align: left
}
</style>