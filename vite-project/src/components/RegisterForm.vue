<template>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'RegisterForm',
    setup() {
      const router = useRouter()
      const email = ref('')
      const password = ref('')
      const confirmPassword = ref('')
  
      const register = async () => {
        if (password.value !== confirmPassword.value) {
          alert('Passwords do not match!')
          return
        }
        try {
          const response = await fetch('http://localhost:8000/api/register', {
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
          router.push('/login')
        } catch (error) {
          console.error('Registration error', error);
        }
      }
  
      return {
        email,
        password,
        confirmPassword,
        register
      }
    }
  }
  </script>
  
  <style scoped>
  /* Стили для RegisterForm */
  </style>