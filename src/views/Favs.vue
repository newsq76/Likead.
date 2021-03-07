<template>
  <div class="home">
    <h2 class="mb-3 text-2xl font-bold font-mono text-center">MyFavorites</h2>
    <ul
      v-for="fav in favs"
      :key="fav.id"
      :fav="fav"
      class="list-none"
    >
      <li class="font-bold text-lg text-center">{{ fav.favTitle }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from '@/main'
import { auth } from '@/main'

export default {
  name: 'favs',
  data() {
    return {
      favs: [],
    }
  },
  created() {
    auth.onAuthStateChanged(user => { 
      db.collection('users').doc(user.uid).collection('favs').get().then(snap => {
      const array = [];
      snap.forEach(doc => {
        array.push(doc.data());
      });
      this.favs = array
    });
    })
  },
}
</script>