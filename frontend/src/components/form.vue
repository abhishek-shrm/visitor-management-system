<template>
  <section>
    <div class="block">
      <h1 class="title is-4">Visitor's Form</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <div class="control">
          <input type="text" v-model="firstName" class="input" placeholder="Enter your first name">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="text" v-model="lastName" class="input" placeholder="Enter your last name">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="email" v-model="email" class="input" placeholder="Enter your email">
        </div>
      </div>
      <div class="field">
        <select v-model="visitEvent">
          <option disabled value="">Event(Host)</option>
          <option v-for="i in events" :key="i._id">
            {{i.eventName}}({{i.hostName}})
          </option>
        </select>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" v-model="mobile" type="tel" placeholder="Enter mobile number" pattern="[0-9]{10}">
          <span class="icon is-small is-left">+91</span>
        </p>
        <p class="help is-info">All fields are mandatory.</p>
      </div>
      <button class="button is-rounded is-primary" :disabled="isDisabled" @click="submit">
        <span>Submit</span>
      </button>
    </div>
  </section>
</template>

<script>

import Swal from 'sweetalert2'
import API from '../api'

export default {
  data(){
    return{
      firstName:'',
      lastName:'',
      mobile:'',
      email:'',
      visitEvent:'',
      events:'',
    }
  },
  created(){
    API().get('/events/form').then(res=>{
      this.events=res.data;
    }).catch(error=>{
      console.log(error);
    });
  },
  methods:{
    submit(){
      var host=this.visitEvent.split(')')[0].split('(')[1];
      var event=this.visitEvent.split(')')[0].split('(')[0];
      var address,username,eventSlug;
      this.events.forEach(ev=>{
        if(ev.eventName==event){
          address=ev.venue;
          username=ev.username;
          eventSlug=ev.eventSlug;
        }
      });
      //checkin time
      var t=new Date().toString().split(' ');
      var time=`${t[2]} ${t[1]} ${t[3]} ${t[4].split(':')[0]}:${t[4].split(':')[1]}`;
      
      //object with visitors details
      var visitorDetails={
        name:this.firstName+' '+this.lastName,
        mobile:this.mobile,
        email:this.email,
        username:username,
        host:host,
        event:event,
        eventSlug:eventSlug,
        addressVisited:address,
        checkIn:time
      };
      API().post('/visitorForm',visitorDetails)
      .then(res=>{
        if(res.data.errors){
          Swal.fire('Error!!',res.data.errors,'error');
        }
        if(res.data.success){
          this.firstName='';
          this.lastName='';
          this.email='';
          this.mobile='';
          this.visitEvent='';
          Swal.fire('Welcome!!',visitorDetails.name,'success');
        }
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  computed:{
    isDisabled(){
      return this.mobile.length<10 ||this.firstName.length<2 || this.visitEvent.length<2 || this.lastName.length<2 || this.email.length<5;
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
    margin-top: 2.5em;
    text-align: center;
  }
  .label {
    margin-left: 0.5em;
    top:20px;
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
    button{
      z-index: 1;
      background: linear-gradient(135deg,$primary 10%,$info 100%);
    }
    button:focus{
      background: $primary;
	    box-shadow: 0 0 0 3px $primary;
	    color: $primary;
    }
    button:hover{
      background: transparent;
	    box-shadow: 0 0 0 3px $primary;
	    color: $primary;
    }
    select{
      background-color: #fff;
      font-size: 1em;
      border: 0;
      border-bottom: 2px $info solid;
    }
    select:hover{
      border: 0;
      border-bottom: 2px $primary solid;
    }
    select:active{
      border: 0;
      border-bottom: 2px $primary solid;
    }
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>