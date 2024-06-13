<template>
    <div>
      <h2>My Profile</h2>
      <form @submit.prevent="updateProfile">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" v-model="profile.name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="profile.email" required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useAuth } from '../store/auth'
  
  export default {
    name: 'UserProfile',
    setup() {
      const { token } = useAuth()
      const profile = ref({
        name: '',
        email: ''
      })
  
      onMounted(async () => {
        try {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          profile.value = await response.json()
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      })
  
      const updateProfile = async () => {
        try {
          await fetch('http://localhost:8000/api/user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profile.value)
          })
          alert('Profile updated successfully!')
        } catch (error) {
          console.error('Error updating profile:', error)
        }
      }
  
      return {
        profile,
        updateProfile
      }
    }
  }
  </script>
  
  <style scoped>
  /* Стили для UserProfile */
  </style>
  