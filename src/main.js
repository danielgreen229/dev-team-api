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



import firebase from 'firebase/app'
import 'firebase/auth';




let configApp = {
  apiKey: "AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis",
  authDomain: "interview-5ac2c.firebaseapp.com",
  projectId: "interview-5ac2c",
}

let adminApp = firebase.initializeApp(configApp)



let app



firebase.auth().onAuthStateChanged(() => {
  if(!app) {
  	console.log(app)
	app = new Vue({
  		router,
  		store,
  		vuetify : new Vuetify(),
  		render: function (h) { return h(App) }
		}).$mount('#app')
	}
})

