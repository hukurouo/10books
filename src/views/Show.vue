<template>
  <div class="container">
    
    <div id="padding10">{{ name }} さんの </div>

    <FinishedCards :datas="book_card_data"
    :isedit="false"/>
    <br>
    <p></p>
    <br>

    <BookList :datas="book_card_data"
      :isedit="false" />

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
    }
  },
  methods: {
    setData: function (doc) {
      if (doc.exists) {
        this.name = doc.data().name
        doc.data().datas.forEach((data) => {
          this.book_card_data.push({
                title: data.title,
                authors: data.authors,
                image: data.image
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
      this.setData(doc)
    }).catch(() => {
      docRef.get().then((doc) => {
        this.setData(doc)   
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