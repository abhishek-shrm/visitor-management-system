<template>
  <section>
    <div class="block">
      <h1 class="title is-4">{{visitors[0].event}} Visitors</h1>
    </div>
  </section>
</template>

<script>

import Swal from 'sweetalert2'
import API from '../../api'

export default {
  data(){
    return{
      eventSlug:this.$route.params.slug,
      visitors:'',
      username:'',
      auth:''
    }
  },
  created(){
    this.username=this.$store.state.loginUsername;
    this.auth='Bearer '+ this.$store.state.loginToken;
    var axiosConfig={
      headers:{
        'Authorization':this.auth
      }
    };
    API().post('visitorList',{
      eventSlug:this.eventSlug,
      username:this.username
    },axiosConfig).then(res=>{
      this.visitors=res.data;
    }).catch(error=>{
      console.log(error);
    }); 
  },
  methods:{

  },
  computed:{

  }
}
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  .block>h1 {
    margin-top: 2.5em;
    text-align: center;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>