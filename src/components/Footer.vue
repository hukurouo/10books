<template>
  <div>
    <hr>
    <div id="nav">
       <router-link to="/about">サイトについて</router-link>
       |  
       <router-link to="/form">要望フォーム</router-link> 
       | 
       <router-link to="/faq">FAQ</router-link>
    </div>
    <br>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  props: {
  },
  methods: {
  }
}
</script>