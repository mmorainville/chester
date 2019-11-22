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
import exportMixin from '~/mixins/export'

export default {
  name: 'Links',

  components: {
    AppCard
  },

  mixins: [exportMixin],

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
      this.export(this.links)
    },
  },

  async asyncData({ $axios, error }) {
    try {
      const links = await $axios.$get('links')
      return { links }
    } catch (e) {
      console.log(e)
      error({ statusCode: e.response.status, message: 'Access not allowed.' })
    }
  }
}
</script>
