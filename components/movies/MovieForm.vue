<template lang="pug">
  section.section
    .container.is-fluid
      h2.title.has-text-centered {{ isCreating ? 'New movie' : 'Edit movie' }}

      .columns.is-centered
        .column.is-3
          img(v-if="movieToCreateOrEdit.poster" :src="`https://image.tmdb.org/t/p/w500/${movieToCreateOrEdit.poster}`")

        .column.is-6
          form(@submit.prevent="createOrEdit")
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
                input.input(type="number" placeholder="Year" v-model="movieToCreateOrEdit.year")

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
                      b-taginput(v-model='viewing.cities' placeholder='Cities...')

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
                      b-taginput(v-model='viewing.spectators' placeholder='Spectators...')

                    b-checkbox(v-model='viewing.firstTime') First time
                    b-checkbox(v-model='viewing.dateValidity') Date validity

            b-field
              button.button.is-fullwidth(type="button" @click="addViewing") Add viewing...

            .field
              .control
                button.button.is-primary.is-fullwidth(type="submit" :class="{ 'is-loading': isFetching }") Submit

        .column.is-3
          pre.is-size-7 {{ movieToCreateOrEdit }}
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import dayjs from 'dayjs'

export default {
  name: 'MovieForm',
  middleware: 'auth',

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
      movieToCreateOrEdit: cloneDeep(this.movie),

      activeViewing: 0,

      remoteMovies: [],
      isFetching: false
    }
  },

  computed: {
    isCreating () {
      return !this.movie.id
    },

    isEditing () {
      return !!this.movie.id
    }
  },

  methods: {
    async createOrEdit () {
      const movieToCreateOrEdit = this.movieToCreateOrEdit

      this.isFetching = true

      try {
        await this.$axios({
          method: this.isCreating ? 'post' : 'put',
          url: `movies${this.isCreating ? '' : `/${this.movie.id}`}`,
          data: movieToCreateOrEdit
        })

        this.$buefy.snackbar.open(`Movie successfully ${this.isCreating ? 'created' : 'edited'}!`)
        this.$router.push('/movies')
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `An error occurred.`,
          type: 'is-danger'
        })
      }

      this.isFetching = false
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
    }
  }
}
</script>

<style scoped>

</style>
