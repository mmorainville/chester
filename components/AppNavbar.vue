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
          .navbar-item(v-if="$auth.loggedIn && currentUser")
            | Hello, {{ currentUser.username }}
          .navbar-item
            .buttons
              button.button(@click="getLinksBookmark" v-if="isClient && $nuxt.$route.name === 'links'") Bookmark
              button.button(@click="$root.$emit('app-navbar:on-export')" v-if="showExportButton") Export

              nuxt-link.button.is-light(:to="{name: 'login'}" v-if="!$auth.loggedIn") Log in
              a.button.is-primary(href="#" v-if="!$auth.loggedIn") Sign up
              button.button.is-primary(type="button" v-if="$auth.loggedIn" @click="$auth.logout()") Log out
</template>

<script>
  export default {
    name: 'AppNavbar',

    async created () {
      try {
        // await this.$axios.$head('_health')
        this.currentUser = await this.$axios.$get('users/me')
      } catch (e) {
        console.log(e)
      }
    },

    data () {
      return {
        isNavbarOpen: false,

        currentUser: null,

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
    },

    computed: {
      showExportButton () {
        const routesWithExport = ['links', 'movies']
        return routesWithExport.includes(this.$nuxt.$route.name)
      },

      isClient () {
        return process.client
      }
    },

    methods: {
      getLinksBookmark () {
        const origin = window.location.origin
        const bookmark = `javascript:(function(){var%20url%20=%20location.href;%20%20%20%20%20%20var%20title%20=%20document.title%20||%20url;%20%20%20%20%20%20window.open('${origin}/links/create?url='%20+%20encodeURIComponent(url)+'&title='%20+%20encodeURIComponent(title),'_blank','height=600,width=800');})();`
        console.log(bookmark)

        navigator.permissions.query({ name: 'clipboard-write' }).then(async result => {
          if (result.state === 'granted' || result.state === 'prompt') {
            try {
              await navigator.clipboard.writeText(bookmark)

              this.$buefy.toast.open({
                message: 'Bookmark copied!',
                type: 'is-success'
              })
            } catch (error) {
              this.$buefy.toast.open({
                message: 'An error occurred.',
                type: 'is-danger'
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
