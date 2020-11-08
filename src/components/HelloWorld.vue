<template>
  <div class="hello">
    <div class="content">
      <h4>#名刺代わりの小説10選</h4>
      のページを作れるサイトです
      <br><br>
      <img id="top_image" src="https://firebasestorage.googleapis.com/v0/b/books-card-maker.appspot.com/o/rapture_20201108190309.png?alt=media&token=8882df9c-fe2c-42a3-a24e-090ad5dac348" alt="">
      <br><br>
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
