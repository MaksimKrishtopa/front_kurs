<template>
    <form @submit.prevent="addDoctor">
      <div>
        <label for="name">Doctor's Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="specialization">Specialization</label>
        <input type="text" id="specialization" v-model="specialization" required />
      </div>
      <button type="submit">Add Doctor</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'DoctorForm',
    setup() {
      const name = ref('')
      const specialization = ref('')
  
      const addDoctor = async () => {
        try {
          await fetch('http://localhost:8000/api/doctors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name.value,
              specialization: specialization.value
            })
          })
          alert('Doctor added successfully!')
        } catch (error) {
          console.error('Error adding doctor:', error)
        }
      }
  
      return {
        name,
        specialization,
        addDoctor
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  