<template lang="pug">
  section.section
    .container.is-fluid
      h2.title.has-text-centered Créer un nouveau film

      .columns.is-centered
        .column.is-3
          img(v-if="movieToCreate.poster" :src="`https://image.tmdb.org/t/p/w500/${movieToCreate.poster}`")

        .column.is-5
          form
            b-field(label="Titre")
              b-autocomplete(
                v-model="movieToCreate.title"
                :data="remoteMovies"
                placeholder="Search movies..."
                field="title"
                :loading="isFetching"
                @typing="getAsyncRemoteMovies"
                @select="onMovieSelect"
              )
                template(slot-scope='props')
                  .media
                    .media-left
                      img(width="48" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`")
                    .media-content
                      h1.title.is-4 {{ props.option.title }}
                      h2.subtitle.is-6 {{ props.option.release_date ? props.option.release_date.split('-')[0] : 'Date inconnue' }}

            .field
              .control
                input.input(type="number" placeholder="Année" v-model="movieToCreate.year")

            .field
              .control
                button.button.is-primary.is-fullwidth(type="button" @click="create" :class="{ 'is-loading': isFetching }") Créer

        .column.is-4
          pre {{ movieToCreate }}
</template>

<script>
export default {
  name: 'MoviesCreate',
  middleware: 'auth',

  data () {
    return {
      movieToCreate: {
        title: '',
        year: null,
        poster: ''
      },

      remoteMovies: [],
      isFetching: false
    }
  },

  methods: {
    async create () {
      const movieToCreate = this.movieToCreate

      this.isFetching = true

      try {
        await this.$axios.$post('movies', movieToCreate)

        this.$buefy.snackbar.open(`Film créé avec succès !`)
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `Un problème est survenu.`,
          type: 'is-danger'
        })
      }

      this.isFetching = false
    },

    getAsyncRemoteMovies (title) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (!title.length) {
          this.remoteMovies = []
          return
        }
        this.isFetching = true
        this.$axios.$get(`${process.env.TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&language=fr&query=${title}`)
          .then(({ results }) => {
            this.remoteMovies = []
            results.forEach((item) => this.remoteMovies.push(item))
          })
          .catch((error) => {
            this.remoteMovies = []
            throw error
          })
          .finally(() => {
            this.isFetching = false
          })
      }, 250)
    },

    onMovieSelect (option) {
      if (option) {
        this.movieToCreate.title = option.title
        this.movieToCreate.year = option.release_date ? option.release_date.split('-')[0] : null
        this.movieToCreate.poster = option.poster_path
      }
    }
  }
}
</script>

<style scoped>

</style>
