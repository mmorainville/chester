<template lang="pug">
  .app-content.tw-min-h-screen.tw-bg-gray-100

    app-navbar.tw-bg-transparent

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
