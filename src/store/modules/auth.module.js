import axios from '@/axios/request'
import { User } from '@/classes/User'

const TOKEN_KEY = 'jwt-token'
const USER_KEY = 'user'

export default {
  namespaced: true,
  root: true,
  state: {
    user: JSON.parse(localStorage.getItem(USER_KEY)),
    token: localStorage.getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout (state) {
      state.user = null
      state.token = null

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
        commit('setUser', data.data)
      } catch (e) {
        console.log(e.message)
      }
    },
    async register ({ commit, dispatch }, payload) {
      try {
        const userData = new User(payload)
        const { data } = await axios.post('/register', userData)

        commit('setToken', data.token)
        commit('setUser', data.data)

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
      return state?.user
    },
    token (state) {
      return state?.token
    },
    isAuthenticated (_, getters) {
      return !!getters.token
    },
    isAdmin (state) {
      return state.user?.is_admin
    }
  }
}
