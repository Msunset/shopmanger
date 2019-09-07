// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/base.css'
// import axios from './plugin/http.js'
import axios from 'axios'
import './plugin/dateFormat.js'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://api.xiaomadagege.cn:8808/api/private/v1/'
Vue.use(ElementUI)
// Vue.use(axios)
// Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('dateFormat',value =>{
    return new Date(value).Format("yyyy-MM-dd hh:mm")
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
