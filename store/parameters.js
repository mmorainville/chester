export const state = () => ({
  showDebug: localStorage.getItem('parameters.showDebug') === 'true' ? JSON.parse(localStorage.getItem('parameters.showDebug')) : false
})

export const mutations = {
  toggleDebug (state) {
    state.showDebug = !state.showDebug
    localStorage.setItem('parameters.showDebug', state.showDebug)
  }
}
