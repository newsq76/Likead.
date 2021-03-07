<template>
  <div>
    <h2 class="text-2xl font-bold font-mono text-center">Create</h2>
    <input
      class="block w-full border border-block my-5 p-2 focus:outline-none"
      type="text"
      placeholder="Title"
      v-model="title"
    >
    <input
      class="block w-full border border-block my-5 p-2 focus:outline-none"
      type="file"
      @change="selectedFile"
    >
    <textarea
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      cols="30"
      rows="5"
      placeholder="Content"
      v-model="content"
    ></textarea>
    <div class="text-center">
      <button
        class="focus:outline-none font-bold"
        @click="share"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { auth } from '@/main'
import { db } from '@/main'
import { storageRef } from '@/main'

export default {
  data() {
    return {
      uploadFile: '',
      title: '',
      image: '',
      content: '',
      currentUser: {}
    }
  },
  created() {
    auth.onAuthStateChanged(user => { 
      this.currentUser = user
    })
  },
  methods: {
    selectedFile: function(event) {
      let imageFile = event.target.files[0]
      this.uploadFile = imageFile
    },
    share() {
      const date = this.$date(new Date(), "dd MMMM, yyyy")

      storageRef.child('images/' + this.uploadFile.name).put(this.uploadFile)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL()
        .then(url => {
          db.collection('posts').add({
          title: this.title,
          image: url,
          content: this.content,
          createdAt: date,
          uid: this.currentUser.uid
        })
        .then(() => {
          alert('The post got shared.')
          this.$router.push('/')
        })
        })
      }).catch(error => {});
    }
  }
}
</script>