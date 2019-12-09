<template lang="pug">
  section.section
    .container.has-text-centered
      .columns.is-centered
        .column.is-5.is-4-desktop
          form(@submit.prevent="login" v-if="isLogin")
            .field
              .control
                input.input(type="text" placeholder="Username" v-model="username" required)
            .field
              .control
                input.input(type="password" placeholder="Password" v-model="password" required)
            .field
              .buttons
                button.button.is-primary(type="submit" :class="{ 'is-loading': isFetching }") Sign in!
                button.button.is-text(type="button" :class="{ 'is-loading': isFetching }" @click="isLogin = false") Sign up?

            // a(href="#") or sign in with Facebook

          form(@submit.prevent="signup" v-else)
            .field
              .control
                input.input(type="email" placeholder="Email" v-model="email" required)
            .field
              .control
                input.input(type="text" placeholder="Username" v-model="username" required)
            .field
              .control
                input.input(type="password" placeholder="Password" v-model="password" required)
            .field
              .buttons
                button.button.is-primary(type="submit" :class="{ 'is-loading': isFetching }") Sign up!
                button.button.is-text(type="button" :class="{ 'is-loading': isFetching }" @click="isLogin = true") Sign in?
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      isLogin: true,

      email: '',
      username: '',
      password: '',

      isFetching: false
    }
  },

  methods: {
    login() {
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
    },

    async signup() {
      const email = this.email
      const username = this.username
      const password = this.password

      this.isFetching = true

      try {
        await this.$axios.$post('auth/local/register', {
          email,
          username,
          password,
          confirmed: true
        })

        this.login()
      } catch (error) {
        console.log(error)

        this.$buefy.toast.open({
          message: `An error occurred.`,
          type: 'is-danger'
        })
      }

      this.isFetching = false
    }
  }
}
</script>

<style scoped>

</style>
