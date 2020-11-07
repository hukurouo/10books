<template>
  <div>
    <h1>名刺代わりの小説10選</h1>
    <div class="display_flex"> 
      <div v-for="(item) in datas" :key="item.id">
        <img :src="`${item.image}`" :width=imagewidth()><br>
         <button v-if="isedit" v-on:click="deleteBook(item)">delete</button>
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
    imagewidth: function(){
      if (this.windowWidth > 800){
        return 158
      }
      return this.windowWidth / 5.3
    },
    getWindowSize: function () {
      this.windowWidth = window.innerWidth
    },
    deleteBook: function (params) {
      this.$emit('deleteBook', params)
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

</style>
