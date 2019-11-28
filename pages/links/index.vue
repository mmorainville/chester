<template lang="pug">
  section.section
    .container
      nav.level
        .level-left
          .level-item
            h2.title.has-text-centered.tw-uppercase {{ links.length }} Links
        .level-right
          .level-item
            .buttons
              button.button(@click="getLinksBookmark") Bookmark
              button.button(@click="$root.$emit('app-navbar:on-export')") Export

      .columns.is-multiline
        .column.is-one-quarter(v-for="(link, key) of links", :key="key")
          app-card(
            :image="getThumbnail(link)",
            :date="link.created_at",
            :title="link.title",
            :url="link.url"
            :tags="link.tags"
            @app-card:on-delete="deleteLink(link.id)"
            @app-card:on-edit="editLink(link)"
          )
</template>

<script>
import AppCard from '~/components/AppCard'
import LinkForm from '~/components/movies/LinkForm'
import crudMixin from '~/mixins/crud'
import exportMixin from '~/mixins/export'

export default {
  name: 'Links',

  components: {
    AppCard
  },

  mixins: [crudMixin, exportMixin],

  created () {
    this.$root.$on('app-navbar:on-export', this.exportLinks)
    this.$root.$on('crud-mixin:on-refresh', this.findAllLinks)
  },

  destroyed () {
    this.$root.$off('app-navbar:on-export', this.exportLinks)
    this.$root.$on('crud-mixin:on-refresh', this.findAllLinks)
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

    async findAllLinks () {
      this.links = await this.findAll('links')
    },

    async deleteLink (id) {
      this.delete('links', id, `Link deleted.`)
    },

    exportLinks () {
      this.export(this.links)
    },

    editLink (link) {
      this.$buefy.modal.open({
        parent: this,
        component: LinkForm,
        fullScreen: true,
        props: {
          link
        }
      })
    },

    getLinksBookmark () {
      if (process.client) {
        const origin = window.location.origin
        const bookmark = `javascript:(function(){var%20url%20=%20location.href;%20%20%20%20%20%20var%20title%20=%20document.title%20||%20url;%20%20%20%20%20%20window.open('${origin}/links/create?url='%20+%20encodeURIComponent(url)+'&title='%20+%20encodeURIComponent(title),'_blank','height=600,width=800');})();`
        console.log(bookmark)

        navigator.permissions.query({ name: 'clipboard-write' }).then(async result => {
          if (result.state === 'granted' || result.state === 'prompt') {
            try {
              await navigator.clipboard.writeText(bookmark)

              this.$buefy.toast.open({
                message: 'Bookmark copied!',
                type: 'is-success'
              })
            } catch (error) {
              this.$buefy.toast.open({
                message: 'An error occurred.',
                type: 'is-danger'
              })
            }
          }
        })
      }
    }
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
