import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementui from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MyPlugin from "@/components/myPlugin.js"
import "./assets/icon/iconfont.css"
import vConsole from "@/util/vconsole"
Vue.use(elementui)
Vue.use(MyPlugin)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
