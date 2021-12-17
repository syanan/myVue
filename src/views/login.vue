<!--  -->
<template>
  <div class="home">
      <ul>
          <li @click="jumpDraw">画图工具</li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
      jumpDraw(){
          this.$router.push({
              path:'/draw'
          })
      }
  }
}

</script>
<style lang='scss' scoped>
.home{
    ul{
        li{
            cursor: pointer;
        }
    }
}
</style>