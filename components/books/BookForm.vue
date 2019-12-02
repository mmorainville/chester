<template lang="pug">
  section.section
    .container.is-fluid
      h2.title.has-text-centered {{ isCreating ? 'New book' : 'Edit book' }}

      .columns.is-centered
        .column.is-3
          img(v-if="bookToCreateOrEdit.poster" :src="bookToCreateOrEdit.poster")

        .column.is-6
          form(@submit.prevent="createOrEditBook")
            b-field(label="Titre")
              b-autocomplete(
                v-model="bookToCreateOrEdit.title"
                :data="remoteBooks"
                placeholder="Search books..."
                field="title"
                :loading="isFetching"
                @typing="getAsyncRemoteBooksWithDebounce"
                @select="onBookSelect"
              )
                template(slot-scope='props')
                  .media
                    .media-left
                      img(width="48" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`")
                    .media-content
                      h1.title.is-5 {{ props.option.title }}
                      h2.subtitle.is-6 {{ props.option.release_date ? props.option.release_date.split('-')[0] : '-' }}

            .field
              .control
                input.input(type="number" placeholder="Year" v-model="bookToCreateOrEdit.year")

            b-field(label='ISBN')
              b-input(v-model='bookToCreateOrEdit.isbn' placeholder='ISBN...')

            b-field(label='Page number')
              b-input(v-model='bookToCreateOrEdit.pageNumber' type="number" placeholder='Page number...')

            b-field(label='Authors')
              b-taginput(v-model='bookToCreateOrEdit.authors' placeholder='Authors...')

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

                    b-field(label='Dates')
                      b-datepicker(
                        v-model="reading.startDate"
                        placeholder="Start date..."
                        icon="calendar-today"
                      )

                    b-datepicker(
                      v-model="reading.endDate"
                      placeholder="End date..."
                      icon="calendar-today"
                    )

                    b-checkbox(v-model='reading.firstTime') First time
                    b-checkbox(v-model='reading.dateValidity') Date validity

            b-field
              button.button.is-fullwidth(type="button" @click="addReading") Add reading...

            .field
              .control
                button.button.is-primary.is-fullwidth(type="submit" :class="{ 'is-loading': isFetching }") Submit

        .column.is-3
          pre.is-size-7 {{ bookToCreateOrEdit }}
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import dayjs from 'dayjs'
import crudFormMixin from '~/mixins/crudForm'

const defaultReading = {
  places: [],
  startDate: new Date(),
  endDate: '2019-12-02T17:44:00:000Z',
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
          year: null,
          cover: '',
          authors: [],
          pageNumber: 0,
          isbn: '',
          readings: [
            defaultReading
          ]
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
        let { results } = await this.$axios.$get(`${process.env.TMDB_API_URL}/search/book?api_key=${process.env.TMDB_API_KEY}&language=fr&query=${title}`)

        this.remoteBooks = []
        results.forEach((item) => this.remoteBooks.push(item))
      } catch (error) {
        this.remoteBooks = []
        console.log(error)
      }

      this.isFetching = false
    },

    async onBookSelect (option) {
      if (option) {
        this.bookToCreateOrEdit.title = option.title
        this.bookToCreateOrEdit.year = option.release_date ? option.release_date.split('-')[0] : null
        this.bookToCreateOrEdit.poster = option.poster_path

        let credits = await this.$axios.$get(`${process.env.TMDB_API_URL}/book/${option.id}/credits?api_key=${process.env.TMDB_API_KEY}`)
        this.bookToCreateOrEdit.authors = credits.crew.filter(person => person.job === 'Director').map(person => person.name)
      }
    },

    addReading () {
      this.bookToCreateOrEdit.readings.push(cloneDeep(defaultReading))

      this.activeReading = this.bookToCreateOrEdit.readings.length - 1
    },

    deleteReading (index) {
      this.bookToCreateOrEdit.readings.splice(index, 1)
    },

    onSelectDate (date, reading) {
      reading.dates.push(dayjs(date).format('YYYY-MM-DD'))
    },

    getFilteredData (text, type) {
      this.filteredData[type] = this.autocompleteData[type].filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped>

</style>
