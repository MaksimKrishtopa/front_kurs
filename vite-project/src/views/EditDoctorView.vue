<template>
    <div>
      <h1>Редактировать врача</h1>
      <form @submit.prevent="submitForm">
        <label for="surname">Фамилия:</label>
        <input type="text" v-model="form.surname" id="surname" required />
  
        <label for="name">Имя:</label>
        <input type="text" v-model="form.name" id="name" required />
  
        <label for="patronymic">Отчество:</label>
        <input type="text" v-model="form.patronymic" id="patronymic" required />
  
        <label for="gender">Пол:</label>
        <select v-model="form.gender" id="gender" required>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
  
        <label for="date_of_birth">Дата рождения:</label>
        <input type="date" v-model="form.date_of_birth" id="date_of_birth" required />
  
        <label for="specialization_id">Специализация:</label>
        <select v-model="form.specialization_id" id="specialization_id" required>
          <option v-for="spec in specializations" :key="spec.id" :value="spec.id">
            {{ spec.name }}
          </option>
        </select>
  
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          surname: '',
          name: '',
          patronymic: '',
          gender: 'male',
          date_of_birth: '',
          specialization_id: ''
        },
        specializations: []
      };
    },
    methods: {
      fetchDoctor() {
        const id = this.$route.params.id;
        axios.get(`http://localhost:80/api/doctors/${id}`)
          .then(response => {
            this.form = response.data;
          })
          .catch(error => {
            console.error("Ошибка при получении данных врача:", error);
          });
      },
      fetchSpecializations() {
        axios.get('http://localhost:80/api/specializations')
          .then(response => {
            this.specializations = response.data;
          })
          .catch(error => {
            console.error("Ошибка при получении специализаций:", error);
          });
      },
      submitForm() {
        const id = this.$route.params.id;
        axios.put(`http://localhost:80/api/doctors/change/${id}`, this.form)
          .then(response => {
            this.$router.push('/doctors');
          })
          .catch(error => {
            console.error("Ошибка при обновлении данных врача:", error);
          });
      }
    },
    created() {
      this.fetchDoctor();
      this.fetchSpecializations();
    }
  };
  </script>
  