<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered {{ isCreating ? 'New link' : 'Edit link' }}

      .columns.is-centered
        .column.is-6
          form(@submit.prevent="createOrEditLink")
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
import crudFormMixin from '~/mixins/crudForm'

export default {
  name: 'LinkForm',
  middleware: 'auth',

  mixins: [crudFormMixin],

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
      itemToCreateOrEdit: cloneDeep(this.link),
      linkToCreateOrEdit: cloneDeep(this.link),

      tagName: '',
      filteredTags: []
    }
  },

  methods: {
    async createOrEditLink () {
      const linkToCreateOrEdit = this.linkToCreateOrEdit
      this.createOrEdit('links', linkToCreateOrEdit, `Link successfully ${this.isCreating ? 'created' : 'edited'}!`)
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
