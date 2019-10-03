<template lang="pug">
  footer.footer.tw-bg-transparent
    .container
      .level
        .level-left
          .level-item
            a.title.is-4(href="#") Pulsar
        .level-right
          a.level-item(href="#") Features
          a.level-item(href="#") Enterprise
          a.level-item(href="#") Support
          a.level-item(href="#") ICO

      hr

      .columns
        .column
          .buttons
            a.button(href="#")
              b-icon(icon="twitter")
            a.button(href="#")
              b-icon(icon="facebook")
            a.button(href="#")
              b-icon(icon="instagram")

        .column.has-text-centered.has-text-right-tablet
          p.subtitle.is-6 &copy; 2019 Pied Piper. All right reserved.
</template>

<script>
  export default {
    name: 'AppFooter'
  }
</script>

<style scoped>

</style>
