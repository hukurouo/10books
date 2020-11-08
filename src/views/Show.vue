<template>
  <div class="container">
    <div v-if=is_render>
    <div id="padding10">{{ name }} さんの </div>

    <FinishedCards :datas="book_card_data"
    :isedit="false"/>
    <br>
    <p></p>
    <br>

    <BookList :datas="book_card_data"
      :isedit="false" />

    <br>
    <a :href="`/id/${prev_data.id}`">{{prev_data.name}}</a>
    ｜
    <a :href="`/id/${next_data.id}`">{{next_data.name}}</a>
    <br><br>
    <div class="buttons_field">
        <b-button tag="router-link"
                  expanded
                  to="/create"
                  type="is-link">
                小説10選ページをつくる
        </b-button>
    </div>
    <br>
    > ログイン不要です
    <br><br>
    <Footer/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import FinishedCards from '@/components/FinishedCards.vue'
import BookList from '@/components/BookList.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    FinishedCards,
    BookList,
    Footer
  },
  name: 'id',
  data () {
    return {
      book_card_data: [],
      name: "",
      is_render: false,
      prev_data: {},
      next_data: {},
    }
  },
  methods: {
    prev_next_data: function (number) {
      var db = firebase.firestore()
      db.collection("cards").where("serial_number", "in", [number-1, number+1])
        .get({ source: "cache" })
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                if (doc.data().serial_number == number-1){this.prev_data = {id: doc.id, name:doc.data().name + " さんの10選"}}
                if (doc.data().serial_number == number+1){this.next_data = {id: doc.id, name:doc.data().name + " さんの10選"}}
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
              db.collection("cards").where("serial_number", "in", [number-1, number+1])
              .get()
              .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      console.log(doc.id, " => ", doc.data());
                      if (doc.data().serial_number == number-1){this.prev_data = {id: doc.id, name:doc.data().name + " さんの10選"}}
                      if (doc.data().serial_number == number+1){this.next_data = {id: doc.id, name:doc.data().name + " さんの10選"}}
                  });
         })
        });
    },
    setData: function (doc) {
      if (doc.exists) {
        this.name = doc.data().name
        var serial_number = doc.data().serial_number
        doc.data().datas.forEach((data) => {
          this.book_card_data.push({
                title: data.title,
                authors: data.authors,
                image: data.image
          })
        })
        this.prev_next_data(serial_number)
      } else {
        console.log("No such document!");
      }
    }
  },
  created(){
    this.is_render = false
    var db = firebase.firestore();
    var docRef = db.collection("cards").doc(this.$route.params.id)

    docRef.get({ source: "cache" }).then((doc) => {
      this.setData(doc)
      this.is_render = true
    }).catch(() => {
      docRef.get().then((doc) => {
        this.setData(doc)   
        this.is_render = true
      })
    })
  },
}
</script>

<style>
.display_flex{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#padding10{
  padding-bottom: 10px;
}
.buttons_field{
  width: 90%;
  margin: 0 auto;
  max-width: 500px;
}
</style>