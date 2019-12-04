<template lang="pug">
  .app-content.has-navbar-fixed-top.tw-min-h-screen.tw-bg-gray-100

    app-navbar.is-fixed-top.is-light.tw-shadow-md

    b-loading(:active.sync="isLoading")

    nuxt

    app-footer
</template>

<script>
import { mapGetters } from 'vuex'
import AppNavbar from '~/components/AppNavbar'
import AppFooter from '~/components/AppFooter'
import AppCard from '~/components/AppCard'

export default {
  components: { AppCard, AppNavbar, AppFooter },

  data() {
    return {
      loadingComponent: null
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'app/isLoading'
    })
  }
}
</script>

<style lang="sass">
  $navbar-height: 3.25rem !default

  .has-navbar-fixed-top
    padding-top: $navbar-height
</style>
