import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    films: []
  },
  mutations: {
    setData(state, data) {
      state.films = data;
    },
  },
  actions: {
    async fetchFilms({ commit }) {
      const fimlsRes = await fetch(`https://swapi.co/api/films/`);
      const fimlsItems = await fimlsRes.json();
      const filmsData = [...fimlsItems.results];

      await commit('setData', filmsData);
    }
  },
  getters: {
    getFilms(state) {
      return state.films;
    }
  },
  modules: {}
});