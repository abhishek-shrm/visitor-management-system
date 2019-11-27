<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Login</h1>
    </div>
    <div class="formInput">
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" v-model="username" type="text" placeholder="Enter your username">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" v-model="password" type="password" placeholder="Enter your password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <button class="button is-rounded is-primary" :disabled="isDisabled" @click="loginHost">
        <span>Login</span>
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
      username:'',
      password:''
    }
  },
  methods:{
    loginHost(){
      API().post('login',{
        username:this.username,
        password:this.password
      }).then(res=>{
        if(res.data.errors){
          Swal.fire('Error!!',res.data.errors,'error');
        }else if(res.data.success){
          var host={
            username:res.data.username,
            token:res.data.token
          };
          this.$store.commit('login',host);
          this.$router.push({name:'Events'});
          Swal.fire('Successful!!',`Welcome ${res.data.username}, you have logged in successfully.`,'success');
        }
      }).catch(error=>{
        console.log(error);
      });
    }
  },
  computed:{
    isDisabled(){
      return this.password.length<2 || this.username.length<2;
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