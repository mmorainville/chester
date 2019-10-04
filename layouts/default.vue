<template lang="pug">
  .app-content.tw-min-h-screen.tw-bg-gray-100

    app-navbar.tw-bg-transparent

    section.section
      .container
        h2.title.has-text-centered.tw-uppercase The Pied Piper Blog

        .columns
          .column
            app-card(
              image="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2",
              date="25 Jun 2019",
              title="Why I'm the Best Programmer Ever"
            )
          .column
            app-card(
              image="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2",
              date="25 Jun 2019",
              title="Secrets of Decentralization"
            )

          .column
            app-card(
              image="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2",
              date="25 Jun 2019",
              title="Why Strong Tea Isn't Good"
            )

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
