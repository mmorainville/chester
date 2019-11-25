<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered {{ isCreating ? 'New link' : 'Edit link' }}

      .columns.is-centered
        .column.is-6
          form(@submit.prevent="createOrEdit")
            .field
              .control
                input(
                  type="text"
                  placeholder="Title"
                  v-model="linkToCreateOrEdit.title"
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight"
                )
            .field
              .control
                input.input(type="text" placeholder="URL" v-model="linkToCreateOrEdit.url")
            .field
              .control
                textarea.textarea(placeholder="Description" v-model="linkToCreateOrEdit.description")

            b-field(label="Tags")
              b-autocomplete(
                v-model="tagName"
                :data="filteredTags"
                :clear-on-select="true"
                :open-on-focus="true"
                :keep-first="true"
                placeholder="Add a tag"
                field="name"
                :loading="isFetching"
                @typing="getAsyncFilteredTags"
                @select="onTagSelect"
              )
                template(slot="header")
                  a(@click="addAsyncTag")
                    span Add new...

            b-taglist
              b-tag(v-for="(tag, key) of linkToCreateOrEdit.tags", :key="key") {{ tag.name }}

            .field
              .control
                button.button.is-primary.is-fullwidth(type="submit" :class="{ 'is-loading': isFetching }") Submit
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'LinkForm',
  middleware: 'auth',

  props: {
    link: {
      type: Object,
      required: false,
      default () {
        return {
          title: this.$route.query.title ? this.$route.query.title : '',
          url: this.$route.query.url ? this.$route.query.url : '',
          description: '',
          tags: []
        }
      }
    }
  },

  data () {
    return {
      linkToCreateOrEdit: cloneDeep(this.link),

      tagName: '',
      filteredTags: [],

      isFetching: false
    }
  },

  computed: {
    isCreating () {
      return !this.link.id
    },

    isEditing () {
      return !!this.link.id
    }
  },

  methods: {
    async createOrEdit () {
      const linkToCreateOrEdit = this.linkToCreateOrEdit

      this.isFetching = true

      try {
        await this.$axios({
          method: this.isCreating ? 'post' : 'put',
          url: `links${this.isCreating ? '' : `/${this.link.id}`}`,
          data: linkToCreateOrEdit
        })

        this.$buefy.snackbar.open(`Link successfully ${this.isCreating ? 'created' : 'edited'}!`)
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `An error occurred.`,
          type: 'is-danger'
        })
      }

      this.isFetching = false
    },

    /**
     * TODO: export the function in another file
     */
    async getAsyncFilteredTags () {
      const text = this.tagName

      if (!text.length) {
        this.filteredTags = []
        return
      }

      this.isFetching = true

      try {
        let filteredTags = await this.$axios.$get(`tags?name_contains=${text}`)
        this.filteredTags = []
        filteredTags.forEach((item) => this.filteredTags.push(item))
      } catch (e) {
        this.filteredTags = []
        console.log(e)
      }

      this.isFetching = false
    },

    async addAsyncTag () {
      const name = this.tagName

      this.isFetching = true

      try {
        let createdTag = await this.$axios.$post('tags', {
          name
        })

        this.linkToCreateOrEdit.tags.push(createdTag)
        this.tagName = ''
      } catch (e) {
        console.log(e)
      }

      this.isFetching = false
    },

    onTagSelect (option) {
      if (option) {
        this.linkToCreateOrEdit.tags.push(option)
      }
    }
  }
}
</script>

<style scoped>

</style>
