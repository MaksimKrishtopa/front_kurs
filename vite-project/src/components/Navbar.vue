<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__left">
        <div class="navbar__logo">
          <img src="../assets/logo.png" alt="Логотип" class="logo">
        </div>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/appointments">Запись</router-link></li>
        </ul>
      </div>
      <ul class="navbar__right">
        <li>
          <router-link to="/profile">
            Личный кабинет
          </router-link>
        </li>
        <li><router-link to="/login">Вход</router-link></li>
        <li><router-link to="/register">Регистрация</router-link></li>
        <li><img src="../assets/logout-icon.svg" alt="logout-icon"></li>
      </ul>
    </div>
  </nav>
</template>

  <!-- <nav class="navbar">
    <ul class="navbar__left">
      <li><router-link to="/">Главная</router-link></li>
      <li><router-link :to="!isAuthenticated ? '/appointments' : '/login'">Запись</router-link></li>
    </ul>
    <ul class="navbar__right">
      <li>
        <router-link :to="isAuthenticated ? '/profile' : '/login'">
          <img src="@/assets/user-icon.png" alt="Профиль" class="profile-icon" />
          Личный кабинет
        </router-link>
      </li>
      <li v-if="isAuthenticated" @click="logout">Выход</li>
    </ul>
  </nav> -->


<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('authToken');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background-color: #239AB5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.navbar__logo {
  display: flex;
  align-items: center;
  margin-right: 200px;
  width: 150px;
  height: 150px;
}

.logo {
  object-fit: contain;
}

.navbar__left,
.navbar__right {
  display: flex;
  align-items: center;
  list-style: none;
}

.navbar__left ul {
  display: flex;
  gap: 120px;
  margin: 0;
  padding: 0;
}

.navbar__right li:hover {
  cursor: pointer;
}

a {
  color: #fff;
}

a:hover {
  text-shadow: #ffffff 0 0 10px;
}

.router-link-active {
  border-bottom: 3px solid #fff; 
}
</style>
