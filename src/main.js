import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/css/tailwind.css'
import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'
import 'firebase/storage'
import VueDateFns from "vue-date-fns";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faSignInAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

Vue.component('fa-icon', FontAwesomeIcon)
library.add(faPlusSquare, faSignOutAlt, faSignInAlt, faTrashAlt, faHeart)

Vue.use(VueDateFns);

Vue.use(firestorePlugin)

firebase.initializeApp({              
  apiKey: "AIzaSyCz9T1195Ed0UctglXVOJPDLc7vmofLX84",
  authDomain: "likead-2f4ff.firebaseapp.com",
  projectId: "likead-2f4ff",
  storageBucket: "likead-2f4ff.appspot.com",
  messagingSenderId: "278695847215",
  appId: "1:278695847215:web:ad4cdd041ef115e997edda"
})

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storageRef = firebase.storage().ref()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
