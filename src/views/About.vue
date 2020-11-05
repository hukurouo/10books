<template>
  <div class="container">
    <h1>名刺代わりの小説10冊</h1>
    <br>
    <div class="display_flex"> 
      <div v-for="(item) in book_card_data" :key="item.id">
        <img :src="`${item.image}`" :width=imagewidth()><br>
         <button v-on:click="deleteBook(item)">delete</button>
      </div>
    </div>
    <br>
    <br>
    <div v-if=zero_result>
      結果が見つかりませんでした
    </div>

    <input v-model="search_word" placeholder="edit me">
    <button v-on:click="greet2">search</button>
    <br><br>

    <div v-for="(item) in search_results" :key="item.id">
      <div class="display_flex"> 
        <img :src="`${item.image}`" :width=70>
        <div class="book_detail">
          {{ OverNumberOfCharacters(item.title) }} <br>
          {{ AuthorsList(item.authors) }} <br>
          <button v-on:click="addBook(item)">add</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      search_word: "",
      windowWidth: window.innerWidth,
      book_card_data: [],
      search_results: [],
      zero_result: false,
    }
  },
  methods: {
    addBook: function (params) {
      this.book_card_data.push({image: params.image})
    },
    deleteBook: function (params) {
      this.book_card_data = this.book_card_data.filter(data => data.image != params.image)
    },
    getWindowSize: function () {
      this.windowWidth = window.innerWidth
    },
    OverNumberOfCharacters: function (params) {
      if (params.length > 20){
        return params.slice(0,19) + "..."
      } else {
        return params
      }
    },
    AuthorsList: function (params) {
      if (params == null){return}
      var author = []
      if (params.length >= 2){
        author.push(this.OverNumberOfCharacters(params[0]))
        author.push(this.OverNumberOfCharacters(params[1]))
      } else {
        author = [this.OverNumberOfCharacters(params[0])]
      }
      return author.join(",")
    },
    imagewidth: function(){
      if (this.windowWidth > 800){
        return 158
      }
      return this.windowWidth / 5.25
    },
    greet2: function(){
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
                title: dig(element, "volumeInfo", "title"),
                authors: dig(element, "volumeInfo", "authors"),
              }) 
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
.book_detail{
  padding-left: 10px;
  text-align: left
}
</style>