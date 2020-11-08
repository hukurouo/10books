<template>
  <div class="container">
    <input v-on:keyup.enter="search" v-model="search_word" placeholder="edit me">
    {{result}}
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Search',
  components: {
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
      var db = firebase.firestore()
      db.collection("cards").where("titles", "array-contains", this.search_word)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
  },
}

</script>

<style>

</style>