export const state = () => ({
  pendingRequests: 0
})

export const mutations = {
  incrementPendingRequests (state) {
    state.pendingRequests++
  },

  decrementPendingRequests (state) {
    state.pendingRequests--
  }
}

export const getters = {
  isLoading: state => {
    return state.pendingRequests > 0
  }
}
