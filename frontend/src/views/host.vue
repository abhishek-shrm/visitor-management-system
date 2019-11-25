<template>
  <div class="block">
    <hostHeader></hostHeader>
      <router-view></router-view>
    <hostFooter></hostFooter>
  </div>  
</template>

<script>

import hostHeader from '../components/host/headerHost'
import hostFooter from '../components/host/footerHost'

export default {

  components:{
    hostHeader,
    hostFooter
  }
  
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>