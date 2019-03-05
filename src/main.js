import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
// import Button from "ant-design-vue/lib/button";
import "ant-design-vue/dist/antd.css";

import request from '@/utils/request'
Vue.prototype.$http = request

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
