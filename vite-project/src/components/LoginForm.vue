<template>
  <div class="container loginform__container">
    <form @submit.prevent="login">
      <h1>Авторизация</h1>
      <div class="input-group">
        <label for="email">Почта</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <button type="submit">Войти</button>
      <router-link to="/register">Зарегистрироваться</router-link>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const loginError = ref(null);

    const login = async () => {
      const credentials = {
        email: email.value,
        password: password.value
      };

      try {
        const response = await store.dispatch('login', credentials);
        if (response) {
          console.log('Login successful');
          router.push('/');
        } else {
          loginError.value = 'Ошибка при входе. Пожалуйста, проверьте свои данные и попробуйте снова.';
        }
      } catch (error) {
        console.error('Login error:', error);
        loginError.value = 'Ошибка при входе. Пожалуйста, проверьте свои данные и попробуйте снова.';
      }
    };

    return {
      email,
      password,
      login,
      loginError
    };
  }
};
</script>

  <style scoped>

  * {
    color: #343434;
  }
  form {
    color: #343434;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    background-color: #239AB5;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>