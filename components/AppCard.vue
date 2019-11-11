<template lang="pug">
  <div class="card tw-rounded tw-border-none tw-shadow-lg hover:tw-shadow-2xl" style="height: 100%">
    .card-image(v-if="image")
      a(:href="url")
        img(:src="image", alt="", onerror="this.src='https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'")
    .card-content
      span.is-size-7 {{ date }}
      h5.title.is-5
        a(:href="url") {{ title }}
      b-taglist
        b-tag(v-for="(tag, key) of tags", :key="key") {{ tag.name }}
      div.buttons
        a.button.is-primary(:href="url") Ouvrir
        a.button(@click="$emit('app-card:on-delete')") Supprimer
  </div>
</template>

<script>
  export default {
    name: 'AppCard',
    props: {
      image: {
        type: String,
        required: false
      },
      date: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: false
      },
      tags: {
        type: Array,
        required: false
      }
    }
  }
</script>

<style scoped>
  .card {
    transition: box-shadow 0.25s;
  }
</style>
