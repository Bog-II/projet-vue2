<template>
  <div id="laboratoire">
    <h1>Labo</h1>
<!--    <v-simple-table>-->
<!--      <template v-slot:default>-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th class="text-left">Virus Name</th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr v-for="(v, index) in collec" :key="index">-->
<!--            <td>{{ v.name }}</td>-->
<!--            <td>{{ v.code }}</td>-->
<!--            <td>{{ v.mortalite }}</td>-->
<!--            <td>-->
<!--              <v-btn-->
<!--                @click="$router.push({ path: '/library/addbasket?name=' + v.name + '&code=' + v.code })"-->
<!--              >Clone virus for the lab</v-btn>-->
<!--            </td>-->
<!--          </tr>-->
<!--        </tbody>-->
<!--      </template>-->
<!--    </v-simple-table>-->

    <v-simple-table>
      <tr>
        <td>
          <keep-alive include="Mixer">
            <router-view
              name="locSubCentral"
              :parts="$store.state.parts"
              :samples="$store.state.samples"
              @store-virus="$emit('store-virus', $event)"
            ></router-view>
          </keep-alive>
        </td>
      </tr>
    </v-simple-table>
  </div>
</template>

<script>
import { Virus, viruses } from '../model.js'

export default {
  name: 'Labo',
  data: () => {
    return {
      parts: []
    }
  },
  methods: {
    mutation: function () {
      if (this.nbMutation == 0) return;

      this.chosenViruses.forEach(e => {
        let newCode;
        let s = this.samples[e];
        for (let i = 0; i < this.nbMutation; i++) {
          let idx = Math.floor(Math.random() * s.code.length);
          let chr = String.fromCharCode(Math.floor(Math.random() * 4) + "A".charCodeAt(0));
          newCode = s.code.substring(0, idx) + chr + s.code.substring(idx + 1);
          s.code = newCode;
          s.updateCaracs();
        }
      });
    },
    mix: function () {
      let newCode = "";

      let chosen = [...this.chosenParts]; // real copy so that we can splice on the copy
      let nb = chosen.length;
      for (let i = 0; i < nb; i++) {
        // choose randomly a part among the selected ones
        let idx = Math.floor(Math.random() * chosen.length);
        let p = this.parts[chosen[idx]];
        newCode = newCode + p.code;
        chosen.splice(idx, 1);
      }
      this.newVirus = new Virus(viruses.length, 'mixedvirus', newCode);
      // remove chosen parts
      for (let i = this.chosenParts.length - 1; i >= 0; i--) {
        this.parts.splice(this.chosenParts[i], 1);
      }
      // unselect all
      this.chosenParts.splice(0, this.chosenParts.length)
    }
  }
}
</script>

<style scoped>
#laboratoire {
  margin: max(10px, 4%);
  row-gap: 20px;
}
</style>
