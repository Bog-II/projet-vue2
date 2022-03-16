<template>
  <v-app-bar>
    <v-tabs id="tabs">
      <v-tab
        v-for="(t, index) in titles"
        :key="index"
        @click="$router.push({ path: t.path })"
      >{{ t.text }}</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['titles']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tabs {
  display: flex;
  justify-content: center;
}
</style>
