export default {
  data () {
    return {
      itemToCreateOrEdit: null,
      isFetching: false
    }
  },

  computed: {
    isCreating () {
      return !this.itemToCreateOrEdit.id
    },

    isEditing () {
      return !!this.itemToCreateOrEdit.id
    }
  },

  methods: {
    async createOrEdit (baseUrl, item, successMessage) {
      this.isFetching = true

      try {
        await this.$axios({
          method: this.isCreating ? 'post' : 'put',
          url: `${baseUrl}${this.isCreating ? '' : `/${this.itemToCreateOrEdit.id}`}`,
          data: item
        })

        this.$buefy.snackbar.open(successMessage)

        if (this.isCreating) {
          this.$router.push(`/${baseUrl}`)
        } else {
          this.$root.$emit('crud-mixin:on-refresh')
          if (this.$parent.$options.name === 'BModal') {
            this.$parent.close()
          }
        }
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `An error occurred.`,
          type: 'is-danger'
        })
      }

      this.isFetching = false
    }
  }
}
