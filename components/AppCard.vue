<template lang="pug">
  div(class="card tw-rounded tw-border-none tw-shadow-lg hover:tw-shadow-2xl" style="height: 100%")
    .card-image(v-if="image")
      a(:href="url")
        img.tw-w-full(:src="image" alt="" onerror="this.src='https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2'")

    .card-content
      span.is-size-7(v-if="date") {{ date | date('YYYY/MM/DD') }}
      h5.title.is-5
        a(:href="url") {{ title }}
      slot(name="subtitle")
        h6.subtitle.is-6(v-if="subtitle") {{ subtitle }}
      b-taglist(v-if="tags")
        b-tag(v-for="(tag, key) of tags" :key="key" rounded) {{ tag.name }}

      slot(name="actions")
        div.buttons(v-if="$auth.loggedIn")
          a.button.is-primary.is-small.is-rounded(v-if="url" :href="url") View
          a.button.is-small.is-rounded(@click="$emit('app-card:on-edit')") Edit
          a.button.is-small.is-rounded.is-danger.is-outlined(@click="$emit('app-card:on-delete')") Delete
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
        required: false
      },
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: false
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
