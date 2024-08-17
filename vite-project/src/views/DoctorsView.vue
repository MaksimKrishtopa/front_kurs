<template>
    <div>
      <h1>Список врачей</h1>
      <router-link to="/doctor/add">Добавить врача</router-link>
      <table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Специализация</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in doctors" :key="doctor.id">
            <td>{{ doctor.surname }}</td>
            <td>{{ doctor.name }}</td>
            <td>{{ doctor.patronymic }}</td>
            <td>{{ doctor.specialization.name }}</td>
            <td>
              <router-link :to="`/doctor/edit/${doctor.id}`">Редактировать</router-link>
              <button @click="deleteDoctor(doctor.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      doctors: [],
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
    deleteDoctor(id) {
      // Здесь можно добавить запрос на удаление врача, если он реализован в API
      console.log(`Удалить врача с ID: ${id}`);
    }
  },
  created() {
    this.fetchDoctors();
  }
};
</script>

<style scoped>
    * {
        color: black;
    }
</style>
  

  