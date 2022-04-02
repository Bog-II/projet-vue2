<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
          <th class="text-left">% Mortality</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(v, index) in collec" :key="index">
          <td>{{ v.name }}</td>
          <td>{{ v.code }}</td>
          <td>{{ v.mortalite }}</td>
          <td>
            <v-btn @click="addToBasket(v)">Clone virus for the lab</v-btn>

          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'Articles',
  props: ['collec'],
  methods: {
    addToBasket(virus) {
      this.$store.commit('addToBasket',virus)
      // this.$router.push({ path: '/library/view' }).catch(()=>{})
    }
  }
}
</script>

<style scoped>
</style>
