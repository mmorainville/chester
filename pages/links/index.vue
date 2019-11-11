<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Liens et favoris

      .columns.is-multiline
        .column.is-one-third(v-for="(link, key) of links", :key="key")
          app-card(
            :image="getThumbnail(link)",
            :date="link.created_at",
            :title="link.title",
            :url="link.url"
            :tags="link.tags"
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

  methods: {
    getThumbnail (link) {
      if (link.url) {
        let hostname = null
        if (process.browser) {
          hostname = new URL(link.url).hostname
        } else {
          const URL = require('url').URL
          hostname = new URL(link.url).hostname
        }

        return `${process.env.BASE_URL || 'http://localhost:1337/'}uploads/links/${link.id}.${hostname}.png`
      }

      return 'https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'
    }
  },

  async asyncData({ $axios, error }) {
    try {
      const links = await $axios.$get('links')
      return { links }
    } catch (e) {
      console.log(e)
      error({ statusCode: e.response.status, message: 'Accès non autorisé.' })
    }
  }
}
</script>
