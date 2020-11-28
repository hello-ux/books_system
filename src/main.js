import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import router from './router/router'
import axios from 'axios'
// 引入element组件
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import './assets/global.css'
// 配置axios
Vue.prototype.$http = axios.create({
  baseURL : 'http://localhost:8999/api',
})
Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')