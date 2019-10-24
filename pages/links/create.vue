<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered Créer un nouveau lien

      .columns.is-centered
        .column.is-6
          form
            .field
              .control
                input(type="text" placeholder="Titre" v-model="title" class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight")
            .field
              .control
                input.input(type="text" placeholder="URL" v-model="url")
            .field
              .control
                textarea.textarea(placeholder="Description" v-model="description")

            b-field Tags
              b-taginput(
                v-model="tags"
                :data="filteredTags"
                autocomplete
                :allow-new="false"
                :open-on-focus="false"
                field="name"
                icon="label"
                placeholder="Add a tag"
                :loading="isFetching"
                @typing="getAsyncFilteredTags"
              )

            .field
              .control
                button.button.is-primary.is-fullwidth(type="button" @click="create") Créer
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

        try {
          const res = await this.$axios.$post('links', {
            title,
            url,
            description,
            tags
          })
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      },

      /**
       * TODO: export the function in another file
       */
      async getAsyncFilteredTags (text) {
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

      async addAsyncTag (name) {
        try {
          let createdTag = await this.$axios.$post('tags', {
            name
          })

          this.tags.push(createdTag)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
