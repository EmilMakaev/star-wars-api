<template>
  <div class="app">
    <header class="header"> 
      <div class="header__title">
        <img class="header__title-img" src="./assets/star.png">
        <p class="header__title-text">CHARACTER Encyclopedia</p>
        <img class="header__title-img" src="./assets/wars.png">
      </div> 
    </header>

    <div v-if="data" class="cards">
      <People 
      v-for="item in items"
      v-bind="item"
      v-bind:key="item.id"
      />
    </div>
    <div 
      class="loader"
      v-else
    >
      <img src="./assets/spinner.svg">
    </div>
    
    <Observer 
      v-on:intersect="intersected"
    />

    <footer class="footer">
      <p class="footer__text">STAR WARS CHARACTER Encyclopedia, 2019</p>
    </footer>
  </div>
</template>

<script>
import People from './components/People.vue'
import Observer from './components/Observer'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    People,
    Observer
  },
  data() {
    return {
      items: [],
      page: 1,
      data: false
    }
  },
  methods: {
    ...mapActions({
      fetchFilms: 'fetchFilms',
    }),
    async intersected() {
      const res = await fetch(`https://swapi.co/api/people/?page=${this.page++}`)
      const items = await res.json()
      this.items = [...this.items, ...items.results]
      this.data = true
    }
  },
  mounted() {
    this.fetchFilms()
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
