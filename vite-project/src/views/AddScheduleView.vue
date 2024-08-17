<template>
    <div>
      <h1>Добавить график работы врача</h1>
      <form @submit.prevent="submitForm">
        <label for="date_and_time">Дата и время:</label>
        <input type="datetime-local" v-model="form.date_and_time" id="date_and_time" required />
  
        <label for="doctor_id">Врач:</label>
        <select v-model="form.doctor_id" id="doctor_id" required>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} {{ doctor.surname }}
          </option>
        </select>
  
        <button type="submit">Сохранить</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          date_and_time: '',
          doctor_id: ''
        },
        doctors: []
      };
    },
    methods: {
      fetchDoctors() {
        axios.get('http://localhost:80/api/doctors')
          .then(response => {
            this.doctors = response.data;
          })
          .catch(error => {
            console.error("Ошибка при получении списка врачей:", error);
          });
      },
      submitForm() {
        axios.post('http://localhost:80/api/graph/create', this.form)
          .then(response => {
            this.$router.push('/doctors');
          })
          .catch(error => {
            console.error("Ошибка при создании графика:", error);
          });
      }
    },
    created() {
      this.fetchDoctors();
    }
  };
  </script>
  