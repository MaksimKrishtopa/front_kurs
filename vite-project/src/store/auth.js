// store/auth.js

import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

const store = createStore({
  state: {
    user_token: null,
    user_data: null,
    api_url: 'http://localhost:8000/api/'
  },
  getters: {
    config(state) {
      return { headers: { "Authorization": 'Bearer ' + state.user_token } }
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
        const response = await axios.post(state.api_url + 'registration', userData)
        if (response.data.message === 'User has been registered') {
          commit('updateUserToken', response.data.token)
          document.cookie = `user_token=${response.data.token}`
          router.push('/')
        }
      } catch (error) {
        console.error('Registration error:', error)
        throw error; // Перебрасываем ошибку для обработки в компоненте
      }
    },
    async login({ commit, state }, credentials) {
      try {
        const response = await axios.post(state.api_url + 'login', credentials)
        if (response.data.token) {
          commit('updateUserToken', response.data.token)
          document.cookie = `user_token=${response.data.token}`
          return true
        }
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async fetchUser({ commit, state }) {
      try {
        const response = await axios.get(state.api_url + 'user', {
          headers: {
            "Authorization": `Bearer ${state.user_token}`
          }
        })
        if (response.status === 200) {
          commit('updateUserData', response.data)
        } else {
          throw new Error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Fetch user error:', error)
        // Если возникает ошибка, обновим данные пользователя на null
        commit('updateUserData', null)
      }
    }
  }
})

export default store