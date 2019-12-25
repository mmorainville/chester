<template lang="pug">
  section.section
    .container
      nav.level
        .level-left
          .level-item
            h2.title.has-text-centered.tw-uppercase {{ filteredBooks.length }} Books
        .level-right
          .level-item
            .buttons
              button.button(@click="isFilterBlockOpen = !isFilterBlockOpen" aria-controls="filters") Filters
              button.button(@click="$root.$emit('app-navbar:on-export')") Export

      b-collapse(aria-id="filters" :open.sync="isFilterBlockOpen")
        b-tabs(v-model='activeFiltersTab')
          b-tab-item(label='Local')
            .columns.is-multiline
              .column.is-one-fifth
                b-field(label="Title" label-position="on-border")
                  b-input(v-model="filters.title")
              .column.is-one-fifth
                b-field(label="Readings length" label-position="on-border")
                  b-input(v-model.number="filters.readingsLength" type="number")
              .column.is-one-fifth
                b-field(label="Mininum page count" label-position="on-border")
                  b-input(v-model.number="filters.minPageCount" type="number")
              .column.is-one-fifth
                b-field(label="Maximum page count" label-position="on-border")
                  b-input(v-model.number="filters.maxPageCount" type="number")

          b-tab-item(label='Remote' disabled)

      .columns.is-multiline
        .column.is-one-fifth(v-for="(book, index) in filteredBooks", :key="index")
          app-card(
            :image="getThumbnail(book)",
            :date="book.created_at",
            :title="book.title",
            @app-card:on-delete="deleteBook(book.id)"
            @app-card:on-edit="editBook(book)"
          )
            template(#subtitle)
              h6.subtitle.is-6 {{ book.pageCount }} pages
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
      books: [],

      isFilterBlockOpen: false,
      activeFiltersTab: 0,
      filters: {
        title: '',
        readingsLength: '',
        minPageCount: '',
        maxPageCount: ''
      }
    }
  },

  computed: {
    filteredBooks () {
      return this.books
        .filter(book => {
          let regex = new RegExp(this.filters.title, 'i')
          return !!book.title.match(regex)
        })
        .filter(book => this.filters.readingsLength !== '' ? book.readings.length === this.filters.readingsLength : true)
        .filter(book => this.filters.minPageCount !== '' ? book.pageCount >= this.filters.minPageCount : true)
        .filter(book => this.filters.maxPageCount !== '' ? book.pageCount <= this.filters.maxPageCount : true)
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
