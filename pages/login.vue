<template lang="pug">
  section.section
    .container.has-text-centered
      .columns.is-centered
        .column.is-5.is-4-desktop
          form
            .field
              .control
                input.input(type="email" placeholder="Email" v-model="username")
            .field
              .control
                input.input(type="password" placeholder="Password" v-model="password")
            .field
              button.button.is-primary.is-fullwidth(type="button" @click="login") Sign in!

            a(href="#") or sign in with Facebook
</template>

<script>
  export default {
    name: 'Login',

    data () {
      return {
        username: '',
        password: ''
      }
    },

    methods: {
      login () {
        console.log('login', this.username, this.password)
        this.$auth.loginWith('local', {
          data: {
            identifier: this.username,
            password: this.password
          }
        })
          .then(() => this.$buefy.toast.open('Logged In!'))
      }
    }
  }
</script>

<style scoped>

</style>
