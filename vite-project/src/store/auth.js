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
    async login({ commit, dispatch, state }, credentials) {
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
          commit('updateUserData', res.data) // Сохраняем данные пользователя

          // Проверка наличия и значения role_id
          if (res.data && res.data.role_id && res.data.role_id !== 1) {
            await dispatch('fetchUser') // Запрашиваем профиль только для обычных пользователей
          } else {
            console.log('Администратор авторизован, профиль не требуется')
          }

          return true
        }
        return false
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    async fetchSpecializations({ state }) {
      try {
        const response = await fetch(`${state.api_url}doctors/create`, {
          headers: {
            'Authorization': `Bearer ${state.user_token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.specializations; // предполагаем, что API возвращает специализации в таком формате
      } catch (error) {
        console.error('Fetch specializations error:', error);
        throw error;
      }
    },

    async registration({ commit, state }, userData) {
      try {
        const response = await fetch(state.api_url + 'registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.status) {
          return true
        }
        return false
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },

    async fetchUser({ commit, state }) {
      try {
        if (state.user_data && state.user_data.role_id === 1) {
          console.log('Запрос профиля для администратора не требуется');
          return;
        }

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
        console.log('Fetched user data:', data.data);
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