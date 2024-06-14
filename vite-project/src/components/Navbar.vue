<template>
  <nav class="navbar">

    <ul class="navbar__left">
      <div class="navbar__logo">
        <!-- <img src="@/assets/logo.png" alt="Логотип" class="logo"> -->
         <p>LOGO</p>
      </div>
      <li><router-link to="/">Главная</router-link></li>
      <li><router-link to="/appointments">Запись</router-link></li>
    </ul>
    <ul class="navbar__right">
      <li>
        <router-link to="/profile">
          Личный кабинет
        </router-link>
      </li>
      <li><router-link to="/login">Вход</router-link></li>
      <li><router-link to="/register">Регистрация</router-link></li>
      <li @click="logout">Выход</li>
    </ul>

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
  padding: 20px;
  background-color: #239AB5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
}


.navbar__logo {
  display: flex;
  align-items: center;
  color: black;
}

.logo {
  width: 50px;
  height: 50px;
}

.navbar__left,
.navbar__right {
  display: flex;
  list-style: none;
  gap: 20px;
  align-items: center;
}

.navbar__left {
  gap: 120px;
}

.navbar__right li:hover {
  cursor: pointer;
}
a {
  color: #fff;
}

</style>
