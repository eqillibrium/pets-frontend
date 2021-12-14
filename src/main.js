import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

createApp(App)
  .use(YmapPlugin, settings)
  .use(Quasar, quasarUserOptions).use(store).use(router).mount('#app')
