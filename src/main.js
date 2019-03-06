// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueIcon from 'vue-icon'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

import Default from "./components/Default";
import DashBoard from "./components/DashBoard";

Vue.component('default-layout', Default)
Vue.component('dashboard-layout', DashBoard)
Vue.component('no-layout', )

Vue.config.productionTip = false

// Vue.use(Vuetify)
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

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>',
// })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')