<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Movies

      .columns.is-multiline
        .column.is-one-quarter(v-for="(movie, index) in movies", :key="index")
          app-card(
            :image="getThumbnail(movie)",
            :date="movie.created_at",
            :title="movie.title",
            :url="movie.url"
            :tags="movie.tags"
            @app-card:on-delete="deleteMovie(movie.id)"
            @app-card:on-edit="editMovie(movie)"
          )
</template>

<script>
import AppCard from '~/components/AppCard'
import MovieForm from '~/components/movies/MovieForm'
import exportMixin from '~/mixins/export'

export default {
  name: 'Movies',

  components: {
    AppCard,
    MovieForm
  },

  mixins: [exportMixin],

  data () {
    return {
      movies: []
    }
  },

  created () {
    this.$root.$on('app-navbar:on-export', this.exportMovies)
  },

  destroyed () {
    this.$root.$off('app-navbar:on-export', this.exportMovies)
  },

  methods: {
    getThumbnail (movie) {
      if (movie.poster) {
        return `https://image.tmdb.org/t/p/w500/${movie.poster.name ? movie.poster.name : movie.poster}`
      }

      return 'https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'
    },

    async deleteMovie (id) {
      try {
        await this.$axios.$delete(`movies/${id}`)

        this.$buefy.snackbar.open(`Movie deleted.`)
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `An error occurred..`,
          type: 'is-danger'
        })
      }
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
