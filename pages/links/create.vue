<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered New link

      .columns.is-centered
        .column.is-6
          form
            .field
              .control
                input(
                  type="text"
                  placeholder="Title"
                  v-model="title"
                  class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight"
                )
            .field
              .control
                input.input(type="text" placeholder="URL" v-model="url")
            .field
              .control
                textarea.textarea(placeholder="Description" v-model="description")

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
              b-tag(v-for="(tag, key) of tags", :key="key") {{ tag.name }}

            .field
              .control
                button.button.is-primary.is-fullwidth(type="button" @click="create" :class="{ 'is-loading': isFetching }") Submit
</template>

<script>
  export default {
    name: 'LinksCreate',
    middleware: 'auth',

    data () {
      return {
        title: this.$route.query.title ? this.$route.query.title : '',
        url: this.$route.query.url ? this.$route.query.url : '',
        description: '',
        tagName: '',
        tags: [],

        filteredTags: [],
        isFetching: false
      }
    },

    methods: {
      async create () {
        const title = this.title
        const url = this.url
        const description = this.description
        const tags = this.tags

        this.isFetching = true

        try {
          await this.$axios.$post('links', {
            title,
            url,
            description,
            tags
          })

          this.$buefy.snackbar.open(`Lien créé avec succès !`)
        } catch (e) {
          console.log(e)

          this.$buefy.snackbar.open({
              message: `Un problème est survenu.`,
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

          this.tags.push(createdTag)
          this.tagName = ''
        } catch (e) {
          console.log(e)
        }

        this.isFetching = false
      },

      onTagSelect (option) {
        if (option) {
          this.tags.push(option)
        }
      }
    }
  }
</script>

<style scoped>

</style>
