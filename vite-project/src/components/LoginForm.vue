<template>
  <div class="container loginform__container">
    <form @submit.prevent="login">
      <h1>Вход</h1>
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


  .loginform__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #239AB5;
    padding: 45px 110px 75px 110px;
    border-radius: 10px; 
    
  }

  label {
    font-size: 22px;
    font-weight: 600;
  }

  input {
    background-color: #fff;
    width: 400px;
    padding: 5px;
    color: #343434;
    font-size: 18px;
    border-radius: 5px;
  }

  a {
    padding-top: 5px;
    color: #fff;
  }

  button {
    margin-top: 100px;
    background-color: #fff;
    color: #239AB5;
    padding: 5px 35px;
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    border-radius: 5px;

  }

  .input-group {
    padding-top: 45px;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 35px;
    color: #fff;
  }
  </style>