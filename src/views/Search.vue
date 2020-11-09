<template>
  <div class="container">
    <div class="search_field">
      <div class="search_input_field">
        <b-input v-on:keyup.native.enter="search" v-model="search_word" 
        placeholder="小説のタイトル/著者で検索"></b-input>
      </div>
    <b-button v-on:click="search">検索</b-button>
    </div>

    <br>  
      <div v-for="(item) in result" :key="item.id">
        <a :href="`/id/${item.id}`" target="_blank" rel="noopener noreferrer" >{{item.name}}さんの10選</a> <br><br>
      </div>
    <br> <br> <br>
    <!--
    <input v-on:keyup.enter="upd">
    -->
    <Footer/>
  </div>
</template>

<script>
import firebase from 'firebase'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Search',
  components: {
    Footer
  },
  data () {
    return {
      result: [],
      search_word: "",
    }
  },
  created(){

  },
  methods: {
    search: function () {
      this.result = []
      var db = firebase.firestore()
      db.collection("cards").where("titles", "array-contains", this.search_word).limit(10)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.result.push({name: doc.data().name, id: doc.id})
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    },
    upd: function () {
        const sRef = firebase.storage().ref()
        const fileRef = sRef.child(`ogp/0gnEeeaGcP7aVI1jz4X1.png`)
        var metadata = {
          contentType: 'image/png',
          cacheControl: 'public,max-age=3600'
        };
        console.log(metadata)
        fileRef.getMetadata().then(function(meta) {
          console.log(meta)
        }).catch(function(error) {
          console.log(error)
        });
    }
  },
}

</script>

<style>
.search_field{
  display: flex;
  width: 90%;
  margin: 0 auto;
  max-width: 500px;
}
.search_input_field{
  width: 90%;
  max-width: 450px;
  padding-right: 10px;
}
</style>