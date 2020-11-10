<template>
  <div class="container">
      <div v-for="(item) in result" :key="item.id">
        <a :href="`/id/${item.id}`" target="_blank" rel="noopener noreferrer" >{{item.name}}さんの10選</a> <br><br>
      </div>
    <br> <br> <br>
    <Footer/>
  </div>
</template>

<script>
import firebase from 'firebase'
import Footer from '@/components/Footer.vue'


export default {
  name: 'Timeline',
  components: {
    Footer
  },
  data () {
    return {
      result: [],
    }
  },
  created(){
    var db = firebase.firestore();
    var docRef = db.collection("cards").orderBy("serial_number", "desc").limit(10)

    docRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.result.push({name: doc.data().name, id: doc.id})
            });
    }).catch(() => {
      docRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.result.push({name: doc.data().name, id: doc.id})
            });
        })
    })

  },
  methods: {
  },
}

</script>

<style>
.search_field{
  display: flex;
  width: 90%;
  margin: 0 auto;
  max-width: 500px;
}
.search_input_field{
  width: 90%;
  max-width: 450px;
  padding-right: 10px;
}
</style>