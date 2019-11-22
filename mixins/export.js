import dayjs from 'dayjs'

export default {
  methods: {
    export (items) {
      let itemsAsBlob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' })
      let filename = `${dayjs().format('YYYYMMDDTHHmmss')} (${items.length}).json`

      const url = URL.createObjectURL(itemsAsBlob)

      const a = document.createElement('a')
      a.href = url
      a.download = filename || 'download'
      a.click()
    }
  }
}
