<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Events</h1>
      <p class="content is-small">You can see visitors's list of corresponding event by clicking Visitors button.</p>
    </div>
    <div class="buttons is-centered">
    <router-link class="button is-primary is-rounded" :to="{name:'CreateEvent'}" tag="a">
      Create a new Event
    </router-link>
    </div>
    <table class="table is-striped is-hoverable">
      <thead>
        <th scope="col">Event Name</th>
        <th scope="col"> Venue</th>
        <th scope="col">Visitors</th>
      </thead>
      <tr v-for="event in events" :key="event._id">
        <td scope="row">{{event.eventName}}</td>
        <td scope="row">{{event.venue}}</td>
        <td scope="row">
          <router-link class="button is-info is-rounded is-small" :to="{name:'Visitors',params:{slug:event.eventSlug}}" tag="a">
            Visitors
          </router-link>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>

import API from '../../api'

export default {
  data(){
    return{
      events:''
    }
  },
  created(){
    var axiosConfig={
      headers:{
        'Authorization':'Bearer '+ this.$store.state.loginToken
      }
    };
    API().post('/events',{
      username:this.$store.state.loginUsername
    },axiosConfig).then(res=>{
      this.events=res.data;
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
    margin-top: 2em;
    text-align: center;
  }
  .block>p {
    text-align: center;
    color: $info;
    margin-left: 2em;
    margin-right: 2em;
  }
  .table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
  }
  
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>