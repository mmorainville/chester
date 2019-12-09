<template lang="pug">
  nav.navbar
    .container
      .navbar-brand
        nuxt-link.navbar-item.has-text-weight-bold.is-size-5(:to="{name: 'index'}") Chester
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
              nuxt-link.navbar-item.navbar-item-dropdown(:to="{name: 'books-create'}") Book
        .navbar-end
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link Parameters
            .navbar-dropdown
              a.navbar-item.navbar-item-dropdown(@click="setBaseUrl") API endpoint
              a.navbar-item.navbar-item-dropdown(@click="toggleDebug") {{ showDebug ? 'Hide' : 'Show' }} debug
          .navbar-item(v-if="$auth.loggedIn && $auth.user.username")
            | Hello, {{ $auth.user.username }}
          .navbar-item
            .buttons
              nuxt-link.button.is-primary(:to="{name: 'login'}" v-if="!$auth.loggedIn") Log in
              button.button.is-primary(type="button" v-if="$auth.loggedIn" @click="$auth.logout()") Log out
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AppNavbar',

  async created () {
    // try {
    //   await this.$axios.$head('_health')
    // } catch (e) {
    //   console.log(e)
    // }
  },

  data () {
    return {
      isNavbarOpen: false,

      items: [
        {
          title: 'Links',
          to: { name: 'links' }
        },
        {
          title: 'Movies',
          to: { name: 'movies' }
        },
        {
          title: 'Books',
          to: { name: 'books' }
        }
      ]
    }
  },

  computed: {
    showDebug () {
      return this.$store.state.parameters.showDebug
    }
  },

  watch: {
    $route () {
      this.isNavbarOpen = false
    }
  },

  methods: {
    setBaseUrl () {
      this.$buefy.dialog.prompt({
        message: 'Set a custom endpoint for the API.',
        inputAttrs: {
          placeholder: 'e.g. https://pulsar-chester-staging.herokuapp.com/',
          value: localStorage.getItem('axios.baseURL') ? localStorage.getItem('axios.baseURL') : this.$axios.defaults.baseURL
        },
        trapFocus: true,
        onConfirm: value => {
          localStorage.setItem('axios.baseURL', value)
          this.$axios.defaults.baseURL = localStorage.getItem('axios.baseURL')
          this.$buefy.toast.open(`The API endpoint has been set to: ${value}`)
        }
      })
    },
    ...mapMutations({
      toggleDebug: 'parameters/toggleDebug'
    })
  }
}
</script>

<style scoped>

</style>
