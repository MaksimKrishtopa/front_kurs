<template>
    <div>
      <h1>Добавить специализацию</h1>
      <form @submit.prevent="submitForm">
        <label for="name">Название специализации:</label>
        <input type="text" v-model="form.name" id="name" required />
  
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
          name: ''
        }
      };
    },
    methods: {
      submitForm() {
        axios.post('http://localhost:80/api/specializations/create', this.form)
          .then(response => {
            this.$router.push('/doctors');
          })
          .catch(error => {
            console.error("Ошибка при создании специализации:", error);
          });
      }
    }
  };
  </script>
  