<template lang="pug">
  LinkForm
</template>

<script>
import LinkForm from '~/components/links/LinkForm'

export default {
  name: 'LinksCreate',
  middleware: 'auth',

  components: {
    LinkForm
  }
}
</script>

<style scoped>

</style>
