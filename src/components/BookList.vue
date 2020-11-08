<template>
  <div>
    <div v-for="(item) in datas" :key="item.id">
      <div class="display_flex" id="paddingtop5"> 
        <img :src="`${item.image}`" :width=75 :height=110>
        <div class="book_detail">
          <b class="book_title">{{ OverNumberOfCharacters(item.title) }} </b>
          <br>
          <div v-for="(author) in AuthorsList(item.authors)" :key="author">
            {{ author }} <br>
          </div>
          <br>
          <div v-if="isedit == false">
           <a :href="`https://www.google.com/search?q=${item.title}`" target="_blank" rel="noopener noreferrer">Google</a> | 
           <a :href="`https://www.amazon.co.jp/s?k=${item.title}`" target="_blank" rel="noopener noreferrer">Amazon</a>
          </div>
          <button v-if="isedit" v-on:click="addBook(item)">add</button>
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
    isedit: Boolean,
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


</style>
