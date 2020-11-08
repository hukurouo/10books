<template>
  <div>

    <div v-show="true">
    <svg ref="svgCard" width="600" height="315" style="background-color:#fff">
      <rect x="10" y="10" width="580" height="295" stroke="#ddd" fill="none"  />
      <text x="0" y="20" letter-spacing="5" word-spacing="10">
        文字 単語間隔の調整
      </text>
      <text x="0" y="60">
        <tspan>位</tspan>
        <tspan dx="5" dy="-5">置</tspan>
        <tspan dx="5" dy="-5">の</tspan>
        <tspan dx="5" dy="5">調</tspan>
        <tspan dx="5" dy="5">整</tspan>
        <tspan x="0" dy="20">改行</tspan>
        <tspan x="220" dy="200">改行</tspan>
      </text>
      <text transform="translate(103.29 447.281)" fill="#e51f4e" font-size="129" font-family="HiraginoSans-W5, Hiragino Sans" letter-spacing="-0.002em">
        <tspan x="0" y="26">{{ msg }}</tspan>
      </text>
    </svg>
    </div>

    <FinishedCards :datas="book_card_data"
      :isedit="true"
      @deleteBook="deleteBook"/>

    <br><br>
    <div v-if=zero_result>
      結果が見つかりませんでした
    </div>

    <input v-on:keyup.enter="search" v-model="search_word" placeholder="edit me">
    <button v-on:click="search">search</button>
    <br><br>

    <BookList :datas="search_results"
      :isedit="true"
      @addBook="addBook"/>
    <br>
    <br>
    <div>
    名前： <input v-model="name" placeholder="edit name">
    </div>

    <br><br>
    

    <button v-on:click="AddStore()" :disabled=!is_validate_data>ページを生成する</button>

    <br><br>

  </div>
</template>

<script>
import firebase from 'firebase'
import FinishedCards from '@/components/FinishedCards.vue'
import BookList from '@/components/BookList.vue'

function svg2imageData (svgElement, successCallback, errorCallback) {
  var canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 315
  var ctx = canvas.getContext('2d')
  var image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 600, 315)
    successCallback(canvas.toDataURL())
  }
  image.onerror = (e) => {
    errorCallback(e)
  }
  console.log(svgElement)
  var svgData = new XMLSerializer().serializeToString(svgElement)
  image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)))
}

export default {
  components: {
    FinishedCards,
    BookList
  },
  data () {
    return {
      book_card_data: [],
      name: "",
      type: "novel",
      search_results: [],
      search_results_tmp: "",
      zero_result: false,
      msg: "hjCxmlyHFOhcKm32PfVK",
      docID: "",
      is_validate_data: true
    }
  },
  computed: {
    search_word: {
      get(){
        return this.search_results_tmp
      },
      set (value) {
        this.search_results_tmp = value
      }
    }
  },
  created(){
  },
  methods: {
    AddStore: function () {
      var db = firebase.firestore()
      console.log(this.book_card_data)
      var titles = []
      for (let index = 0; index < this.book_card_data.length; index++) {
        const element = this.book_card_data[index];
        titles.push(element.title)
      }
      var authors = []
      for (let index = 0; index < this.book_card_data.length; index++) {
        const element = this.book_card_data[index];
        if (!element.authors){continue}
        var valid_auts = element.authors.map(s => s.replace(' ', '').replace('　', ''))
        for (let j=0; j< valid_auts.length; j++){
          authors.push(valid_auts[j])
        }
      }
      authors = [...new Set(authors)]
      db.collection("cards").add({
          name: this.name,
          type: this.type,
          datas: this.book_card_data,
          titles: titles,
          authors: authors,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(async docRef => {
        const docID = docRef.id
        console.log(docID)
        await this.StorageAdd(docID)
        // ページ遷移
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      })
    },
    StorageAdd(param) {
      svg2imageData(this.$refs.svgCard, async (data) => {
        const sRef = firebase.storage().ref()
        const fileRef = sRef.child(`ogp/${param}.png`)
        var metadata = {
          contentType: 'image/png',
          cacheControl: 'public,max-age=3600'
        };

        await fileRef.putString(data, 'data_url').then((snapshot) => {
          console.log(snapshot)
        }).catch(err => {
          console.error(err)
        })

        fileRef.updateMetadata(metadata).then(function(meta) {
          console.log(meta)
        }).catch(function(error) {
          console.log(error)
        });
      })
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
        console.log(response.status); 
        return response.json().then(data => {
          console.log(data);
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