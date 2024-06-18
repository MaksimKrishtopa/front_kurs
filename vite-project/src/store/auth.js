// store/auth.js

import { createStore } from 'vuex'

const store = createStore({
  state: {
    user_token: null,
    user_data: null,
    api_url: '/api/' // Базовый URL для запросов API
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
    },
    updateUserData(state, user_data) {
      state.user_data = user_data
    }
  },
  actions: {
    async registration({ commit, state }, userData) {
      try {
        console.log('Sending user data:', userData); // Логирование данных
        const response = await fetch(state.api_url + 'registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        if (data.token) {
          commit('updateUserToken', data.token)
          document.cookie = `user_token=${data.token}`
          commit('updateUserData', data.user)
          return true
        }
      } catch (error) {
        console.error('Registration error:', error)
        console.error('Error details:', error.message || 'No response data')
        throw error
      }
    },
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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        if (data.token) {
          commit('updateUserToken', data.token)
          document.cookie = `user_token=${data.token}`
          return true
        }
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async fetchUser({ commit, state }) {
      try {
        const response = await fetch(state.api_url + 'user', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${state.user_token}`
          }
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        commit('updateUserData', data)
      } catch (error) {
        console.error('Fetch user error:', error)
        commit('updateUserData', null)
      }
    }
  }
})

export default store