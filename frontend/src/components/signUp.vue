<template>
  <section>
    <div class="block">
      <h1 class="title is-4">Sign Up</h1>
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
          <input type="text" v-model="username" class="input" placeholder="Enter your username">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="email" v-model="email" class="input" placeholder="Enter your email">
        </div>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" v-model="mobile" type="tel" placeholder="Enter mobile number" pattern="[0-9]{10}">
          <span class="icon is-small is-left">+91</span>
        </p>
      </div>
      <div class="field">
        <div class="control">
          <input type="password" v-model="password" class="input" placeholder="Enter password">
        </div>
      </div>
      <div class="field">
        <p class="control has-icons-right">
          <input class="input" v-model="confirmPassword" type="password" placeholder="Confirm Password">
          <span v-if="(password!==confirmPassword) && password.length" class="icon is-small is-right" style="color:red">
            <i class="fa fa-times"></i>
          </span>
          <span v-if="(password==confirmPassword) && password.length" class="icon is-small is-right" style="color:green">
            <i class="fa fa-check"></i>
          </span>
        </p>
      </div>
      <button class="button is-rounded is-primary" :disabled="isDisabled" @click="signUp">
        <span>Sign Up</span>
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
      username:'',
      password:'',
      mobile:'',
      email:'',
      confirmPassword:''
    }
  },
  methods:{
    signUp(){
      var hostData={
        firstName:this.firstName,
        lastName:this.lastName,
        username:this.username,
        email:this.email,
        mobile:this.mobile,
        password:this.password
      };
      API().post('sign-up',hostData)
      .then(res=>{
        if(res.data.errors){
          Swal.fire('Error!!',res.data.errors,'error');
        }
        if(res.data.success){
          this.firstName='';
          this.lastName='';
          this.username='';
          this.email='';
          this.mobile='';
          this.password='';
          this.confirmPassword='';
          Swal.fire('Yeah!!','You have signed up successfully!!','success').then(result=>{
            if(result.value){
              this.$router.push({name:'Login'});
            }
          });
        }
      })
      .catch(error=>{
        console.log(err);
      });
      // Swal.fire('Yeah!!','You have signed up successfully!!','success').then(result=>{
      //   console.log(result.value);
      // });
    }
  },
  computed:{
    isDisabled(){
      return this.mobile.length<10 ||this.firstName.length<2 || this.lastName.length<2 || this.username.length<2 || this.confirmPassword.length<2 || this.password.length<2 || this.email.length<3;
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
  // $input-focus-border-color:0;
  // $input-focus-color:0;
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
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>