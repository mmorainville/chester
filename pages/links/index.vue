<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Links and bookmarks

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

  created () {
    this.$root.$on('app-navbar:on-export', this.exportLinks)
  },

  destroyed () {
    this.$root.$off('app-navbar:on-export', this.exportLinks)
  },

  data () {
    return {
      links: []
    }
  },

  methods: {
    getThumbnail (link) {
      if (link.url && link.screenshot) {
        return link.screenshot
      }

      return 'https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'
    },

    exportLinks () {
      let linksAsBlob = new Blob([JSON.stringify(this.links, null, 2)], { type: 'application/json' })
      let filename = `${new Date().toISOString().substring(0, 19).replace(/[-:]/g, '')}.json`

      const url = URL.createObjectURL(linksAsBlob)

      const a = document.createElement('a')
      a.href = url
      a.download = filename || 'download'
      a.click()
    },
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
