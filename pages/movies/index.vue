<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Films

      .columns.is-multiline
        .column.is-one-quarter(v-for="(movie, key) of movies", :key="key")
          app-card(
            :image="getScreenshot(movie)",
            :date="movie.created_at",
            :title="movie.title",
            :url="movie.url"
            :tags="movie.tags"
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
    getScreenshot (movie) {
      if (movie.poster) {
        return `https://image.tmdb.org/t/p/w500/${movie.poster.name}`
      }

      return 'https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'
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
