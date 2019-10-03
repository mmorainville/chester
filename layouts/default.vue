<template lang="pug">
  .content

    app-navbar

    section.section
      .container
        h2.title.has-text-centered The Pied Piper Blog

        .columns
          .column
            .card(style="height: 100%")
              .card-image
                a(href="#")
                  img(src="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2", alt="")
              .card-content
                span.is-size-7 25 Jun 2019
                h5.title.is-5
                  a(href="#") Why I'm the Best Programmer Ever
                a.button.is-primary(href="#") Read more
          .column
            .card(style="height: 100%")
              .card-image
                a(href="#")
                  img(src="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2", alt="")
              .card-content
                span.is-size-7 25 Jun 2019
                h5.title.is-5
                  a(href="#") Secrets of Decentralization
                a.button.is-primary(href="#") Read more

          .column
            .card(style="height: 100%")
              .card-image
                a(href="#")
                  img(src="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2", alt="")
              .card-content
                span.is-size-7 25 Jun 2019
                h5.title.is-5
                  a(href="#") Why Strong Tea Isn't Good
                a.button.is-primary(href="#") Read more

    app-footer
</template>

<script>
  import AppFooter from '../components/AppFooter'
  import AppNavbar from '../components/AppNavbar'

  export default {
    components: {AppNavbar, AppFooter},
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
