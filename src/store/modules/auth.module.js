const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem(TOKEN_KEY),
    role: 'guest'
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setRole (state, token) {
      state.role = 'admin'
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout (state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login ({ commit }, payload) {
      try {
        commit('setToken', payload)
        //  TODO асинхронный запрос на авторизацию
      } catch (e) {
        //  TODO обработка ошибки авторизации
      }
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    isAuthenticated (_, getters) {
      return !!getters.token
    },
    isAdmin (state) {
      return state.role === 'admin'
    }
  }
}
