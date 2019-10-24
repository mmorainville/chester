<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Accueil

      .columns.is-multiline
        .column.is-one-third
          app-card(
            image="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2",
            date="25 Jun 2019",
            title="Secrets of Decentralization"
            url="https://www.google.fr/"
          )

        .column.is-one-third
          app-card(
            image="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2",
            date="25 Jun 2019",
            title="Why Strong Tea Isn't Good"
            url="https://www.google.fr/"
          )
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
