<template>
  <!-- <div>
    <table>
      <tr>
        <td>Name</td>
        <td>Code</td>
        <td>% Mortality</td>
      </tr>
      <tr v-for="(v, index) in collec" :key="index">
        <td>{{ v.name }}</td>
        <td>{{ v.code }}</td>
        <td>{{ v.mortalite }}</td>
        <td>
          <button
            @click="$router.push({ path: '/library/addbasket?name=' + v.name + '&code=' + v.code })"
          >Clone virus for the lab</button>
        </td>
      </tr>
    </table>
  </div>-->

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
            <v-btn
              @click="$router.push({ path: '/library/addbasket?name=' + v.name + '&code=' + v.code })"
            >Clone virus for the lab</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

export default {
  name: 'Articles',
  props: ['collec']
}
</script>

<style scoped>
</style>
