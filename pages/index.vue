<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Welcome to Chester!

      .columns.is-multiline.is-centered
        .column.is-one-third
          app-card(title="Links" url="/links")
            template(#actions)
              div.buttons
                nuxt-link.button.is-primary.is-small.is-rounded(:to="{name: 'links'}") View

        .column.is-one-third
          app-card(title="Movies" url="/movies")
            template(#actions)
              div.buttons
                nuxt-link.button.is-primary.is-small.is-rounded(:to="{name: 'movies'}") View
</template>

<script>
import AppCard from '~/components/AppCard'

export default {
  name: 'Home',

  components: {
    AppCard
  }
}
</script>
