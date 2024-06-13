<template>
    <form @submit.prevent="bookAppointment">
      <div>
        <label for="doctor">Select Doctor</label>
        <select id="doctor" v-model="doctorId" required>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}</option>
        </select>
      </div>
      <div>
        <label for="date">Select Date</label>
        <input type="date" id="date" v-model="date" required />
      </div>
      <div>
        <label for="time">Select Time</label>
        <input type="time" id="time" v-model="time" required />
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    name: 'AppointmentForm',
    setup() {
      const doctorId = ref('')
      const date = ref('')
      const time = ref('')
      const doctors = ref([])
  
      onMounted(async () => {
        try {
          const response = await fetch('http://localhost:8000/api/doctors')
          doctors.value = await response.json()
        } catch (error) {
          console.error('Error fetching doctors:', error)
        }
      })
  
      const bookAppointment = async () => {
        try {
          await fetch('http://localhost:8000/api/appointments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              doctor_id: doctorId.value,
              date: date.value,
              time: time.value
            })
          })
          alert('Appointment booked successfully!')
        } catch (error) {
          console.error('Error booking appointment:', error)
        }
      }
  
      return {
        doctorId,
        date,
        time,
        doctors,
        bookAppointment
      }
    }
  }
  </script>
  
  <style scoped>
  /* Стили для AppointmentForm */
  </style>