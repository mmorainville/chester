<template lang="pug">
  footer.footer
    .container
      .level
        .level-left
          .level-item
            a.title.is-4(href="http://pulsar.surge.sh/") Pulsar
        .level-right
          nuxt-link.level-item(:to="{name: 'about'}") About

      hr

      .columns
        .column
          .buttons
            a.button(href="https://github.com/mmorainville")
              b-icon(icon="github-circle")

        .column.has-text-centered.has-text-right-tablet
          p.subtitle.is-6 &copy; 2019 Pulsar. All right reserved.
</template>

<script>
  export default {
    name: 'AppFooter'
  }
</script>

<style scoped>

</style>
