export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    console.log('Request', config.url)
    store.commit('app/incrementPendingRequests')
  })

  $axios.onResponse(response => {
    console.log('Response', response.config.url, response.status)
    store.commit('app/decrementPendingRequests')
  })
}
