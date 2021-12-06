import axios from '@/axios/request'
import { User } from '@/classes/User'

const TOKEN_KEY = 'jwt-token'
const USER_KEY = 'user'

export default {
  namespaced: true,
  root: true,
  state: {
    user: localStorage.getItem(USER_KEY),
    token: localStorage.getItem(TOKEN_KEY),
    role: 'guest',
    isAdmin: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem(USER_KEY, user)
    },
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
      state.user = null
      state.token = null
      state.role = 'guest'
      state.isAdmin = false
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      try {
        const userData = new User(payload)
        console.log(userData)
        const { data } = await axios.post('/login', userData)
        commit('setToken', data.token)
        commit('setRole', data.data.users_role)
        //   commit('setAdmin', data.data.is_admin)
      } catch (e) {
        console.log(e.message)
      }
    },
    async register ({ commit, dispatch }, payload) {
      try {
        const userData = new User(payload)
        const { data } = await axios.post('/register', userData)

        commit('setToken', data.token)
        commit('setRole', data.data?.users_role)
        commit('setAdmin', data.data?.is_admin)

        let message = ''
        for (const key in data.errors) {
          message += key + ' - '
          data.errors[key].forEach(el => {
            message += el
          })
        }
        console.log(message)
      } catch (e) {
        console.log(e)
      }
    },
    async logout ({ state, commit }) {
      try {
        const response = await fetch('http://localhost:80/api/logout', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${state.token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          commit('logout')
          console.log(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    },
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
