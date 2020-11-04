<template>
  <div class="hello">
    <button v-on:click="greet">Greet</button>
    <div id="capture" style="padding: 10px; background: #f5da55">
      <h4 style="color: #000; ">Hello world!</h4>
      <img src="@/assets/logo.png">
    
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
   greet: function(){
     html2canvas(document.querySelector("#capture"), {allowTaint: true}).then(canvas => {
      document.body.appendChild(canvas)
    });
   },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
