export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    console.log('onRequest', config.url)
    store.commit('app/incrementPendingRequests')
  })

  $axios.onResponse(response => {
    console.log('onResponse', response.config.url, response.status)
    store.commit('app/decrementPendingRequests')
  })

  $axios.onError(error => {
    console.log('onError', error)
    store.commit('app/decrementPendingRequests')
  })

  $axios.onRequestError(error => {
    console.log('onRequestError', error)
    store.commit('app/decrementPendingRequests')
  })

  $axios.onResponseError(error => {
    console.log('onResponseError', error)
    store.commit('app/decrementPendingRequests')
  })
}
