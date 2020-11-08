<template>
<div> </div>
</template>

<script>

export default {
  name: 'Redirect',
  created(){
    const userId = this.$route.params.id
    this.$router.push({ path: `/id/${userId}` }) 
  },
}

</script>