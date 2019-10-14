<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Accueil

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
