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
                button.button.is-primary.is-fullwidth(type="button" @click="create") Créer
</template>

<script>
  export default {
    name: 'LinksCreate',
    middleware: 'auth',

    data () {
      return {
        title: this.$route.query.title ? this.$route.query.title : '',
        url: this.$route.query.url ? this.$route.query.url : ''
      }
    },

    methods: {
      async create () {
        const title = this.title;
        const url = this.url;

        try {
          const res = await this.$axios.$post('http://localhost:1337/links', {
            Titre: title,
            url
          })
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
