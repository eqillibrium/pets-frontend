import axios from '@/axios/request'
import Application from '@/classes/Application'

export default {
  namespaced: true,
  root: true,
  state: {
    apps: [],
    userApps: []
  },
  mutations: {
    fillApps (state, apps) {
      state.apps = apps
    },
    addApp (state, app) {
      state.apps.push(app)
      state.userApps.push(app)
    },
    clearApps (state) {
      state.apps = []
    },
    fillUserApps (state, apps) {
      state.userApps = apps
    },
    updateAppInStore (state, app) {
      const find = state.apps.find(el => el.id === app.id)
      Object.assign(find, app)
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
    async getUserAppsByID ({ commit, getters }) {
      try {
        const userID = getters.getUserID
        const { data } = await axios.get(`/applications/users/${userID}`)
        commit('fillUserApps', data.data)
      } catch (e) {
        console.log(e)
      }
    },
    async createApp ({ commit, getters }, payload) {
      try {
        const userID = getters.getUserID
        const newApp = new Application({
          userID,
          ...payload
        })
        await axios.post('/applications', newApp)
        commit('addApp', newApp)
      } catch (e) {
        console.log(e)
      }
    },
    async updateApp ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.put(`/applications/${payload.id}`, payload)
        commit('updateAppInStore', data.data)
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
    },
    getUserApps (state) {
      return state.userApps
    }
  }
}
