<template>
  <div class="content">
    <div class="about_page">
      <h3>このサイトについて</h3>
      <br>
      <h4>作った人</h4>
      hukurouo
      <br> <br>
      <a :href="`https://forms.gle/17zWrZu4Q2EQXokt9`" target="_blank" rel="noopener noreferrer">Twitter</a> /
      <a :href="`https://forms.gle/17zWrZu4Q2EQXokt9`" target="_blank" rel="noopener noreferrer">GitHub</a> /
      <a :href="`https://forms.gle/17zWrZu4Q2EQXokt9`" target="_blank" rel="noopener noreferrer">Blog</a>
            <br> <br>
      <br>
      
      <h4>お問い合わせ</h4>
      <a :href="`https://forms.gle/17zWrZu4Q2EQXokt9`" target="_blank" rel="noopener noreferrer">Googleフォーム</a> までお願いします。
      <br><br><br>


      <h4>免責事項</h4>

<div class="nagai_text">
当サイトの情報は、無料で提供されています。当サイトを利用したウェブサイトの閲覧や情報収集については、情報がユーザーの需要に適合するものか否か、情報の保存や複製その他ユーザーによる任意の利用方法により必要な法的権利を有しているか否か、著作権、秘密保持、名誉毀損、品位保持および輸出に関する法規その他法令上の義務に従うことなど、ユーザーご自身の責任において行っていただきますようお願いいたします。
当サイトの御利用につき、何らかのトラブルや損失・損害等につきましては一切責任を問わないものとします。
当サイトが紹介しているウェブサイトやソフトウェアの合法性、正確性、道徳性、最新性、適切性、著作権の許諾や有無など、その内容については一切の保証を致しかねます。
当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</div>
      <br><br><br>
<h4>Amazonリンクについて</h4>

<div class="nagai_text">
10冊メーカーは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
      </div><br><br><br>
<h4>アクセス解析ツールについて</h4>

<div class="nagai_text">
当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
</div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
  components: {
    Footer
  }
}
</script>

<style>
.about_page{
  width: 90%;
  margin: auto;
}
.nagai_text{
  text-align: left;
  font-size: 14px;
  color: rgb(85, 85, 85);
}
</style>
