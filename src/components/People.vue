<template>
  <div>
      <div>
        <button class="card" @click="showModal">
        <button 
          class="card__logo"
          :style="{backgroundColor: randomColor()}"
        >
          <span class="card__logo-letter">{{name.charAt(0)}}</span>
        </button>
        <h3 class="card__name">{{name}}</h3>
        <p class="card__species">{{speciesName}}</p>
        </button>
      </div>

    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="modal"
        @click="closeModal"
      >
      </div>
    </transition>

    <transition name="slide" appear>
      <div class="modal" v-if="modal">
        <header class="modal__header">
          <button 
          class="modal__header-logo"
          :style="{backgroundColor: randomColor()}"
        >
          <span class="modal__header-letter">{{name.charAt(0)}}</span>
          </button>
          <h3 class="modal__header-name">{{name}}</h3>
        </header>

        <hr>

        <main class="modal__main">
          <div>
            <div class="modal__main-div">
              <img class="img" src=".././assets/birth.png">
              Birth year <span class="api-data">{{birth_year}}</span>
            </div>
            <div class="modal__main-div">
              <img class="img" src=".././assets/species.png">
              Species <span class="api-data">{{speciesName}}</span>
            </div>
            <div class="modal__main-div">
              <img class="img" src=".././assets/gender.png">
              Gender <span class="api-data">{{gender}}</span>
            </div>
          </div>

          <div>
            <div class="modal__main-div">
              <img class="img"  src=".././assets/homeworld.png">
              Homeworld <span class="api-data">{{homeworldItem}}</span>
            </div>

            <div class="modal__main-last">
              <div class="modal__main-div"><img class="img" src=".././assets/films.png">Films</div>
              <div class="modal__main-last-div">
                <ul 
                  v-for="film in myFilms" 
                  :key="film.title"
                >
                  <li>
                    <span class="api-data">{{film}}</span>
                  </li>
                </ul>
              </div> 
            </div>

          </div>
        </main>
      </div>
    </transition>   
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'people',
  data () {
    return {
      speciesName: '',
      homeworldItem: '',
      modal: false,
      myFilms: []
    }
  },
  props: {
    name: String,
    species: Array,
    birth_year: String,
    gender: String,
    homeworld: String,
    films: Array
  },
  async mounted() {
    const res = await fetch(`${this.species}`)
    const items = await res.json()
    this.speciesName = items.name

    const homeworldRes = await fetch(`${this.homeworld}`)
    const homeworldItems = await homeworldRes.json()
    this.homeworldItem = homeworldItems.name
  },
  methods: {
    showModal() {
      this.modal = true

      this.allFilms.map(element => {
        this.films.find(film => {
          if (film === element.url) {
            this.myFilms.push(element.title)
          }
        })
      })
    },
    closeModal() {
      this.myFilms = []
      this.modal = false
    },
    randomColor() {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }
  },
  computed: {
    ...mapGetters({
      allFilms: 'getFilms'
    })
  }
}
</script>