<template>
  <div>
    <div class="content">
      <h1>名刺代わりの小説10選</h1>
    </div>

    <div class="display_flex"> 
      <div v-for="(item) in datas" :key="item.id">
        <img :src="`${item.image}`" :width=imagewidth()><br>
        
    </div>
  </div>

  </div>
</template>

<script>

export default {
  name: 'FinishedCards',
  props: {
    datas: Array,
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
  width: 96%;
  margin: 0 auto;
}
@media screen and (min-width: 800px) {
  .display_flex{
  display: flex;
  width: 100%;
  margin: 0 auto;
}

}

#delete_button{
  padding-bottom:5px;
}

</style>
