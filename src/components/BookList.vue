<template>
  <div>
    <div v-for="(item) in datas" :key="item.id">
      <div class="display_flex" id="paddingtop5"> 
        <img :src="`${item.image}`" :width=70>
        <div class="book_detail">
          {{ OverNumberOfCharacters(item.title) }} <br>
          {{ AuthorsList(item.authors) }} <br><br>
           <a :href="`https://www.google.com/search?q=${item.title}`" target="_blank" rel="noopener noreferrer">Google</a> | 
           <a :href="`https://www.amazon.co.jp/s?k=${item.title}`" target="_blank" rel="noopener noreferrer">Amazon</a>
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
      var width = this.windowWidth - 70
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
      return author.join(",")
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
  padding-top: 5px;
}


</style>
