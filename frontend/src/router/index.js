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
        component:()=>import('../components/home.vue')
      },
      {
        path:'visitor-form',
        name:"VisitorForm",
        component:()=>import('../components/form.vue')
      },
      {
        path:'login',
        name:"Login",
        component:()=>import('../components/login.vue')
      },
      {
        path:'sign-up',
        name:"SignUp",
        component:()=>import('../components/signUp.vue')
      }
    ]
  },
  {
    path:'/host',
    component:()=>import('../views/host.vue'),
    children:[
      {
        path:'',
        name:"Events",
        component:()=>import('../components/host/events.vue')
      },
      {
        path:'create-event',
        name:"CreateEvent",
        component:()=>import('../components/host/createEvent.vue')
      },
      {
        path:'visitors/:slug',
        name:"Visitors",
        component:()=>import('../components/host/visitor.vue')
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
