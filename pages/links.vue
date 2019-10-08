<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Liens et favoris

      .columns
        .column(v-for="(link, key) of links", :key="key")
          app-card(
            image="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2",
            :date="link.created_at",
            :title="link.Titre"
          )
</template>

<script>
import AppCard from '~/components/AppCard'

export default {
  name: 'Links',

  components: {
    AppCard
  },

  data () {
    return {
      links: []
    }
  },

  async asyncData({ $axios, error }) {
    try {
      const links = await $axios.$get('https://fathomless-fjord-40899.herokuapp.com/links')
      return { links }
    } catch (e) {
      console.log(e)
      error({ statusCode: e.response.status, message: 'Accès non autorisé.' })
    }
  }
}
</script>
