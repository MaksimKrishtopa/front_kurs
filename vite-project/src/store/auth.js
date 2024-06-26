import { createStore } from 'vuex'

const store = createStore({
  state: {
    user_token: localStorage.getItem('authToken') || null,
    user_data: JSON.parse(localStorage.getItem('userData')) || null,
    api_url: 'http://localhost:80/api/'  
  },
  getters: {
    config(state) {
      return {
        headers: {
          "Authorization": 'Bearer ' + state.user_token
        }
      }
    },
    userToken(state) {
      return state.user_token
    },
    userData(state) {
      return state.user_data
    }
  },
  mutations: {
    updateUserToken(state, user_token) {
      state.user_token = user_token
      localStorage.setItem('authToken', user_token)
    },
    updateUserData(state, user_data) {
      state.user_data = user_data
      localStorage.setItem('userData', JSON.stringify(user_data))
    },
    clearUserToken(state) {
      state.user_token = null
      state.user_data = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    }
  },
  actions: {
    async login({ commit, state }, credentials) {
      try {
        const response = await fetch(state.api_url + 'login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const res = await response.json()
        if (res.status) {
          commit('updateUserToken', res.token.split('|')[1])
          return true
        }
        return false
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async fetchUser({ commit, state }) {
      try {
        const response = await fetch(state.api_url + 'profile', {
          method: 'GET',
          headers: {
            "Authorization": 'Bearer ' + state.user_token
          }
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        commit('updateUserData', data.data)
      } catch (error) {
        console.error('Fetch user error:', error)
        commit('clearUserToken')
      }
    },
    logout({ commit }) {
      commit('clearUserToken')
    }
  }
})

export default store