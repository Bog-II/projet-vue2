<template>
  <div id="basket">
    <h2>In my basket :</h2>
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
          <tr v-for="(v, index) in $store.state.basket" :key="index">
            <td>{{ v.name }}</td>
            <td>{{ v.code }}</td>
            <td>{{ v.mortalite }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn @click="sendToLab">Send to the lab</v-btn>
  </div>
</template>


<script>

import { Virus } from "../model";

export default {
  name: 'Basket',
  props: ['operation', 'name', 'code'],
  data: () => {
    return {
      basket: []
    }
  },
  methods: {
    sendToLab: function () {
      this.$emit('send-lab', this.basket);
      this.basket.splice(0, this.basket.length)
    }
  },
}
</script>

<style scoped>
#basket {
  padding: max(10px, 5%);
}
</style>
