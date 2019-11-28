<template>
  <section>
    <div class="block">
      <h1 class="title is-4">{{event}} Visitors</h1>
    </div>
    <table v-if="wnWidth>550" class="table is-striped is-hoverable">
      <thead>
        <th align='center' scope="col">S No.</th>
        <th align='center' scope="col">Name</th>
        <th align='center' scope="col">Check-In</th>
        <th align='center' scope="col">Check-Out</th>
        <th align='center' scope="col">Mobile</th>
        <th align='center' scope="col">Email</th>
      </thead>
      <tr v-for="(visitor,i) in visitors" :key="visitor._id">
        <td align='center'>{{i+1}}</td>
        <td align='center'>{{visitor.name}}</td>
        <td align='center'>{{visitor.checkIn}}</td>
        <td v-if="!(visitor.checkOut==null)" align='center'>{{visitor.checkOut}}</td>
        <td v-if="visitor.checkOut==null" align='center'>
          <button class="button is-rounded is-danger is-small"  @click="checkOut(visitor._id)">
            Check Out
          </button>
        </td>
        <td align='center'>{{visitor.mobile}}</td>
        <td align='center'>{{visitor.email}}</td>
      </tr>
    </table>
    <div v-if="wnWidth<550" class="columns">
      <div class="column">
        <div class="card" v-for="(visitor,i) in visitors" :key="visitor._id">
          <div class="card-content">
            <p style="color:grey"><strong>S No.:</strong> #{{i+1}}</p>
            <p><strong>Name:</strong> {{visitor.name}}</p>
            <p><strong>Check-In:</strong> {{visitor.checkIn}}</p>
            <p v-if="!(visitor.checkOut==null)"><strong>Check-Out:</strong>
            {{visitor.checkOut}}
            </p>
            <div v-if="visitor.checkOut==null" class="checkOut">
              <p><strong>Checkout: </strong></p>
              <button v-if="visitor.checkOut==null"   class="button is-rounded is-danger is-small"  @click="checkOut(visitor._id)">
                Check Out
              </button>
            </div>
            <p><strong>Mobile:</strong> {{visitor.mobile}}</p>
            <p><strong>Email:</strong> {{visitor.email}}</p>
          </div>
        </div>
      </div>
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
      event:'',
      username:'',
      auth:'',
      axiosConfig:'',
      wnWidth:window.screen.width
    }
  },
  created(){
    this.username=this.$store.state.loginUsername;
    this.auth='Bearer '+ this.$store.state.loginToken;
    this.axiosConfig={
      headers:{
        'Authorization':this.auth
      }
    };
    API().post('visitorList',{
      eventSlug:this.eventSlug,
      username:this.username
    },this.axiosConfig).then(res=>{
      this.visitors=res.data;
      this.event=res.data[0].event;
    }).catch(error=>{
      console.log(error);
    }); 
  },
  methods:{
    checkOut(id){
      Swal.fire({
        title:'Are you sure?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes!',
        cancelButtonText:'No!'
      }).then((r)=>{
        if(r.value){
        var t=new Date().toString().split(' ');
        var time=`${t[2]} ${t[1]} ${t[3]} ${t[4].split(':')[0]}:${t[4].split(':')[1]}`;
        API().post('checkout',{
          id,
          time
        },this.axiosConfig).then(res=>{
          API().post('visitorList',{
            eventSlug:this.eventSlug,
            username:this.username
          },this.axiosConfig).then(res=>{
            this.visitors=res.data;
            Swal.fire('Checked out successfully!!','','success');
          }).catch(error=>{
            console.log(error);
          });
        }).catch(err=>{
          console.log(err);
        });
        }
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
    margin-top: 2.5em;
    text-align: center;
  }
  .table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
  }
  .card{
    height: 485.950;
    width: 19.5em;
    margin-bottom: 1em;
    border-radius: 25px 25px;
    display: inline-block;
    margin-left: 2em;
    margin-right: auto;
    .checkOut{
      p{
        display: inline-block;
        margin-top:0.5em;
      }
      button{
        margin-top:0.5em;
        margin-left:1em;
        display: inline-block;
      }
      margin-bottom: 0.5em;
    }
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>