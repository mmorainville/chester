<template lang="pug">
  section.section
    .container.is-fluid
      h2.title.has-text-centered {{ isCreating ? 'New movie' : 'Edit movie' }}

      .columns
        .column.is-3
          img(v-if="movieToCreateOrEdit.poster" :src="`https://image.tmdb.org/t/p/w500/${movieToCreateOrEdit.poster}`")

        .column.is-6
          form(@submit.prevent="createOrEditMovie")
            b-field(label="Titre")
              b-autocomplete(
                v-model="movieToCreateOrEdit.title"
                :data="remoteMovies"
                placeholder="Search movies..."
                field="title"
                :loading="isFetching"
                @typing="getAsyncRemoteMoviesWithDebounce"
                @select="onMovieSelect"
              )
                template(slot-scope='props')
                  .media
                    .media-left
                      img(width="48" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`")
                    .media-content
                      h1.title.is-5 {{ props.option.title }}
                      h2.subtitle.is-6 {{ props.option.release_date ? props.option.release_date.split('-')[0] : '-' }}

            .field
              .control
                input.input(type="number" placeholder="Year" v-model.number="movieToCreateOrEdit.year")

            b-field(label='Directors')
              b-taginput(v-model='movieToCreateOrEdit.directors' placeholder='Directors...')

            .field
              b-collapse.card(v-for="(viewing, index) in movieToCreateOrEdit.viewings" :key="index" :open="activeViewing === index" @open="activeViewing = index")
                .card-header(slot='trigger' slot-scope='props' role='button')
                  p.card-header-title
                    | Viewing \#{{ (index + 1) }}
                  a.card-header-icon
                    b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                  a.card-header-icon(@click="deleteViewing(index)")
                    b-icon(icon="delete-forever")
                .card-content
                  .content
                    .field
                      .control
                        input.input(type="text" placeholder="Cinema..." v-model="viewing.cinema")

                    .field
                      .control
                        input.input(type="text" placeholder="Filename..." v-model="viewing.filename")

                    b-field(label='Cities')
                      b-taginput(
                        v-model='viewing.cities'
                        placeholder='Cities...'
                        :on-paste-separators="[]"

                        :data="filteredData['places']"
                        autocomplete
                        :allow-new="true"
                        icon="label"
                        @typing="text => getFilteredData(text, 'places')"
                      )

                    b-field(label='Dates')
                      b-datepicker(
                        ref="datepicker"
                        placeholder="Date..."
                        @input="(date) => onSelectDate(date, viewing)"
                        icon="calendar-today"
                      )

                    b-field
                      b-taginput(v-model='viewing.dates' placeholder='Dates...')

                    b-field(label='Spectators')
                      b-taginput(
                        v-model='viewing.spectators'
                        placeholder='Spectators...'

                        :data="filteredData['persons']"
                        autocomplete
                        :allow-new="true"
                        icon="label"
                        @typing="text => getFilteredData(text, 'persons')"
                      )

                    b-checkbox(v-model='viewing.firstTime') First time
                    b-checkbox(v-model='viewing.dateValidity') Date validity

            b-field
              button.button.is-fullwidth(type="button" @click="addViewing") Add viewing...

            .field
              .control
                button.button.is-primary.is-fullwidth(type="submit" :class="{ 'is-loading': isFetching }") Submit

        .column.is-3(v-if="showDebug")
          pre.is-size-7 {{ movieToCreateOrEdit }}
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import dayjs from 'dayjs'
import crudFormMixin from '~/mixins/crudForm'

export default {
  name: 'MovieForm',
  middleware: 'auth',

  mixins: [crudFormMixin],

  props: {
    movie: {
      type: Object,
      required: false,
      default () {
        return {
          title: '',
          year: null,
          poster: '',
          directors: [],
          viewings: [
            {
              cinema: '',
              filename: '',
              cities: [],
              dates: [],
              spectators: [],
              firstTime: true,
              dateValidity: true
            }
          ]
        }
      }
    }
  },

  data () {
    return {
      itemToCreateOrEdit: cloneDeep(this.movie),
      movieToCreateOrEdit: cloneDeep(this.movie),

      activeViewing: 0,

      remoteMovies: [],

      autocompleteData: {
        places: [],
        persons: []
      },
      filteredData: {
        places: [],
        persons: []
      }
    }
  },

  async mounted () {
    try {
      const places = await this.$axios.$get('places')
      const persons = await this.$axios.$get('people')

      this.autocompleteData.places = places.map(place => `${place.street}, ${place.city}`)
      this.autocompleteData.persons = persons.map(person => `${person.nickname}`)

      this.filteredData = cloneDeep(this.autocompleteData)
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    async createOrEditMovie () {
      const movieToCreateOrEdit = this.movieToCreateOrEdit
      this.createOrEdit('movies', movieToCreateOrEdit, `Movie successfully ${this.isCreating ? 'created' : 'edited'}!`)
    },

    getAsyncRemoteMoviesWithDebounce: debounce(function(title) {
      this.getAsyncRemoteMovies(title)
    }, 250),

    async getAsyncRemoteMovies (title) {
      if (!title.length) {
        this.remoteMovies = []
        return
      }

      this.isFetching = true

      try {
        let { results } = await this.$axios.$get(`${process.env.TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fr&query=${title}`)

        this.remoteMovies = []
        results.forEach((item) => this.remoteMovies.push(item))
      } catch (error) {
        this.remoteMovies = []
        throw error
      }

      this.isFetching = false
    },

    async onMovieSelect (option) {
      if (option) {
        this.movieToCreateOrEdit.title = option.title
        this.movieToCreateOrEdit.year = option.release_date ? option.release_date.split('-')[0] : null
        this.movieToCreateOrEdit.poster = option.poster_path

        let credits = await this.$axios.$get(`${process.env.TMDB_API_URL}/movie/${option.id}/credits?api_key=${process.env.TMDB_API_KEY}`)
        this.movieToCreateOrEdit.directors = credits.crew.filter(person => person.job === 'Director').map(person => person.name)
      }
    },

    addViewing () {
      this.movieToCreateOrEdit.viewings.push({
        cinema: '',
        filename: '',
        cities: [],
        dates: [],
        spectators: [],
        firstTime: true,
        dateValidity: true
      })

      this.activeViewing = this.movieToCreateOrEdit.viewings.length - 1
    },

    deleteViewing (index) {
      this.movieToCreateOrEdit.viewings.splice(index, 1)
    },

    onSelectDate (date, viewing) {
      viewing.dates.push(dayjs(date).format('YYYY-MM-DD'))
    },

    getFilteredData (text, type) {
      this.filteredData[type] = this.autocompleteData[type].filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped>

</style>
