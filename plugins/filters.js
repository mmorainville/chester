import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format) => {
  return dayjs(value).format(format ? format : 'YYYY-MM-DDTHH:mm:ss')
})
