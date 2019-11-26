export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Request', config.url)
  })

  $axios.onResponse(response => {
    console.log('Response', response.config.url, response.status)
  })
}
