<template lang="pug">
  section.section
    .container
      h2.title.has-text-centered.tw-uppercase Welcome to Chester!

      .columns.is-multiline.is-centered
        .column.is-one-third
          app-card(
            date="2019",
            title="Links"
            url="/links"
          )

        .column.is-one-third
          app-card(
            date="2019",
            title="Movies"
            url="/movies"
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
