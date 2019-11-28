<template>
  <section>
    <div class="pageHeader">
      <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a id="brand" v-if="!this.$store.state.loginUsername" class="navbar-item" href="/">
          <img src="../assets/logo.png" width="112" height="52">
        </a>
        <a v-if="this.$store.state.loginUsername" id="brand" class="navbar-item" href="/host">
          <img src="../assets/logo.png" width="112" height="70">
        </a>

        <a role="button" class="navbar-burger burger" @click="toggleClass" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <p class="navbar-item mobileHello" v-if="this.$store.state.loginUsername && wnWidth<1024"><strong>Hi, {{$store.state.loginUsername}}</strong></p>
          <router-link v-if="!this.$store.state.loginUsername" :to="{name:'Home'}" @click="toggleClass" class="navbar-item" tag="a">Home</router-link>

          <router-link v-if="!this.$store.state.loginUsername" :to="{name:'VisitorForm'}" @click="toggleClass" class="navbar-item" tag="a">Visitor's Form</router-link>
        </div>
        <div class="navbar-end">
          <p class="navbar-item desktopHello" v-if="this.$store.state.loginUsername && wnWidth>1024"><strong>Hi, {{$store.state.loginUsername}}</strong></p>
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" v-if="!this.$store.state.loginUsername" href="/sign-up">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" v-if="!this.$store.state.loginUsername" href="/login">
                Log in
              </a>
              <a class="button is-danger" v-if="this.$store.state.loginUsername" @click="logout">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </div>
  </section>
</template>

<script>

import Swal from 'sweetalert2'

export default {
  data(){
    return{
      wnWidth:window.screen.width
    }
  },
  methods:{
    toggleClass() {
      document.querySelector('.navbar-burger').classList.toggle('is-active');
      document.querySelector('.navbar-menu').classList.toggle('is-active');
    },
    logout(){
      Swal.fire('Congratulations!!','You have logged out successfully!!','success').then(result=>{
        setTimeout(()=>{
          this.$store.commit('logout');
          this.$router.push({name:'Login'});
        },500);
      });
    } 
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
  #brand {
    padding: 0;
    padding-left: 1em;
  }
  #brand:hover{
    transform: scale(1.1);
  }
  .myCustomClass{
    margin-top: 4em;
  }
  .display-none{
    display:none !important;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>