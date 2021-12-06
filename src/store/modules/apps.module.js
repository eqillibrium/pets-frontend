import axios from '@/axios/request'

export default {
  namespaced: true,
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
    }
  },
  getters: {
    apps (state) {
      return state.apps
    }
  }
}
