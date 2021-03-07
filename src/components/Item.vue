<template>
  <div class="list-none">
    <div class="flex">
      <div
        class="w-8 h-8 bg-cover bg-center rounded-full border border-black mr-2"
        :style=" 'background-image: url(' + user.photoURL + ')' "
      ></div>
      <div>
        <p class="text-xs font-bold">{{ user.displayName }}</p>
        <p class="text-xs text-gray-500">{{ post.createdAt }}</p>
      </div>
    </div>
    <div 
      v-if="post.image"
      class="w-full h-64 bg-cover bg-center my-2"
      :style=" 'background-image: url(' + post.image + ')' "
    ></div>
    <div class="flex justify mx-1 break-words">
      <h2 class="text-xl font-bold">{{ post.title }}</h2>
      <button v-if="myFavs.includes(post.id)" @click="unlike(post.id)" class="focus:outline-none ml-1.5">
        <fa-icon class="fa-lg ml-1.5 text-red-500" icon="heart"></fa-icon>
      </button>
      <button  v-else @click="like(post.title, post.id)" class="focus:outline-none ml-1.5">
        <fa-icon class="fa-lg ml-2" icon="heart"></fa-icon>
      </button>
      <div v-if="currentUser && currentUser.uid === post.uid">
        <button @click="remove(post.id)" class="focus:outline-none ml-1.5">
          <fa-icon class="ml-2 fa-lg" :icon="['far', 'trash-alt']"></fa-icon>
        </button>
      </div>
    </div>
    <p class="text-xs mb-2 leading-loose">{{ post.content }}</p>
  </div>
</template>

<script>
import { auth } from '@/main'
import { db } from '@/main'
export default {
  props: ['post'],
  data() {
    return {
      user: {},
      currentUser: {},
      myFavs: []
    }
  },
  firestore() {
    return {
      user: db.collection('users').doc(this.$props.post.uid),
    }
  },
  created() {
    auth.onAuthStateChanged(user => { 
      this.currentUser = user
      db.collection('users').doc(user.uid).collection('favs').get().then(snap => {
      const array = [];
      snap.forEach(doc => {
        array.push(doc.data());
      });
      this.myFavs = array.map(function(row) {
        return row['postId']
      })
    });
    })
  },
  methods: {
    remove(id) {
      if(window.confirm('Are you sure to delete the post?')) {
        db.collection('posts').doc(id).delete()
        .then(
          this.$router.push('/'),
          alert('The post was deleted.')
        )
      }
    },
    like(title, id) {
      const user = auth.currentUser
      db.collection('users').doc(user.uid).collection('favs').doc(id).set({
        favTitle: title,
        postId: id
      })
      .then(() => {
        this.$router.push('/favs')
      })
    },
    unlike(id) {
      const user = auth.currentUser
      db.collection('users').doc(user.uid).collection('favs').doc(id).delete()
      .then(() => {
        this.$router.push('/favs')
      })
    }
  }
}
</script>