import Vue from 'vue'
import Vuex from 'vuex'
import {Virus} from "@/model";
import basket from "@/views/Basket";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viruses: [],
    samples: [],
    parts: [],
    basket: []
  },
  getters: {
    getAllViruses(state) {
      return state.viruses
    },
    getViruse(state, id) {
      return state.chosenViruses[id]
    },
    getAllSamples(state) {
      return state.samples
    },
    getSample(state, id) {
      return state.samples[id]
    },
    getAllPartes(state) {
      return state.parts
    },
    getPart(state, id) {
      return state.parts[id]
    },
    getAllBaskets(state) {
      return state.basket
    },
    getBasket(state, id) {
      return state.basket[id]
    }

  },
  mutations: {
    //Viruses
    cut(state) {
      if (this.cutFactor == 0) return;
      this.chosenViruses.forEach(e => {
        let s = this.samples[e];
        for (let i = 0; i < s.code.length; i += this.cutFactor) {
          this.parts.push({code: s.code.substring(i, i + this.cutFactor)});
        }
      });
      // remove chosen viruses
      for (let i = this.chosenViruses.length - 1; i >= 0; i--) {
        this.samples.splice(this.chosenViruses[i], 1);
      }
      // unselect all
      this.chosenViruses.splice(0, this.chosenViruses.length)
    },

    //Baskets
    sendBasketToLab(state, virus) {
      for (let i = 0; i < state.basket.length; i++){
        console.log("HAHAH")
        state.samples.push(new Virus(state.basket[i].id, state.basket[i].name, state.basket[i].code))
      }
      console.log("HEHEHE")
      state.basket.splice(0, state.basket.length)

      // state.samples.push(new Virus(virus.id, virus.name, virus.code))
      // state.basket.splice(virus.id, this.basket.length)
      // this.$emit('send-lab', this.basket)
      // this.basket.splice(0, this.basket.length)
    },

    addToBasket(state, virus) {
      state.basket.push(new Virus(0, virus.name, virus.code))
    },
  },
    actions: {},
    modules: {},
})