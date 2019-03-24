// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './components/store/shopping-cart'
import 'vuetify/dist/vuetify.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueIcon from 'vue-icon'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import VueDebounce from 'vue-debounce'
import LodashDebounce from 'lodash.debounce'
import axios from 'axios'

import Default from "./components/Default";
import DashBoard from "./components/DashBoard";

Vue.component('default-layout', Default)
Vue.component('dashboard-layout', DashBoard)
Vue.component('no-layout', )

Vue.config.productionTip = false

Vue.use(VueDebounce,{
listenTo: 'oninput'
})
Vue.use(LodashDebounce)
Vue.use(Vuetify, {
  iconfont: [
    'mdi',
    'md',
    'fa'
   ],// 'md' || 'mdi' || 'fa' || 'fa4'
  icons: {
    'product': 'mdi-dropbox',
    'support': 'mdi-lifebuoy',
    'steam': 'mdi-steam-box',
    'pc': 'mdi-desktop-classic',
    'xbox': 'mdi-xbox',
    'playstation': 'mdi-playstation',
    'switch': 'mdi-nintendo-switch',
  }
})

Vue.use(BootstrapVue)
Vue.use(VueIcon, 'v-icon')
Vue.use(Vuex)

axios.defaults.baseURL = `http://CloudApi-env-1.4hzzpupupu.ap-southeast-1.elasticbeanstalk.com`;
// axios.defaults.baseURL = `http://localhost:8080`;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>',
// })
new Vue({
  router,
  store,
  // mounted() {
  //   axios.defaults.baseURL = "http://localhost:8080";
  //   axios.interceptors.request.use(function (config) {
  //     config.baseURL = "http://localhost:8080";
  //     let token = localStorage.getItem("cdpmToken")
  //     if(token) {
  //       config.headers["Authorization"] = 'Bear ' + token;
  //     }
  //     return config;
  //   })
  // },
  render: h => h(App)
}).$mount('#app')
