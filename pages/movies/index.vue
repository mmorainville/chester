<template lang="pug">
  section.section
    .container
      nav.level
        .level-left
          .level-item
            h2.title.has-text-centered.tw-uppercase {{ movies.length }} Movies
        .level-right
          .level-item
            button.button(@click="$root.$emit('app-navbar:on-export')") Export

      .columns.is-multiline
        .column.is-one-quarter(v-for="(movie, index) in movies", :key="index")
          app-card(
            :image="getThumbnail(movie)",
            :date="movie.created_at",
            :title="movie.title",
            @app-card:on-delete="deleteMovie(movie.id)"
            @app-card:on-edit="editMovie(movie)"
          )
</template>

<script>
import AppCard from '~/components/AppCard'
import MovieForm from '~/components/movies/MovieForm'
import crudMixin from '~/mixins/crud'
import exportMixin from '~/mixins/export'

export default {
  name: 'Movies',

  components: {
    AppCard,
    MovieForm
  },

  mixins: [crudMixin, exportMixin],

  data () {
    return {
      movies: []
    }
  },

  created () {
    this.$root.$on('app-navbar:on-export', this.exportMovies)
    this.$root.$on('crud-mixin:on-refresh', this.findAllMovies)
  },

  destroyed () {
    this.$root.$off('app-navbar:on-export', this.exportMovies)
    this.$root.$on('crud-mixin:on-refresh', this.findAllMovies)
  },

  methods: {
    getThumbnail (movie) {
      if (movie.poster) {
        return `https://image.tmdb.org/t/p/w500/${movie.poster.name ? movie.poster.name : movie.poster}`
      }

      return 'https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'
    },

    async findAllMovies () {
      this.movies = await this.findAll('movies')
    },

    async deleteMovie (id) {
      this.delete('movies', id, `Movie deleted.`)
    },

    exportMovies () {
      this.export(this.movies)
    },

    editMovie (movie) {
      this.$buefy.modal.open({
        parent: this,
        component: MovieForm,
        fullScreen: true,
        props: {
          movie
        }
      })
    }
  },

  async asyncData ({ $axios, error }) {
    try {
      const movies = await $axios.$get('movies')
      return { movies }
    } catch (e) {
      console.log(e)
      error({ statusCode: e.response.status, message: 'Access not allowed.' })
    }
  }
}
</script>
