<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Movies

      .columns.is-multiline
        .column.is-one-quarter(v-for="(movie, key) of movies", :key="key")
          app-card(
            :image="getThumbnail(movie)",
            :date="movie.created_at",
            :title="movie.title",
            :url="movie.url"
            :tags="movie.tags"
            @app-card:on-delete="deleteMovie(movie.id)"
          )
</template>

<script>
import AppCard from '~/components/AppCard'

export default {
  name: 'Movies',

  components: {
    AppCard
  },

  data () {
    return {
      movies: []
    }
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

        this.$buefy.snackbar.open(`Film supprimé.`)
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `Un problème est survenu.`,
          type: 'is-danger'
        })
      }
    }
  },

  async asyncData({ $axios, error }) {
    try {
      const movies = await $axios.$get('movies')
      return { movies }
    } catch (e) {
      console.log(e)
      error({ statusCode: e.response.status, message: 'Accès non autorisé.' })
    }
  }
}
</script>
