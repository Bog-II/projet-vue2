<template>
  <div id="library">
    <h1>Library</h1>
    <Articles :collec="collec"></Articles>
    <router-view name="locDown" @send-lab="$emit('send-lab', $event)"></router-view>
  </div>
</template>

<script>

import Articles from '../components/Articles.vue'
export default {
  name: 'Library',
  props: ['collec'],
  components: {
    Articles
  }
}
</script>

<style scoped>
#library {
  margin: max(10px, 4%);
  row-gap: 20px;
}
</style>
