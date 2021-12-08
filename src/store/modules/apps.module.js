import axios from '@/axios/request'
import Application from '@/classes/Application'

export default {
  namespaced: true,
  root: true,
  state: {
    apps: []
  },
  mutations: {
    fillApps (state, apps) {
      state.apps = apps
    },
    clearApps (state) {
      state.apps = []
    }
  },
  actions: {
    async getApps ({ commit }) {
      try {
        const { data } = await axios.get('/applications')
        commit('fillApps', data.data)
      } catch (e) {
        console.log(e)
      }
    },
    async createApp ({ commit, dispatch, getters }, payload) {
      try {
        const userID = getters.getUserID
        const newApp = new Application({
          userID,
          ...payload
        })
        const { data } = await axios.post('/applications', newApp)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    apps (state) {
      return state.apps
    },
    getUserID (_, __, ___, rootGetters) {
      return rootGetters['auth/user'].id
    }
  }
}
