<template>
  <div class="book_list">
    <div v-for="(item, index) in datas" :key="item.id">
      <div class="display_flex" id="paddingtop5"> 
        <div class="list_image">
          <img :src="`${item.image}`">
        </div>
        <div class="book_detail">
          <div v-if="type == `edit`"><b-input v-model="item.title" @input.native="onChange([index, item.title])"></b-input></div>
          <div v-if="type != `edit`">
          <b class="book_title">{{ OverNumberOfCharacters(item.title) }} </b>
          </div>
          <div v-for="(author) in AuthorsList(item.authors)" :key="author">
            {{ author }} <br>
          </div>
          <div v-if="type == `show`">
           <a :href="`https://www.google.com/search?q=${item.title}`" target="_blank" rel="noopener noreferrer">Google</a> | 
           <a :href="`https://www.amazon.co.jp/s?k=${item.title}&tag=assowl2480-22`" target="_blank" rel="noopener noreferrer">Amazon</a>
          </div>
          <div id="add_button">
          <b-button v-if="type == `search`" v-on:click="addBook(item)" type="is-success" outlined size="is-small">追加</b-button>
          </div>
          <div id="delete_button">
            <b-button v-if="type == `edit`" v-on:click="deleteBook(item)" type="is-danger is-light" size="is-small">削除</b-button> <b class="left_padding"></b>
            
            
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FinishedCards',
  props: {
    datas: Array,
    type: String,
  },
  data () {
    return {
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    OverNumberOfCharacters: function (params) {
      if (params == undefined){return params}
      var windowWidth = this.windowWidth
      if (windowWidth > 800){windowWidth = 800}
      var width = windowWidth - 70
      var CharacterLimitCount = width / 18
      if (params.length > CharacterLimitCount){
        return params.slice(0,CharacterLimitCount-1) + "..."
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
      return author
    },
    addBook: function (params) {
      this.$emit('addBook', params)
    },
    deleteBook: function (params) {
      this.$emit('deleteBook', params)
    },
    onChange: function (params) {
     this.$emit('editBook', params)
    },
    getWindowSize: function () {
      this.windowWidth = window.innerWidth
    },
  },
  mounted() {
    window.addEventListener('resize', this.getWindowSize);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display_flex{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.book_detail{
  padding-left: 10px;
  text-align: left;
}

#paddingtop5{
  padding-bottom: 20px;
}

.book_list{
  padding-left: 20px;
}

#add_button{
  padding-top: 5px;
}
.list_image{
  width: 75px;
  height: auto;
}
.left_padding{
  padding-left: 5px;
}
</style>
