import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component:()=>import('../views/visitor.vue'),
    children:[
      {
        path:'',
        name:"Home",
        component:()=>import('../components/home.vue'),
        beforeEnter: (to, from, next) => {
          if(!store.state.loginToken&&!store.state.loginUsername){
            next();
          }else{
            next('/host');
          }
        }
      },
      {
        path:'visitor-form',
        name:"VisitorForm",
        component:()=>import('../components/form.vue'),
        beforeEnter: (to, from, next) => {
          if(!store.state.loginToken&&!store.state.loginUsername){
            next();
          }else{
            next('/host');
          }
        }
      },
      {
        path:'login',
        name:"Login",
        component:()=>import('../components/login.vue'),
        beforeEnter: (to, from, next) => {
          if(!store.state.loginToken&&!store.state.loginUsername){
            next();
          }else{
            next('/host');
          }
        }
      },
      {
        path:'sign-up',
        name:"SignUp",
        component:()=>import('../components/signUp.vue'),
        beforeEnter: (to, from, next) => {
          if(!store.state.loginToken&&!store.state.loginUsername){
            next();
          }else{
            next('/host');
          }
        }
      },
      {
        path:'host',
        component:()=>import('../components/host/host.vue'),
        children:[
          {
            path:'',
            name:"Events",
            component:()=>import('../components/host/events.vue'),
            beforeEnter: (to, from, next) => {
              if(store.state.loginToken&&store.state.loginUsername){
                next();
              }else{
                next('/login');
              }
            }
          },
          {
            path:'create-event',
            name:"CreateEvent",
            component:()=>import('../components/host/createEvent.vue'),
            beforeEnter: (to, from, next) => {
              if(store.state.loginToken&&store.state.loginUsername){
                next();
              }else{
                next('/login');
              }
            }
          },
          {
            path:'visitors/:slug',
            name:"Visitors",
            component:()=>import('../components/host/visitor.vue'),
            beforeEnter: (to, from, next) => {
              if(store.state.loginToken&&store.state.loginUsername){
                next();
              }else{
                next('/login');
              }
            }
          }
        ]
      }
    ]
  },
  {
    path:'/:any',
    name:"Error",
    component:()=>import('../views/error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
