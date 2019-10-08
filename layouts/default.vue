<template lang="pug">
  .app-content.tw-min-h-screen.tw-bg-gray-100

    app-navbar.tw-bg-transparent

    nuxt

    app-footer
</template>

<script>
  import AppFooter from '~/components/AppFooter'
  import AppNavbar from '~/components/AppNavbar'
  import AppCard from '~/components/AppCard'

  export default {
    components: {AppCard, AppNavbar, AppFooter}
  }
</script>
