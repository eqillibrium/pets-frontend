
export default {
  state: {
    error: false,
    message: ''
  },
  mutations: {
    setError (state, payload) {
      state.error = true
      state.message = payload
    },
    clearError (state) {
      state.error = false
      state.message = ''
    }
  },
  actions: {
    setError ({ commit }, payload) {
      commit('setError', payload)
    }
  },
  getters: {
    isError (state) {
      return state.error
    },
    errorMessage (state) {
      return state.message
    }
  }
}
