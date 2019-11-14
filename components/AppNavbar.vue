<template lang="pug">
  nav.navbar
    .container
      .navbar-brand
        nuxt-link.navbar-item(:to="{name: 'index'}") Chester
        a.navbar-burger(role="button", aria-label="menu", aria-expanded="false" @click="isNavbarOpen = !isNavbarOpen" :class="{ 'is-active': isNavbarOpen }")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
      .navbar-menu(:class="{ 'is-active': isNavbarOpen }")
        .navbar-start
          nuxt-link.navbar-item(v-for="(item, key) of items", :key="key", :to="item.to") {{ item.title }}
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link New...
            .navbar-dropdown
              nuxt-link.navbar-item.navbar-item-dropdown(:to="{name: 'links-create'}") Link
              nuxt-link.navbar-item.navbar-item-dropdown(:to="{name: 'movies-create'}") Movie
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
        isNavbarOpen: false,

        items: [
          {
            title: 'Home',
            icon: 'home',
            to: {name: 'index'}
          },
          {
            title: 'About',
            to: {name: 'about'}
          },
          {
            title: 'Links',
            to: {name: 'links'}
          },
          {
            title: 'Movies',
            to: {name: 'movies'}
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
