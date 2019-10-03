<template lang="pug">
  .card(style="height: 100%")
    .card-image
      a(href="#")
        img(:src="image", alt="")
    .card-content
      span.is-size-7 {{ date }}
      h5.title.is-5
        a(href="#") {{ title }}
      a.button.is-primary(href="#") Read more
</template>

<script>
  export default {
    name: 'AppCard',
    props: {
      image: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
