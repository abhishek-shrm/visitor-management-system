<template>
  <section>
    <div class="block">
      <h1 class="title is-3">Visitor Management System</h1>
    </div>
    <div class="card">
      <div class="card-content">
        <p>
          VMS stands for Visitor Management Software. It is a web application that helps event host/organizer to manage visitor's check-in and check-out. Event hosts can create multiple events through this application. When a visitor checks-in at the venue, the host is notified through mail and SMS. When visitor checks-out from the venue, he is greeted with a goodbye message.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{

    }
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
    color:$primary;
  }
  .card {
    width: 300px;
    margin-bottom: 1.5em;
    border-radius: 25px 25px;
    display: inline-block;
    margin-left: 2.5em;
    margin-right: auto;
    text-align: justify;
  }
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>