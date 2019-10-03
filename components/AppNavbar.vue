<template lang="pug">
  nav.navbar
    .container
      .navbar-brand
        a.navbar-item(href="#") Pied Piper
        a.navbar-burger(role="button", aria-label="menu", aria-expanded="false")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
      .navbar-menu
        .navbar-start
          a.navbar-item(href="#") Features
          a.navbar-item(href="#") Enterprise
          a.navbar-item(href="#") Support
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link ICO
            .navbar-dropdown
              a.navbar-item.navbar-item-dropdown(href="#") Whitepaper
              a.navbar-item.navbar-item-dropdown(href="#") Token
        .navbar-end
          .navbar-item
            .buttons
              a.button.is-light(href="#") Log in
              a.button.is-primary(href="#") Sign up
</template>

<script>
  export default {
    name: 'AppNavbar'
  }
</script>

<style scoped>

</style>
