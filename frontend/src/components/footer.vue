<template>
  <div class="block">
    <footer class="footer">
      <div class="content has-text-centered">
      <p>Created By <strong>Abhishek Sharma</strong></p>
      </div>
    </footer>
  </div>
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
  
  $footer-background-color: #F5F5F5;
  $footer-padding:1rem 1rem 1rem;

  .block{
    margin-top: 2em;
    text-align: center;
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>