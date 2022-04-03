import Vue from 'vue'
import Vuex from 'vuex'
import {Virus} from "@/model";
import basket from "@/views/Basket";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viruses: [],
    samples: [],
    chosenViruses: [],
    parts: [],
    basket: []
  },
  mutations: {
    //Viruses
    cut(state) {
      if (state.samples.cutFactor == 0) return;
      state.chosenViruses.forEach(e => {
        let s = state.samples[e];
        for (let i = 0; i < s.code.length; i += state.samples.cutFactor) {
          state.samples.parts.push({code: s.code.substring(i, i + state.samples.cutFactor)});
        }
      });
      // remove chosen viruses
      for (let i = state.chosenViruses.length - 1; i >= 0; i--) {
        state.samples.splice(state.samples.chosenViruses[i], 1);
      }
      // unselect all
      state.chosenViruses.splice(0, state.chosenViruses.length)
    },

    //Baskets
    sendBasketToLab(state, virus) {
      for (let i = 0; i < state.basket.length; i++){
        state.samples.push(new Virus(state.basket[i].id, state.basket[i].name, state.basket[i].code))
      }
      state.basket.splice(0, state.basket.length)

    },

    addToBasket(state, virus) {
      state.basket.push(new Virus(0, virus.name, virus.code))
    },
  },
    actions: {},
    modules: {},
})