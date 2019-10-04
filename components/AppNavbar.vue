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
          nuxt-link.navbar-item(v-for="(item, key) of items", :key="key", :to="item.to") {{ item.title }}
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
    name: 'AppNavbar',
    data () {
      return {
        items: [
          {
            title: 'Home',
            icon: 'home',
            to: {name: 'index'}
          },
          {
            title: 'Inspire',
            icon: 'lightbulb',
            to: {name: 'inspire'}
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
