<template lang="pug">
  <MovieForm />
</template>

<script>
import MovieForm from '~/components/movies/MovieForm'

export default {
  name: 'MoviesCreate',
  middleware: 'auth',

  components: {
    MovieForm
  }
}
</script>

<style scoped>

</style>
