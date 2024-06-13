<template>
    <nav>
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/appointments">Запись</router-link></li>
        <li><router-link to="/profile">Личный кабинет</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Вход</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/register">Регистрация</router-link></li>
        <li v-if="isAuthenticated" @click="logout">Выход</li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    computed: {
      isAuthenticated() {

        return !!localStorage.getItem('token');
      }
    },
    methods: {
      logout() {

        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style>

  </style>
  