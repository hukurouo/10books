<template>
  <div>
    <div v-show="false">
    <svg ref="svgCard" width="600" height="315" style="background-color:#fff">
      <rect x="10" y="10" width="580" height="295" stroke="#ddd" fill="none"  />
      <text x="40" y="60" letter-spacing="2" word-spacing="10" font-size="24" font-family="HiraginoSans-W5, Hiragino Sans">
        <tspan font-weight="bold">{{ name }} さんの小説10選</tspan>
      </text>
      <text x="40" y="110" letter-spacing="2"  font-size="20" font-family="HiraginoSans-W5, Hiragino Sans">
        <tspan font-weight="bold">1. {{OverNumberOfCharacters(ogp_book_title[0]) }} </tspan>
      </text>
      <text x="40" y="150" letter-spacing="2"  font-size="20" font-family="HiraginoSans-W5, Hiragino Sans">
        <tspan font-weight="bold">2. {{OverNumberOfCharacters(ogp_book_title[1]) }} </tspan>
      </text>
      <text x="40" y="190" letter-spacing="2" font-size="20" font-family="HiraginoSans-W5, Hiragino Sans">
        <tspan font-weight="bold">3. {{OverNumberOfCharacters(ogp_book_title[2]) }} </tspan>
      </text>
      <text x="40" y="230" letter-spacing="2" font-size="20" font-family="HiraginoSans-W5, Hiragino Sans">
        <tspan font-weight="bold">4. {{OverNumberOfCharacters(ogp_book_title[3]) }} </tspan>
      </text>
      <text x="40" y="270" letter-spacing="2" font-size="20" font-family="HiraginoSans-W5, Hiragino Sans">
        <tspan font-weight="bold">5. {{OverNumberOfCharacters(ogp_book_title[4]) }} </tspan>
        <tspan font-weight="bold" dx="20"> ......</tspan>
      </text>
    </svg>
    </div>

    <FinishedCards :datas="book_card_data"
      :isedit="true"
      @deleteBook="deleteBook"/>

    <br>
    <div v-if=zero_result>
      結果が見つかりませんでした
    </div>

    <div class="search_field">
      <div class="search_input_field">
       <b-input 
             v-on:keyup.native.enter="search" 
             v-model="search_word"
             placeholder="小説のタイトルを入力してください"></b-input>
      </div>
        <b-button v-on:click="search">検索</b-button>
      
    </div>


    <br><br>

    <BookList :datas="search_results"
      :isedit="true"
      @addBook="addBook"/>
    <br>
    <br>

    <div class="name_input_field" v-if=open_namefield>
      <b-field label="名前（ユーザーネーム）">
        <b-input 
             v-model="name" 
             maxlength="10"
             placeholder="名前を入力してください">
        </b-input>
      </b-field>
    </div>
    <br>
    
    {{ this.book_card_data.length }} / 10

    <br>

    <b-button 
    v-on:click="AddStore()" 
    :disabled=!is_validate_data
    >ページを生成する</b-button>

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
      search_word: "",
      type: "novel",
      search_results: [],
      zero_result: false,
      ogp_book_title:[]
    }
  },
  computed: {
    is_validate_data: function () {
      if (this.name != "" && this.book_card_data.length == 10){ return true}
      return false
    },
    open_namefield: function () {
      if (this.book_card_data.length == 10){ return true}
      return false
    },
  },
  created(){
  },
  methods: {
    clear: function(){
      this.search_word = ""
    },
    AddStore: async function () {
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
      var serial_number = 0
      await db.collection("cards").orderBy("serial_number", "desc").limit(1)
          .get()
          .then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
            serial_number = doc.data().serial_number + 1
          });
      })
      authors = [...new Set(authors)]
      db.collection("cards").add({
          name: this.name,
          type: this.type,
          datas: this.book_card_data,
          titles: titles,
          authors: authors,
          serial_number: serial_number,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(async docRef => {
        const docID = docRef.id
        console.log(docID)
        await this.StorageAdd(docID)
        this.$router.push({ path: `/id/${docID}` }) 
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
    OverNumberOfCharacters: function (params) {
      if (params == undefined){return params}
      var CharacterLimitCount = 18
      if (params.length > CharacterLimitCount){
        return params.slice(0,CharacterLimitCount-1) + " ..."
      } else {
        return params
      }
    },
    addBook: function (params) {
      this.ogp_book_title.push(params.title)
      this.book_card_data.push({image: params.image,
                                title: params.title,
                                authors: params.authors,
                                })
      this.search_word = ""
      this.search_results = []
    },
    deleteBook: function (params) {
      this.book_card_data = this.book_card_data.filter(data => data.image != params.image)
      this.ogp_book_title = this.ogp_book_title.filter(data => data != params.title)
    },
    search: function(){
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
          this.search_results = []
          for (let index = 0; index < 10; index++) {
            const element = data.items[index];
            
            this.search_results.push({ 
              i: index,
              image: dig(element, "volumeInfo", "imageLinks", "thumbnail") || "https://firebasestorage.googleapis.com/v0/b/books-card-maker.appspot.com/o/unnamed%20(1).png?alt=media&token=cfc13b85-a9fe-4bc7-b75e-fab3584547b6",
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
.name_input_field{
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  text-align: left
}
</style>