<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__left">
        <div class="navbar__logo">
          <img src="../assets/logo.png" alt="Логотип" class="logo">
        </div>
        <ul v-if="!isAdmin">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/appointments">Запись</router-link></li>
        </ul>
        <ul v-if="isAdmin">
          <li><router-link to="/doctors">Врачи</router-link></li>
          <li><router-link to="/specializations/add">Добавить специализацию</router-link></li>
          <li><router-link to="/schedules/add">Добавить расписание</router-link></li>
          <li><router-link to="/doctors/add">Добавить врача</router-link></li>
        </ul>
      </div>
      <ul class="navbar__right">
        <li v-if="!isAdmin" class="account__authorize-links">
          <router-link :to="accountLink">
            <img src="../assets/acc-icon.svg" alt="account-icon">
            <p>Личный кабинет</p>
          </router-link>
        </li>
        <li v-if="isAdmin" class="admin__info">
          <span>Админ</span>
          <img src="../assets/logout-icon.svg" alt="logout-icon" @click="logout">
        </li>
        <li class="logout__link" v-if="isAuthenticated && !isAdmin" @click="logout">
          <img src="../assets/logout-icon.svg" alt="logout-icon">
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userToken', 'userData']),
    isAuthenticated() {
      return !!this.userToken
    },
    accountLink() {
      return this.isAuthenticated ? '/profile' : '/login'
    },
    isAdmin() {
      return this.userData && this.userData.role_id === 1;
    },
    isUser() {
      return this.userData && this.userData.role_id !== 1;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  created() {
    if (this.isAuthenticated && !this.userData) {
      this.$store.dispatch('fetchUser')
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal && !this.userData) {
        this.$store.dispatch('fetchUser')
      }
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

.account__authorize-links a{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.account__authorize-links a>p {
  padding-top: 5px;
}

.account__authorize-links a:hover {
  text-shadow: none;
}

.account__authorize-links:hover{
  filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5));
}

.logout__link {
  padding-bottom: 35px;
}

.logout__link:hover {
  filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5));
}

.admin__info {
  display: flex;
  gap: 10px;
  flex-direction: column-reverse;
  align-items: center;
}

.admin__info span {
  cursor: default;
  font-weight: 800;
}

</style>
