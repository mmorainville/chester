<template lang="pug">
  .app-content.tw-min-h-screen.tw-bg-gray-100

    app-navbar.tw-bg-transparent

    nuxt

    app-footer
</template>

<script>
import AppNavbar from '~/components/AppNavbar'
import AppFooter from '~/components/AppFooter'
import AppCard from '~/components/AppCard'

export default {
  components: { AppCard, AppNavbar, AppFooter },

  data () {
    return {
      loadingComponent: null
    }
  },

  computed: {
    pendingRequests () {
      return this.$store.state.app.pendingRequests
    }
  },

  watch: {
    pendingRequests (newValue, oldValue) {
      console.log('pendingRequests', newValue)
      if (newValue === 1) {
        this.loadingComponent = this.$buefy.loading.open()
      } else if (newValue === 0) {
        if (this.loadingComponent) {
          this.loadingComponent.close()
        }
        this.loadingComponent = null
      }
    }
  }
}
</script>
