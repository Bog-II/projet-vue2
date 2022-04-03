<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Viruses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <CheckedList
              :fields="['name', 'code']"
              :entries="$store.state.samples"
              @chosen-changed="$store.state.chosenViruses = $event"
            />
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-container>
      <v-row id="row-text-fields">
        <v-col cols="12" sm="6" md="2">
          <v-text-field label="Part Length" v-model.number="cutFactor" filled class="pa-0" />
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
            label="Nombre de mutations"
            v-model.number="nbMutation"
            filled
            class="pa-0"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row id="row-buttons">
        <v-col cols="12" sm="3" md="2">
          <v-btn :disabled="$store.state.chosenViruses.length == 0" @click="mutation()">Mutation</v-btn>
        </v-col>

        <v-col cols="12" sm="3" md="2">
          <v-btn :disabled="$store.state.chosenViruses.length == 0" @click="cut()">Cut</v-btn>
        </v-col>

        <v-col cols="12" sm="3" md="2">
          <v-btn @click="$router.push({ path: '/labo/mix' })">Go to mixer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CheckedList from '../components/CheckedList.vue'

export default {
  name: 'Slicer',
  props: ['parts'],
  data: () => {
    return {
      chosenViruses: [],
      cutFactor: 5,
      nbMutation: 10,
    }
  },
  components: {
    CheckedList
  },
  methods: {
    cut: function () {
      console.log("VAZI")
      this.$store.commit('cut', this)


      if (this.cutFactor == 0) return;
      this.chosenViruses.forEach(e => {
        let s = this.samples[e];
        for (let i = 0; i < s.code.length; i += this.cutFactor) {
          this.parts.push({ code: s.code.substring(i, i + this.cutFactor) });
        }
      });
      // remove chosen viruses
      for (let i = this.chosenViruses.length - 1; i >= 0; i--) {
        this.samples.splice(this.chosenViruses[i], 1);
      }
      // unselect all
      this.chosenViruses.splice(0, this.chosenViruses.length)



    },

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
    }
  }
}
</script>

<style scoped>
#row-text-fields,
#row-buttons {
  display: flex;
  justify-content: center;
}
</style>
