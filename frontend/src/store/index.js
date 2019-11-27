import Vue from 'vue'
import Vuex from 'vuex'
import createMutationSharer from 'vuex-shared-mutations'

Vue.use(Vuex);

let loginUsername=window.localStorage.getItem('loginUsername');
let loginToken=window.localStorage.getItem('loginToken');

export default new Vuex.Store({
  state: {
    loginToken:loginToken?loginToken:null,
    loginUsername:loginUsername?loginUsername:null
  },
  mutations: {
    login(state,host){
      state.loginToken=host.token;
      state.loginUsername=host.username;
      window.localStorage.setItem('loginToken',state.loginToken);
      window.localStorage.setItem('loginUsername',state.loginUsername);
    },
    logout(state){
      state.loginToken=null;
      state.loginUsername=null;
      window.localStorage.removeItem('loginToken');
      window.localStorage.removeItem('loginUsername');
    }
  },
  actions: {
  },
  modules: {
  }
})
