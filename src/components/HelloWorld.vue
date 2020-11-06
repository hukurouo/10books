<template>
  <div class="hello">
      <h4 style="color: #000; ">名刺代わりの10冊メーカーです</h4>
      <img src="@/assets/logo.png">

  </div>
</template>

<script>


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    greet: function(){
      console.log("hello")
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
