<template>
  <header class="fixed top-0 w-full px-1 bg-white border-b">
    <div class="flex justify-between mt-1">
      <router-link to="/">
        <h1 class="text-2xl font-bold font-mono mt-1 ml-1">Likead.</h1>
      </router-link>
      <div 
        v-if="currentUser"
        class="flex"
      >
      <router-link to="/create">
        <button
          class="mt-1.5 mr-4 focus:outline-none"
        ><fa-icon class="fa-lg" :icon="['far', 'plus-square']"></fa-icon></button>
      </router-link>
      <router-link to="/favs">
        <button
          class="mt-1.5 mr-3.5 focus:outline-none"
        ><fa-icon class="fa-lg text-red-500 " icon="heart"></fa-icon></button>
      </router-link>
        <button
          class="mr-1.5 focus:outline-none"
          @click="signOut"
        >
          <div 
            class="w-7 h-7 rounded-full bg-cover bg-center"
            :style=" 'background-image: url(' + currentUser.photoURL + ')' "
          ></div>
        </button>
        
      </div>
      <div v-else>
        <button
          class="mt-1.5 mr-2 focus:outline-none"
          @click="signIn"
        ><fa-icon class="fa-lg" icon="sign-in-alt"></fa-icon></button>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'
import { auth } from '@/main'
import { db } from '@/main' 

export default {
  data() {
    return {
      currentUser: {}
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  methods: {
    signIn () {
      const proviser = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(proviser)
      .then((result) => {
        alert('Hello, '+result.user.displayName+'!')
        db.collection('users').doc(result.user.uid).set({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          email: result.user.email
        })
      })
    },
    signOut() {
      if (window.confirm('Are You Sure to SignOut?')) {
        auth.signOut()
        .then(() => {
          alert('You SignOut.')
          this.$router.push('/')
          location.reload()
        })
      }
    }
  }
}
</script>