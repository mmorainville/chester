export default function({ $axios, redirect, store }) {
  if (process.client) {
    if (localStorage.getItem('axios.baseURL')) {
      console.log('axios.baseURL', localStorage.getItem('axios.baseURL'))
      $axios.defaults.baseURL = localStorage.getItem('axios.baseURL');
    }
  }

  $axios.onRequest(config => {
    console.log('onRequest', config.url)
    store.commit('app/incrementPendingRequests')
  })

  $axios.onRequestError(error => {
    console.log('onRequestError', error)
    store.commit('app/decrementPendingRequests')
  })

  $axios.onResponse(response => {
    console.log('onResponse', response.config.url, response.status)
    store.commit('app/decrementPendingRequests')
  })

  $axios.onResponseError(error => {
    console.log('onResponseError', error)
    store.commit('app/decrementPendingRequests')
  })
}
