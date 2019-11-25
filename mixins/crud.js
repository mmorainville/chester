export default {
  methods: {
    async findAll (baseUrl) {
      try {
        const items = await this.$axios.$get(baseUrl)
        return items
      } catch (e) {
        console.log(e)

        this.$buefy.snackbar.open({
          message: `An error occurred.`,
          type: 'is-danger'
        })
      }
    },

    delete (baseUrl, id, successMessage) {
      this.$buefy.dialog.confirm({
        message: `Are you sure you want to <b>delete</b> this item? This action cannot be undone.`,
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          try {
            await this.$axios.$delete(`${baseUrl}/${id}`)

            this.$root.$emit('crud-mixin:on-refresh')
            this.$buefy.snackbar.open(successMessage)
          } catch (e) {
            console.log(e)

            this.$buefy.snackbar.open({
              message: `An error occurred.`,
              type: 'is-danger'
            })
          }
        }
      })
    }
  }
}
