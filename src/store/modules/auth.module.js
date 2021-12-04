const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  root: true,
  state: {
    token: localStorage.getItem(TOKEN_KEY),
    role: 'guest',
    isAdmin: Boolean(0)
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    setRole (state, role) {
      state.role = role
    },
    setAdmin (state, value) {
      state.isAdmin = value
    },
    logout (state) {
      state.token = null
      state.role = 'guest'
      state.isAdmin = 0
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      try {
        const userData = {
          email: payload.email,
          password: `${payload.password}`
        }
        const response = await fetch('http://localhost:80/api/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(userData)
        })
        if (response.ok) {
          const data = await response.json()
          commit('setToken', data.token)
          commit('setRole', data.data.users_role)
          commit('setAdmin', data.data.is_admin)
        } else {
          const data = await response.json()
          dispatch('setError', data.message, { root: true })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async register ({ commit, dispatch }, payload) {
      console.log(payload)
      try {
        const userData = {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          password: payload.password,
          passport_number: null
        }
        const response = await fetch('http://localhost:80/api/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(userData)
        })
        if (response.ok) {
          const data = await response.json()
          commit('setToken', data.token)
          commit('setRole', data.data.users_role)
          commit('setAdmin', data.data.is_admin)
          console.log(data.data.is_admin)
        } else {
          const data = await response.json()
          let message = ''
          for (const key in data.errors) {
            message += key + ' - '
            data.errors[key].forEach(el => {
              message += el
            })
          }
          console.log(message)
          dispatch('setError', message, { root: true })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async logout ({ state, commit }) {
      try {
        // const response = await fetch(`http://localhost:80/api/logout/${state.token}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-type': 'application/json',
        //     Accept: 'application/json'
        //   }
        // })
        // const data = await response.json()
        commit('logout')
      } catch (e) {
        console.log(e)
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
      return state.isAdmin
    }
  }
}
