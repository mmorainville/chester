<template lang="pug">
  <div class="card tw-rounded tw-border-none tw-shadow-lg hover:tw-shadow-2xl" style="height: 100%">
    .card-image
      a(href="#")
        img(:src="image", alt="")
    .card-content
      span.is-size-7 {{ date }}
      h5.title.is-5
        a(href="#") {{ title }}
      a.button.is-primary(href="#") Read more
  </div>
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
  .card {
    transition: box-shadow 0.5s;
  }
</style>
