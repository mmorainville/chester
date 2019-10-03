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
              img(src="placeholder/icons/twitter.svg", alt="")
            a.button(href="#")
              img(src="placeholder/icons/facebook-f.svg", alt="")
            a.button(href="#")
              img(src="placeholder/icons/instagram.svg", alt="")

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
