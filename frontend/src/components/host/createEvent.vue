<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Create Event</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <div class="control">
          <input type="text" v-model="eventName" class="input" placeholder="Enter event name">
        </div>
      </div>
      <div class="field">
        <textarea cols="30" class="textarea" rows="3" v-model="venue" placeholder="Enter venue"></textarea>
      </div>
      <button class="button is-rounded is-primary" :disabled="isDisabled" @click="submitEvent">
        <span>Submit</span>
      </button>
    </div>
  </section>
</template>

<script>

import Swal from 'sweetalert2'
import API from '../../api'

export default {
  data(){
    return{
      eventName:'',
      venue:'',
      username:'',
      auth:''
    }
  },
  created(){
    this.username=this.$store.state.loginUsername;
    this.auth='Bearer '+ this.$store.state.loginToken;
  },
  methods:{
    submitEvent(){
      Swal.fire({
        title:'Are you sure?',
        text:'You want to create this event.',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes!',
        cancelButtonText:'No!'
      }).then((r)=>{
        if(r.value){
          var eventDetails={
            username:this.username,
            eventName:this.eventName,
            venue:this.venue
          };
          var axiosConfig={
            headers:{
              'Authorization':this.auth
            }
          };
          API().post('create-event',eventDetails,axiosConfig).then(res=>{
            if(res.data.errors){
              Swal.fire('Error!!',res.data.errors,'error');
            }else if(res.data.success){
              this.eventName='';
              this.venue='';
              Swal.fire('Yeah!!','Event created successfully!!','success').then(result=>{
                if(result.value){
                  this.$router.push({name:'Events'});
                }
              });
            }
          }).catch(error=>{
            console.log(error);
          });
        }
      });
    }
  },
  computed:{
    isDisabled(){
      return this.eventName.length<2 || this.venue.length<2;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";
  $input-border-color:none;
  $input-shadow:none;
  $input-hover-border-color:0;
  $input-radius:0;
  $input-focus-box-shadow-color:none;

  .block>h1 {
    margin-top: 2em;
    text-align: center;
  }
  .formInput {
    margin: auto 2em;
    margin-bottom: 3em;
    input{
      border:0;
      border-bottom: 2px solid $info;
    }
    input:focus{
      border:0;
      border-bottom: 2px solid $primary;
    }
    input:hover{
      border:0;
      border-bottom: 2px solid $primary;
    }
    textarea{
      border:0;
      border-bottom: 2px solid $info;
    }
    textarea:focus{
      border:0;
      border-bottom: 2px solid $primary;
    }
    textarea:hover{
      border:0;
      border-bottom: 2px solid $primary;
    }
    button:focus{
      background: $primary;
	    box-shadow: 0 0 0 3px $primary;
	    color: $primary;
    }
  }
  
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>