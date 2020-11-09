<template>
  <div class="hello">
    <div class="content">
      <h3 style="color:#6495ed">#名刺代わりの小説10選</h3>
      <br>
      のページを作れるサイトです
      <br>
      <router-link :to="`/id/0gnEeeaGcP7aVI1jz4X1`">
      <img id="top_image" src="@/assets/top_image.png" alt="">
      </router-link><br><br>
      <div class="buttons_field">
        <b-button tag="router-link"
                  expanded
                  to="/create"
                  type="is-link">
                小説10選ページをつくる
        </b-button>
            <br>
    > ログイン不要です
    <br><br>
      </div>
    </div>
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
#top_image{
    width: 90%;
    max-width: 435px;
    padding: 0.5em 1em;
    margin: 2em 0;
    color: #5d627b;
    background: white;
    border-top: solid 5px #5d627b;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}

.buttons_field{
  width: 90%;
  margin: 0 auto;
  max-width: 500px;
}
</style>
