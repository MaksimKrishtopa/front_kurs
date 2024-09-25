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
          <label for="specialization">Специализация:</label>
          <select id="specialization" v-model="selectedSpecialization" required>
            <option value="" disabled>Выберите специализацию</option>
            <option v-for="specialization in specializations" :key="specialization.id" :value="specialization.id">
              {{ specialization.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="doctor">Доктор:</label>
          <select id="doctor" v-model="selectedDoctor" required>
            <option value="" disabled>Выберите доктора</option>
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
              {{ doctor.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Дата:</label>
          <input type="date" id="date" v-model="selectedDate" required />
        </div>
        <div class="form-group">
          <label for="time">Время:</label>
          <input type="time" id="time" v-model="selectedTime" required />
        </div>
        <div class="appointment__button-container">
          <button class="submit-button" type="submit">Записаться</button>
      </div>
      </form>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AppointmentForm',
  setup() {
    const selectedSpecialization = ref('');
    const selectedDoctor = ref('');
    const selectedDate = ref('');
    const selectedTime = ref('');
    const specializations = ref([]);
    const doctors = ref([]);

    const store = useStore();

    const loadSpecializations = async () => {
      try {
        const response = await fetch('http://localhost:80/api/doctors/create', {
          headers: store.getters.config.headers,
        });
        const data = await response.json();
        if (data.status) {
          specializations.value = data.data || [];
        } else {
          console.error('Error loading specializations:', data.message);
        }
      } catch (error) {
        console.error('Error loading specializations:', error.message);
      }
    };

    const loadDoctors = async () => {
      try {
        const token = store.getters.userToken;
        if (!token) {
          throw new Error('Unauthorized: No token available');
        }

        const response = await fetch(store.state.api_url + 'doctors', {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load doctors: ' + response.statusText);
        }

        const data = await response.json();
        doctors.value = data.data || [];
      } catch (error) {
        console.error('Error loading doctors:', error.message);
      }
    };

    const bookAppointment = async () => {
      try {
        const token = store.getters.userToken;
        if (!token) {
          throw new Error('Unauthorized: No token available');
        }

        const response = await fetch(store.state.api_url + 'record/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({
            specialization_id: selectedSpecialization.value,
            doctor_id: selectedDoctor.value,
            date: selectedDate.value,
            time: selectedTime.value,
          }),
        });

        const result = await response.json();
        if (result.status) {
          alert(result.message);
        } else {
          console.error('Error booking appointment:', result.message);
        }
      } catch (error) {
        console.error('Error booking appointment:', error.message);
      }
    };

    onMounted(() => {
      loadSpecializations();
      loadDoctors();
    });

    return {
      selectedSpecialization,
      selectedDoctor,
      selectedDate,
      selectedTime,
      specializations,
      doctors,
      bookAppointment,
    };
  },
};
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
  font-size: 26px;
  font-weight: 700;
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