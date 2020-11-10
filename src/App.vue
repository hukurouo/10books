<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">TOP</router-link> |
      <router-link to="/create">10選をつくる</router-link> | 
      <router-link to="/search">検索</router-link> | 
      <router-link to="/timeline">新着</router-link>
      <hr>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  methods : {
    createTitleDesc : function(routeInstance){
         // タイトルを設定
        if(routeInstance.meta.title){
            var setTitle = routeInstance.meta.title;
            document.title = setTitle;
        } else {
            document.title = '10冊メーカー'
        }
    } 
  },
   mounted : function(){
      var routeInstance = this.$route;
      this.createTitleDesc(routeInstance);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media screen and (min-width: 768px) {
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 800px;
  margin-left: auto;
    margin-right: auto;
}
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
