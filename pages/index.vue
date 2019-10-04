<template lang="pug">
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
  name: 'HomePage',

  components: {
    AppCard
  },

  async asyncData({ $axios }) {
    const links = await $axios.$get('https://fathomless-fjord-40899.herokuapp.com/links')
    return { links }
  }
}
</script>
