<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered Créer un nouveau film

      .columns.is-centered
        .column.is-6
          form
            .field
              .control
                input(type="text" placeholder="Titre" v-model="title" class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight")
            .field
              .control
                input.input(type="number" placeholder="Année" v-model="year")

                b-field(label="Titre")
                  b-autocomplete(
                    :data='remoteMovies'
                    placeholder='e.g. Fight Club'
                    field='title'
                    :loading='isFetching'
                    @typing='getAsyncRemoteMovies'
                    @select='option => selected = option'
                  )
                    template(slot-scope='props')
                      .media
                        .media-left
                          img(width='32' :src='`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`')
                        .media-content
                          strong {{ props.option.title }}
                          br
                          | {{ props.option.release_date ? props.option.release_date.split('-')[0] : 'Date inconnue' }}

            .field
              .control
                button.button.is-primary.is-fullwidth(type="button" @click="create" :class="{ 'is-loading': isFetching }") Créer
</template>

<script>
  export default {
    name: 'MoviesCreate',
    middleware: 'auth',

    data () {
      return {
        title: '',
        year: null,

        remoteMovies: [],
        isFetching: false
      }
    },

    methods: {
      async create () {
        const title = this.title
        const year = this.year

        this.isFetching = true

        try {
          await this.$axios.$post('movies', {
            title,
            year
          })

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
      }
    }
  }
</script>

<style scoped>

</style>
