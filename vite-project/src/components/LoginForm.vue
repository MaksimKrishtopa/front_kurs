<template>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '../store/auth'
  
  export default {
    name: 'LoginForm',
    setup() {
      const router = useRouter()
      const { setToken } = useAuth()
      const email = ref('')
      const password = ref('')
  
      const login = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value
            })
          });
          const data = await response.json();
          setToken(data.token)
          router.push('/')
        } catch (error) {
          console.error('Login error', error);
        }
      }
  
      return {
        email,
        password,
        login
      }
    }
  }
  </script>
  
  <style scoped>
  /* Стили для LoginForm */
  </style>