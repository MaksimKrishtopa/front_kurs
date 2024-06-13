import { reactive } from 'vue'

const state = reactive({
  token: null,
  user: null,
})

export function useAuth() {
  const setToken = (token) => {
    state.token = token
  }

  const setUser = (user) => {
    state.user = user
  }

  const logout = () => {
    state.token = null
    state.user = null
  }

  return {
    state,
    setToken,
    setUser,
    logout
  }
}
