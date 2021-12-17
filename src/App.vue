<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    
  </div>
</template>
<script>
export default {
  name: 'app',
  data(){
    return {
      lo:localStorage.getItem('user')
    }
  },
  // 防止数据丢失
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
ul{
  list-style: none;
}
body{
  margin: 0;
}
</style>