<template lang="pug">
  BookForm
</template>

<script>
import BookForm from '~/components/books/BookForm'

export default {
  name: 'BooksCreate',
  middleware: 'auth',

  components: {
    BookForm
  }
}
</script>

<style scoped>

</style>
