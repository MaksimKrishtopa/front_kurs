<template>
  <div class="container appointment-form-container">
    <aside class="sidebar">
      <ul>
        <li><router-link to="/appointments">Мои записи</router-link></li>
        <li><router-link to="/appointment-form">Записаться на прием</router-link></li>
      </ul>
    </aside>
    <section class="appointment-form-content">
      <h1>Запись на прием</h1>
      <form @submit.prevent="bookAppointment" class="appointment-form">
        <div class="form-group">
        <div>
          <img src="../assets/spec-icon.svg" alt="Spec">
          <label for="doctor">Специализация</label>
        </div>
          <select id="doctor" v-model="doctorId" required>
            <option  v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <div>
          <img src="../assets/date-icon.svg" alt="Date">
          <label for="date">Выберите дату</label>
        </div>
          <input type="date" id="date" v-model="date" required />
        </div>
        <div class="form-group ">
          <label for="time">Выберите время</label>
          <input type="time" id="time" v-model="time" required />
        </div>
        <div class="appointment__button-container">
        <button type="submit" class="submit-button">Записаться</button>
        </div>
      </form>
    </section>
  </div>
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
.appointment-form-container {
  display: flex;
  gap: 25px;
}

.sidebar {
  width: 285px;
  background-color: #239AB5;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-radius: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
}

.router-link-active {
  border-bottom: 3px solid #fff; 
}

.appointment-form-content {
  height: 100%;
  flex: 1;
  padding: 20px;
  background-color: #239AB5;
  overflow-y: auto;
  border-radius: 10px;
}

.appointment-form-content h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 30px;
}

.form-group > div {
    display: flex;
    gap: 5px;
    align-items: flex-start
}

.appointment-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
  padding-bottom: 25px;
  border-bottom: 2px solid #adadad;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #343434;
}

.form-group select,
.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #343434;
}

.form-group select,
.form-group input::placeholder {
  color: inherit;
}

.appointment__button-container {
    display: flex;
    justify-content: center;
}

.submit-button {
  margin: 20px 0;
  background-color: #239AB5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 24px;
  font-weight: 600;
}

.submit-button:hover {
  background-color: #1a7f99;
}
</style>