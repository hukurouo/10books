<template>
  <div class="home">
    <br>
    {{ name }} さんの
    <FinishedCards :datas="book_card_data"
    :isedit="false"/>
    <br>
    <p> - </p>
    <br>

    <BookList :datas="book_card_data"
      :isedit="false" />

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
  name: 'id',
  data () {
    return {
      book_card_data: [],
      name: "",
    }
  },
  methods: {
    setData: function (doc, docRef) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        if (doc.data().name != ""){this.name = doc.data().name}
        docRef.collection('datas').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().title}`);
            this.book_card_data.push({
              title: doc.data().title,
              authors: doc.data().authors,
              image: doc.data().image
            })
          })
        })
      } else {
          console.log("No such document!");
      }
    }
  },
  created(){
    var db = firebase.firestore();
    var docRef = db.collection("cards").doc(this.$route.params.id)
    docRef.get({ source: "cache" }).then((doc) => {
      this.setData(doc, docRef)
    }).catch(() => {
      docRef.get().then((doc) => {
        this.setData(doc, docRef)
      })
    })
  },
}
</script>

<style>

</style>