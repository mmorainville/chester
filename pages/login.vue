<template lang="pug">
  section.section
    .container.has-text-centered
      .columns.is-centered
        .column.is-5.is-4-desktop
          form(@submit.prevent="login")
            .field
              .control
                input.input(type="text" placeholder="Username" v-model="username" required)
            .field
              .control
                input.input(type="password" placeholder="Password" v-model="password" required)
            .field
              button.button.is-primary.is-fullwidth(type="submit" :class="{ 'is-loading': isFetching }") Sign in!

            // a(href="#") or sign in with Facebook
</template>

<script>
  export default {
    name: 'Login',

    data () {
      return {
        username: '',
        password: '',

        isFetching: false
      }
    },

    methods: {
      login () {
        this.isFetching = true

        this.$auth.loginWith('local', {
          data: {
            identifier: this.username,
            password: this.password
          }
        })
          .then(
            () => this.$buefy.toast.open('Logged In!'),
            () => this.$buefy.toast.open({
              message: `An error occurred.`,
              type: 'is-danger'
            })
          )
          .finally(
            () => this.isFetching = false
          )
      }
    }
  }
</script>

<style scoped>

</style>
