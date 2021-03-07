<template>
  <div class="home">
    <Item v-for="post in posts"
      :key="post.id"
      :post="post"
      class="list-none"
    />
  </div>
</template>

<script>
import Item from '@/components/Item'
import { db } from '@/main'

export default {
  name: 'home',
  components: {
    Item
  },
  data() {
    return {
      posts: []
    }
  },
  firestore() {
    return {
      posts: db.collection('posts').orderBy("createdAt", "asc")
    }
  }
}
</script>
