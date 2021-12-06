import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import request from './modules/request.module'
import error from './modules/error.module'
import apps from './modules/apps.module'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}
export default createStore({
  plugins,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    request,
    error,
    apps
  }
})
