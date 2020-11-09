<template>
  <div class="home">
    <br><br>
         お問い合わせは <br>
      <a :href="`https://forms.gle/382A7nvtK7nKmbxZ9`" target="_blank" rel="noopener noreferrer">Googleフォーム</a> までお願いします。
    <br><br><br><Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'ReqForm',
  components: {
    Footer
  }
}
</script>
