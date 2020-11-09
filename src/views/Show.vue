<template>
  <div class="container">
    <div v-if=is_render>
    <div id="padding10">{{ name }} さんの </div>

    <FinishedCards :datas="book_card_data"/>
    <br>
    <div v-if=is_twitter_card>
      <a @click="twitterShare">
        <svg width="343" height="48" viewBox="0 0 343 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="343" height="48" rx="4" fill="#1DA1F2"/>
        <path d="M89.5 17.1306C88.6537 17.4919 87.7442 17.7366 86.7902 17.8459C87.7644 17.2837 88.5123 16.3934 88.8648 15.3321C87.9529 15.8531 86.9433 16.2314 85.8682 16.4347C85.0075 15.5517 83.7809 15 82.4239 15C79.8176 15 77.7051 17.0342 77.7051 19.5439C77.7051 19.9004 77.7472 20.2471 77.8271 20.5793C73.9059 20.3897 70.4288 18.5807 68.101 15.832C67.6946 16.5028 67.4624 17.2837 67.4624 18.1165C67.4624 19.693 68.2953 21.084 69.5615 21.899C68.7883 21.8755 68.0606 21.6713 67.4237 21.3303C67.4237 21.3489 67.4237 21.3683 67.4237 21.3878C67.4237 23.5897 69.0499 25.4262 71.2087 25.8434C70.8124 25.9471 70.396 26.003 69.9653 26.003C69.6616 26.003 69.3654 25.9747 69.0777 25.9212C69.6784 27.7261 71.4207 29.0401 73.4861 29.0766C71.8708 30.295 69.8366 31.0217 67.6256 31.0217C67.2445 31.0217 66.8693 30.9998 66.5 30.9585C68.5881 32.2474 71.0682 33 73.7334 33C82.413 33 87.1587 26.0759 87.1587 20.0713C87.1587 19.8745 87.1545 19.6784 87.1452 19.4832C88.0673 18.8424 88.8674 18.042 89.5 17.1306Z" fill="white"/>
        <text  fill="white" font-size="15" font-family="HiraginoSans-W5, Hiragino Sans" letter-spacing="1px">
          <tspan x="105" y="30" font-weight="bold">Twitterで結果をシェア</tspan>
        </text>
        </svg>
      </a>
      <br>
    </div>
    <br><br>

    <BookList :datas="book_card_data"
      type="show" />

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
  computed: {
    is_twitter_card: function () {
      if (this.$store.state.is_twitter_link != false){ return true }
      return false
    },
  },
  methods: {
    prev_next_data: function (number) {
      var db = firebase.firestore()
      db.collection("cards").where("serial_number", "in", [number-1, number+1])
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().serial_number == number-1){this.prev_data = {id: doc.id, name:doc.data().name + " さんの10選"}}
                if (doc.data().serial_number == number+1){this.next_data = {id: doc.id, name:doc.data().name + " さんの10選"}}
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
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
    },
    twitterShare: function (){
      var shareURL = 'https://twitter.com/intent/tweet?text=' + "10冊メーカーで" + "%20%23名刺代わりの小説10選" + " を作りました！" + '&url=' + `https://books-card-maker.web.app/id/${this.$route.params.id}`;  
      window.open(shareURL, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
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