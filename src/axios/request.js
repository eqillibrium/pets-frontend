import axios from 'axios'
import router from '@/router'
import { Message } from '../utils/Message'

const API_URL = process.env.VUE_APP_API_URL

const requestAxios = axios.create({
  baseURL: API_URL
})

requestAxios.interceptors.response.use(response => {
  if (response.status === 201) {
    console.log(response)
    Message.success('Успешно!')
    router.replace({
      path: '/',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return response
}, error => {
  if (error.response.status === 401 || error.response.status === 422) {
    let message = ''
    if (error.response.data.errors) {
      for (const key in error.response.data.errors) {
        message += ''
        error.response.data.errors[key].forEach(el => {
          message += el
        })
      }
    }
    const text = error.response.data.errors ? message : error.response.data.message
    Message.danger(text)
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return Promise.reject(error)
})

export default requestAxios
