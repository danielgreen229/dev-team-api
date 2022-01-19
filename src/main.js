import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueLodash from 'vue-lodash'
import lodash from 'lodash'


Vue.use(VueLodash, { name: 'custom' , lodash: lodash })


Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)


Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  vuetify : new Vuetify(),
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
