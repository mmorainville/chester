<template lang="pug">
  section.section
    .container
      nav.level
        .level-left
          .level-item
            h2.title.has-text-centered.tw-uppercase {{ books.length }} Books
        .level-right
          .level-item
            button.button(@click="$root.$emit('app-navbar:on-export')") Export

      .columns.is-multiline
        .column.is-one-fifth(v-for="(book, index) in books", :key="index")
          app-card(
            :image="getThumbnail(book)",
            :date="book.created_at",
            :title="book.title",
            @app-card:on-delete="deleteBook(book.id)"
            @app-card:on-edit="editBook(book)"
          )
</template>

<script>
import AppCard from '~/components/AppCard'
import BookForm from '~/components/books/BookForm'
import crudMixin from '~/mixins/crud'
import exportMixin from '~/mixins/export'

export default {
  name: 'Books',

  components: {
    AppCard,
    BookForm
  },

  mixins: [crudMixin, exportMixin],

  data () {
    return {
      books: []
    }
  },

  created () {
    this.$root.$on('app-navbar:on-export', this.exportBooks)
    this.$root.$on('crud-mixin:on-refresh', this.findAllBooks)
  },

  destroyed () {
    this.$root.$off('app-navbar:on-export', this.exportBooks)
    this.$root.$on('crud-mixin:on-refresh', this.findAllBooks)
  },

  methods: {
    getThumbnail (book) {
      if (book.cover) {
        return book.cover
      }

      return 'https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'
    },

    async findAllBooks () {
      this.books = await this.findAll('books')
    },

    async deleteBook (id) {
      this.delete('books', id, `Book deleted.`)
    },

    exportBooks () {
      this.export(this.books)
    },

    editBook (book) {
      this.$buefy.modal.open({
        parent: this,
        component: BookForm,
        fullScreen: true,
        props: {
          book
        }
      })
    }
  },

  async asyncData ({ $axios, error }) {
    try {
      const books = await $axios.$get('books')
      return { books }
    } catch (e) {
      console.log(e)
      error({ statusCode: e.response.status, message: 'Access not allowed.' })
    }
  }
}
</script>
