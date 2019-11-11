<template lang="pug">
  nav.navbar
    .container
      .navbar-brand
        nuxt-link.navbar-item(:to="{name: 'index'}") Chester
        a.navbar-burger(role="button", aria-label="menu", aria-expanded="false")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
      .navbar-menu
        .navbar-start
          nuxt-link.navbar-item(v-for="(item, key) of items", :key="key", :to="item.to") {{ item.title }}
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link Créer un nouveau...
            .navbar-dropdown
              nuxt-link.navbar-item.navbar-item-dropdown(:to="{name: 'links-create'}") Lien
              nuxt-link.navbar-item.navbar-item-dropdown(:to="{name: 'movies-create'}") Film
        .navbar-end
          .navbar-item
            .buttons
              nuxt-link.button.is-light(:to="{name: 'login'}" v-if="!$auth.loggedIn") Log in
              a.button.is-primary(href="#" v-if="!$auth.loggedIn") Sign up
              button.button.is-primary(type="button" v-if="$auth.loggedIn" @click="$auth.logout()") Log out
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
          },
          {
            title: 'Liens',
            to: {name: 'links'}
          },
          {
            title: 'Films',
            to: {name: 'movies'}
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
