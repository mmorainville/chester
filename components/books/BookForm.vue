<template lang="pug">
  section.section
    .container.is-fluid
      h2.title.has-text-centered {{ isCreating ? 'New book' : 'Edit book' }}

      .columns
        .column.is-3
          img.tw-w-full(v-if="bookToCreateOrEdit.cover" :src="bookToCreateOrEdit.cover")

        .column.is-6
          form(@submit.prevent="createOrEditBook")
            b-field(label="Titre")
              b-autocomplete(
                v-model="bookToCreateOrEdit.title"
                :data="remoteBooks"
                placeholder="Search books..."
                field="volumeInfo.title"
                :loading="isFetching"
                @typing="getAsyncRemoteBooksWithDebounce"
                @select="onBookSelect"
              )
                template(slot-scope='props')
                  .media
                    .media-left
                      img(v-if="props.option.volumeInfo.imageLinks" width="48" :src="props.option.volumeInfo.imageLinks.thumbnail")
                    .media-content
                      h1.is-size-5.has-text-weight-bold {{ props.option.volumeInfo.title }} #[small.has-text-weight-normal(v-if="props.option.volumeInfo.authors") · {{ props.option.volumeInfo.authors.join(', ') }}]
                      h2.is-size-6 {{ props.option.volumeInfo.publishedDate | date('YYYY') }} #[template(v-if="props.option.volumeInfo.publisher") · {{ props.option.volumeInfo.publisher }}]
                      p(v-if="getIsbn(props.option.volumeInfo.industryIdentifiers)")
                        small {{ getIsbn(props.option.volumeInfo.industryIdentifiers) }}

            b-field(label='Year')
              b-input(v-model='bookToCreateOrEdit.year' placeholder='Year...')

            b-field(label='ISBN')
              b-input(v-model='bookToCreateOrEdit.isbn' placeholder='ISBN...')

            b-field(label='Publisher')
              b-input(v-model='bookToCreateOrEdit.publisher' placeholder='Publisher...')

            b-field(label='Page number')
              b-input(v-model='bookToCreateOrEdit.pageCount' type="number" placeholder='Page number...')

            b-field(label='Authors')
              b-taginput(v-model='bookToCreateOrEdit.authors' placeholder='Authors...')

            b-field(label='Cover')
              b-input(v-model='bookToCreateOrEdit.cover' placeholder='Cover...')

            .field
              b-collapse.card(v-for="(reading, index) in bookToCreateOrEdit.readings" :key="index" :open="activeReading === index" @open="activeReading = index")
                .card-header(slot='trigger' slot-scope='props' role='button')
                  p.card-header-title
                    | Reading \#{{ (index + 1) }}
                  a.card-header-icon
                    b-icon(:icon="props.open ? 'menu-down' : 'menu-up'")
                  a.card-header-icon(@click="deleteReading(index)")
                    b-icon(icon="delete-forever")
                .card-content
                  .content
                    b-field(label='Places')
                      b-taginput(
                        v-model='reading.places'
                        placeholder='Places...'
                        :on-paste-separators="[]"

                        :data="filteredData['places']"
                        autocomplete
                        :allow-new="true"
                        icon="label"
                        @typing="text => getFilteredData(text, 'places')"
                      )

                    b-field(label="Dates")
                      .columns.is-multiline
                        .column.is-full
                          b-field
                            b-datepicker(
                              @input="(date) => onSelectDate(date, reading, 'startDate')"
                              placeholder="Start date..."
                              icon="calendar-today"
                            )
                          b-field
                            b-input(v-model='reading.startDate' placeholder='Start date...')

                        .column.is-full
                          b-field
                            b-datepicker(
                              @input="(date) => onSelectDate(date, reading, 'endDate')"
                              placeholder="End date..."
                              icon="calendar-today"
                            )
                          b-field
                            b-input(v-model='reading.endDate' placeholder='End date...')

                    b-checkbox(v-model='reading.firstTime') First time
                    b-checkbox(v-model='reading.dateValidity') Date validity

            b-field
              button.button.is-fullwidth(type="button" @click="addReading") Add reading...

            .field
              .control
                button.button.is-primary.is-fullwidth(type="submit" :class="{ 'is-loading': isFetching }") Submit

        .column.is-3(v-if="showDebug")
          pre.is-size-7 {{ bookToCreateOrEdit }}
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import dayjs from 'dayjs'
import crudFormMixin from '~/mixins/crudForm'

const defaultReading = {
  places: [],
  startDate: '',
  endDate: '',
  firstTime: true,
  dateValidity: true
}

export default {
  name: 'BookForm',
  middleware: 'auth',

  mixins: [crudFormMixin],

  props: {
    book: {
      type: Object,
      required: false,
      default () {
        return {
          title: '',
          year: '',
          cover: '',
          authors: [],
          pageCount: 0,
          isbn: '',
          publisher: '',
          readings: []
        }
      }
    }
  },

  data () {
    return {
      itemToCreateOrEdit: cloneDeep(this.book),
      bookToCreateOrEdit: cloneDeep(this.book),

      activeReading: 0,

      remoteBooks: [],

      autocompleteData: {
        places: [],
        persons: []
      },
      filteredData: {
        places: [],
        persons: []
      }
    }
  },

  async mounted () {
    try {
      const places = await this.$axios.$get('places')
      const persons = await this.$axios.$get('people')

      this.autocompleteData.places = places.map(place => `${place.street}, ${place.city}`)
      this.autocompleteData.persons = persons.map(person => `${person.nickname}`)

      this.filteredData = cloneDeep(this.autocompleteData)
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    async createOrEditBook () {
      const bookToCreateOrEdit = this.bookToCreateOrEdit
      this.createOrEdit('books', bookToCreateOrEdit, `Book successfully ${this.isCreating ? 'created' : 'edited'}!`)
    },

    getAsyncRemoteBooksWithDebounce: debounce(function(title) {
      this.getAsyncRemoteBooks(title)
    }, 250),

    async getAsyncRemoteBooks (title) {
      if (!title.length) {
        this.remoteBooks = []
        return
      }

      this.isFetching = true

      try {
        // TODO: set correct language
        // https://www.googleapis.com/books/v1/volumes?q=Dune
        let { items } = await this.$axios.$get(`${process.env.GOOGLE_BOOKS_API_URL}/volumes?key=${process.env.GOOGLE_BOOKS_API_KEY}&q=${title}`, {
          transformRequest: [(data, headers) => {
            delete headers.common.Authorization
            return data
          }]
        })

        this.remoteBooks = []
        items.forEach((item) => this.remoteBooks.push(item))
      } catch (error) {
        this.remoteBooks = []
        console.log(error)
      }

      this.isFetching = false
    },

    onBookSelect (option) {
      if (option && option.volumeInfo) {
        this.bookToCreateOrEdit.title = option.volumeInfo.title
        this.bookToCreateOrEdit.year = this.$options.filters.date(option.volumeInfo.publishedDate, 'YYYY')
        this.bookToCreateOrEdit.cover = option.volumeInfo.imageLinks ? option.volumeInfo.imageLinks.thumbnail : ''
        this.bookToCreateOrEdit.pageCount = option.volumeInfo.pageCount
        this.bookToCreateOrEdit.isbn = this.getIsbn(option.volumeInfo.industryIdentifiers)
        this.bookToCreateOrEdit.publisher = option.volumeInfo.publisher

        this.bookToCreateOrEdit.authors = option.volumeInfo.authors
      }
    },

    addReading () {
      this.bookToCreateOrEdit.readings.push(cloneDeep(defaultReading))

      this.activeReading = this.bookToCreateOrEdit.readings.length - 1
    },

    deleteReading (index) {
      this.bookToCreateOrEdit.readings.splice(index, 1)
    },

    onSelectDate (date, reading, property) {
      reading[property] = dayjs(date).format('YYYY-MM-DD')
    },

    getFilteredData (text, type) {
      this.filteredData[type] = this.autocompleteData[type].filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },

    /**
     * Return the ISBN-13 if defined, ISBN-10 otherwise.
     * @param industryIdentifiers
     */
    getIsbn (industryIdentifiers) {
      if (industryIdentifiers && industryIdentifiers.length > 0) {
        let isbn13 = industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')
        let isbn10 = industryIdentifiers.find(identifier => identifier.type === 'ISBN_10')
        return isbn13 ? isbn13.identifier : (isbn10 ? isbn10.identifier : '')
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
